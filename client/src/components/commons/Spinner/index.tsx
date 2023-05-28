import { useTranslation } from 'react-i18next'

import './assets/style.scss'

const Spinner = () => {
  const { t } = useTranslation()
  return (
    <div className='spinner'>
      <div className='image-box'>
        <p>{t('common.loading')}</p>
      </div>
    </div>
  )
}

export default Spinner
