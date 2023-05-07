import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

interface CurrentCursor {
  element: HTMLElement | null
  position: 'before' | 'after' | null
}

const IMAGE_DATA_NUMBER = 'image-data-number'

const useEditor = () => {
  const [files, setFiles] = useState<Map<number, File>>(new Map())
  const rootRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)
  const currentCursorRef = useRef<CurrentCursor>({
    element: null,
    position: null,
  })

  const getImages = () => {
    if (!editorRef.current) return []
    const images = [...editorRef.current.children].reduce((acc, cur) => {
      if (cur.children.item(0)?.tagName === 'IMG') {
        acc = [...acc, cur.children.item(0)!] as HTMLImageElement[]
      }
      return acc
    }, [] as HTMLImageElement[])

    return images
  }

  const getFiles = () => {
    const file = getImages().map((image) => {
      const index = parseInt(image.getAttribute(IMAGE_DATA_NUMBER)!)
      return files.get(index)!
    })

    return file
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    const file = event.target.files[0]
    const url = URL.createObjectURL(file)
    event.target.value = ''

    if (!editorRef.current) return
    appendChildImageElement(editorRef.current, url)

    setFiles((prev) => new Map([...prev, [prev.size, file]]))
  }

  const afterCusor = (current: HTMLElement) => {
    const selection = getSelection()
    if (!selection) return

    const newRange = document.createRange()
    newRange.setStart(current, 1)
    newRange.setEnd(current, 1)

    selection.removeAllRanges()
    selection.addRange(newRange)
  }

  const createImageElement = (url: string) => {
    const createImageElement = document.createElement('img')
    createImageElement.style.padding = '10px 0'
    createImageElement.src = url
    createImageElement.alt = ''
    createImageElement.setAttribute(IMAGE_DATA_NUMBER, String(files.size))

    return createImageElement
  }

  const createLineElement = () => {
    const createDivElement = document.createElement('div')
    const createBrElement = document.createElement('br')

    createDivElement.appendChild(createBrElement)
    return createDivElement
  }

  const appendChildImageElement = (root: HTMLElement, url: string) => {
    const createElement = document.createElement('div')
    const lineElement = createLineElement()
    const imageElement = createImageElement(url)

    if (currentCursorRef.current.position === 'after') {
      currentCursorRef.current.element?.after(createElement)
      createElement.appendChild(imageElement)
      createElement.after(lineElement)
      afterCusor(lineElement)
      return
    }

    if (currentCursorRef.current.position === 'before') {
      currentCursorRef.current.element?.before(createElement)
      createElement.appendChild(imageElement)
      createElement.after(lineElement)
      afterCusor(lineElement)
      return
    }

    root.appendChild(createElement)
    createElement.appendChild(imageElement)
    createElement.after(lineElement)
    afterCusor(lineElement)
  }

  const appendChildLineElement = (root: Element) => {
    const lineElement = createLineElement()
    root.appendChild(lineElement)
  }

  const handleKeyup = (event: globalThis.KeyboardEvent) => {
    const editor = editorRef.current
    if (editor?.childElementCount === 0) {
      appendChildLineElement(editor)
    }

    const target = event.target as HTMLDivElement
    if (target.childNodes.length <= 1) {
      currentCursorRef.current = {
        element: null,
        position: null,
      }
      return
    }

    const selection = getSelection()
    if (!selection) return
    if (selection.anchorNode instanceof HTMLElement) {
      currentCursorRef.current = {
        element: selection.anchorNode,
        position: selection.anchorOffset === 0 ? 'before' : 'after',
      }
      return
    }

    currentCursorRef.current = {
      element: selection.anchorNode!.parentElement,
      position: selection.anchorOffset === 0 ? 'before' : 'after',
    }
  }

  const handleLineClick = () => {
    const selection = getSelection()
    if (!selection) return

    currentCursorRef.current = {
      element: selection.anchorNode as HTMLElement,
      position: selection.anchorOffset === 0 ? 'before' : 'after',
    }
  }

  useEffect(() => {
    const editor = editorRef.current

    if (!rootRef.current || !editor) return
    rootRef.current.style.maxHeight = rootRef.current.clientHeight + 'px'

    if (editor.firstChild) return
    appendChildLineElement(editor)
  }, [editorRef, rootRef])

  useEffect(() => {
    if (!editorRef.current) return
    editorRef.current.addEventListener('click', handleLineClick)
    editorRef.current.addEventListener('keyup', handleKeyup)

    return () => {
      if (!editorRef.current) return
      editorRef.current.removeEventListener('click', handleLineClick)
      editorRef.current.removeEventListener('keyup', handleKeyup)
    }
  }, [editorRef])

  return { rootRef, editorRef, onChange, getImages, getFiles }
}

export default useEditor
