import {FC, useState} from 'react'
import {
  Card,
  CardBody,
  Button,
  Table,
  IColumn,
  CardHeader,
  CardFooter,
  Pagination,
} from 'app/components'
import {convertToJalali, notification, useDialog} from 'app/utils'
import {useSearchParams} from 'react-router-dom'
import {IconButton} from 'app/components/button/IconButton'
import {SaveVideoDialog} from './save'
import {useDeleteVideo, useVideos} from './hooks'
import {Chip} from '@mui/material'

const columns: IColumn[] = [
  {id: 1, title: 'ردیف ', minWidth: 80, align: 'center', fontWeight: 'bold'},
  {id: 2, title: 'عنوان', minWidth: 200, align: 'center', fontWeight: 'bold'},
  {id: 4, title: 'دسته بندی', minWidth: 150, align: 'center', fontWeight: 'bold'},
  {id: 5, title: 'تاریخ', minWidth: 150, align: 'center', fontWeight: 'bold'},
  {id: 6, title: 'عملیات', minWidth: 150, align: 'center', fontWeight: 'bold'},
]
const AdminVideosPage: FC = () => {
  const pageSize = 10
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const title: any = searchParams.get('title') || ''
  const params = {
    page: Number(page),
    page_size: pageSize,
  }
  const {data, isLoading, isError} = useVideos(params)
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
      title: String(title),
    })
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
    <>
      {saveDialog.open && (
        <SaveVideoDialog
          onClose={() => setSaveDialog({open: false, item: null})}
          item={saveDialog.item}
        />
      )}
      <Card flush={true} shadow={true}>
        <CardHeader
          title={`لیست ویدئوها`}
          cardToolbar={
            <>
              <Button
                title='افزودن ویدئو'
                className='ms-4 mt-1'
                onClick={() => setSaveDialog({open: true, item: null})}
              />
            </>
          }
        />
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
    </>
  )
}
export default AdminVideosPage
