export async function getChartDataFromJson() {
    return {
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
                data: [12, 19, 3, 5, 2, 3],
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
    }
}

export function getChartOptions() {
    return {
        title: {
            display: true,
            text: 'Average Rainfall per month',
            fontSize: 20
        },
        
        responsive: true,
        // onClick: function (event, element) {
        //     if (element.length > 0) {
        //         var ind = element[0].index;
        //         var stringNumber = element[0];
        //         console.log(ind, event);
        //         //Call Modal here?
        //     }
        // }
    }
}
