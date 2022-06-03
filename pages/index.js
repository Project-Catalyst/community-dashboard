import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import AnimatedChart from '../components/animated-chart';
import utilStyles from '../styles/utils.module.css';
import { getChartDataFromJson, getChartOptions } from '../lib/chart-data-logic';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import * as React from 'react';
import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

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
  const [fundNumber, setFundNumber] = React.useState(0);

  const [boundProps, setBoundProps] = useState(props.fundsData[0].fundData);

  const [animation, setAnimation] = useState(props.fundsData[0].fundData.animationData);

  const menuItems = props.fundsData.map((element, index) => {
    return <MenuItem key={element.fundId} value={index}>{element.fundName}</MenuItem>
  })

  const handleDropdownChange = (event) => {
    const chosenFundIndex = event.target.value
    setFundNumber(chosenFundIndex);
    setAnimation(props.fundsData[chosenFundIndex].fundData.animationData);
  };

  const handleSliderChange = (_, newValue) => {
    setBoundProps({
      ...boundProps,
      chartData: animation[newValue]
    })
  };

  return (
    <Layout home>
      <Head>
        <title>Community Dashboard</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={fundNumber}
            label="Fund"
            onChange={handleDropdownChange}
          >
            {menuItems}
          </Select>
        </FormControl>
        <AnimatedChart
          chartData={boundProps.chartData}
          chartOptions={boundProps.chartOptions}
        />
      </section>
      <section>
        <Slider
          aria-label="Temperature"
          defaultValue={0}
          valueLabelDisplay="off"
          onChange={handleSliderChange}
          step={1}
          marks
          min={0}
          max={animation.length - 1}
        />
      </section>
    </Layout>
  )
}

export default Home