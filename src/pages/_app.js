import '@/styles/globals.css'
import { Provider } from 'react-redux'
import {store} from '../store/store'
// import "../../node_modules/flowbite/dist/flowbite.min.css";

export default function App({ Component, pageProps }) {
  return(
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  ) 
}
