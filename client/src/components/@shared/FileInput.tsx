import React, {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from 'react'
import styles from '../../lib/styles'

type FileAccept = 'image/*'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  htmlFor: string
  label: string | ReactNode
  accept: FileAccept
  onChange(event: ChangeEvent<HTMLInputElement>): void
}

const FileInput = forwardRef<HTMLInputElement, Props>(
  ({ label, htmlFor, ...rest }, ref) => {
    return (
      <div>
        <label htmlFor={htmlFor}>{label}</label>
        <input
          type="file"
          id={htmlFor}
          css={styles.blind}
          ref={ref}
          {...rest}
        />
      </div>
    )
  },
)

export default FileInput
