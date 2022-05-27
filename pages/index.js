import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import AnimatedChart from '../components/animated-chart';
import utilStyles from '../styles/utils.module.css';
import { getChartDataFromJson, getChartOptions } from '../lib/chart-data-logic';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ProgressBar } from "react-bootstrap";
import { Component, useEffect, useState } from 'react';

import Link from 'next/link';

export async function getStaticProps() {
  const chartData = await getChartDataFromJson()
  const chartOptions = getChartOptions()
  return {
    props: {
      chartData,
      chartOptions,
      now: 90
    },
  }
}

function Home(props) {

  // console.log(props.now)
  const [boundProps, setBoundProps] = useState(props);

  // Similar to componentDidMount and componentDidUpdate:

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
        <ProgressBar striped variant="success" now={boundProps.now} key={1} />
        <Button variant="primary" onClick={() => {
          console.log(boundProps.now)
          console.log(boundProps.chartData.datasets[0].data)
          function getRandomNub() {
            return Math.random() * 100;
          }
          setBoundProps({ ...boundProps, now: boundProps.now - 10, chartData: {
            animationEnabled: true,
            exportEnabled: true,
            theme: "dark2", // "light1", "dark1", "dark2"
            title: {
                text: "Trip Expenses"
            },
            
            labels: [
                'Proposals with atleast 1 assessment',
                'Proposals with atleast 2 assessments',
                'Proposals with atleast 3 assessments',
                'Proposals with atleast 4 assessments',
                'Proposals with atleast 5 assessments',
                'Proposals with atleast 6 assessments',
                'Proposals with atleast 7 assessments'
            ],
            datasets: [
                {
                    label: '% of Votes',
                    data: [getRandomNub(), getRandomNub(), getRandomNub(), getRandomNub(), getRandomNub(), getRandomNub()],
                    weight: 12,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                },
            ]
        } })
        }
        }>Primary</Button>{' '}
      </section>
    </Layout>
  )
}

export default Home






  // onClickFunction(self) {
  //   self.state.now = 10
  //   console.log(self.state.now)
  //   // }
  // }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     chartData: {
  //       animationEnabled: true,
  //       exportEnabled: true,
  //       theme: "dark2", // "light1", "dark1", "dark2"
  //       labels: [
  //         'Proposals with atleast 1 assessment',
  //         'Proposals with atleast 2 assessments',
  //         'Proposals with atleast 3 assessments',
  //         'Proposals with atleast 4 assessments',
  //         'Proposals with atleast 5 assessments',
  //         'Proposals with atleast 6 assessments',
  //         'Proposals with atleast 7 assessments'
  //       ],
  //       datasets: [{ data: [12, 19, 3, 5, 2, 3] }]
  //     },
  //     chartOptions: {
  //       plugins: {
  //         title: {
  //           display: true,
  //           text: 'Pie chart title'
  //         },
  //         legend: {
  //           display: true,
  //           position: 'bottom'
  //         },
  //       },
  //       tooltips: {
  //         callbacks: {
  //           label: function (tooltipItem, data) {
  //             return `${tooltipItem} %`;
  //           },
  //           title: function (tooltipItem, data) {
  //             return data.labels[tooltipItem[0].index];
  //           }
  //         }
  //       },
  //       onClick: this.onClickFunction,
  //     },
  //     now: 90
  //   }
  // }