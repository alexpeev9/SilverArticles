import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

import { useNavigate } from 'react-router-dom'

const NotAuthorizedPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('common.not-authorized.helmet')}</title>
      </Helmet>
      <div id='main' className='wrapper style2'>
        <div className='title not-found'>
          {t('common.not-authorized.title')}
        </div>
        <div className='container'>
          <h3>{t('common.not-authorized.description')}</h3>
          <div className='buttons-wrapper pt-2'>
            <button className='style3' onClick={() => navigate('/')}>
              {t('common.not-authorized.home')}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotAuthorizedPage
