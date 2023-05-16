import { css } from '@emotion/react'
import { mediaQuery } from './mediaQuery'

const styles = {
  padding: css`
    padding: 24px 16px;
  `,
  blind: css`
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    border: 0;
    clip: rect(1px, 1px, 1px, 1px);
  `,
  ellipsis(line: number) {
    return css`
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: ${line};
      -webkit-box-orient: vertical;
    `
  },
  desktopInner: css`
    ${mediaQuery.tablet} {
      max-width: 768px;
      width: 100%;
      margin: 0 auto;
    }
  `,
}

export default styles
