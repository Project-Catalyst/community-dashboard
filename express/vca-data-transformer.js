const fs = require('fs')

/**
 * This method will generate a chart data from a json file.
 * 
 * The end result looks like:
 {
    "labels": [
        "at least 1 assessment",
        "at least 2 assessments",
        "at least .. assessments",
        "at least minimumNumberOfAssessments assessments",
    ],
    "datasets": [
        {
            "label": "% of Votes",
            "data": [
                4,
                10,
                ..,
                generated _minimumNumberOfAssessments_ count from the raw data
            ],
            _pieChartStyling_
        }
    ]
}
 * 
 * @param {*} rawVcaData a data input that consists of current raw data {assessment_id: count, ...}
 * @param {*} atLeastLowerBound the minimum lower bound of assessments that must be present in the raw data and will be counted
 * @param {*} atLeastUpperBound the minimum upper bound of assessments that must be present in the raw data and will be counted
 * @returns a formated data slice that can be used to create a chart
 */
const extractChartDataSlice = (rawVcaData, atLeastLowerBound, atLeastUpperBound) => {

    const animationData = {
        labels: [],
        datasets: [
            {
                label: "Assessments",
                data: []
            }
        ]
    }

    for (let atLeast = atLeastLowerBound; atLeast <= atLeastUpperBound; atLeast++) {
        animationData.labels.push(`at least ${atLeast} assessments`)
        atleastCount = {}
        atleastCount[atLeast] = 0
        Object.keys(rawVcaData).map(key => {
            if (rawVcaData[key] > atLeast) {
                atleastCount[atLeast] = atleastCount[atLeast] + 1 || 1
            }
        })
        animationData.datasets[0].data.push(atleastCount[atLeast])
    }

    // Object.assign(animationData.datasets[0], pieChartStyling)

    return animationData
}

/**
 * This is the styling for the chart slice
 */
const pieChartStyling = {
    weight: 12,
    backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)"
    ],
    borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)"
    ],
    borderWidth: 1
}

/**
 * These are the default chart options
 */
const chartOptions = {
    "plugins": {
        "title": {
            "display": true,
            "text": "Assessments with atleast N vCA reviews",
            "font": {
                "size": 30
            }
        }
    },
    "responsive": true
}


const appendSliceToFundData = (slice, fundId) => {
    const currentFundData = require(`./fund/${fundId}/formatted.vca.data.json`)
    currentFundData.fundData.animationData.push(slice)
    return currentFundData
}

const updateChartData = (fundId, minLowerBound, minUpperBound) => {
    const rawVcaData = require(`./fund/${fundId}/raw.vca.data.json`)
    const dataSlice = extractChartDataSlice(rawVcaData, minLowerBound, minUpperBound)
    const updatedFundData = appendSliceToFundData(dataSlice, fundId)
    console.log(`PROCESS: ${process.cwd()}`)
    writeVcaDataToFile(updatedFundData, `${process.cwd()}/express/fund/${fundId}/formatted.vca.data.json`)
}

/**
 * This method will append the slice data to the chart data so we can have an animation with all the slices
 * 
 * @param {*} vcaData the data file ready to be appended to the chart
 * @param {*} fileName the name of the file to be saved
 */
const writeVcaDataToFile = (vcaData, fileName) => {
    const json = JSON.stringify(vcaData)
    console.log(json)
    fs.writeFile(fileName, json, (err) => {
        if (err) {
            console.error(err)
            return
        }
        console.log("File has been saved!")
    })
}

module.exports = {
    extractChartDataSlice,
    updateChartData,
    chartOptions,
    pieChartStyling
}