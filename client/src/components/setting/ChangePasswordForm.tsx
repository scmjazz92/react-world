import React, { FormEvent } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import useChangePassword from '../../hooks/apis/auth/useChangePassword'
import validate from '../../lib/validate'
import { modalSelector } from '../../recoils/modal'
import { userState } from '../../recoils/user'
import Button from '../@shared/Button'
import Form from '../@shared/Form'
import LabelInput from '../@shared/LabelInput'

const ChangePasswordForm = () => {
  const { mutate: onChangePassword } = useChangePassword()
  const modal = useSetRecoilState(modalSelector)
  const currentUser = useRecoilValue(userState)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(event.currentTarget)
    const currentPassword = formData.get('currentPassword')
    const changePassword = formData.get('changePassword')

    if (
      typeof currentPassword !== 'string' ||
      typeof changePassword !== 'string'
    )
      return

    if (
      !validate.password(currentPassword) ||
      !validate.password(changePassword)
    ) {
      modal({
        config: {
          title: '실패',
          description: '8~12자, 영문/숫자/특수문자 중 2가지 이상 입력해주세요.',
        },
        visible: true,
      })
      form.reset()
      return
    }

    onChangePassword(
      { currentPassword, changePassword },
      {
        onSuccess() {
          modal({
            config: {
              title: '비밀번호 변경 완료',
              description: '비밀번호가 변경되었습니다.',
            },
            visible: true,
          })
          form.reset()
        },
        onError() {
          modal({
            config: {
              title: '실패',
              description: '잘못된 비밀번호입니다.',
            },
            visible: true,
          })
          form.reset()
        },
      },
    )
  }

  return (
    <Form onSubmit={onSubmit} footer={<Button type="submit">변경</Button>}>
      <LabelInput
        label="아이디"
        defaultValue={currentUser?.username}
        disabled={true}
      />
      <LabelInput
        label="현재 비밀번호"
        type="password"
        name="currentPassword"
      />
      <LabelInput label="새 비밀번호" type="password" name="changePassword" />
    </Form>
  )
}

export default ChangePasswordForm
