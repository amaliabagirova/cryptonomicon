import {baseRequest1} from "./base-request-cmc";

export const getCMC= (cur, coinName) => baseRequest1({url: `/v2/cryptocurrency/info?symbol=${coinName}`, method: 'GET'})
    .then(res =>{return res['data'][coinName]['0']})

