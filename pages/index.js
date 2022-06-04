
import Layout from '../components/layout';
import Head from 'next/head';
import Link from 'next/link'
import SliderChart from '../components/slider-chart';

import { getChartDataFromJson } from '../lib/chart-data-logic';

export async function getStaticProps() {
  const data = await getChartDataFromJson()
  return {
    props: {
      fundsData: data.fundsData,
      chartOptions: data.chartOptions
    },
  }
}

function Home(props) {

  return (
    <Layout home>
      <Head>
        <title>Community Dashboard</title>
      </Head>
      <Link
        href={`/estimator`}
        color="inherit">
        <a
        className="position-absolute top-0 end-0 m-4 text-decoration-none"
        >CA / vCA Rewards Estimator</a>
      </Link>
      <SliderChart
        fundsData={props.fundsData}
        chartOptions={props.chartOptions}
      />
      <SliderChart
        fundsData={props.fundsData}
        chartOptions={props.chartOptions}
      />
    </Layout>
  )
}

export default Home