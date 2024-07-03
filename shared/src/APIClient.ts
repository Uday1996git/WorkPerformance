import http, { RequestBody } from 'k6/http';

type APIRequest = {
    baseUrl: string;
    resource?: string;
    queryString?: string;
    body?: RequestBody;
    options: object;
};

export class APIClient {
    private url: string;
    private body: RequestBody;
    private options: object;

    constructor(request: APIRequest) {
        this.url = this.constructUrl(request);
        this.body = JSON.stringify(request.body || {});
        this.options = request.options || {};
    }

    post() {
        return http.post(this.url, this.body, this.options);
    }

    get() {
        return http.get(this.url, this.options);
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
