import {FC, memo, useEffect, useState, useMemo, useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import questions from './questions.json'
import {Button, RadioInput} from 'app/components'
import LineChart from './LineChart'
import {notification} from 'app/utils'

interface Result {
  label: string
  value: number
}
interface QuestionRowProps {
  id: number
  text: string
  selectedValue?: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const QuestionRow: FC<QuestionRowProps> = memo(({id, text, selectedValue, onChange}) => (
  <div key={id} className='row m-2 py-4' style={{borderBottom: '1px solid #5f656d55'}}>
    <div className='col col-md-6 d-flex flex-row flex-column-fluid fs-5 mb-2 align-self-end'>
      {text.trim()}
    </div>
    <div className='col col-md-6 d-flex flex-end'>
      <div className='row align-items-center'>
        {[1, 2, 3, 4, 5].map((val) => (
          <div key={val} className='col align-self-end'>
            <RadioInput
              label={['بسیار کم', 'کم', 'تا حدودی', 'زیاد', 'بسیار زیاد'][val - 1]}
              name={id.toString()}
              value={val}
              checked={selectedValue === val}
              onChange={onChange}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
))
QuestionRow.displayName = 'QuestionRow'

const DashboardWrapper: FC = () => {
  const navigate = useNavigate()
  const data = useMemo(() => Object.entries(questions), [])
  const [formData, setFormData] = useState<Record<string, number>>({})
  const [results, setResults] = useState<Result[]>([])
  const [series, setSeries] = useState<number[]>([])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setFormData((prev) => ({...prev, [name]: Number(value)}))
  }, [])

  const handlePartAnalyze = useCallback(
    (label: string, value: number) => {
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
    },
    [data, formData]
  )

  const handleAnalyze = useCallback(
    (label: any, value: any) => {
      if (label == 'شایستگی های فردی')
        return (
          <div key={label}>
            <div className='my-3 text-primary'> شایستگی های فردی: </div>
            <div className='mb-5 text-gray-500'>
              (تفکر خلاق و نوآور، انگیزه و اشتیاق شغلی، تعهد و مسئولیت پذیری، توانایی پرسشگری، مصم
              بودن در انجام کار، رقابت طلب و موفقیت جو بودن، تفکر استراتژیک، انجام کار نظام مند،
              هوشمندی، توانایی سازگاری و انعطاف پذیری، آینده نگری)
            </div>
            {value == 'خیلی ضعیف' || value == 'ضعیف' ? (
              <div>
                <span className='fw-bolder'>شما از شایستگی های فردی ضعیفی برخوردارید؛ </span> جهت
                تبدیل شدن به یک فرد استراتژیست، لازم است به فردی باهوش، پرسشگر، آینده نگر، با انگیزه
                و اشتیاق شغلی، متعهد و مسئولیت پذیر، مصم بودن در انجام کار، رقابت طلب و موفقیت جو
                بودن، آینده نگر در سازمان تبدیل شوید؛ بنابراین با مطالعه و شرکت در دوره های آموزشی
                اطلاعات خود را در زمینه ی کسب تفکر استراتژیک، تفکر خلاق و نواور بالا ببرید و زمینه ی
                توسعه ی آن را در خودتان با توجه به امکانات درون سازمانی افزایش دهید.{' '}
              </div>
            ) : value == 'متوسط' ? (
              <div>
                <span className='fw-bolder'>شما از شایستگی های فردی متوسطی برخوردارید؛ </span>
                بنابراین پیشنهاد می شود به یک فرد مکاشفه گر در سازمان تبدیل شوید و به درک و تحلیل
                جامع مسائل در داخل و خارج سازمان بپردازید تا توانایی ارائه و پیاده سازی برنامه های
                خلاقانه در سازمان را توسعه دهید.
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
                بنابراین پیشنهاد می شود به عنوان یک مدرس و مشاورراهبردی در سازمان عمل کنید و با
                توسعه ی این شایستگی ها در افراد سازمان، زمینه ایجاد سازمان یادگیرنده و پویا را فراهم
                آورید.{' '}
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
            <div className='mb-5 text-gray-500'>
              (برخورداری از اطلاعات جدید و بروز، برخورداری از اطلاعات عمومی و پایه ، برخورداری از
              سواد دانشگاهی و تخصصی)
            </div>
            {value == 'خیلی ضعیف' || value == 'ضعیف' ? (
              <div>
                <span className='fw-bolder'>شما از شایستگی های آموزشی ضعیفی برخوردارید؛ </span> جهت
                تبدیل سعی کنید در کلاس ها و دوره های آموزشی جهت کسب اطلاعات علمی و عمومی شرکت کنید و
                به فردی که اهل مطالعه است تبدیل شوید.
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
            <div className='mb-5 text-gray-500'>(مهارت ادراکی، مهارت تعامل، مهارت کارگروهی)</div>
            {value == 'خیلی ضعیف' || value == 'ضعیف' ? (
              <div>
                <span className='fw-bolder'>
                  شما از شایستگی های میان فردی و ارتباطی ضعیفی برخوردارید؛
                </span>{' '}
                سعی کنید از طریق مطالعه و شرکت در دوره های آموزشی، مهارت تجزیه و تحلیل و درک مسائل
                را کسب کنید و این توانایی را با برقراری ارتباط با همکاران در خود توسعه دهید.
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
                سعی کنید افراد درون سازمان را دور هم جمع کنید و مشکلات، خلا ها و آسیب های سازمان را
                با تعامل همدیگر، درک کنید و برای آن راهکار پیش بینی کنید.
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
            <div className='mb-5 text-gray-500'>
              (توانایی تبدیل دانش ضمنی به دانش مکتوب و اساسی، توانایی تدوین ارکان برنامه، توانایی
              اجرای استراتژی، توانایی تحلیل محیط سازمان، توانایی ارزیابی استراتژی)
            </div>
            {value == 'خیلی ضعیف' || value == 'ضعیف' ? (
              <div>
                <span className='fw-bolder'>شما از شایستگی های تخصصی ضعیفی برخوردارید؛ </span>
                بنابراین باید نسبت به مبانی استراتژیک و مراحل تهیه برنامه استراتژیک اطلاعات کسب
                کنید؛ پیشنهاد می شود در دوره ها و کلاس های آموزشی شرکت کنید و بعد از کسب اطلاعات
                لازم، به دنبال یافتن اجزای برنامه استراتژیک در سازمان باشید.
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
                سعی کنید به عنوان یک مدرس و مشاور راهبردی درون سازمانی، افراد را با مراحل تهیه
                برنامه استراتژیک آشنا کنید و زمینه ی تدوین و اجرای برنامه استراتژیک را با انتخاب و
                همراهی افرادی که این شایستگی ها را دارند، در سازمان فراهم آورید.
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
            <div className='mb-5 text-gray-500'>
              (مهارت سازماندهی، توانایی حل مسأله، توانایی تصمیم سازی و تصمیم گیری)
            </div>
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
                سعی کنید با تشکیل گروه های کاری، مسائل و مشکلات سازمان را بشناسید و تصمیمات مناسب
                برای آن ها بگیرید.
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
    },
    [handlePartAnalyze, formData]
  )

  const handleTotalAnalyze = useCallback((): string => {
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
  }, [formData])

  const handleSubmit = useCallback(() => {
    const totalQuestions = data.reduce((sum, [, items]) => sum + items.length, 0)
    if (Object.keys(formData).length !== totalQuestions) {
      notification.danger('لطفا همه موارد را تکمیل کنید')
      return
    }
    const tempResults: Result[] = []
    const tempSeries: number[] = []

    data.forEach(([label, items]) => {
      const sum = items.map((item) => formData[item.id.toString()] || 0).reduce((a, b) => a + b, 0)
      tempResults.push({label, value: sum})
      tempSeries.push(parseFloat(((sum * 100) / (items.length * 5)).toFixed(2)))
    })
    setResults(tempResults)
    setSeries(tempSeries)
  }, [data, formData])

  return (
    <>
      <div className=' mb-2'>
        <div className={`card card-xxl-stretch mb-xl-10  theme-dark-bg-body`}>
          <div className='card-header py-8'>
            <div className='card-title d-flex flex-column'>
              میزان ویژگی ها، توانایی ها، شایستگی ها و مهارت های زیر در شما چقدر است؟
            </div>
          </div>

          {data.map(([category, items]) => (
            <div key={category}>
              {items.map(({id, value}, idx) => (
                <QuestionRow
                  key={id}
                  id={id}
                  text={value}
                  selectedValue={formData[id.toString()]}
                  onChange={handleChange}
                />
              ))}
            </div>
          ))}

          <div className='text-center'>
            <Button title='مشاهده نتیجه' size='lg' onClick={handleSubmit} className='m-5' />
            {/* <Button
              title='2مشاهده نتیجه'
              size='lg'
              onClick={() => {
                navigate('/result')
              }}
              className='m-5'
            /> */}
          </div>

          {results.length > 0 && (
            <>
              <div className='m-5 fs-5'>
                {results.map(({label, value}) =>
                  handleAnalyze(label, handlePartAnalyze(label, value))
                )}
              </div>
              <div className='text-center m-5 fs-4'>
                <LineChart data={{series, options: Object.keys(questions), type: 'bar'}} />
                {' شایستگی شما به طور کلی '}
                <span className='fw-bolder'>{handleTotalAnalyze()}</span>
                {'  ارزیابی میشود. '}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export {DashboardWrapper}
