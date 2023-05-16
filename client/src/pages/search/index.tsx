import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import BasicLayout from '../../components/@layout/BasicLayout'
import HeaderBackButton from '../../components/header/HeaderBackButton'
import SearchInput from '../../components/search/SearchInput'
import useDebounce from '../../hooks/useDebounce'
import Footer from '../../components/footer/Footer'
import SearchList from '../../components/search/SearchList'
import useRedirect from '../../hooks/useRedirect'
import BlindHeading from '../../components/@shared/BlindHeading'
import useMediaQuery from '../../hooks/useMediaQuery'
import { css } from '@emotion/react'
import { mediaQuery } from '../../lib/mediaQuery'

const Search = () => {
  const { isMobile } = useMediaQuery()
  const navigate = useNavigate()
  const redirect = useRedirect()
  const [searchParams] = useSearchParams()
  const [searchText, setSearchText] = useState(searchParams.get('value') ?? '')
  const debounceSearchText = useDebounce({
    value: searchText,
  })

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
  }

  useEffect(() => {
    navigate(`/search?value=${debounceSearchText}`)
  }, [debounceSearchText])

  return (
    <BasicLayout
      title="검색"
      left={<HeaderBackButton onClick={redirect} />}
      footer={<Footer />}
    >
      {!isMobile && <BlindHeading heading="검색" level={2} />}
      <div css={container}>
        <SearchInput onChange={onChange} value={searchText} />
        <SearchList searchText={debounceSearchText} />
      </div>
    </BasicLayout>
  )
}

const container = css`
  ${mediaQuery.tablet} {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 600px;
    margin: 0 auto;
  }
`

export default Search
