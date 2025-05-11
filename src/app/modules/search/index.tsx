import {TextField, Typography} from '@mui/material'
import {FC, useEffect, useState} from 'react'
import {useSearchParams} from 'react-router-dom'
import {useCategories} from '../admin/categories/hooks'
import {PostTemplate} from '../home/PostTemplate'
import {useVideos} from '../admin/videos/hooks'
import {Button, Loading, Pagination, SelectInput} from 'app/components'
import MuiAccordion, {AccordionProps} from '@mui/material/Accordion'
import MuiAccordionSummary, {AccordionSummaryProps} from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import {styled} from '@mui/material/styles'

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

export const SearchVideosPage: FC = () => {
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
  return (
    <div>
      <Accordion expanded={true}>
        <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
          <Typography variant='h6'>فیلترها</Typography>
        </AccordionSummary>
        <AccordionDetails>{renderFilters()}</AccordionDetails>
      </Accordion>

      <>
        {isLoading ? (
          <Loading center />
        ) : (
          <>
            {data?.data?.number > 0 ? (
              <h4 className='h4 my-8 text-center'>{`تعداد ${data?.data?.number} نتیجه از جستجوی شما یافت شد`}</h4>
            ) : (
              <h4 className='h4 my-8 text-center'>{`نتیجه ای یافت نشد`}</h4>
            )}
            <div className='row gy-4 gx-4'>
              {isError
                ? []
                : data?.data?.data?.map((item: any) => (
                    <div key={item.id} className='col-md-4 col-xs-12'>
                      <PostTemplate item={item} />
                    </div>
                  ))}
            </div>
            <div className='container w-50 mt-10'>
              <Pagination
                currentPage={Number(page)}
                pageSize={pageSize}
                totalRecords={data?.data?.number}
                onChange={handleChangePage}
              />
            </div>
          </>
        )}
      </>
    </div>
  )
}
