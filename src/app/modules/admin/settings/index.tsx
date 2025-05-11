import {FC, useState, useEffect} from 'react'
import {notification, useErrorHandler} from 'app/utils'
import MuiAccordion, {AccordionProps} from '@mui/material/Accordion'
import MuiAccordionSummary, {AccordionSummaryProps} from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import {styled} from '@mui/material/styles'
import {Button, CheckBoxInput, Loading, RadioInput} from 'app/components'
import {FormLabel, TextField} from '@mui/material'
import {ChangePassword} from 'app/modules/auth/ChangePassword'
import {getConfigReq, setHomePageReq, setLiveReq} from './api'

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({theme}) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}))

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary {...props} />
))(({theme}) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}))

export const SettingsPage: FC = () => {
  const [loading, setLoading] = useState(false)
  const [saveLoadingHome, setSaveLoadingHome] = useState(false)
  const [saveLoadingLive, setSaveLoadingLive] = useState(false)

  const [formDataHome, setFormDataHome] = useState({type: 'video', link: ''})
  const [formDataLive, setFormDataLive] = useState({status: 0, link: ''})
  const handleError = useErrorHandler()

  const fetchStatus = () => {
    setLoading(true)
    getConfigReq()
      .then((res) => {
        setFormDataHome(res.data.data[0])
        setFormDataLive(res.data.data[1])
      })
      .catch(handleError)
      .finally(() => setLoading(false))
  }
  useEffect(fetchStatus, [])
  const handleChangeLive = (e: any) => {
    const {name, value, checked} = e.target
    if (name === 'status') {
      setFormDataLive({...formDataLive, status: checked ? 1 : 0})
    } else {
      setFormDataLive({...formDataLive, [name]: value})
    }
  }
  const handleChangeHome = (e: any) => {
    const {name, value} = e.target
    setFormDataHome({...formDataHome, [name]: value})
  }
  const handleSubmitLive = () => {
    let params = {
      link: formDataLive.link,
      status: Number(formDataLive.status),
    }
    setSaveLoadingLive(true)
    setLiveReq(params)
      .then((res) => {
        if (res?.data.status === 'error') {
          notification.danger(res?.data.data)
          return
        }
        notification.success('تغییرات با موفقیت ذخیره شد')
        fetchStatus()
      })
      .catch(handleError)
      .finally(() => setSaveLoadingLive(false))
  }
  const handleSubmitHome = () => {
    let params = {
      link: formDataHome.link,
      type: formDataHome.type,
    }
    setSaveLoadingHome(true)
    setHomePageReq(params)
      .then((res) => {
        if (res?.data.status === 'error') {
          notification.danger(res?.data.data)
          return
        }
        notification.success('تغییرات با موفقیت ذخیره شد')
        fetchStatus()
      })
      .catch(handleError)
      .finally(() => setSaveLoadingHome(false))
  }
  const renderSettings = () => {
    return (
      <div>
        <CheckBoxInput
          id={1}
          name={'status'}
          value={formDataLive.status}
          checked={Number(formDataLive.status) === 1}
          onChange={handleChangeLive}
          label={'فعال کردن پخش زنده'}
        />
        <TextField
          value={formDataLive?.link}
          className='mt-8 w-100'
          label='آیدی صفحه در آپارات'
          name='link'
          size='small'
          onChange={handleChangeLive}
        />
        <Button
          title='ذخیره'
          className='mt-4'
          onClick={handleSubmitLive}
          loading={saveLoadingLive}
        />
      </div>
    )
  }
  const renderHomeSetting = () => {
    return (
      <div>
        <div>
          <FormLabel className='me-3'>نوع زمینه: </FormLabel>
          <RadioInput
            name={'type'}
            value={'image'}
            checked={formDataHome.type === 'image'}
            onChange={handleChangeHome}
            label={'عکس'}
          />
          <RadioInput
            name={'type'}
            value={'video'}
            checked={formDataHome.type === 'video'}
            onChange={handleChangeHome}
            label={'ویدئو'}
          />
        </div>
        <TextField
          value={formDataHome?.link}
          className='mt-8 w-100'
          label='آدرس مستقیم'
          name='link'
          size='small'
          onChange={handleChangeHome}
        />
        <Button
          title='ذخیره'
          className='mt-4'
          onClick={handleSubmitHome}
          loading={saveLoadingHome}
        />
      </div>
    )
  }
  return (
    <div className='w-100'>
      {loading ? (
        <Loading center />
      ) : (
        <div className='row gx-0'>
          <div className='col-md-6 col-xs-12'>
            <Accordion expanded={true}>
              <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
                <Typography variant='h6'>زمینه صفحه خانه</Typography>
              </AccordionSummary>
              <AccordionDetails>{renderHomeSetting()}</AccordionDetails>
            </Accordion>
          </div>
          <div className='col-md-6 col-xs-12'>
            <Accordion expanded={true}>
              <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
                <Typography variant='h6'>پخش زنده</Typography>
              </AccordionSummary>
              <AccordionDetails>{renderSettings()}</AccordionDetails>
            </Accordion>
          </div>
        </div>
      )}
      <Accordion expanded={true}>
        <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
          <Typography variant='h6'>تغییر رمز عبور</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ChangePassword />
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default SettingsPage
