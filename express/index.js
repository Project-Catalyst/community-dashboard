const express = require('express')
const app = express()

const port = 5000

var data = require('./data.json')

function getRandomNub() {
    return Math.random() * 100;
}
function attemptToUpdate() {
    //update data json
}

app.get('/', (req, res) => {
    res.json(data)
})

app.get('/update', (req, res) => {
    attemptToUpdate()
    res.json({msg: "updated"})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})