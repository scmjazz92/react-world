import * as React from 'react'
import { SVGProps } from 'react'
const SvgLike = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={2}
    clipRule="evenodd"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fillRule="nonzero"
      d="M12 5.72C9.376 1.203 2 2.522 2 8.181c0 3.725 4.345 7.727 9.303 12.54a.996.996 0 0 0 1.394 0C17.674 15.89 22 11.907 22 8.181c0-5.678-7.396-6.944-10-2.461z"
    />
  </svg>
)
export default SvgLike
