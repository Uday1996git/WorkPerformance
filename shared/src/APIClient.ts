import http, { RequestBody } from 'k6/http';
import { APIRequest } from './types';

export class APIClient {
    private url: string;
    private body: RequestBody;
    private options: object;

    constructor(request: APIRequest) {
        this.url = this.constructUrl(request);
        this.body = JSON.stringify(request.body || {});
        this.options = request.options || {};
        console.log("Final url is --->",this.url)
    }

    post() {
        return http.post(this.url, this.body, this.options);
    }

    get() {
        return http.request('GET', this.url.toString(), null, this.options);
    }

    put() {
        return http.put(this.url, this.body, this.options);
    }

    delete() {
        return http.del(this.url, this.body, this.options);
    }

    private constructUrl(request: APIRequest) {
        let fullUrl = request.baseUrl;
        if (request?.resource) {
            fullUrl += request.resource;
        }
        if (request?.queryString) {
            fullUrl += request.queryString;
        }
        return fullUrl;
    }
}
