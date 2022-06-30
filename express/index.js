const express = require('express')
const app = express()
const { updateChartData, vCaChartOptions, vCaPieChartStyling, caChartOptions, caPieChartStyling } = require('./data-transformer')

const CURRENT_FUND_ID = 9
const CA_MIN_LOWER_BOUND = 2
const CA_MIN_UPPER_BOUND = 7
const VCA_MIN_LOWER_BOUND = 90
const VCA_MIN_UPPER_BOUND = 200

const port = 5000

app.get('/vca', (req, res) => {
    const vCaFundsData = [6, 7, 8].map(fundId => {
        const fundX = require(`${process.cwd()}/express/fund/${fundId}/formatted.vca.data.json`)
        Object.assign(fundX.fundData.animationData[0].datasets[0], vCaPieChartStyling)
        return fundX
    })

    const response = {
        vCaFundsData,
        vCaChartOptions
    }

    res.status(200).json(response)
})

app.get('/ca', (req, res) => {
    const caFundsData = [6, 7, 8].map(fundId => {
        const fundX = require(`${process.cwd()}/express/fund/${fundId}/formatted.ca.data.json`)
        Object.assign(fundX.fundData.animationData[0].datasets[0], caPieChartStyling)
        return fundX
    })

    const response = {
        caFundsData,
        caChartOptions
    }

    res.status(200).json(response)
})

app.get('/rewards/ca', (req, res) => {
    const fundId = 8
    const { assessorId } = req.query
    const caRewardsData = require(`${process.cwd()}/express/fund/${fundId}/formatted.ca.rewards.data.json`)

    const adjustedAssessmentNumber = caRewardsData.assessors.reduce((acc, current) => {
        acc += (3 * current.excellent + current.good)
    }, 0)

    const rewardForASingleAssessment = caRewardsData.available_reward / adjustedAssessmentNumber

    const currentAssessor = caRewardsData.assessors.filter(x => x.id === assessorId.trim())[0]
    const currentReward = (currentAssessor.excellent * 3 * rewardForASingleAssessment)
        + (currentAssessor.good * rewardForASingleAssessment)

    res.status(200).json({ estimatedReward: currentReward })
})

app.get('/update/vca', (req, res) => {
    updateChartData(CURRENT_FUND_ID, VCA_MIN_LOWER_BOUND, VCA_MIN_UPPER_BOUND, true)
    res.json({ msg: "updated vca data" })
})

app.get('/update/ca', (req, res) => {
    updateChartData(CURRENT_FUND_ID, CA_MIN_LOWER_BOUND, CA_MIN_UPPER_BOUND, false)
    res.json({ msg: "updated ca data" })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})