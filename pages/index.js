
import Layout from '../components/layout';
import Head from 'next/head';
import Link from 'next/link'
import SliderChart from '../components/slider-chart';
import ChallengesChart from '../components/challenges-chart';
import { Card } from 'react-bootstrap';

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

      {/* MESSAGE CARD */}
      <div style={{'padding-top': '100px'}}>
        <Card>
          <Card.Header as="h5">AIM Catalyst Community Dashboard</Card.Header>
          <Card.Body>
            {/* <Card.Title>Welcome PAs and community members,</Card.Title> */}
            <Card.Text>
              <b>Welcome PAs and community members,</b>
              <br/>This is a new AIM tool to provide information on the on-going PA Process Progress. 
              <br/>The charts here presented are a work in progress. 
              <br/>Please, bear with us while we work on some needed experience updates.
            </Card.Text>
            {/* <Button variant="primary">Go somewhere</Button> */}
          </Card.Body>
          {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
        </Card>
      </div>  

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