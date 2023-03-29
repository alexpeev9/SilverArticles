import { useParams } from 'react-router-dom'
import Spinner from '../../../components/Spinner'
import useFetch from '../../../hooks/auth/useFetch'

const CategoryPage = () => {
  const { slug } = useParams()

  const { responseData: category } = useFetch({
    method: 'get',
    url: `categories/${slug}`
  })

  return category ? <div>{category.title}</div> : <Spinner />
}

export default CategoryPage
