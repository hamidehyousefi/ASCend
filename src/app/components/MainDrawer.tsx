import {Box, Drawer, List} from '@mui/material'
import {useAuth} from 'app/modules/auth/auth'
import {useAdmin, useErrorHandler} from 'app/utils'
import {MenuItem} from '_metronic/layout/components/header/MenuItem'
import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {getConfigReq} from 'app/modules/admin/settings/api'

export function MainDrawer() {
  const {closeDrawerMenu, logout} = useAuth()
  let isAdmin = useAdmin()
  const handleClose = () => {
    closeDrawerMenu()
  }
  const navigate = useNavigate()
  const handleError = useErrorHandler()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>([])

  // const fetchStatus = () => {
  //   setLoading(true)
  //   getConfigReq()
  //     .then((res) => setData(res.data.data))
  //     .catch(handleError)
  //     .finally(() => setLoading(false))
  // }
  // useEffect(fetchStatus, [])
  const list = () => {
    return (
      <Box sx={{width: 200}} role='presentation' onClick={handleClose} onKeyDown={handleClose}>
        <List>
          {isAdmin ? (
            <>
              <MenuItem title='داشبورد' to='/admin/dashboard' />
              <MenuItem title='ویدئوها' to='/admin/videos' />
              <MenuItem title='دسته بندی ها' to='/admin/categories' />
              <MenuItem title='جستجو' to='/admin/search' />
              <MenuItem title='تنظیمات' to='/admin/settings' />
              <div className='menu-item me-lg-1'>
                <div
                  className='menu-link py-3'
                  onClick={() => {
                    logout()
                    navigate('/')
                  }}
                >
                  <span className='menu-title'>خروج</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <MenuItem title='خانه' to='/home' />
              {data.length > 1 && data[1].status === 1 && <MenuItem title='پخش زنده' to='/live' />}
              <MenuItem title='فهرست ویدئوها' to='/videos/0' />
              <MenuItem title='تماس با ما' to='/contact' />
              <MenuItem title='جستجو' to='/search' />
            </>
          )}
        </List>
      </Box>
    )
  }

  return (
    <Drawer anchor='right' open={true} onClose={handleClose}>
      {list()}
    </Drawer>
  )
}
