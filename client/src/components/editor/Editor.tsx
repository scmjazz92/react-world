import { css } from '@emotion/react'
import React, { ReactNode, RefObject } from 'react'
import colors from '../../lib/colors'
import { mediaQuery } from '../../lib/mediaQuery'

interface Props {
  label?: string
  rootRef: RefObject<HTMLDivElement>
  editorRef: RefObject<HTMLDivElement>
  options?: ReactNode
  defaultValue?: ReactNode
}

const Editor = ({
  rootRef,
  editorRef,
  options,
  label,
  defaultValue,
}: Props) => {
  return (
    <div css={container} ref={rootRef}>
      <div css={top}>
        <strong className="label">{label}</strong>
        {options}
      </div>
      <div
        css={editor}
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning={true}
        translate="no"
        dangerouslySetInnerHTML={{ __html: defaultValue ?? '' }}
      ></div>
    </div>
  )
}

const container = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 200px;

  &:not(:first-of-type) {
    padding-top: 20px;
  }

  ${mediaQuery.tablet} {
    min-height: 400px;
  }
`

const top = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 6px;
`

const editor = css`
  flex: 1;
  padding: 14px 12px;
  border: 1px solid ${colors.grey100};
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.4;
  outline: none;
  overflow: scroll;
  scroll-padding: 15px;
  white-space: pre-wrap;

  &:focus {
    border-color: ${colors.blue100};
  }

  & * {
    line-height: 1.4;
  }

  & img {
    display: block;
    max-width: 100%;
  }
`

export default Editor
