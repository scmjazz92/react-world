export const breakpoints = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
}

export type BreakpoinstName = keyof typeof breakpoints

const media = (width: number) => `@media (min-width: ${width}px)`

export const mediaQuery = Object.entries(breakpoints).reduce(
  (acc, [name, width]) => {
    acc[name as BreakpoinstName] = media(width)
    return acc
  },
  {} as Record<BreakpoinstName, string>,
)
