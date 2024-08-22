export const generateRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min) + min);
}

export const getHeaders = (): object => {

    const X_AUTH_TOKEN = __ENV['X_AUTH_TOKEN'],
        X_APP_TOKEN = __ENV['X_APP_TOKEN'],
        X_APP_VERSION = __ENV['X_APP_VERSION'];

    // contentType = contentType || 'application/json';

    return { 'X-Auth-Token': X_AUTH_TOKEN, 'X-App-Token': X_APP_TOKEN, 'X-App-Version': X_APP_VERSION, 'Content-Type': 'application/json' }
}