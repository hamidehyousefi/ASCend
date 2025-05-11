import {FC} from 'react'
import Chart from 'react-apexcharts'

interface LineChartData {
  data: any
}

const LineChart: FC<LineChartData> = ({data}) => {
  const faFormatter = new Intl.NumberFormat('fa-IR').format
  return (
    <div className='donut card'>
      <Chart
        options={{
          chart: {toolbar: {show: false}, zoom: {enabled: false}},
          xaxis: {categories: data.options},
          yaxis: {
            min: 0,
            max: 100,
            labels: {
              show: true,
              formatter: (val) => faFormatter(val),
            },
          },
          dataLabels: {
            enabled: true,
            formatter: (val: number) => `${faFormatter(val)}%`,
            offsetY: 10,
          },
          plotOptions: {
            bar: {
              dataLabels: {
                position: 'bottom',
                orientation: 'vertical',
              },
            },
          },
          tooltip: {
            y: {
              formatter: (val: number) => `${faFormatter(val)}%`,
            },
          },
        }}
        series={[
          {
            name: '',
            data: data.series,
          },
        ]}
        type={data.type}
        // width={900}
        height={320}
      />
    </div>
  )
}

export default LineChart
