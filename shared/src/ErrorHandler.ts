type ErrorData = {
    url: string;
    status: number;
    error_code: string;
    traceparent: string | undefined;
    [key: string]: any;
};

type LogErrorDetails = (errorData: ErrorData) => void;

export class ErrorHandler {
    logErrorDetails: LogErrorDetails;

    constructor(logErrorDetails: LogErrorDetails) {
        this.logErrorDetails = logErrorDetails;
    }

    logError(isError: boolean, res: any, tags: object = {}) {
        if (!isError) return;

        const traceparentHeader = res.request.headers['Traceparent'];
        const errorData: ErrorData = Object.assign(
            {
                url: res.url,
                status: res.status,
                error_code: res.error_code,
                traceparent: traceparentHeader && traceparentHeader.toString(),
            },
            tags
        );
        this.logErrorDetails(errorData);
    }
}

// Creating and exporting console.error.
const errorHandler = new ErrorHandler((error) => { console.error(error); });
export { errorHandler };

// Extend and create different error handlers based on requirement(Splunk Integration)