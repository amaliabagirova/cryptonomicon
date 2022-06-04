import {baseRequest1} from "./base-request-cmc";

export const getGlobal = (cur) => baseRequest1({url: `/v1/global-metrics/quotes/latest?convert=${cur}`, method: 'GET'})
    .then(res => {
        return res
    })




