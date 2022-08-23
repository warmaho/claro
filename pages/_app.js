import 'antd/dist/antd.css'
import '../styles/vars.css'
import '../styles/global.css'
import { Provider } from 'react-redux'
import { useStore } from '../store'

export default function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)
  return<Provider store={store}>
    <Component {...pageProps} />
  </Provider>
}
