import { Link } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'

import Spinner from '../../../components/Spinner'

const CategoryListPage = () => {
  const { responseData: categories } = useFetch({
    method: 'get',
    url: 'categories'
  })

  return categories ? (
    <div>
      {categories.map((c: any, key: string) => (
        <Link key={key} to={c.slug}>
          {c.title}
        </Link>
      ))}
    </div>
  ) : (
    <Spinner />
  )
}

export default CategoryListPage
