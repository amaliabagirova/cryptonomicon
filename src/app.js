import {observer} from "mobx-react-lite";
import {store} from "./store";

export const App = observer(() => {
    return (
        <div class='app'>
            <h2>CRYPTO</h2>
            <div class='inputs'>
            <input class="blocktext"
                   id="titleInput"
                   type="text"
                   placeholder="What are you looking for?"
                   maxlength="100"
                   value={store.searchInput}
                   onChange={e => store.changeSearchInput(e.target.value)}
            />
            <input class="secondInput"
                   id="newTitleInput"
                   type="text"
                   placeholder="What currency"
                   maxlength="100"
                   value={store.currencyInput}
                   onChange={(event) => store.changeCurrencyInput(event.target.value)}
                   onKeyDown={event => {
                       if(event.keyCode === 13) {
                           store.submitSearch()
                       }
                   }}

            />
                <button className='subm'
                        className='submit'
                        onClick={store.submitSearch}>
                    Submit
                </button>
            </div>


            <div className='error'>
                {
                    store.errorText
                }
            </div>

            <div class='coin'>Your coins</div>
<table class='table1'>
    <thead>
    <tr>
        <th>#<button className='sort' onClick={store.sortNumber}></button> </th>
        <th>Coin<button className='sort' onClick={store.sortId}></button> </th>
        <th>Price<button className='sort' onClick={store.sortValue}></button></th>
        <th>24h%<button className='sort' onClick={store.sortMeta}></button></th>
        <th>Market Cap<button className='sort' onClick={store.sortCap}></button></th>
        <th>Circulating Supply<button className='sort' onClick={store.sortSupply}></button></th>
    </tr>
    </thead>
    <tbody>
            {
                store.coins.length > 0
                    ?
                    store.coins.map((coin) =>
                    <Crypto
                        coinName={coin.id}
                        value={coin.value}
                        clearTicker={store.clearTicker}
                        currency={coin.currency}
                        meta={coin.meta}
                        number={coin.number}
                        mktcap={coin.mktcap}
                        supply={coin.supply}
                    />
                    )
                    : <div class='emptyList'> Your coin list is empty </div>
            }

    </tbody>
</table>
        </div>
    )
})

function Crypto({coinName, value, clearTicker, meta, number, mktcap, supply}) {
    return <div class='parent'>

    <tr>
        <td>
            {
                number
            }
        </td>

        <td>
            {
                coinName + ' '
            }
        </td>

        <td>
            {
                value.replace(',', ' ')
            }
        </td>

        <td class='color'>

            {
                (((meta*100) / (Number(value.replace(',', '').slice(2)))) - 100).toFixed(2) + '%'
            }
        </td>
        <td>
            {
                mktcap
            }
        </td>
        <td>
            {
                Math.trunc(supply).toLocaleString() + ' ' + coinName
            }
        </td>

        <button class='delete'
                className="delete"
                type='submit'
                onClick={() => clearTicker(coinName)}
        ></button>

    </tr>
    </div>
}


