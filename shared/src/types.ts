import http, { RequestBody } from 'k6/http';

export type APIRequest = {
    baseUrl: string;
    resource?: string;
    queryString?: string;
    body?: RequestBody;
    options: object;
};