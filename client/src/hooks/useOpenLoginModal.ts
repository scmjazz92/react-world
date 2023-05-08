import { useSetRecoilState } from 'recoil'
import React, { useCallback } from 'react'
import { modalSelector } from '../recoils/modal'
import { useLocation, useNavigate } from 'react-router-dom'

const useOpenLoginModal = () => {
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const open = useSetRecoilState(modalSelector)

  const openLoginModal = useCallback(() => {
    open({
      config: {
        title: '로그인 후 이용해주세요.',
        confirmText: '로그인',
        cancelText: '취소',
        onConfirm: () =>
          navigate(`/auth/login?next=${pathname}${search ?? ''}`),
      },
      visible: true,
    })
  }, [pathname, search, navigate])

  return openLoginModal
}

export default useOpenLoginModal
