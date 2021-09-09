let apiUrl = 'https://api.coindesk.com/v1/bpi/historical/close.json'

let myCoinChart;

const resetApi = () => {
    apiUrl = 'https://api.coindesk.com/v1/bpi/historical/close.json'
}

const getApi = apiUrl =>{
    axios.get(apiUrl)
	.then(response => {
        printChart(response.data);
	})
	.catch(err => {
		console.log(err)
	})
}

const printChart = coinData => {
    const dailyData = coinData['bpi']
    const coinDates = Object.keys(dailyData)
    const coinPrices = coinDates.map(date => {
        return dailyData[date]
    })
    dateFrom.value = coinDates[0];
    dateTo.value = coinDates[coinDates.length-1];
    const ctx = document.querySelector('#myChart').getContext('2d');
    myCoinChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: coinDates,
            datasets: [
                {
                    label: 'Bitcoin Price index',
                    backGroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: coinPrices
                }
            ]
        }
    })

    const currency = document.querySelector('#currency').value;
    //get max
    const max = Math.floor(Math.max(...coinPrices)*100)/100;
    const maxVal = document.querySelector('.max')
    maxVal.innerHTML = `Max : ${max} ${currency}`
    //get min
    const min = Math.floor(Math.min(...coinPrices)*100)/100;
    const minVal = document.querySelector('.min')
    minVal.innerHTML = `Min : ${min} ${currency}`
}

getApi(apiUrl);

const dateFrom = document.querySelector('#datefrom');
const dateTo = document.querySelector('#dateto');
let dateStart = '';
let dateEnd = '';
dateFrom.addEventListener('change', e =>{
    dateStart = e.target.value;
    if (dateStart && dateEnd) {
        apiUrl += `?start=${dateStart}&end=${dateEnd}`
        myCoinChart.destroy();
        getApi(apiUrl);
        resetApi();
    }
})
dateTo.addEventListener('change', e => {
    dateEnd = e.target.value;
    if (dateStart && dateEnd) {
        apiUrl += `?start=${dateStart}&end=${dateEnd}`
        myCoinChart.destroy();
        getApi(apiUrl);
        resetApi();
    }
})

const currency = document.querySelector('#currency');

currency.addEventListener('change', e => {
    apiUrl += `?currency=${e.target.value}`
    myCoinChart.destroy();
    getApi(apiUrl);
    resetApi();
})