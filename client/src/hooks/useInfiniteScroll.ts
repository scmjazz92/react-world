import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

interface UseInfiniteScrollParams {
  targetRef: RefObject<HTMLElement>
}

const useInfiniteScroll = ({ targetRef }: UseInfiniteScrollParams) => {
  const observerRef = useRef<IntersectionObserver>()
  const [intersecting, setIntersecting] = useState(false)

  const getObserver = useCallback(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver((entrise) => {
        setIntersecting(entrise[0]?.isIntersecting)
      })
    }
    return observerRef.current
  }, [observerRef])

  useEffect(() => {
    if (targetRef.current) {
      getObserver().observe(targetRef.current)
    }
  }, [targetRef])

  return intersecting
}

export default useInfiniteScroll
