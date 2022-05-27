import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, PolarAreaController, RadialLinearScale, PointElement, LineElement } from 'chart.js';
import { Pie, PolarArea } from 'react-chartjs-2';
import { getChartOptions } from '../lib/chart-data-logic';
import { Component } from 'react';

ChartJS.register(PolarAreaController, RadialLinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Title);

function AnimatedChart(props) {
    // self = this;
    // constructor(props) {
    //     super(props);
    //     this.state = { ...props }
    // }

    // componentDidMount() {
    //     this.setState({
    //         chartData: this.props.chartData,
    //         chartOptions: this.props.chartOptions,
    //     })
    // }

    return (
        <PolarArea
            data={props.chartData}
            options={props.chartOptions}
        />
    )
}

// <Pie
// data={this.state.chartData}
// options={this.state.chartOptions}
// />
export default AnimatedChart;
