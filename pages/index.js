import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';

import utilStyles from '../styles/utils.module.css';
import { getChartDataFromJson } from '../lib/chart-data-logic';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useRef } from 'react';
import * as React from 'react';
import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, PolarAreaController, RadialLinearScale, PointElement, LineElement } from 'chart.js';
import { Pie, PolarArea, getElementAtEvent } from 'react-chartjs-2';
ChartJS.register(PolarAreaController, RadialLinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Title);

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
  const chartRef = useRef();

  const [fundNumber, setFundNumber] = React.useState(0);
  const [chartOptions, _] = useState(props.chartOptions);

  const [thumbPosition, setThumbPosition] = useState(0);

  const [animation, setAnimation] = useState(props.fundsData[0].fundData.animationData);
  console.log(animation)

  const handleDropdownChange = (event) => {
    const chosenFundIndex = event.target.value
    console.log(chosenFundIndex)
    const animData = props.fundsData[chosenFundIndex].fundData.animationData
    setThumbPosition(animData.length < thumbPosition ? animData.length - 1 : thumbPosition)
    setFundNumber(chosenFundIndex);
    setAnimation(animData)
  };

  const handleSliderChange = (_, newValue) => {
    setThumbPosition(newValue);
    setAnimation(animation)
  };

  const menuItems = props.fundsData.map((element, index) => {
    return <MenuItem key={element.fundId} value={index}>{element.fundName}</MenuItem>
  })

  return (
    <Layout home>
      <Head>
        <title>Community Dashboard</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>

        <FormControl fullWidth>
          <Select
            value={fundNumber}
            label="Fund"
            onChange={handleDropdownChange}>
            {menuItems}
          </Select>
        </FormControl>

        <PolarArea
          ref={chartRef}
          data={animation[thumbPosition]}
          options={chartOptions}
          onClick={(event) => {
            let possiblePieSlice = getElementAtEvent(chartRef.current, event)
            let index = possiblePieSlice[0]?.index
            if (index !== undefined) {
              console.log(index)
            }
          }}
        />
        {/* <Pie
          data={chartData}
          options={chartOptions}
        /> */}

      </section>
      <section>
        <Slider
          aria-label="chartDataSlider"
          defaultValue={0}
          valueLabelDisplay="off"
          onChange={handleSliderChange}
          step={1}
          min={0}
          marks
          max={animation.length - 1}
        />
      </section>
    </Layout>
  )
}

export default Home