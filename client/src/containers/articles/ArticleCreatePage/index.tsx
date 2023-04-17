import ArticleForm from '../../../components/ArticleForm'
import Spinner from '../../../components/Spinner'

const ArticleCreatePage = () => {
  const article = {
    title: '',
    slug: '',
    image: '',
    description: '',
    category: null,
    isPublic: null
  }

  return article ? (
    <ArticleForm
      article={article}
      requestData={{
        method: 'post',
        url: `articles/create`
      }}
    />
  ) : (
    <Spinner />
  )
}

export default ArticleCreatePage
