
import Layout from '../components/layout';
import Head from 'next/head';
import Link from 'next/link'
import SliderChart from '../components/slider-chart';
import ChallengesChart from '../components/challenges-chart';

import { getVcaChartDataFromJson, getCaChartDataFromJson, getChallengesChartDataFromJson } from '../lib/chart-data-logic';

export async function getStaticProps() {
  const vCaData = await getVcaChartDataFromJson()
  const caData = await getCaChartDataFromJson()
  const challengesData = await getChallengesChartDataFromJson()
  return {
    props: {
      vCaFundsData: vCaData.vCaFundsData,
      vCaChartOptions: vCaData.vCaChartOptions,
      caFundsData: caData.caFundsData,
      caChartOptions: caData.caChartOptions,
      challenges: challengesData
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
        fundsData={props.caFundsData}
        chartOptions={props.caChartOptions}
      />
      <ChallengesChart challenges={props.challenges} />
      {/* <SliderChart
        fundsData={props.vCaFundsData}
        chartOptions={props.vCaChartOptions}
      /> */}
    </Layout>
  )
}

export default Home