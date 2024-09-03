import { APIClient } from 'shared';


export class TilePack {
    static getTiles(url: string, headers: object, params: { [key: string]: any }){//queryString: string) {
        const queryString = `?${Object.keys(params).map(key => `${key}=${params[key]}`).join("&")}`;
        // url += `?${queryString}`;
        // const queryParamArray = Object.keys(params).map((key) => `${key}=${params[key]}`);
        // let queryParamString = url;
        // for (let i = 0; i < queryParamArray.length; i++) {
        //     if (i > 0) {
        //         queryParamString += "&";
        //     }
        //     queryParamString += queryParamArray[i];
        // }
        // url += `?${queryParamString}`;
        const options = {
            headers
        }
        // return http.get(url, params);
        return new APIClient({ baseUrl: url, options, queryString }).get();
    }

    static postTiles(url: string, headers: object, body: any) {
        const params = {
            headers,
            body
        }
        // return http.get(url, params);
        return new APIClient({ baseUrl: url, options: params, body }).post();
    }

}