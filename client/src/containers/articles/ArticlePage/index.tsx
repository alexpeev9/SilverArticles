import { Link, useNavigate, useParams } from 'react-router-dom'
import Spinner from '../../../components/Spinner'
import useFetch from '../../../hooks/useFetch'
import ImageHolder from '../../../components/ImageHolder'
import fallbackImage from '../../../assets/images/fallbacks/article.jpg'
import { useUserContext } from '../../../contexts/UserContext'

const ArticlePage = () => {
  const navigate = useNavigate()

  const { slug } = useParams()
  const { userData } = useUserContext()

  const { responseData: article } = useFetch({
    method: 'get',
    url: `articles/${slug}`
  })

  const onClickRedirect = (url: string) => {
    navigate(url)
  }
  return article ? (
    <div id='main' className='wrapper style2'>
      <div className='title'>No Sidebar</div>
      <div className='container'>
        <div id='content'>
          <article className='box post'>
            <header className='style1'>
              <h2>{article.title}</h2>
              <p>
                Made by {article.author.firstName} {article.author.lastName}
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
              <button className='style3'>UpVote</button>
              <button className='style3'>DownVote</button>
              {userData && userData.username === article.author.username ? (
                <>
                  <button
                    className='style3'
                    onClick={() =>
                      onClickRedirect(`/articles/edit/${article.slug}`)
                    }
                  >
                    Edit
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
  ) : (
    <Spinner />
  )
}

export default ArticlePage
