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

export const GetResult: FC = () => {
  return (
    <div className='w-100'>
      <div className='row gx-0'>
        <div className='col-md-6 col-xs-12'>
          <Accordion expanded={true}>
            <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
              <Typography variant='h6'>زمینه صفحه خانه</Typography>
            </AccordionSummary>
            <AccordionDetails>{}</AccordionDetails>
          </Accordion>
        </div>
        <div className='col-md-6 col-xs-12'>
          <Accordion expanded={true}>
            <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
              <Typography variant='h6'>پخش زنده</Typography>
            </AccordionSummary>
            <AccordionDetails>{'jjjjjjjjjjjjjjjjjjjjjjjj'}</AccordionDetails>
          </Accordion>
        </div>
      </div>

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

// export default GetResult
