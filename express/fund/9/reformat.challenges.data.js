const data = require("./formatted.ca.challenges.data.json")


// {
//     "fundName": "Fund 9",
//     "fundId": "9",
//     "fundsData": [
//         {
//             "names": [],
//             "datasets": []
//         },
//         {
//             "names": [
//                 "The Great Migration (from Ethereum)",
//                 "DAOs <3 Cardano",
//                 "Dapps, Products & Integrations",
//                 "Legal & Financial Implementations",
//                 "Developer Ecosystem",
//                 "Cross-Chain Collaboration",
//                 "Challenge & Scouted for Students",
//                 "Grow Africa, Grow Cardano",
//                 "dRep improvement and onboarding",
//                 "Grow East Asia, Grow Cardano",
//                 "Building (on) Blockfrost",
//                 "Fund10 challenge setting",
//                 "Catalyst Natives X Cardashift: Demonstrating and monetizing impact"
//             ],
//             "datasets": [
//                 [
//                     25, index = 0, length = 1
//                     25,
//                     25,
//                     23,
const changedData = data.fundsData.map(fundData => {
    fundData.datasets = fundData.datasets.map((dataset, index) => {
        return dataset.map((item, index) => {
            if (index < (dataset.length - 1)) item -= dataset[index + 1]
            return item
        })
    })
    return fundData
})

const fs = require('fs')

const writeDataToFile = (data, fileName) => {
    const json = JSON.stringify(data)
    fs.writeFile(fileName, json, (err) => {
        if (err) {
            console.error(err)
            return
        }
        console.log("File has been saved!")
    })
}

writeDataToFile(changedData, "new.formatted.ca.challenges.data.json")