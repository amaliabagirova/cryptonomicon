import {apiTokenUrlParam1, baseUrl1} from "./cofnig-cmc";


export const baseRequest1 = ({url, method, body}) =>
    fetch(`${baseUrl1}${url}${apiTokenUrlParam1}`,
        {
            method, //body: JSON.stringify(body),
        })
        .then((response) => response.json())


