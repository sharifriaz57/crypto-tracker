export const coinListAPI = () => {
    return `https://api.coingecko.com/api/v3/simple/supported_vs_currencies`
}
export const trendingCoinsAPI = (currency) => {
    return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=15&page=1&sparkline=false&price_change_percentage=24h`;
}
export const CoinsByMarketCapAPI = (currency) => {
    return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=150&page=1&sparkline=false&price_change_percentage=24h`;
}
export const SingleCoinAPI = (name) => {
    return `https://api.coingecko.com/api/v3/coins/${name}`;
}
export const chartDataAPI = (coin, currency, days = 1) => {
    return `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}`;
}