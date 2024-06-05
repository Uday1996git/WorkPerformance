import http from 'k6/http';

type APIRequest = {
    baseUrl: string;
    resource: string;
    queryString?: string;
    data?: object;
    options: object;
};

export class APIClient {
    post(request: APIRequest) {
        return http.post(`${request.baseUrl}/${request.resource}`, JSON.stringify(request.data || {}), request.options);
    }

    get(request: APIRequest) {
        const url = request.queryString ? `${request.baseUrl}/${request.resource}?${request.queryString}` : `${request.baseUrl}/${request.resource}`;
        return http.get(url, request.options);

    }

    put(request: APIRequest) {
        const url = request.queryString ? `${request.baseUrl}/${request.resource}?${request.queryString}` : `${request.baseUrl}/${request.resource}`;
        return http.put(url, JSON.stringify(request.data || {}), request.options);
    }

    delete(request: APIRequest) {
        const url = request.queryString ? `${request.baseUrl}/${request.resource}?${request.queryString}` : `${request.baseUrl}/${request.resource}`;
        return http.del(url, {}, request.options);
    }
}
