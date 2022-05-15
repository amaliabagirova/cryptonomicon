import {baseRequest} from "./base-request";

export const getSupply = (coinName, cur) => baseRequest({url: `/pricemultifull?fsyms=${coinName}&tsyms=${cur}`, method: 'GET'})
    .then(res => {debugger
        if (res.Response === "Error") {
            return undefined
    }else {
        return res['RAW'][coinName][cur]['CIRCULATINGSUPPLY']
    }
    })
