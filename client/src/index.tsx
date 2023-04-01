import ReactDOM from 'react-dom/client'

import Layout from './containers/commons/Layout'

import './i18n'

import './assets/style/main.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(<Layout />)
