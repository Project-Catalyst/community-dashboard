export async function getChartDataFromJson() {
    const response = await fetch('http://localhost:5000/')
    const responseJson = await response.json()
    return responseJson
}
