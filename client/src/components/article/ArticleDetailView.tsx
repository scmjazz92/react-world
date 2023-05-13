import { css } from '@emotion/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { ArticleResult } from '../../apis/types'
import useLike from '../../hooks/apis/article/useLike'
import useOpenLoginModal from '../../hooks/useOpenLoginModal'
import { dateFormat, midnightCheck } from '../../lib/dateFormat'
import styles from '../../lib/styles'
import { likeItemSelector } from '../../recoils/like'
import { userState } from '../../recoils/user'
import LikeButton from '../@shared/LikeButton'
import ArticleStats from './ArticleStats'

interface Props {
  article: ArticleResult
}

const ArticleDetailView = ({ article }: Props) => {
  const {
    id,
    title,
    body,
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
    <div css={container}>
      <div css={content}>
        <h2>{title}</h2>
        <div className="content" dangerouslySetInnerHTML={{ __html: body }} />
      </div>
      <div css={info}>
        <ArticleStats likes={likes} views={views} />
        <div css={block}>
          <LikeButton isLiked={isLiked} onClick={handleToggleLike} />
          <div className="left">
            <Link to={`/story/${username}`} className="username">
              {username}
            </Link>
            <span className="date">{date}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const container = css`
  ${styles.padding}
  word-break: break-all
`

const content = css`
  & h2 {
    font-size: 20px;
    line-height: 1.2;
  }

  .content {
    padding-top: 20px;

    & * {
      line-height: 1.2;
    }
  }

  & img {
    display: block;
    max-width: 100%;
  }
`

const info = css`
  padding-top: 20px;
`

const block = css`
  display: flex;
  justify-content: space-between;

  .left {
    display: flex;
    align-items: center;

    .username {
      font-size: 14px;
      font-weight: bold;
      margin-right: 6px;
    }

    .date {
      font-size: 12px;
    }
  }
`

export default ArticleDetailView
