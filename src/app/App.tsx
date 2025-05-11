import React, {Suspense} from 'react'
import {HashRouter} from 'react-router-dom'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import {AppRoutes} from './routing/Routes'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import rtlPlugin from 'stylis-plugin-rtl'
import {prefixer} from 'stylis'
import {CacheProvider} from '@emotion/react'
import createCache from '@emotion/cache'
import {ReactNotifications} from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: `'IranSans', "Arial", sans-serif`,
  },
  palette: {
    background: {
      default: '#f7f7f7',
    },
  },
})
// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
})
type Props = {
  basename: string
}

const App: React.FC<Props> = ({basename}) => {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<LayoutSplashScreen />}>
          <ReactNotifications />
          <HashRouter basename='/'>
            <LayoutProvider>
              <AppRoutes />
            </LayoutProvider>
          </HashRouter>
        </Suspense>
      </ThemeProvider>
    </CacheProvider>
  )
}

export {App}
