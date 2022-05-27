import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import AnimatedChart from '../components/animated-chart';
import utilStyles from '../styles/utils.module.css';
import { getChartDataFromJson } from '../lib/chart-data-logic';
import { Button } from "react-bootstrap";
import { Component } from 'react';

import Link from 'next/link';

export async function getStaticProps() {
  const chartData = await getChartDataFromJson()
  return {
    props: {
      chartData,
    },
  }
}

class Home extends Component {

  onClickFunction(event, element) {
    if (element.length > 0) {
      var ind = element[0].index;
      var stringNumber = element[0];
      console.log(this)
      // console.log(element, event);
      //Call Modal here?
    }
  }

  changeData() {
    this.state.chartData.datasets[0].data = [12, 19, 3, 5, 2, 3, 12];
  }
  
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        animationEnabled: true,
        exportEnabled: true,
        theme: "dark2", // "light1", "dark1", "dark2"
        labels: [
          'Proposals with atleast 1 assessment',
          'Proposals with atleast 2 assessments',
          'Proposals with atleast 3 assessments',
          'Proposals with atleast 4 assessments',
          'Proposals with atleast 5 assessments',
          'Proposals with atleast 6 assessments',
          'Proposals with atleast 7 assessments'
        ],
        datasets: [{ data: [12, 19, 3, 5, 2, 3] }]
      },
      chartOptions: {
        plugins: {
          title: {
            display: true,
            text: 'Pie chart title'
          },
          legend: {
            display: true,
            position: 'bottom'
          },
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              return `${tooltipItem} %`;
            },
            title: function (tooltipItem, data) {
              return data.labels[tooltipItem[0].index];
            }
          }
        },
        onClick: this.onClickFunction,
      }
    }
  }


  render() {
    return (
      <Layout home>
        <Head>

          <title>Community Dashboard</title>
        </Head>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Fund 1</h2>
          <AnimatedChart chartData={this.state.chartData} chartOptions={this.state.chartOptions} />
        </section>
        <section>

          <Button variant="primary" onClick={this.changeData}>Primary</Button>{' '}
        </section>
      </Layout>
    )
  }
}

export default Home