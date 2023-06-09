import { css } from '@emotion/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { ArticleResult } from '../../apis/types'
import useLike from '../../hooks/apis/article/useLike'
import useOpenLoginModal from '../../hooks/useOpenLoginModal'
import colors from '../../lib/colors'
import { dateFormat, midnightCheck } from '../../lib/dateFormat'
import { tagExcept } from '../../lib/except'
import { mediaQuery } from '../../lib/mediaQuery'
import styles from '../../lib/styles'
import { likeItemSelector } from '../../recoils/like'
import { userState } from '../../recoils/user'
import LikeButton from '../@shared/LikeButton'
import Thumbnail from '../@shared/Thumbnail'
import ArticleStats from './ArticleStats'

interface Props {
  article: ArticleResult
  path?: string
}

const ArticleItem = ({ article, path }: Props) => {
  const {
    id,
    title,
    body,
    thumbnail,
    createdAt,
    user: { username },
    articleStats,
  } = article

  const currentUser = useRecoilValue(userState)
  const loginModal = useOpenLoginModal()
  const { like, unlike } = useLike(id)
  const item = useRecoilValue(likeItemSelector(id))

  const isLiked = item?.isLiked ?? article.isLiked
  const likes = item?.articleStats.likes ?? articleStats.likes
  const views = item?.articleStats.views ?? articleStats.views
  const commentsCount =
    item?.articleStats.commentsCount ?? articleStats.commentsCount

  const handleToggleLike = () => {
    if (!currentUser) {
      loginModal()
      return
    }

    if (isLiked) {
      unlike(id)
    } else {
      like(id)
    }
  }

  const date = dateFormat({
    date: createdAt,
    options: {
      timeStyle: midnightCheck(createdAt) ? undefined : 'short',
    },
  })

  return (
    <li css={list}>
      <Link to={path ?? `/articles/${id}`} css={content}>
        <div className="left">
          <strong className="title">{title}</strong>
          <p className="body">{tagExcept(body)}</p>
        </div>
        {thumbnail && <Thumbnail url={thumbnail} />}
      </Link>
      <ArticleStats likes={likes} views={views} commentsCount={commentsCount} />
      <div css={info}>
        <LikeButton isLiked={isLiked} onClick={handleToggleLike} />
        <div>
          <Link to={`/story/${username}`} className="username">
            {username}
          </Link>
          <span className="date">{date}</span>
        </div>
      </div>
    </li>
  )
}

const list = css`
  &:not(:first-of-type) {
    padding-top: 60px;
  }

  ${mediaQuery.tablet} {
    &:not(:first-of-type) {
      padding-top: 0;
    }
  }
`

const content = css`
  display: flex;
  justify-content: space-between;
  word-break: break-all;

  .left {
    width: calc(100% - 50px);
    padding-bottom:20px;
    padding-right:10px;

    .title {
      font-size: 18px;
      line-height: 1.2;
       ${styles.ellipsis(2)}
    }

    .body {
      padding-top: 8px;
      font-size: 14px;
      line-height: 1.2;
      color:${colors.grey300};
      ${styles.ellipsis(3)}
    }
    }
  }
`

const info = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;

  .username {
    padding-right: 8px;
    color: ${colors.black};
    font-weight: bold;
  }

  .date {
    color: ${colors.black};
  }
`

export default ArticleItem
