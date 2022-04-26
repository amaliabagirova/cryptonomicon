import {observer} from "mobx-react-lite";
import {store} from "./store";

export const App = observer(() => {
    return (
        <div>
            <input value={store.searchInput} onChange={e => store.changeSearchInput(e.target.value)}/>
            <button onClick={store.submitSearch}>search</button>
            {
                store.coins.map((coin) => {
                    return <div>
                        {coin.id}
                        {coin.value}
                    </div>
                })
            }
        </div>
    )
})

