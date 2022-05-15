import {baseRequest} from "./base-request";

export const getCurrency = (coinName, cur) => baseRequest({url: `/pricemultifull?fsyms=${coinName}&tsyms=${cur}`, method: 'GET'})
    .then(res => {return res['DISPLAY'][coinName][cur]['PRICE']})



