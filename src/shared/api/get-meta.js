import {baseRequest} from "./base-request";

export const getMeta = (coinName, cur) => baseRequest({url: `/pricehistorical?fsym=${coinName}&tsyms=${cur}&ts=${new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0).getTime()}`, method: 'GET'})
    .then(res => {if (res.Response === "Error") {
        return undefined
    } else {
        return res[coinName][cur]
    }})