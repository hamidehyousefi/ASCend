import {Card, CardBody, CardHeader} from 'app/components'
import {FC} from 'react'
export const ContactPage: FC = () => {
  return (
    <Card>
      <CardHeader title={'تماس با ما'} />
      <CardBody>
        <div className='fs-5 text-semibold mb-4'>
          نشانی: خراسان جنوبی ـ بیرجند ـ انتهای بلوار دانشگاه ـ پردیس شوکت آباد ـ سازمان مرکزی
          دانشگاه بیرجند
        </div>
        <div className='fs-5 text-semibold mb-4'> پست الکترونیکی: ravebet@birjand.ac.ir</div>
        <div className='fs-5 text-semibold mb-4'> تلفن: 05631020000</div>
        <div className='fs-5 text-semibold mb-4'> دورنگار: 05632202517</div>
        <div className='fs-5 text-semibold mb-4'>کد پستی: 9717434765</div>
        <div className='fs-5 text-semibold mb-4'> صندوق پستی: 97175/615</div>
        <div className='fs-5 text-semibold mb-4'>ساعات پاسخگویی: شنبه تا چهارشنبه ۷ الی ۱۵</div>
      </CardBody>
    </Card>
  )
}
