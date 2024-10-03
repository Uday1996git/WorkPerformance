import { APIClient } from 'shared';
const otplib = require('otplib');

export class connectPlots {

    static getOTP(){
        const secret = 'ntbrevh56mnifpxy';
        const otp = otplib.authenticator.generate(secret);
        console.log(otp)
        return otp
    }

    static getConnect(url: string, headers: object, params: { [key: string]: any }){//queryString: string) {
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

    static postConnect(url: string, headers: object, body: any) {
        const params = {
            headers,
            body
        }
        // return http.get(url, params);
        return new APIClient({ baseUrl: url, options: params, body }).post();
    }

}