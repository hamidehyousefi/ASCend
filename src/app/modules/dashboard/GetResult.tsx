import {FC, useState, useEffect, useMemo, useCallback} from 'react'
import {Navigate, useNavigate, useSearchParams} from 'react-router-dom'
import MuiAccordion, {AccordionProps} from '@mui/material/Accordion'
import MuiAccordionSummary, {AccordionSummaryProps} from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import {styled} from '@mui/material/styles'
import questions from './questions.json'
import LineChart from './LineChart'
import {toAbsoluteUrl} from '_metronic/helpers'
import {Button, TextField} from '@mui/material'
import axios from 'axios'
import {Loading} from 'app/components'

interface Result {
  label: string
  value: number
}

export const GetResult: FC = () => {
  const navigate = useNavigate()
  const data = Object.entries(questions)
  const [loading, setLoading] = useState(true)
  // مستقیم از localStorage مقداردهی اولیه
  const rawForm = sessionStorage.getItem('ascend-formData')!
  const formData = JSON.parse(rawForm) as Record<string, number>
  const results = JSON.parse(sessionStorage.getItem('ascend-results')!) as Result[]
  const series = JSON.parse(sessionStorage.getItem('ascend-series')!) as number[]
  const [searchParams] = useSearchParams()
  const [result, setResult] = useState<string>('در حال بررسی تراکنش...') // در صورت نبود داده، بازگشت به home
  const [userData, setUserData] = useState<any>({})
  const handleChange = (e: any) => {
    const {name, value} = e.target
    setUserData({...userData, [name]: value})
  }
  const trans_id = searchParams.get('trans_id')
  const id_get = searchParams.get('id_get')
  const verify = searchParams.get('verify')
  useEffect(() => {
    if (!verify)
      if (trans_id && id_get) {
        axios
          .get('https://pardakht.liara.run/api/bitpay/verify', {
            params: {trans_id, id_get},
          })
          .then((res) => {
            const status = res.data.status
            switch (status) {
              case 1:
                setResult('تراکنش موفقیت‌آمیز بود')
                localStorage.setItem('trans_get', trans_id + 'x' + id_get)
                handleSubmit(trans_id + 'x' + id_get)
                break
              case 11:
                setResult('تراکنش قبلاً وریفای شده است')
                break
              default:
                setResult('تراکنش ناموفق یا نامعتبر است')
            }
          })
          .finally(() => setLoading(false))
          .catch(() => {
            setResult('خطا در بررسی تراکنش')
            setLoading(false)
          })
      } else {
        setResult('پارامترهای ورودی نامعتبرند')
        setLoading(false)
      }
    else if (trans_id && id_get) {
      setResult('تراکنش موفقیت‌آمیز بود')
      setLoading(false)
    } else {
      setResult('پارامترهای ورودی نامعتبرند')
      setLoading(false)
    }
  }, [searchParams])

  if (!results || !formData || !series) {
    return <Navigate to='/home' replace />
  }
  const handleSubmit = async (trans_get: any) => {
    await fetch('https://pardakht.liara.run/api/strategist/store', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formData,
        results,
        series,
        trans_get,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('موفقیت‌آمیز:', data)
      })
  }
  const handlePartAnalyze = (label: string, value: number) => {
    const items = data.find(([cat]) => cat === label)?.[1] || []
    const length = data.find(([cat]) => cat === label)?.[1].length || 0
    if (value === length) return 'خیلی ضعیف'
    if (value <= 2 * length) return 'ضعیف'
    if (value <= 3 * length) return 'متوسط'
    if (value <= 4 * length) return 'خوب'
    if (
      items.every((item) => {
        const v = Number(formData[item.id.toString()] || 0)
        return v === 4 || v === 5
      })
    )
      return 'عالی'
    else return 'خوب'
  }

  const handleAnalyze = (label: any, value: any) => {
    if (label == 'شایستگی های فردی')
      return (
        <div key={label}>
          <div className='my-3 text-primary'> شایستگی های فردی: </div>
          {/* <div className='mb-5 text-gray-500'>
            (تفکر خلاق و نوآور، انگیزه و اشتیاق شغلی، تعهد و مسئولیت پذیری، توانایی پرسشگری، مصم
            بودن در انجام کار، رقابت طلب و موفقیت جو بودن، تفکر استراتژیک، انجام کار نظام مند،
            هوشمندی، توانایی سازگاری و انعطاف پذیری، آینده نگری)
          </div> */}
          {value == 'خیلی ضعیف' || value == 'ضعیف' ? (
            <div>
              <span className='fw-bolder'>شما از شایستگی های فردی ضعیفی برخوردارید؛ </span> جهت
              تبدیل شدن به یک فرد استراتژیست، لازم است به فردی باهوش، پرسشگر، آینده نگر، با انگیزه و
              اشتیاق شغلی، متعهد و مسئولیت پذیر، مصم بودن در انجام کار، رقابت طلب و موفقیت جو بودن،
              آینده نگر در سازمان تبدیل شوید؛ بنابراین با مطالعه و شرکت در دوره های آموزشی اطلاعات
              خود را در زمینه ی کسب تفکر استراتژیک، تفکر خلاق و نواور بالا ببرید و زمینه ی توسعه ی
              آن را در خودتان با توجه به امکانات درون سازمانی افزایش دهید.{' '}
            </div>
          ) : value == 'متوسط' ? (
            <div>
              <span className='fw-bolder'>شما از شایستگی های فردی متوسطی برخوردارید؛ </span>
              بنابراین پیشنهاد می شود به یک فرد مکاشفه گر در سازمان تبدیل شوید و به درک و تحلیل جامع
              مسائل در داخل و خارج سازمان بپردازید تا توانایی ارائه و پیاده سازی برنامه های خلاقانه
              در سازمان را توسعه دهید.
            </div>
          ) : value == 'خوب' ? (
            <div>
              <span className='fw-bolder'>شما از شایستگی های فردی خوبی برخوردارید؛ </span>
              بنابراین پیشنهاد می شود با چرخش شغلی در سازمان و آگاهی کامل از محیط داخلی و خارجی
              سازمان، زمینه رشد و توسعه در سازمان را فراهم آورید.{' '}
            </div>
          ) : value == 'عالی' ? (
            <div>
              <span className='fw-bolder'>شما از شایستگی های فردی عالی برخوردارید؛ </span>
              بنابراین پیشنهاد می شود به عنوان یک مدرس و مشاورراهبردی در سازمان عمل کنید و با توسعه
              ی این شایستگی ها در افراد سازمان، زمینه ایجاد سازمان یادگیرنده و پویا را فراهم آورید.{' '}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )
    if (label == 'شایستگی های آموزشی')
      return (
        <div key={label}>
          <div className='my-3 text-primary'> شایستگی های آموزشی: </div>
          {/* <div className='mb-5 text-gray-500'>
            (برخورداری از اطلاعات جدید و بروز، برخورداری از اطلاعات عمومی و پایه ، برخورداری از سواد
            دانشگاهی و تخصصی)
          </div> */}
          {value == 'خیلی ضعیف' || value == 'ضعیف' ? (
            <div>
              <span className='fw-bolder'>شما از شایستگی های آموزشی ضعیفی برخوردارید؛ </span>
              سعی کنید در کلاس ها و دوره های آموزشی جهت کسب اطلاعات علمی و عمومی شرکت کنید و به فردی
              که اهل مطالعه است تبدیل شوید.
            </div>
          ) : value == 'متوسط' ? (
            <div>
              <span className='fw-bolder'>شما از شایستگی های آموزشی متوسطی برخوردارید؛ </span>
              سعی کنید اطلاعات خود را در حوزه ی کاری تان و دانش روز جامعه افزایش دهید.
            </div>
          ) : value == 'خوب' ? (
            <div>
              <span className='fw-bolder'>شما از شایستگی های آموزشی خوبی برخوردارید؛ </span>
              سعی کنید دانش و آگاهی تان به علوم مختلف را توسعه دهید و از آموزش های به روز استفاده
              کنید.
            </div>
          ) : value == 'عالی' ? (
            <div>
              <span className='fw-bolder'>شما از شایستگی های آموزشی عالی برخوردارید؛ </span>
              سعی کنید دانش، آگاهی و اطلاعات خود را در اختیار افراد دیگر سازمان قرار دهید و زمینه
              توسعه این شایستگی را در سازمان ایجاد کنید.
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )
    if (label == 'شایستگی های میان فردی و ارتباطی')
      return (
        <div key={label}>
          <div className='my-3 text-primary'> شایستگی های میان فردی و ارتباطی : </div>
          {/* <div className='mb-5 text-gray-500'>(مهارت ادراکی، مهارت تعامل، مهارت کارگروهی)</div> */}
          {value == 'خیلی ضعیف' || value == 'ضعیف' ? (
            <div>
              <span className='fw-bolder'>
                شما از شایستگی های میان فردی و ارتباطی ضعیفی برخوردارید؛
              </span>{' '}
              سعی کنید از طریق مطالعه و شرکت در دوره های آموزشی، مهارت تجزیه و تحلیل و درک مسائل را
              کسب کنید و این توانایی را با برقراری ارتباط با همکاران در خود توسعه دهید.
            </div>
          ) : value == 'متوسط' ? (
            <div>
              <span className='fw-bolder'>
                شما از شایستگی های میان فردی و ارتباطی متوسطی برخوردارید؛
              </span>
              سعی کنید زنجیره ارتباطی با همکاران، مسئولان بالادست و مخاطبین باهوش برقرار کنید.{' '}
            </div>
          ) : value == 'خوب' ? (
            <div>
              <span className='fw-bolder'>
                شما از شایستگی های میان فردی و ارتباطی خوبی برخوردارید؛
              </span>
              سعی کنید با سازمان های مجاور، ارتباط و تعامل داشته باشید و از اطلاعات و تجارب آن ها
              استفاده کنید.
            </div>
          ) : value == 'عالی' ? (
            <div>
              <span className='fw-bolder'>
                شما از شایستگی های میان فردی و ارتباطی عالی برخوردارید؛
              </span>
              سعی کنید افراد درون سازمان را دور هم جمع کنید و مشکلات، خلا ها و آسیب های سازمان را با
              تعامل همدیگر، درک کنید و برای آن راهکار پیش بینی کنید.
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )
    if (label == 'شایستگی های تخصصی')
      return (
        <div key={label}>
          <div className='my-3 text-primary'> شایستگی های تخصصی: </div>
          {/* <div className='mb-5 text-gray-500'>
            (توانایی تبدیل دانش ضمنی به دانش مکتوب و اساسی، توانایی تدوین ارکان برنامه، توانایی
            اجرای استراتژی، توانایی تحلیل محیط سازمان، توانایی ارزیابی استراتژی)
          </div> */}
          {value == 'خیلی ضعیف' || value == 'ضعیف' ? (
            <div>
              <span className='fw-bolder'>شما از شایستگی های تخصصی ضعیفی برخوردارید؛ </span>
              بنابراین باید نسبت به مبانی استراتژیک و مراحل تهیه برنامه استراتژیک اطلاعات کسب کنید؛
              پیشنهاد می شود در دوره ها و کلاس های آموزشی شرکت کنید و بعد از کسب اطلاعات لازم، به
              دنبال یافتن اجزای برنامه استراتژیک در سازمان باشید.
            </div>
          ) : value == 'متوسط' ? (
            <div>
              <span className='fw-bolder'>شما از شایستگی های تخصصی متوسطی برخوردارید؛ </span>
              سعی کنید زمینه ی استفاده از دانش ضمنی خود را با تهیه اجزای برنامه استراتژیک در
              سازمانتان فراهم آورید.
            </div>
          ) : value == 'خوب' ? (
            <div>
              <span className='fw-bolder'>شما از شایستگی های تخصصی خوبی برخوردارید؛ </span>
              سعی کنید به دنبال کشف و شناخت نقاط قوت، ضعف و فرصت ها و تهدیدهای محیط خارجی باشید و
              زمینه ی استفاده حداکثری از نقاط قوت و فرصت های جدید در سازمان فراهم آورید.
            </div>
          ) : value == 'عالی' ? (
            <div>
              <span className='fw-bolder'>شما از شایستگی های تخصصی عالی برخوردارید؛ </span>
              سعی کنید به عنوان یک مدرس و مشاور راهبردی درون سازمانی، افراد را با مراحل تهیه برنامه
              استراتژیک آشنا کنید و زمینه ی تدوین و اجرای برنامه استراتژیک را با انتخاب و همراهی
              افرادی که این شایستگی ها را دارند، در سازمان فراهم آورید.
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )
    if (label == 'شایستگی های مدیریتی')
      return (
        <div key={label}>
          <div className='my-3 text-primary'> شایستگی های مدیریتی: </div>
          {/* <div className='mb-5 text-gray-500'>
            (مهارت سازماندهی، توانایی حل مسأله، توانایی تصمیم سازی و تصمیم گیری)
          </div> */}
          {value == 'خیلی ضعیف' || value == 'ضعیف' ? (
            <div>
              <span className='fw-bolder'>شما از شایستگی های مدیریتی ضعیفی برخوردارید؛ </span>
              در کلاس ها و دوره های آموزشی جهت آشنا شدن با وظایف و مهارت مدیریتی شرکت کنید و سعی
              کنید این مهارت ها را در حین انجام وظایف شغلی، در خودتان توسعه دهید.
            </div>
          ) : value == 'متوسط' ? (
            <div>
              <span className='fw-bolder'>شما از شایستگی های مدیریتی متوسطی برخوردارید؛ </span>
              سعی کنید با همکاری افراد درون سازمانی به شناسایی مسائل استراتژیک در سازمان خود
              بپردازید و پیشنهاداتی جهت برخورد با آن ها بدهید.
            </div>
          ) : value == 'خوب' ? (
            <div>
              <span className='fw-bolder'>شما از شایستگی های مدیریتی خوبی برخوردارید؛ </span>
              سعی کنید با تشکیل گروه های کاری، مسائل و مشکلات سازمان را بشناسید و تصمیمات مناسب برای
              آن ها بگیرید.
            </div>
          ) : value == 'عالی' ? (
            <div>
              <span className='fw-bolder'>شما از شایستگی های مدیریتی عالی برخوردارید؛ </span>
              بنابراین به شما پیشنهاد می شود به عنوان یک فرد استراتژیست به ارزیابی استراتژی ها و
              انتخاب مناسبترین و کاربردی ترین آن بپردازید.
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )
  }

  const handleTotalAnalyze = (): string => {
    const values = Object.values(formData)
    const total = values.reduce((sum, v) => sum + Number(v || 0), 0)
    const length = values.length
    if (total === length) return 'ضعیف'
    if (total > length && total <= 2 * length) return 'ضعیف'
    if (total > 2 * length && total <= 3 * length) return 'متوسط'
    if (total > 3 * length && total <= 4 * length) return 'خوب'
    if (total > 4 * length && total <= 5 * length) {
      if (values.every((v) => v === 4 || v === 5)) return 'عالی'
      else return 'خوب'
    }
    return total.toString()
  }

  return loading ? (
    <Loading center />
  ) : (
    <>
      {result !== 'تراکنش موفقیت‌آمیز بود' ? (
        <div className='d-flex justify-content-center p-4 mt-10'>
          <div
            className='alert alert-secondary text-center w-100 fs-3 p-10'
            style={{minHeight: '50%'}}
          >
            {result}
            {id_get ? (
              <div className='text-center fs-1 m-5'>کد پیگیری شما: {id_get + 'b' + trans_id}</div>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <div className={`card card-xxl-stretch mb-xl-10  theme-dark-bg-body mt-15`}>
          <div className='card-header py-6'>
            <div className='card-title d-flex flex-column'>نتیجه ارزیابی </div>
            <Button
              className='btn btn-primary d-print-none'
              startIcon={<i className='las la-print'></i>}
              onClick={() => {
                window.print()
              }}
            >
              چاپ
            </Button>
          </div>

          {results.length > 0 && (
            <>
              <div className='m-5 fs-5'>
                {results.map(({label, value}) =>
                  handleAnalyze(label, handlePartAnalyze(label, value))
                )}
              </div>
              <div
                className='fs-3'
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '2rem 0',
                }}
              >
                <div style={{width: '100%', maxWidth: '800px', textAlign: 'center'}}>
                  <LineChart data={{series, options: Object.keys(questions), type: 'bar'}} />
                  {' شایستگی شما به طور کلی '}
                  <span style={{fontWeight: '700'}}>{handleTotalAnalyze()}</span>
                  {' ارزیابی می‌شود. '}
                </div>
              </div>
            </>
          )}
          {/* </AccordionDetails>
      </Accordion> */}
          <div className='text-center fs-1 m-5 mt-10'>کد پیگیری شما: {id_get + 'b' + trans_id}</div>
          <div className='d-print-none'>
            <div className='fs-4 m-5'>
              در صورت تمایل به ارائه نتایج به سازمان ورزشی مربوطه، نام، نام خانوادگی و کدملی خود را
              وارد نمائید:
            </div>
            <div className='m-5 fs-4'>
              {/* نام */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '20px',
                }}
              >
                <span style={{marginRight: '10px', width: '120px', textAlign: 'right'}}>نام:</span>
                <TextField
                  name='firstName'
                  margin='dense'
                  value={userData.firstName}
                  label='نام'
                  onChange={handleChange}
                />
              </div>

              {/* نام خانوادگی */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '20px',
                }}
              >
                <span style={{marginRight: '10px', width: '120px', textAlign: 'right'}}>
                  نام خانوادگی:
                </span>
                <TextField
                  name='lastName'
                  margin='dense'
                  value={userData.lastName}
                  label='نام خانوادگی'
                  onChange={handleChange}
                />
              </div>

              {/* کد ملی */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '20px',
                }}
              >
                <span style={{marginRight: '10px', width: '120px', textAlign: 'right'}}>
                  کد ملی:
                </span>
                <TextField
                  name='nationalCode'
                  margin='dense'
                  value={userData.nationalCode}
                  label='کد ملی'
                  onChange={handleChange}
                />
              </div>

              {/* دکمه چاپ (سمت چپ زیر کد ملی) */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '30px',
                  paddingRight: '120px', // تنظیم فاصله برای هم‌ترازی با اینپوت‌ها
                }}
              >
                {/* <Button
                className='btn btn-primary d-print-none'
                startIcon={<i className='las la-print'></i>}
                onClick={() => {
                  window.print()
                }}
              >
                چاپ
              </Button> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// export default GetResult
