import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import './assets/style.scss'

const NoConnectionPage = () => {
  const { t } = useTranslation()
  return (
    <>
      <Helmet>
        <title>{t('common.not-connected.helmet')}</title>
      </Helmet>
      <div className='no-connection'>
        <span className='title '>{t('common.not-connected.title')}</span>
        <span className='sub-title'>{t('common.not-connected.sub-title')}</span>
      </div>
    </>
  )
}

export default NoConnectionPage
