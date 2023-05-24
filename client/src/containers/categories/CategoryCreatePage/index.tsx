import CategoryForm from '../../../components/CategoryForm'

const CategoryCreatePage = () => {
  const category = {
    title: '',
    slug: '',
    image: '',
    description: ''
  }

  return (
    <CategoryForm
      category={category}
      requestData={{
        method: 'post',
        url: `categories/create`
      }}
    />
  )
}

export default CategoryCreatePage
