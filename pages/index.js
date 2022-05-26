import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import AnimatedChart from '../components/animated-chart';
import utilStyles from '../styles/utils.module.css';
import { getChartDataFromJson } from '../lib/chart-data-logic';
import Link from 'next/link';

export async function getStaticProps() {
  const dataChartData = await getChartDataFromJson();
  return {
    props: {
      dataChartData,
    },
  }
}

export default function Home({ dataChartData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Fund {dataChartData.fundId}</h2>
        <AnimatedChart chartData={dataChartData} />
      </section>
    </Layout>
  )
}
