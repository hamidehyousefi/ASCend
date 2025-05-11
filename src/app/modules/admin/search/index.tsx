import {Chip, TextField, Typography} from '@mui/material'
import {FC, useEffect, useState} from 'react'
import {useSearchParams} from 'react-router-dom'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IColumn,
  IconButton,
  Pagination,
  SelectInput,
  Table,
} from 'app/components'
import MuiAccordion, {AccordionProps} from '@mui/material/Accordion'
import MuiAccordionSummary, {AccordionSummaryProps} from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import {styled} from '@mui/material/styles'
import {useCategories} from '../categories/hooks'
import {convertToJalali, notification, useDialog} from 'app/utils'
import {useDeleteVideo, useVideos} from '../videos/hooks'
import {SaveVideoDialog} from '../videos/save'

const columns: IColumn[] = [
  {id: 1, title: 'ردیف ', minWidth: 80, align: 'center', fontWeight: 'bold'},
  {id: 2, title: 'عنوان', minWidth: 200, align: 'center', fontWeight: 'bold'},
  {id: 4, title: 'دسته بندی', minWidth: 150, align: 'center', fontWeight: 'bold'},
  {id: 5, title: 'تاریخ', minWidth: 150, align: 'center', fontWeight: 'bold'},
  {id: 6, title: 'عملیات', minWidth: 150, align: 'center', fontWeight: 'bold'},
]

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

export const AdminSearchVideosPage: FC = () => {
  let initialState = {
    category: {id: 0, name: 'همه دسته بندی ها'},
    title: '',
  }
  const [filters, setFilters] = useState<any>(initialState)
  const {data: categories, isSuccess} = useCategories()
  useEffect(() => {
    if (isSuccess && categories) {
      let findCategory = categories?.data?.data.find((rec: any) => rec.id === Number(category))
      setFilters({
        title: title,
        category: findCategory || {id: 0, name: 'همه دسته بندی ها'},
      })
    }
  }, [isSuccess])
  const pageSize = 12
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const category = searchParams.get('category') || '0'
  const title = searchParams.get('title') || ''

  const video_params: any = {
    page: Number(page),
    page_size: pageSize,
    category_id: category,
  }
  if (title) video_params.title = title
  const {data, isLoading, isError} = useVideos(video_params)

  const {mutate: deleteVideo, isLoading: deleteLoading} = useDeleteVideo(() => {
    notification.success('ویدئو با موفقیت حذف شد')
  })
  const {setConfirm} = useDialog()
  const handleDeleteRequest = (id: any) => {
    setConfirm('حذف ویدئو', 'آیا از حذف ویدئو اطمینان دارید؟', {id: id}, deleteRequest)
  }
  const deleteRequest = (id: any) => {
    if (deleteLoading) return
    deleteVideo({id})
  }
  const [saveDialog, setSaveDialog] = useState({open: false, item: null})

  const handleChangePage = (_page: number) => {
    setSearchParams({
      page: String(_page),
      category: category,
      title: title,
    })
  }
  const handleChange = (e: any) => {
    const {name, value} = e.target
    setFilters({...filters, [name]: value})
  }
  const handleSubmitSearch = () => {
    setSearchParams({
      page: '1',
      category: filters.category.id,
      title: filters.title,
    })
  }
  const handleResetSearch = () => {
    setSearchParams({
      page: '1',
      category: '0',
      title: '',
    })
    setFilters(initialState)
  }
  const renderFilters = () => {
    return (
      <div className='row'>
        <div className='col-md-3 col-xs-12'>
          <TextField
            name='title'
            fullWidth
            margin='dense'
            value={filters.title}
            label='عنوان'
            onChange={handleChange}
          />
        </div>
        <div className='col-md-3 col-xs-12'>
          <SelectInput
            name='category'
            value={filters.category}
            label='دسته بندی'
            options={categories?.data?.data || []}
            onChange={(e, valueObj) => handleChange({target: {name: 'category', value: valueObj}})}
            getOptionLabel={(option: any) => `${option.name}`}
          />
        </div>
        <div className='col-md-3 col-xs-12'>
          <Button title='جستجو' className='btn-primary mt-4' onClick={handleSubmitSearch} />
          <Button
            className='mt-4 ms-3'
            style='outline'
            onClick={handleResetSearch}
            title='بازنشانی فیلتر '
          />
        </div>
      </div>
    )
  }

  const rows = isError
    ? []
    : data?.data.data.map((item: any, index: any) => ({
        id: <div className='text-gray-800 fs-7'>{index + 1}</div>,
        title: <div className='text-gray-800 fs-7'>{item?.title}</div>,
        category: (
          <div className='text-gray-800 fs-7'>
            {item?.categories?.map((rec: any) => (
              <Chip label={rec?.name} key={rec?.name} className='m-1' />
            ))}
          </div>
        ),
        date: <div className='text-dark fs-7'>{convertToJalali(item?.created_at, true)}</div>,
        action: (
          <>
            <IconButton
              onClick={() => setSaveDialog({open: true, item})}
              tooltip='مشاهده جزئیات'
              type='view'
              className='me-2'
            />
            <IconButton
              tooltip='حذف'
              type='delete'
              className='me-2'
              onClick={() => handleDeleteRequest(item.id)}
            />
          </>
        ),
      }))

  return (
    <div>
      <Accordion expanded={true}>
        <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
          <Typography variant='h6'>فیلترها</Typography>
        </AccordionSummary>
        <AccordionDetails>{renderFilters()}</AccordionDetails>
      </Accordion>

      {saveDialog.open && (
        <SaveVideoDialog
          onClose={() => setSaveDialog({open: false, item: null})}
          item={saveDialog.item}
        />
      )}
      <Card flush={true} shadow={true} className='mt-4'>
        <CardHeader title={`جستجوی ویدئوها`} />
        <CardBody>
          <Table loading={isLoading} columns={columns} data={rows} />
        </CardBody>
        <CardFooter>
          <Pagination
            currentPage={Number(page)}
            pageSize={pageSize}
            totalRecords={data?.data?.number}
            onChange={handleChangePage}
          />
        </CardFooter>
      </Card>
    </div>
  )
}
