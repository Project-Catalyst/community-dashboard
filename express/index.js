const express = require('express')
const app = express()
const { updateChartData, chartOptions, pieChartStyling } = require('./vca-data-transformer')

const CURRENT_FUND_ID = 8
const MIN_LOWER_BOUND = 31
const MIN_UPPER_BOUND = 36


const port = 5000

function attemptToUpdate() {
    updateChartData(CURRENT_FUND_ID, MIN_LOWER_BOUND, MIN_UPPER_BOUND)
}

app.get('/', (req, res) => {
    const fundsData = [7, 8].map(fundId => {
        const fundX = require(`${process.cwd()}/express/fund/${fundId}/formatted.vca.data.json`)
        Object.assign(fundX.fundData.animationData[0].datasets[0], pieChartStyling)
        return fundX
    })

    const response = {
        fundsData: fundsData,
        chartOptions: chartOptions
    }

    res.status(200).json(response)
})

app.get('/update', (req, res) => {
    attemptToUpdate()
    res.json({ msg: "updated" })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})