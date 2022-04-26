import {baseRequest} from "./base-request";

export const getCurrency = (coinName) => baseRequest({url: `/price?fsym=${coinName}&tsyms=USD`, method: 'GET'})
    .then(res => res.USD)
