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

export async function getStaticProps() {
  const data = await getChartDataFromJson()
  console.log(data.animationData)
  return {
    props: {
      chartData: data.chartData,
      chartOptions: data.chartOptions,
      animation: data.animationData,
      now: 90
    },
  }
}

function Home(props) {

  const [boundProps, setBoundProps] = useState(props);
  function valuetext(value) {
    return `${value}°C`;
  }
  const handleChange = (event, newValue) => {
    console.log(newValue);
    function getRandomNub() {
      return Math.random() * 100;
    }
    setBoundProps({ ...boundProps, now: getRandomNub(), chartData: props.animation[newValue] })
  };

  return (
    <Layout home>
      <Head>
        <title>Community Dashboard</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Fund 1</h2>
        <AnimatedChart chartData={boundProps.chartData} chartOptions={boundProps.chartOptions} />
      </section>
      <section>
        <Slider
          aria-label="Temperature"
          defaultValue={0}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          onChange={handleChange}
          step={1}
          marks
          min={0}
          max={props.animation.length - 1}
        />
      </section>
    </Layout>
  )
}

export default Home