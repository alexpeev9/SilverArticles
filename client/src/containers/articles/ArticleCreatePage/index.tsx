import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import useFetch from '../../../hooks/useFetch'
import useSetFormInputs from '../../../hooks/useSetFormInputs'

import InputField from '../../../components/InputField'
import FormWrapper from '../../../components/FormWrapper'
import TextArea from '../../../components/TextArea'

import fallbackImage from '../../../assets/images/fallbacks/article.jpg'

const ArticleCreatePage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const {
    data: articleInput,
    setData: setArticleInput,
    onInputChange
  } = useSetFormInputs({
    title: '',
    slug: '',
    image: '',
    description: '',
    category: null
  })

  const {
    setRequestData: setArticleData,
    responseData: article,
    loading: articleLoading
  } = useFetch({
    method: 'post',
    url: 'articles/create'
  })

  const { responseData: categories } = useFetch({
    method: 'get',
    url: 'categories'
  })

  useEffect(() => {
    if (article) {
      navigate(`/articles/${article}`)
    }
  }, [article, navigate])

  const selectCategory = (slug: string) => {
    setArticleInput({ ...articleInput, category: slug })
  }

  return (
    <>
      <Helmet>
        <title>Create</title>
      </Helmet>
      <FormWrapper
        title={'Create'}
        buttonMessage={'Create'}
        setRequestData={setArticleData}
        data={articleInput}
        loading={articleLoading}
      >
        <div className='col-6'>
          <InputField
            name={'title'}
            label={'Title'}
            type={'text'}
            value={articleInput.title}
            action={onInputChange}
          />
        </div>
        <div className='col-6'>
          <InputField
            name={'slug'}
            label={'URL slug'}
            type={'text'}
            value={articleInput.slug}
            action={onInputChange}
          />
        </div>
        <div className='col-12 text-section'>
          <InputField
            name={'image'}
            label={'Image'}
            type={'text'}
            value={articleInput.image}
            action={onInputChange}
          />
        </div>
        <div className='col-12 center-section'>
          <img
            src={articleInput.image ? articleInput.image : fallbackImage}
            className='image featured'
            alt='Article'
          />
        </div>
        <div className='col-12'>
          <TextArea
            name={'description'}
            label={'Description'}
            type={'text'}
            value={articleInput.description}
            action={onInputChange}
          />
        </div>
        <div className='col-12 buttons-wrapper'>
          <label>Category* :</label>
          {categories ? (
            categories.map((category: any, key: string) => (
              <button
                type='button'
                key={key}
                className={`${
                  articleInput.category === category.slug ? 'active' : ''
                }`}
                disabled={articleInput.category === category.slug}
                onClick={() => selectCategory(category.slug)}
              >
                {category.title}
              </button>
            ))
          ) : (
            <></>
          )}
        </div>
      </FormWrapper>
    </>
  )
}

export default ArticleCreatePage
