import {baseRequest} from "./base-request";

export const newMeta = (coinName, cur) => baseRequest({url: `/pricemultifull?fsyms=${coinName}&tsyms=${cur}`, method: 'GET'})
    .then(res => {if (res.Response === "Error") {
            return undefined
        } else {
            return res['DISPLAY'][coinName][cur]['MKTCAP']
        }
    })
