import {makeAutoObservable} from "mobx";
import {getCurrency} from "./shared/api/get-currency";

class Store {
    constructor() {
        makeAutoObservable(this)
    }

    searchInput = ''
    coins = []

    changeSearchInput = (value) => {
        this.searchInput = value
    }

    createCoin = (coinName, value, ticker) => ({
        id: coinName,
        value,
        ticker,
    })

    createTicker = (coinName) => setInterval(() => getCurrency(coinName)
        .then(res => {
            this.coins.find(coin => coin.id === coinName).value = res
        }), 3000)

    clearTicker = (coinName) => {
        clearInterval(this.coins.find(coin => coin.id === coinName).ticker)
        this.coins = this.coins.filter(coin => coinName !== coin.id)
    }

    submitSearch = () => {
        getCurrency(this.searchInput)
            .then(res => {
                this.coins = [...this.coins, this.createCoin(this.searchInput, res, this.createTicker(this.searchInput))]
                this.clearSearchInput()
            })
    }

    clearSearchInput = () => {
        this.searchInput = ''
    }
}

export const store = new Store()
