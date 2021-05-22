var ctx = document.getElementById('plotCountry').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: dates,
        datasets: [{
            label: 'Total Cases',
            data: totalCasesData,
            radius: 0,
            borderWidth: 3,
            borderColor: ['rgba(255, 255, 255, 0.2)'],
        },
        {
            label: 'Active Cases',
            data: activeCasesData,
            radius: 0,
            borderWidth: 3,
            borderColor: ['rgba(255, 255, 0, 0.2)'],
        }, 
        {
            label: 'Deaths',
            data: deathsData,
            radius: 0,
            borderWidth: 3,
            borderColor: ['rgba(255, 0, 0, 0.2)'],
        },
        {
            label: 'Recovered',
            data: recoveriesData,
            radius: 0,
            borderWidth: 3,
            borderColor: ['rgba(0, 255, 0, 0.2)'],
        }
    ]
    },
    options: {
        scales: {
            // x:{
            //     type: 'time',
            //     time: {
            //         toolTipFormat: 'DD T'
            //     }
            // },
            y: {
                beginAtZero: true
            }
        }
    }
});

var ctxState = document.getElementById('plotState').getContext('2d');

var myChartState = new Chart(ctxState, {
    type: 'line',
    data: {
        labels: dates,
        datasets: [{
            label: 'Total Cases',
            data: totalCasesStateData,
            radius: 0,
            borderWidth: 3,
            borderColor: ['rgba(255, 255, 255, 0.2)'],
        },
        {
            label: 'Active Cases',
            data: activeCasesStateData,
            radius: 0,
            borderWidth: 3,
            borderColor: ['rgba(255, 255, 0, 0.2)'],
        }, 
        {
            label: 'Deaths',
            data: deathsStateData,
            radius: 0,
            borderWidth: 3,
            borderColor: ['rgba(255, 0, 0, 0.2)'],
        },
        {
            label: 'Recovered',
            data: recoveriesStateData,
            radius: 0,
            borderWidth: 3,
            borderColor: ['rgba(0, 255, 0, 0.2)'],
        }
    ]
    },
    options: {
        scales: {
            // x:{
            //     type: 'time',
            //     time: {
            //         toolTipFormat: 'DD T'
            //     }
            // },
            y: {
                beginAtZero: true
            }
        }
    }
});