const fs = require('fs')
const https = require('https');

/**
 * This method will generate a chart data from a json file.
 * 
 * The end result looks like:
 {
    "labels": [
        "at least 1 assessment/reviews",
        "at least 2 assessments/reviews",
        "at least .. assessments/reviews",
        "at least minimumNumberOfAssessments assessments/reviews",
    ],
    "datasets": [
        {
            "label": "Reviews/Assessments",
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
const extractChartDataSlice = (rawData, atLeastLowerBound, atLeastUpperBound, forVca) => {

    return forVca
        ?
        extractVcaData(rawData, atLeastLowerBound, atLeastUpperBound)
        :
        extractCaData(rawData, atLeastLowerBound, atLeastUpperBound)
}

const extractVcaData = (rawVcaData, atLeastLowerBound, atLeastUpperBound) => {
    const animationData = {
        labels: [],
        datasets: [
            {
                label: 'Reviews',
                data: []
            }
        ]
    }

    for (let atLeast = atLeastLowerBound; atLeast <= atLeastUpperBound; atLeast += 20) {
        animationData.labels.push(`at least ${atLeast} reviews`)
        atleastCount = {}
        atleastCount[atLeast] = 0
        rawVcaData.flatMap(x => x.proposals).map(proposalJson => {
            vcaReviewCount = proposalJson.assessments.reduce((acc, curr) => {
                acc += curr.vca_reviews_count
                return acc
            }, 0)
            console.log(vcaReviewCount)
            if (vcaReviewCount >= atLeast) {
                atleastCount[atLeast] = atleastCount[atLeast] + 1 || 1
            }
        })
        animationData.datasets[0].data.push(atleastCount[atLeast])
    }

    return animationData
}

const extractCaData = (rawCaData, atLeastLowerBound, atLeastUpperBound) => {
    const animationData = {
        labels: [],
        datasets: [
            {
                label: 'Assessments',
                data: []
            }
        ]
    }

    for (let atLeast = atLeastLowerBound; atLeast <= atLeastUpperBound; atLeast++) {
        animationData.labels.push(`at least ${atLeast} assessments`)
        atleastCount = {}
        atleastCount[atLeast] = 0
        rawCaData.flatMap(x => x.proposals).map(proposalJson => {
            console.log(proposalJson.assessments_count)
            if (proposalJson.assessments_count >= atLeast) {
                atleastCount[atLeast] = atleastCount[atLeast] + 1 || 1
            }
        })
        animationData.datasets[0].data.push(atleastCount[atLeast])
    }

    return animationData
}

/**
 * This is the styling for the chart slice
 */
const vCaPieChartStyling = {
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
const vCaChartOptions = {
    "plugins": {
        "title": {
            "display": true,
            "text": "vPA Progress",
            "font": {
                "size": 30
            }
        }
    },
    "responsive": true
}

/**
 * This is the styling for the chart slice
 */
const caPieChartStyling = {
    weight: 12,
    backgroundColor: [
        "rgba(255, 0, 0, 1)",
        "rgba(0, 255, 0, 1)",
        "rgba(0, 0, 255, 1)",
        "rgba(123, 192, 192, 1)",
        "rgba(153, 12, 255, 1)",
        "rgba(255, 159, 164, 1)"
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
const caChartOptions = {
    "plugins": {
        "title": {
            "display": true,
            "text": "PA Progress",
            "font": {
                "size": 30
            }
        }
    },
    "responsive": true
}



const appendSliceToFundData = (slice, fundId, forVca) => {
    const caOrVca = forVca ? 'vca' : 'ca'
    const currentFundData = require(`./fund/${fundId}/formatted.${caOrVca}.data.json`)
    currentFundData.fundData.animationData.push(slice)
    return currentFundData
}


const requestSnapshot = async () => {
    return new Promise((resolve, reject) => {
        // https://github.com/Project-Catalyst/community-dashboard-backend/blob/main/snapshots/ca-backend_snapshot.json
        let url = "https://raw.githubusercontent.com/Project-Catalyst/community-dashboard-backend/main/snapshots/ca-backend_snapshot.json";

        https.get(url, (res) => {
            let body = "";
            res.on("data", (chunk) => {
                body += chunk;
            });
            res.on("end", () => {
                try {
                    let json = JSON.parse(body);
                    resolve(json)
                } catch (error) {
                    console.error(error.message);
                    reject(error)
                };
            });
        }).on("error", (error) => {
            console.error(error.message);
            reject(error)
        });
    })
}

const updateChartData = async (fundId, minLowerBound, minUpperBound, forVca) => {
    const caOrVca = forVca ? 'vca' : 'ca'

    const rawDataSnapshot = await requestSnapshot()
    
    // const rawDataSnapshot = require(`./fund/${fundId}/raw.${caOrVca}.data.json`)
    const dataSlice = extractChartDataSlice(rawDataSnapshot, minLowerBound, minUpperBound, forVca)
    const updatedFundData = appendSliceToFundData(dataSlice, fundId, forVca)
    writeDataToFile(updatedFundData, `${process.cwd()}/express/fund/${fundId}/formatted.${caOrVca}.data.json`)

    const extractChallengesData = extractCaChallenges(rawDataSnapshot, minLowerBound, minUpperBound)
    const updatedChallengesData = appendSliceToChallengesData(extractChallengesData, fundId)
    writeDataToFile(updatedChallengesData, `${process.cwd()}/express/fund/${fundId}/formatted.ca.challenges.data.json`)
}


const appendSliceToChallengesData = (slice, fundId) => {
    const challengesData = require(`./fund/${fundId}/formatted.ca.challenges.data.json`)
    challengesData.fundsData.push(slice)
    return challengesData
}


const extractCaChallenges = (rawCaData, atLeastLowerBound, atLeastUpperBound) => {

    const challengeFund9Map = {
        26595: "Dapps, Products & Integrations",
        26601: "dRep improvement and onboarding",
        26597: "Developer Ecosystem",
        26600: "Grow Africa, Grow Cardano",
        26593: "The Great Migration (from Ethereum)",
        26594: "DAOs <3 Cardano",
        26596: "Legal & Financial Implementations",
        26598: "Cross-Chain Collaboration",
        26602: "Grow East Asia, Grow Cardano",
        26605: "Catalyst Natives X Cardashift: Demonstrating and monetizing impact",
        26599: "Challenge & Scouted for Students",
        26603: "Building (on) Blockfrost",
        26604: "Fund10 challenge setting"
    }

    const data = {
        names: [],
        datasets: []
    }
    rawCaData.map(challengeData => {

        const challengeDataset = []
        for (let atLeast = atLeastLowerBound; atLeast <= atLeastUpperBound; atLeast++) {

            atleastCount = {}
            atleastCount[atLeast] = 0

            challengeData.proposals.flatMap(proposalJson => {
                if (proposalJson.assessments_count >= atLeast) {
                    atleastCount[atLeast] = atleastCount[atLeast] + 1 || 1
                }
            })
            challengeDataset.push(atleastCount[atLeast])
        }

        data.names.push(challengeFund9Map[challengeData.challenge_id])
        data.datasets.push(challengeDataset)
    })

    return data
}

/**
 * This method will append the slice data to the chart data so we can have an animation with all the slices
 * 
 * @param {*} vcaData the data file ready to be appended to the chart
 * @param {*} fileName the name of the file to be saved
 */
const writeDataToFile = (vcaData, fileName) => {
    const json = JSON.stringify(vcaData)
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
    vCaChartOptions,
    vCaPieChartStyling,
    caChartOptions,
    caPieChartStyling
}