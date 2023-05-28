import { useTranslation } from 'react-i18next'

import './assets/style.scss'

const Spinner = () => {
  const { t } = useTranslation()
  return (
    <div className='spinner'>
      <div className='image-box'>
        <span>{t('common.loading')}</span>
      </div>
    </div>
  )
}

export default Spinner
