import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';

import { getChartDataFromJson } from '../lib/chart-data-logic';
import 'bootstrap/dist/css/bootstrap.min.css';
import SliderChart from '../components/slider-chart';
import * as React from 'react';


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
      <SliderChart
        fundsData={props.fundsData}
        chartOptions={props.chartOptions}
      />
    </Layout>
  )
}

export default Home