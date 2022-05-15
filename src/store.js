import {makeAutoObservable} from "mobx";
import {getCurrency} from "./shared/api/get-currency";
import {getMeta} from "./shared/api/get-meta";
import {newMeta} from "./shared/api/new-meta";
import {getSupply} from "./shared/api/get-supply";

class Store {
    constructor() {
        makeAutoObservable(this)
    }

    searchInput = ''
    coins = []
    errorText = ''
    currencyInput =''
    isSortedAsc = false
    number=0

    changeSearchInput = (value) => {
        this.searchInput = value.toUpperCase()
        this.errorText = ''
    }

    createCoin = ({coinName, value, ticker, currency, meta, number, mktcap, supply}) => ({
        id: coinName,
        value,
        ticker,
        currency,
        meta,
        number,
        mktcap,
        supply
    })

    createTicker = (coinName, currency) => setInterval(() => getCurrency(coinName, currency)
        .then(res => {
            this.coins.find(coin => coin.id === coinName).value = res
        }), 3000)

    clearTicker = (coinName) => {
        clearInterval(this.coins.find(coin => coin.id === coinName).ticker)
        this.coins = this.coins.filter(coin => coinName !== coin.id)
    }

    submitSearch = () => {
        if(!this.coins.some((coin) => this.searchInput === coin.id)) {
            const hello = Promise.all([getCurrency(this.searchInput, this.currencyInput), getMeta(this.searchInput, this.currencyInput), newMeta(this.searchInput, this.currencyInput), getSupply(this.searchInput, this.currencyInput)])
            hello.then(res => {
                debugger
                if (res[0] === undefined) {
                    this.errorText = 'No results for ' + "\'" + this.searchInput + "\'"
                    clearInterval(this.coins.find(coin => coin.value === undefined).ticker)
                } else {
                    debugger
                    this.coins = [...this.coins, this.createCoin({coinName: this.searchInput, value: res[0], ticker: this.createTicker(this.searchInput, this.currencyInput), currency: this.currencyInput, meta: res[1], number: ++this.number, mktcap: res[2], supply: res[3]})]
                }
                this.clearSearchInput()
                this.clearCurrencyInput()
            })
        } else if (this.coins.find((coin) => this.searchInput === coin.id) && (this.coins.find((coin) => this.searchInput === coin.id).currency !== this.currencyInput)) {
            const hello = Promise.all([getCurrency(this.searchInput, this.currencyInput), getMeta(this.searchInput, this.currencyInput), newMeta(this.searchInput, this.currencyInput), getSupply(this.searchInput, this.currencyInput)])
            hello.then(res => {
                let coinToChange = this.coins.find((coin) => this.searchInput === coin.id)
                clearInterval(coinToChange.ticker)
                coinToChange.value = res[0]
                coinToChange.currency = this.currencyInput
                coinToChange.ticker = this.createTicker(coinToChange.id, coinToChange.currency)
                coinToChange.currencyName = this.currencyInput
                coinToChange.meta = res[1]
                coinToChange.mktcap = res[2]
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
            this.coins.sort((a, b) => b.value - a.value)
        } else {
            this.coins.sort((a, b) => a.value - b.value.slice)
        }
        this.isSortedAsc = !this.isSortedAsc
    }
    sortMeta = () => {
        if (this.isSortedAsc) {
            this.coins.sort((a, b) => b.meta - a.meta)
        } else {
            this.coins.sort((a, b) => a.meta - b.meta)
        }
        this.isSortedAsc = !this.isSortedAsc
    }
    sortId = () => {
        if (this.isSortedAsc) {
            this.coins.sort((a, b) => b.id - a.id)
        } else {
            this.coins.sort((a, b) => a.id - b.id)
        }
        this.isSortedAsc = !this.isSortedAsc
    }

    sortNumber = () => {
        if (this.isSortedAsc) {
            this.coins.sort((a, b) => b.number - a.number)
        } else {
            this.coins.sort((a, b) => a.number - b.number)
        }
        this.isSortedAsc = !this.isSortedAsc
    }

    sortCap = () => {
        if (this.isSortedAsc) {
            this.coins.sort((a, b) => b.mktcap- a.mktcap)
        } else {
            this.coins.sort((a, b) => a.mktcap - b.mktcap)
            console.log(this.coins.slice())
            debugger
        }
        this.isSortedAsc = !this.isSortedAsc
    }

    sortSupply = () => {
        if (this.isSortedAsc) {
            this.coins.sort((a, b) => b.supply - a.supply)
            console.log(this.coins)
        } else {
            this.coins.sort((a, b) => a.supply - b.supply)
            debugger
            console.log(this.coins)
        }
        this.isSortedAsc = !this.isSortedAsc
    }



}

export const store = new Store()
