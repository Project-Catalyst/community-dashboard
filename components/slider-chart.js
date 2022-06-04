
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import * as React from 'react';
import { useState, useRef } from 'react';
import utilStyles from '../styles/utils.module.css';

import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, PolarAreaController, RadialLinearScale, PointElement, LineElement } from 'chart.js';
import { Pie, PolarArea, getElementAtEvent } from 'react-chartjs-2';

ChartJS.register(PolarAreaController, RadialLinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Title);

function SliderChart(props) {

    const chartRef = useRef();
    const [animationIntervalId, setAnimationIntervalId] = React.useState();

    const [fundNumber, setFundNumber] = React.useState(0);
    const [chartOptions, _] = useState(props.chartOptions);

    const [thumbPosition, setThumbPosition] = useState(0);

    const [animation, setAnimation] = useState(props.fundsData[0].fundData.animationData);

    const handleDropdownChange = (event) => {
        const chosenFundIndex = event.target.value
        const animData = props.fundsData[chosenFundIndex].fundData.animationData
        setThumbPosition(animData.length < thumbPosition ? animData.length - 1 : thumbPosition)
        setFundNumber(chosenFundIndex);
        setAnimation(animData)
        stopAnimation()
    };

    const handleSliderChange = (_, newValue) => {
        setThumbPosition(newValue);
        setAnimation(animation)
        stopAnimation()
    };

    const stopAnimation = () => {
        clearInterval(animationIntervalId)
    }
    const runAnimation = async () => {
        const animationLength = animation.length
        const animationInterval = 700
        animationIntervalId = setInterval(() => {
            setThumbPosition(thumbPosition++ % animationLength)
        }, animationInterval)
        setAnimationIntervalId(animationIntervalId)
    }

    const menuItems = props.fundsData.map((element, index) => {
        return <MenuItem key={element.fundId} value={index}>{element.fundName}</MenuItem>
    })

    return (

        <section>
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
                <Button
                    onClick={runAnimation}
                > Run Animation
                </Button>
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
        </section >
    );
}

export default SliderChart