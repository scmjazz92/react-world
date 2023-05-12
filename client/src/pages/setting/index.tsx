import { css } from '@emotion/react'
import React from 'react'
import { useRecoilValue } from 'recoil'
import BasicLayout from '../../components/@layout/BasicLayout'
import Footer from '../../components/footer/Footer'
import SettingButtonItem from '../../components/setting/SettingButtonItem'
import SettingLinkItem from '../../components/setting/SettingLinkItem'
import useLogout from '../../hooks/apis/auth/useLogout'
import colors from '../../lib/colors'
import { userState } from '../../recoils/user'

const Setting = () => {
  const onLogout = useLogout()
  const currentUser = useRecoilValue(userState)

  return (
    <BasicLayout title="설정" footer={<Footer />}>
      <div css={block}>
        <SettingLinkItem to="/setting/mypage?next=/setting" text="마이페이지" />
        <SettingLinkItem
          to={`/story/${currentUser?.username}?next=/setting`}
          text="내 스토리"
        />
        <SettingButtonItem text="로그아웃" onClick={onLogout} />
      </div>
    </BasicLayout>
  )
}

const block = css`
  flex: 1;
  background: ${colors.grey50};
`

export default Setting
