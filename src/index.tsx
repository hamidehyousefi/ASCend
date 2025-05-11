import {createRoot} from 'react-dom/client'
import * as _redux from 'app/utils'
import axios from 'axios'
import {App} from './app/App'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import {AuthProvider} from 'app/modules/auth/auth'

/**
 * TIP: Replace this style import with dark styles to enable dark mode
 *
 * import './_metronic/assets/sass/style.dark.scss'
 *
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_metronic/assets/css/style.rtl.css'
 **/
// import './_metronic/assets/sass/style.scss'
import './_metronic/assets/css/style.rtl.css'
import './_metronic/assets/sass/style.react.scss'
import {DialogProvider} from 'app/utils'

_redux.setupAxios(axios)
const {PUBLIC_URL} = process.env
const queryClient = new QueryClient()

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <DialogProvider>
        <App basename={PUBLIC_URL} />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </DialogProvider>
    </AuthProvider>
  </QueryClientProvider>
)
