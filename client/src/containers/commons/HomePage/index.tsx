import About from './About'
import Articles from './Articles'
import Info from './Info'
import Categories from './Categories'
import { useTranslation } from 'react-i18next'

const HomePage = () => {
  const { t } = useTranslation()
  return (
    <>
      <About />
      <section id='main' className='wrapper style2'>
        <div className='title'>{t('home.second-title')}</div>
        <div className='container'>
          <div className='row gtr-150'>
            <div className='col-8 col-12-medium'>
              <div id='content'>
                <Articles />
                <Info />
              </div>
            </div>
            <Categories />
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
