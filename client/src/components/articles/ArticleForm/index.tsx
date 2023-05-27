import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import useFetch from '../../../hooks/useFetch'
import useSetFormInputs from '../../../hooks/useSetFormInputs'

import InputField from '../../elements/InputField'
import FormWrapper from '../../elements/FormWrapper'
import TextArea from '../../elements/TextArea'

import fallbackImage from '../../../assets/images/fallbacks/article.jpg'

const ArticleForm = ({ article, requestData }: any) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const {
    data: articleInput,
    setData: setArticleInput,
    onInputChange,
    onRadioButtonChange
  } = useSetFormInputs(article)

  const {
    setRequestData: setArticleData,
    responseData: articleResponse,
    loading: articleLoading
  } = useFetch(requestData)

  const { responseData: categories } = useFetch({
    method: 'get',
    url: 'categories'
  })

  useEffect(() => {
    if (articleResponse) {
      navigate(`/articles/${articleResponse}`)
    }
  }, [articleResponse, navigate])

  const selectCategory = (slug: string) => {
    setArticleInput({ ...articleInput, category: slug })
  }

  const onTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    setArticleInput({
      ...articleInput,
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
        setRequestData={setArticleData}
        data={articleInput}
        loading={articleLoading}
      >
        <div className='col-12'>
          <InputField
            name={'title'}
            label={'Title'}
            type={'text'}
            value={articleInput.title}
            action={onTitleChange}
          />
        </div>
        <div className='col-12'>
          <InputField
            name={'slug'}
            label={'Page Url'}
            type={'text'}
            value={articleInput.slug}
            readOnly={true}
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
          <label>{t('article.create.category-text')}</label>
          <span className='buttons-wrapper'>
            {categories &&
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
              ))}
          </span>
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
        <p className='col-12 text-radio'>{t('article.create.radio-text')}</p>
        <div className='col-12 center-section'>
          <InputField
            name={'isPublic'}
            label={'Public'}
            type={'radio'}
            value='true'
            checked={articleInput.isPublic === true}
            action={onRadioButtonChange}
          />
          <InputField
            name={'isPublic'}
            label={'Private'}
            type={'radio'}
            value='false'
            checked={articleInput.isPublic === false}
            action={onRadioButtonChange}
          />
        </div>
      </FormWrapper>
    </>
  )
}

export default ArticleForm
