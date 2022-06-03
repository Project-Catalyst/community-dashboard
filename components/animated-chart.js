import React, {useRef} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, PolarAreaController, RadialLinearScale, PointElement, LineElement } from 'chart.js';
import { Pie, PolarArea, getElementAtEvent } from 'react-chartjs-2';

ChartJS.register(PolarAreaController, RadialLinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Title);

function AnimatedChart(props) {
    const chartRef = useRef();

    return (
        <PolarArea
            ref={chartRef}
            data={props.chartData}
            options={props.chartOptions}
            onClick={(event) => {
                let possiblePieSlice = getElementAtEvent(chartRef.current, event)
                let index = possiblePieSlice[0]?.index
                if(index !== undefined) {
                    console.log(index)
                }
            }}
        />
    )
}

// <Pie
// data={this.state.chartData}
// options={this.state.chartOptions}
// />
export default AnimatedChart;
