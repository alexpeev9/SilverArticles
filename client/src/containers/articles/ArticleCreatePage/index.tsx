import ArticleForm from '../../../components/articles/ArticleForm'

const ArticleCreatePage = () => {
  const article = {
    title: '',
    slug: '',
    image: '',
    description: '',
    category: null,
    isPublic: null
  }

  return (
    <ArticleForm
      article={article}
      requestData={{
        method: 'post',
        url: `articles/create`
      }}
    />
  )
}

export default ArticleCreatePage
