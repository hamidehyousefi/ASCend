import {FC, useState} from 'react'
import {Card, CardBody, Button, Table, IColumn, CardHeader} from 'app/components'
import {notification, useDialog} from 'app/utils'
import {IconButton} from 'app/components/button/IconButton'
import {SaveCategoryDialog} from './save'
import {useCategories, useDeleteCategory} from './hooks'
import {TextField} from '@mui/material'

const columns: IColumn[] = [
  {id: 1, title: 'ردیف ', minWidth: 80, align: 'center', fontWeight: 'bold'},
  {id: 2, title: 'عنوان', minWidth: 300, align: 'start', fontWeight: 'bold'},
  {id: 3, title: 'عملیات', minWidth: 150, align: 'center', fontWeight: 'bold'},
]
const CategoriesPage: FC = () => {
  const [saveDialog, setSaveDialog] = useState({open: false, item: null})
  const {data, isLoading, isError} = useCategories()
  const [keyword, setKeyword] = useState('')
  const handleChange = (e: any) => {
    setKeyword(e.target.value)
  }
  const {mutate: deleteCategory, isLoading: deleteLoading} = useDeleteCategory(() => {
    notification.success('دسته بندی با موفقیت حذف شد')
  })
  const {setConfirm} = useDialog()
  const handleDeleteRequest = (id: any) => {
    setConfirm('حذف دسته بندی', 'آیا از حذف دسته بندی اطمینان دارید؟', {id: id}, deleteRequest)
  }
  const deleteRequest = (id: any) => {
    if (deleteLoading) return
    deleteCategory({id})
  }
  const rows = isError
    ? []
    : data?.data?.data
        .filter((rec: any) => rec.name.includes(keyword))
        .map((item: any, index: any) => ({
          id: <div className='text-gray-800 fs-7'>{index + 1}</div>,
          title: <div className='text-gray-800 fs-7'>{item?.name}</div>,
          action: (
            <>
              <IconButton
                tooltip='ویرایش'
                type='edit'
                className='me-2'
                onClick={() => setSaveDialog({open: true, item})}
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
        <SaveCategoryDialog
          item={saveDialog.item}
          onClose={() => setSaveDialog({open: false, item: null})}
        />
      )}
      <Card flush={true} shadow={true}>
        <CardHeader
          title={`لیست دسته بندی ها`}
          cardToolbar={
            <>
              <TextField
                value={keyword}
                margin='dense'
                size='small'
                label='جستجو'
                onChange={handleChange}
              />
              <Button
                title='افزودن دسته بندی جدید'
                className='ms-4 mt-1'
                onClick={() => setSaveDialog({open: true, item: null})}
              />
            </>
          }
        />
        <CardBody>
          <Table loading={isLoading} columns={columns} data={rows} />
        </CardBody>
      </Card>
    </>
  )
}
export default CategoriesPage
