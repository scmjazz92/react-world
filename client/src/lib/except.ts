export const tagExcept = (text: string) =>
  text.replace(/<\/?(?!a)(?!p)\w*\b[^>]*>/gi, '')
