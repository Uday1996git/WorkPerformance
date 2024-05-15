import http from 'k6/http';



export type Headers = {
    xAuthToken: string,
    xAppToken: string,
    xAppVersion: string,
    contentType: string
}

export class TilePack {
    static getTiles(url: string, headers: Headers) {
        const { xAuthToken, xAppToken, xAppVersion, contentType } = headers
        const params = {
            headers: { 'X-Auth-Token': xAuthToken, 'X-App-Token': xAppToken, 'X-App-Version': xAppVersion, 'Content-Type': contentType }
        }
        return http.get(url, params);
    }

}