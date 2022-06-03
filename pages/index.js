import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import AnimatedChart from '../components/animated-chart';
import utilStyles from '../styles/utils.module.css';
import { getChartDataFromJson, getChartOptions } from '../lib/chart-data-logic';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ProgressBar } from "react-bootstrap";
import { Component, useEffect, useState } from 'react';
import * as React from 'react';
import ReactDOM from 'react-dom';
import Slider from '@mui/material/Slider';

import Link from 'next/link';
import { stepConnectorClasses } from '@mui/material';

export async function getStaticProps() {
  const data = await getChartDataFromJson()
  return {
    props: {
      fundsData: data.fundsData
    },
  }
}

function Home(props) {


  //set based on dropdown
  const [boundProps, setBoundProps] = useState(props.fundsData[0].fundData);

  const handleChange = (_, newValue) => {
    setBoundProps({
      ...boundProps,
      chartData: boundProps.animationData[newValue]
    })
  };

  return (
    <Layout home>
      <Head>
        <title>Community Dashboard</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Fund 1</h2>
        <AnimatedChart
          chartData={boundProps.chartData}
          chartOptions={boundProps.chartOptions}
        />
      </section>
      <section>
        <Slider
          aria-label="Temperature"
          defaultValue={0}
          valueLabelDisplay="auto"
          onChange={handleChange}
          step={1}
          marks
          min={0}
          max={boundProps.animationData.length - 1}
        />
      </section>
    </Layout>
  )
}

export default Home