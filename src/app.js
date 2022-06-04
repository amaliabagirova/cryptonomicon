import {observer} from "mobx-react-lite";
import {store} from "./store";

export const App = observer(() => {
    return (
        <div class='app'>
            <h2>CRYPTO</h2>

            {
                store.submitSearchTest()
            }
            {
                    store.globals.map((global) =>
                        <Test
                            dominanceBtc={global.dominanceBtc}
                            dominanceEth={global.dominanceEth}
                            volume={global.volume}
                            cryptos={global.cryptos}
                            exchanges={global.exchanges}
                            marketCap={global.marketCap}
                        />
                    )
            }

            {/*
            <div class='vid-carousel'>
                <div class='video'>
                    <div id='wrap'>
                    <iframe src="https://www.youtube.com/embed/_Mk5QqNpOL4"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen></iframe>
                    </div>
                    <p className='video-sub'>
                        The Capital Conference
                    </p>
                    <p className='video-sub1'>
                        Re-Watch All Keynotes & Panels
                    </p>
                </div>

                <div class='video'>
                    <div id='wrap'>
                    <iframe src="https://www.youtube.com/embed/k9hebFHUGj4"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen></iframe>
                    </div>
                    <p className='video-sub'>
                        Crypto Espresso
                    </p>
                    <p className='video-sub1'>
                        OP Airdrop Goes Live
                    </p>
                </div>
                <div class='video'>
                    <div id='wrap'>
                <iframe src="https://www.youtube.com/embed/LqdVDQUPNeI"
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
                        </div>
                    <p className='video-sub'>
                        How to Create a DAO
                    </p>
                    <p className='video-sub1'>
                        The Definitive Guide
                    </p>
                </div>
                <div className='video'>
                    <div id='wrap'>
                    <iframe src="https://www.youtube.com/embed/cdWPdvoz7fU"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen></iframe>
                    </div>
                    <p className='video-sub'>
                        Welcome to Metaverse
                    </p>
                    <p className='video-sub1'>
                        How are crypto projects using this concept
                    </p>
                </div>

            </div>*/}
<div class='header3'>
            <h3>Today's Cryptocurrency Prices</h3>
            <p class='header3-text'>
                The global crypto market cap is <strong>$1.26T</strong>, a <a><strong>1.87%</strong></a> increase over the last day.
            </p>

</div>
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
                    store.coins.map((coin, index) =>
                    <Crypto
                        image={coin.image}
                        coinName={coin.id}
                        value={coin.value}
                        clearTicker={store.clearTicker}
                        currency={coin.currency}
                        meta={coin.meta}
                        number={index+1}
                        mktcap={coin.mktcap}
                        supply={coin.supply}
                        symbol={coin.symbol}
                    />
                    )
                    : <div class='emptyList'> Your coin list is empty </div>
            }


    </tbody>
</table>
        </div>
    )
})

function Crypto({symbol, coinName, value, clearTicker, meta, number, mktcap, supply, image}) {
    const metaPercent = (((meta*100) / (Number(value.replace(/[^.\d]/g, "")))) - 100).toFixed(2)
    return <div class='parent'>
    <tr>
        <td>
            {
                number
            }
        </td>

        <td class='icons-name'>
            <div class='icon'>
                {
                    <img
                        src={image}
                    />
                }
                {
                    symbol + ' '
                }
                <span class='symbol'>
                {
                    coinName
                }
                </span>

            </div>
        </td>

        <td>
            {
                value[0] + value.replace(/[^.\d]/g, " ")
            }
        </td>



            {
                metaPercent > 0
                ?
                    <td class='colorPos'>{metaPercent + '%'}</td>
                    : <td class='colorNeg'>{metaPercent  + '%'}</td>
            }

        <td>
            {
                mktcap.replace(',', ' ')
            }
        </td>
        <td>
            {
                supply.replace(/[^.\d]/g, " ") + ' ' + coinName
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

function Test({dominanceBtc, dominanceEth, cryptos, exchanges, marketCap, volume}) {
    return <div class='global'>
    <p className='global-stats'>
        <p class='name'> Cryptos:&nbsp;&nbsp; </p>
        <p className='number'>
                {
                    cryptos.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ')

                }
        </p>
        <p className='name'> Exchanges:&nbsp;&nbsp; </p>
        <p className='number'>
                {
                    exchanges

                }
        </p>
        <p className='name'> MarketCap:&nbsp;&nbsp; </p>
        <p className='number'>

                {
                    marketCap.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

                }
        </p>
        <p className='name'> 24 Vol:&nbsp;&nbsp; </p>
        <p className='number'>

                {
                    '$' + volume.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

                }
        </p>
        <p className='name'> Dominance:&nbsp;&nbsp; </p>
        <p className='number'>BTC:&nbsp;

                {
                    dominanceBtc.toFixed(2) + '%'
                }
        </p>

        <p className='number'>ETH:&nbsp;

            {
                    dominanceEth.toFixed(2) + '%'
            }
        </p>
    </p>
    </div>
}




