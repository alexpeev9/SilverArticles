import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import useFetch from '../../hooks/useFetch'
import useSetFormInputs from '../../hooks/useSetFormInputs'

import InputField from '../../components/InputField'
import FormWrapper from '../../components/FormWrapper'
import TextArea from '../../components/TextArea'

import fallbackImage from '../../assets/images/fallbacks/category.png'

const CategoryForm = ({ category, requestData }: any) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const {
    data: categoryInput,
    setData: setCategoryInput,
    onInputChange
  } = useSetFormInputs(category)

  const {
    setRequestData: setCategoryData,
    responseData: categoryResponse,
    loading: categoryLoading
  } = useFetch(requestData)

  useEffect(() => {
    if (categoryResponse) {
      navigate(`/categories/${categoryResponse}`)
    }
  }, [categoryResponse, navigate])

  const onTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    setCategoryInput({
      ...categoryInput,
      title: value,
      slug: value.split(' ').join('-').toLowerCase()
    })
  }

  return (
    <>
      <Helmet>
        <title>{t('article.create.title')}</title>
      </Helmet>
      <FormWrapper
        title={t('article.create.title')}
        buttonMessage={t('article.create.button')}
        setRequestData={setCategoryData}
        data={categoryInput}
        loading={categoryLoading}
      >
        <div className='col-12'>
          <InputField
            name={'title'}
            label={'Title'}
            type={'text'}
            value={categoryInput.title}
            action={onTitleChange}
          />
        </div>
        <div className='col-12'>
          <InputField
            name={'slug'}
            label={'Page Url'}
            type={'text'}
            value={categoryInput.slug}
            readOnly={true}
          />
        </div>
        <div className='col-12 text-section'>
          <InputField
            name={'image'}
            label={'Image'}
            type={'text'}
            value={categoryInput.image}
            action={onInputChange}
          />
        </div>
        <div className='col-12 center-section'>
          <img
            src={categoryInput.image ? categoryInput.image : fallbackImage}
            className='image featured'
            alt='Category'
          />
        </div>
        <div className='col-12'>
          <TextArea
            name={'description'}
            label={'Description'}
            type={'text'}
            value={categoryInput.description}
            action={onInputChange}
          />
        </div>
      </FormWrapper>
    </>
  )
}

export default CategoryForm
