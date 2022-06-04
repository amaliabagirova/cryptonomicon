import {makeAutoObservable} from "mobx";
import {getMeta} from "./shared/api/get-meta";
import {getSupply} from "./shared/api/get-supply";
import {getCMC} from "./shared/api/get-cmc";
import {getGlobal} from './shared/api/global-data'


class Store {
    constructor() {
        makeAutoObservable(this)
    }

    searchInput = ''
    coins = []
    globals = []
    errorText = ''
    currencyInput = ''
    isSortedAsc = false


    changeSearchInput = (value) => {
        this.searchInput = value.toUpperCase()
        this.errorText = ''
    }


    createCoin = ({symbol, coinName, value, ticker, currency, meta, mktcap, supply, image}) => ({
        symbol,
        id: coinName,
        value,
        ticker,
        currency,
        meta,
        mktcap,
        supply,
        image
    })

    creatMenu = ({dominanceBtc, dominanceEth, cryptos, exchanges, marketCap, volume}) => ({
        dominanceBtc,
        dominanceEth,
        cryptos,
        exchanges,
        marketCap,
        volume
    })

    createTicker = (coinName, currency) => setInterval(() => getSupply(coinName, currency)
        .then(res => {
            this.coins.find(coin => coin.id === coinName).value = res['PRICE']
        }), 3000)

    clearTicker = (coinName) => {
        clearInterval(this.coins.find(coin => coin.id === coinName).ticker)
        this.coins = this.coins.filter(coin => coinName !== coin.id)
    }

    submitSearch = () => {
        if (!this.coins.some((coin) => this.searchInput === coin.id)) {
            const hello = Promise.all([getSupply(this.searchInput, this.currencyInput), getMeta(this.searchInput, this.currencyInput), getCMC(this.currencyInput, this.searchInput)])
            hello.then(res => {
                if (res[0] === undefined) {
                    this.errorText = 'No results for ' + "\'" + this.searchInput + "\'" + ' in ' + "\'" + this.currencyInput + "\'"
                    clearInterval(this.coins.find(coin => coin.value === undefined).ticker)
                } else {
                    this.coins = [...this.coins, this.createCoin({
                        symbol: res[2]['name'],
                        coinName: this.searchInput,
                        value: res[0]['PRICE'],
                        ticker: this.createTicker(this.searchInput, this.currencyInput),
                        currency: this.currencyInput,
                        meta: res[1],
                        mktcap: res[0]['MKTCAP'],
                        supply: res[0]['CIRCULATINGSUPPLY'],
                        image: res[2]['logo']
                    })]
                }
                this.clearSearchInput()
                this.clearCurrencyInput()
            })
        } else if (this.coins.find((coin) => this.searchInput === coin.id) && (this.coins.find((coin) => this.searchInput === coin.id).currency !== this.currencyInput)) {
            const hello = Promise.all([getSupply(this.searchInput, this.currencyInput), getMeta(this.searchInput, this.currencyInput)])
            hello.then(res => {
                let coinToChange = this.coins.find((coin) => this.searchInput === coin.id)
                clearInterval(coinToChange.ticker)
                coinToChange.value = res[0]['PRICE']
                coinToChange.currency = this.currencyInput
                coinToChange.ticker = this.createTicker(coinToChange.id, coinToChange.currency)
                coinToChange.currencyName = this.currencyInput
                coinToChange.meta = res[1]
                coinToChange.mktcap = res[0]['MKTCAP']
                this.clearSearchInput()
                this.clearCurrencyInput()
            })
        } else {
            this.errorText = 'This token has been already declared'
        }
    }

    clearSearchInput = () => {
        this.searchInput = ''
    }

    changeCurrencyInput = (inputCurrency) => {
        this.currencyInput = inputCurrency.toUpperCase()
    }

    clearCurrencyInput = () => {
        this.currencyInput = ''
    }

    sortValue = () => {
        if (this.isSortedAsc) {
            this.coins.sort((a, b) => (Number(b.value.replace(/[^.\d]/g, "")) - Number(a.value.replace(/[^.\d]/g, ""))))
        } else {
            this.coins.sort((a, b) => (Number(a.value.replace(/[^.\d]/g, "")) - Number(b.value.replace(/[^.\d]/g, ""))))
        }
        this.isSortedAsc = !this.isSortedAsc
    }

    sortMeta = () => {
        if (this.isSortedAsc) {
            this.coins.sort((a, b) => ((((b.meta * 100) / (Number(b.value.replace(/[^.\d]/g, "")))) - 100).toFixed(2) - (((a.meta) / (Number(a.value.replace(/[^.\d]/g, "")))) - 100).toFixed(2)))
        } else {
            this.coins.sort((a, b) => ((((a.meta * 100) / (Number(a.value.replace(/[^.\d]/g, "")))) - 100).toFixed(2) - (((b.meta) / (Number(b.value.replace(/[^.\d]/g, "")))) - 100).toFixed(2)))
        }
        this.isSortedAsc = !this.isSortedAsc
    }
    sortId = () => {
        if (this.isSortedAsc) {
            this.coins.sort()
        } else {
            this.coins.reverse()
        }
        this.isSortedAsc = !this.isSortedAsc
    }

    sortCap = () => {
        if (this.isSortedAsc) {
            this.coins.sort((a, b) => Number(b.value.replace(',', '').slice(2) - a.value.replace(',', '').slice(2)))
        } else {
            this.coins.sort((a, b) => Number(a.value.replace(',', '').slice(2) - b.value.replace(',', '').slice(2)))
            console.log(this.coins.slice())
            debugger
        }
        this.isSortedAsc = !this.isSortedAsc
    }

    sortSupply = () => {
        if (this.isSortedAsc) {
            this.coins.sort((a, b) => b.supply.replace(/[^.\d]/g, " ") - a.supply.replace(/[^.\d]/g, " "))
            console.log(this.coins)
        } else {
            this.coins.sort((a, b) => a.supply.replace(/[^.\d]/g, " ") - b.supply.replace(/[^.\d]/g, " "))
            debugger
            console.log(this.coins)
        }
        this.isSortedAsc = !this.isSortedAsc
    }

    submitSearchTest = () => {
            const helloTest = Promise.all([getGlobal('USD')])
            helloTest.then(res => {
                debugger
                this.globals = [this.creatMenu({
                    dominanceBtc: res['0']['data']['btc_dominance'],
                    dominanceEth: res['0']['data']['eth_dominance'],
                    volume: res['0']['data']['quote']['USD']['total_volume_24h'],
                    cryptos: res['0']['data']['total_cryptocurrencies'],
                    exchanges: res['0']['data']['active_exchanges'],
                    marketCap: res['0']['data']['quote']['USD']['total_market_cap']

                })]
            })
    }
}

export const store = new Store()
