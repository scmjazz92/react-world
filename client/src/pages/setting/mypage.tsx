import React from 'react'
import { useSearchParams } from 'react-router-dom'
import BasicLayout from '../../components/@layout/BasicLayout'
import HeaderBackButton from '../../components/header/HeaderBackButton'
import ChangePasswordForm from '../../components/setting/ChangePasswordForm'
import UnRegisterView from '../../components/setting/UnRegisterView'
import TabFlexMode from '../../components/tab/TabFlexMode'
import TabLinkItem from '../../components/tab/TabModeItem'
import useRedirect from '../../hooks/useRedirect'

type MyPageMode = 'change-password' | 'un-register'

const MyPage = () => {
  const redirect = useRedirect()
  const [searchParams] = useSearchParams()
  const mode = (searchParams.get('mode') ?? 'change-password') as MyPageMode
  const next = searchParams.get('next') ?? ''
  const nextPath = next ? `&next=${next}` : ''

  return (
    <BasicLayout
      title="마이페이지"
      left={<HeaderBackButton onClick={redirect} />}
    >
      <TabFlexMode>
        <TabLinkItem
          to={`/setting/mypage?mode=change-password${nextPath}`}
          text="비밀번호 변경"
          mode={mode}
        />
        <TabLinkItem
          to={`/setting/mypage?mode=un-register${nextPath}`}
          text="회원 탈퇴"
          mode={mode}
        />
      </TabFlexMode>
      {mode === 'change-password' ? <ChangePasswordForm /> : <UnRegisterView />}
    </BasicLayout>
  )
}

export default MyPage
