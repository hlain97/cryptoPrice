// const img = document.querySelector('img');
// const newCatButton = document.querySelector('button');
// const searchBar = document.querySelector('input')

// let newImage = function(){
// fetch('https://api.giphy.com/v1/gifs/translate?api_key=eypozQYRZaWmVoPazCLPPZbwQCZfTfiT&s=cat', {mode: 'cors'})
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(response){
//         img.src = response.data.images.original.url
//     });
// }


const mainBox = document.getElementById('boxer')
const tokenName = document.getElementById('tokenName')
const tokenPrice = document.getElementById('tokenPrice')
const tokenMarketCap = document.getElementById('tokenMarketCap')
const searchBar = document.getElementById('searchBar')
const searchButton = document.getElementById('searchButton')
let priceChart = null;
// const proxy = 'https://corsproxy.io/?';


async function currentPrice(){
    try {
        
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=${searchBar.value}&include_market_cap=true`, {mode: 'cors'});
        const chartResponse = await fetch(`https://api.coingecko.com/api/v3/coins/${searchBar.value}/market_chart?vs_currency=usd&days=1`, {mode: 'cors'});

    const data = await response.json();
    const coinName = createDataBox('Name', `${searchBar.value}`.toUpperCase());
    const coinPriceBox = createDataBox('Price', `$${data[searchBar.value].usd}`);
    const coinMarketCap = createDataBox('Market Cap', `$${Math.round(data[searchBar.value].usd_market_cap).toLocaleString()}`);

    tokenName.textContent = coinName;
    tokenPrice.textContent = coinPriceBox;
    tokenMarketCap.textContent = coinMarketCap;

    const chartData = await chartResponse.json(); // 
    const prices = chartData.prices;

// Split into separate arrays
    const labels = prices.map(p => new Date(p[0]).toLocaleTimeString());
    const values = prices.map(p => p[1]);

// Create chart
    const ctx = document.getElementById('priceChart').getContext('2d');
    
if (priceChart) {
    priceChart.destroy(); // Destroy previous chart if it exists
}

priceChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: `${searchBar.value.toUpperCase()} Price (USD)`,
            data: values,
            borderColor: 'red',
            backgroundColor: 'rgba(0,255,0,0.1)',
            tension: 0.2
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: '#fff'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#fff'
                }
            },
            y: {
                ticks: {
                    color: '#fff'
                }
            }
        }
    }
});


    } catch (error){
    console.log('error fetching price:', error)
    }
}

searchBar.addEventListener('keydown', (e) => {
    if(e.key == 'Enter' && searchBar.value !== ''){
        currentPrice()
    }
})

searchButton.addEventListener('click', () => {
    if(searchBar.value !== ''){
        currentPrice()
    }
})


function createDataBox(label, value){
return `${label}: ${value}`;
}

async function currentPriceDefault(){
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=bitcoin&include_market_cap=true`, {mode: 'cors'});
        const chartResponse = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1`, {mode: 'cors'});

    const data = await response.json();
    const coinName = createDataBox('Name', `BITCOIN`.toUpperCase());
    const coinPriceBox = createDataBox('Price', `$${data.bitcoin.usd}`);
    const coinMarketCap = createDataBox('Market Cap', `$${Math.round(data.bitcoin.usd_market_cap).toLocaleString()}`);

    tokenName.textContent = coinName;
    tokenPrice.textContent = coinPriceBox;
    tokenMarketCap.textContent = coinMarketCap;

    const chartData = await chartResponse.json();
    const prices = chartData.prices;

// Split into separate arrays
    const labels = prices.map(p => new Date(p[0]).toLocaleTimeString());
    const values = prices.map(p => p[1]);

// Create chart
    const ctx = document.getElementById('priceChart').getContext('2d');
    
if (priceChart) {
    priceChart.destroy();
}

priceChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: `BITCOIN Price (USD)`,
            data: values,
            borderColor: 'red',
            backgroundColor: 'rgba(0,255,0,0.1)',
            tension: 0.2
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: '#fff'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#fff'
                }
            },
            y: {
                ticks: {
                    color: '#fff'
                }
            }
        }
    }
});


    } catch (error){
    console.log('error fetching price:', error)
    }
}

currentPriceDefault()