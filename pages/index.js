
import Layout from '../components/layout';
import Head from 'next/head';
import Link from '@mui/material/Link';
import SliderChart from '../components/slider-chart';

import { getChartDataFromJson } from '../lib/chart-data-logic';

import 'bootstrap/dist/css/bootstrap.min.css';


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
        className="position-absolute top-0 end-0 m-4 text-decoration-none"
        href="#"
        color="inherit">
        CA / vCA Rewards Estimator
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