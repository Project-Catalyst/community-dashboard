import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, PolarAreaController, RadialLinearScale, PointElement, LineElement } from 'chart.js';
import { Pie, PolarArea } from 'react-chartjs-2';
import { getChartOptions } from '../lib/chart-data-logic';
import { Component } from 'react';

ChartJS.register(PolarAreaController, RadialLinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Title);

class AnimatedChart extends Component {
    self = this;
    constructor(props) {
        super(props);
        this.state = {...props}
    }

    componentDidMount() {
        this.setState({
            chartData: this.props.chartData,
            chartOptions: this.props.chartOptions,
        })
    }

    render() {
        console.log("#########")
        console.log(this.state)
        return (
            <PolarArea
                data={this.state.chartData}
                options={this.state.chartOptions}
            />
        )
    }
}

// <Pie
// data={this.state.chartData}
// options={this.state.chartOptions}
// />
export default AnimatedChart;
