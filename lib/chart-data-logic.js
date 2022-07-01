export async function getVcaChartDataFromJson() {
    const response = await fetch('http://localhost:5001/vca')
    const responseJson = await response.json()
    return responseJson
}

export async function getCaChartDataFromJson() {
    const response = await fetch('http://localhost:5001/ca')
    const responseJson = await response.json()
    return responseJson
}
