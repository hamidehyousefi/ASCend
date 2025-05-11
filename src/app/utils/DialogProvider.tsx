import {FC, createContext, useContext, useState} from 'react'
import {Dialog, DialogHeader, DialogBody, DialogFooter, Button} from 'app/components'

type InitialStateType = {
  props: {
    title: string
    message: string
    params?: any
    onConfirm?: (params: any) => void
    err?: any
  }
  setError: (err: any) => void
  setConfirm: (
    title: string,
    message: string,
    params: any,
    onConfirm: (params: any) => void
  ) => void
}
type ErrorDialogProps = {
  err: any
  onDialog: (dialog: string) => void
}
type ConfirmDialogProps = {
  title: string
  message: string
  onDialog: (dialog: string) => void
  onConfirm: () => void
}
export const initialState: InitialStateType = {
  props: {title: '', message: '', params: null, onConfirm: () => {}, err: {}},
  setError: () => {},
  setConfirm: () => {},
}

const DialogContext = createContext<InitialStateType>(initialState)

const useDialog = () => {
  return useContext(DialogContext)
}
interface DialogProviderProps {
  children: any
}

const DialogProvider: FC<DialogProviderProps> = ({children}) => {
  const [dialog, setDialog] = useState('')
  const [props, setProps] = useState<{
    title: string
    message: string
    params?: any
    onConfirm?: (params: any) => void
    err?: any
  }>(initialState.props)
  const setError = (err: any) => {
    setDialog('error')
    setProps({title: '', message: '', err})
  }
  const setConfirm = (
    title: string,
    message: string,
    params: any,
    onConfirm: (params: any) => void
  ) => {
    setDialog('confirm')
    setProps({title: title, message: message, params: params, onConfirm: onConfirm})
  }

  const chooseDialog = (type: string) => {
    const {title, message, err, onConfirm} = props
    if (type == 'error') {
      return <ErrorDialog err={err} onDialog={setDialog} />
    } else if (type == 'confirm') {
      const handleConfirm = () => {
        onConfirm?.(props.params.id)
        setDialog('')
      }
      return (
        <ConfirmDialog
          title={title}
          message={message}
          onDialog={setDialog}
          onConfirm={handleConfirm}
        />
      )
    } else {
      return null
    }
  }
  return (
    <DialogContext.Provider value={{props, setError, setConfirm}}>
      {children}
      {chooseDialog(dialog)}
    </DialogContext.Provider>
  )
}
export {useDialog, DialogProvider}

const ConfirmDialog: FC<ConfirmDialogProps> = (props) => {
  const {title, message, onDialog, onConfirm} = props
  return (
    <Dialog zIndex={2222}>
      <DialogHeader title={title} onClose={() => onDialog('')} />
      <DialogBody>
        <p>{message}</p>
      </DialogBody>
      <DialogFooter>
        <Button title='بله' onClick={onConfirm} />
        <Button
          title='خیر'
          style='outline'
          onClick={() => {
            onDialog('')
          }}
        />
      </DialogFooter>
    </Dialog>
  )
}
const ErrorDialog: FC<ErrorDialogProps> = (props) => {
  const {err, onDialog} = props
  const renderErrorContent = () => {
    let title = '',
      message = ''
    if (err && err.response && err.response.status !== 401) {
      switch (err.response?.status) {
        case 99:
          title = 'Internet Error.'
          message = 'Your are not connected to the internet.'
          break
        case 500:
          title = 'Internal Server Error.'
          message = 'an error has occurred when trying to establishing connection with server.'
          break
        case 400:
          title = 'Bad Request.'
          message = "Sorry we can't handle your request."
          break
        case 404:
          title = 'Not Found.'
          message = `The Entity that you're looking for, was not found.`
          break
        case -1000:
          title = 'Expiration Time'
          message = 'Please login again'
          break
        default:
          title = 'Unknow Error.'
          message = 'an unknown error has occurred.'
          break
      }
    }
    return {title, message}
  }
  const data = renderErrorContent()
  return (
    <Dialog zIndex={2222}>
      <DialogHeader title={data.title} onClose={() => onDialog('')} />
      <DialogBody>
        <h5>{data.message}</h5>
      </DialogBody>
      <DialogFooter>
        <Button
          title='close'
          onClick={() => {
            onDialog('')
          }}
        />
      </DialogFooter>
    </Dialog>
  )
}
