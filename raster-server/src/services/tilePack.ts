import { APIClient } from 'shared';


export class TilePack {
    static getTiles(url: string, headers: object) {
        const params = {
            headers
        }
        // return http.get(url, params);
        return new APIClient({ baseUrl: url, options: params }).get();
    }

}