import React from 'react'
import BasicLayout from '../../components/@layout/BasicLayout'
import HeaderBackButton from '../../components/header/HeaderBackButton'
import useRedirect from '../../hooks/useRedirect'

const Write = () => {
  const redirect = useRedirect()

  return (
    <BasicLayout
      title="새 글 등록"
      left={<HeaderBackButton onClick={redirect} />}
    >
      새글
    </BasicLayout>
  )
}

export default Write
