import {FileError, useDropzone} from 'react-dropzone'
import {createUseStyles} from 'react-jss'

const useDropZoneStyles = createUseStyles({
  dropzoneContainer: {
    border: '2px dashed #ebedf3',
    textAlign: 'center',
    padding: '2rem',
  },
})

interface DropZoneProps {
  maxFiles?: number
  acceptableFormats: string[]
  onSubmit: (files: File[]) => void
  validator?: (file: File) => FileError | FileError[] | null
}

export const DropZone: React.FC<DropZoneProps> = ({
  maxFiles = 1,
  acceptableFormats,
  onSubmit,
  validator = (file: File) => null,
}) => {
  const classes = useDropZoneStyles()
  const {isDragActive, getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': acceptableFormats,
    },
    maxFiles,
    onDrop: onSubmit,
    validator,
  })

  return (
    <section className={classes.dropzoneContainer}>
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <>
            <h3>فایل را اینجا بکشید و رها کنید</h3>
            <em>فرمت های قابل قبول: {acceptableFormats.join(', ')}</em>
          </>
        ) : (
          <>
            <h4>فایل را اینجا بکشید و رها کنید یا اینجا کلیک کنید</h4>
            <em>فرمت های قابل قبول: {acceptableFormats.join(', ')}</em>
          </>
        )}
      </div>
    </section>
  )
}
