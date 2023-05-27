import { Link, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Spinner from '../../../components/commons/Spinner'
import useFetch from '../../../hooks/useFetch'
import ImageHolder from '../../../components/elements/ImageHolder'
import fallbackImage from '../../../assets/images/fallbacks/article.jpg'
import { useUserContext } from '../../../contexts/UserContext'
import { Helmet } from 'react-helmet-async'

const ArticlePage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { slug } = useParams()
  const { userData } = useUserContext()

  const { responseData: article, loading: loadingArticle } = useFetch({
    method: 'get',
    url: `articles/${slug}`
  })

  const { setRequestData: setVote, responseData: voteResponse } = useFetch({
    method: 'post',
    url: `articles/vote/${slug}`
  })

  const { setRequestData: setDeleteAction, responseData: isDeleted } = useFetch(
    {
      method: 'delete',
      url: `articles/remove/${slug}`
    }
  )

  const onClickRedirect = (url: string) => {
    navigate(url)
  }

  if (isDeleted) {
    navigate('/')
  }

  const onClickDelete = () => {
    let confirmed = window.confirm(
      'Are you sure you want to delete this article?'
    )
    if (confirmed) {
      setDeleteAction(true)
    }
  }

  return loadingArticle ? (
    <Spinner />
  ) : (
    article && (
      <>
        <Helmet>
          <title>{article.title}</title>
        </Helmet>
        <div id='main' className='wrapper style2'>
          <div className='title'>{t('article.details.title')}</div>
          <div className='container'>
            <div id='content'>
              <article className='box post'>
                <header className='style1'>
                  <h2>{article.title}</h2>
                  <p>
                    <Link to={`/categories/${article.category.slug}`}>
                      {article.category.title}
                    </Link>
                  </p>
                  <p>
                    {t('article.details.author')} {article.author.firstName}{' '}
                    {article.author.lastName}
                    {' - '}
                    <Link to={`/users/${article.author.username}`}>
                      {article.author.username}
                    </Link>
                  </p>
                </header>
                <section className='row'>
                  <p className='col-6 col-12-medium'>{article.description}</p>
                  <Link to='/' className='col-6 col-12-medium main-image'>
                    <ImageHolder
                      imageAddress={article.image}
                      fallbackImage={fallbackImage}
                      altName={article.title}
                    />
                  </Link>
                </section>
                <div className='buttons-wrapper'>
                  {voteResponse ? (
                    <p>{voteResponse}</p>
                  ) : article.hasVoted ? (
                    <></>
                  ) : userData &&
                    userData.username === article.author.username ? (
                    <></>
                  ) : (
                    <>
                      <button
                        className='style3'
                        onClick={() => setVote({ vote: 'upvote' })}
                      >
                        {t('article.details.upvote')}
                      </button>
                      <button
                        className='style3'
                        onClick={() => setVote({ vote: 'downvote' })}
                      >
                        {t('article.details.downvote')}
                      </button>
                    </>
                  )}
                  {userData && userData.username === article.author.username ? (
                    <>
                      <h2 className='style2'>
                        {t('article.details.isPublicMessage')}{' '}
                        {article.isPublic
                          ? t('article.details.public')
                          : t('article.details.private')}
                      </h2>
                      <button
                        className='style3'
                        onClick={() =>
                          onClickRedirect(`/articles/edit/${article.slug}`)
                        }
                      >
                        {t('article.details.edit')}
                      </button>
                      <button className='style3' onClick={onClickDelete}>
                        {t('article.details.delete')}
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </article>
            </div>
          </div>
        </div>
      </>
    )
  )
}

export default ArticlePage
