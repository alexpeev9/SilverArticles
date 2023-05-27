import { Helmet } from 'react-helmet-async'
import CategoryForm from '../../../components/categories/CategoryForm'
import { useTranslation } from 'react-i18next'

const CategoryCreatePage = () => {
  const { t } = useTranslation()
  const category = {
    title: '',
    slug: '',
    image: '',
    description: ''
  }

  return (
    <>
      <Helmet>
        <title>{t('category.create')}</title>
      </Helmet>
      <CategoryForm
        category={category}
        requestData={{
          method: 'post',
          url: `categories/create`
        }}
      />
    </>
  )
}

export default CategoryCreatePage
