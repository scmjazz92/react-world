import { css } from '@emotion/react'

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
}

export default styles
