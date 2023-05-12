import { css } from '@emotion/react'
import React from 'react'
import BasicLayout from '../../components/@layout/BasicLayout'
import Footer from '../../components/footer/Footer'
import SettingButtonItem from '../../components/setting/SettingButtonItem'
import SettingLinkItem from '../../components/setting/SettingLinkItem'
import useLogout from '../../hooks/apis/auth/useLogout'
import colors from '../../lib/colors'

const Setting = () => {
  const onLogout = useLogout()

  return (
    <BasicLayout title="설정" footer={<Footer />}>
      <div css={block}>
        <SettingLinkItem to="/setting/mypage" text="마이페이지" />
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
