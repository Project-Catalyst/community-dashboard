export async function getVcaChartDataFromJson() {
    const response = await fetch('http://localhost:5000/vca')
    const responseJson = await response.json()
    return responseJson
}

export async function getCaChartDataFromJson() {
    const response = await fetch('http://localhost:5000/ca')
    const responseJson = await response.json()
    return responseJson
}
