import {apiTokenUrlParam, baseUrl} from "./cofnig";

export const baseRequest = ({url, method, body}) =>
    fetch(`${baseUrl}${url}${apiTokenUrlParam}`,
        {
        method, //body: JSON.stringify(body),
    })
        .then((response) => response.json())

