/**
 * Stub a server endpoint response
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param [opts.method=GET] http method to stub
 * @param opts.path full pathname to stub
 * @param opts.body body of response if stubbing a successful response
 * @param opts.errorMessage message of error if stubbing a failed response
 * @param [opts.errorCode] error code if stubbing a failed response
 */
declare const stubServerEndpoint: (opts: ({
    method?: ('GET' | 'PUT' | 'DELETE' | 'POST');
    path: string;
} & ({
    body: any;
    errorMessage: undefined;
    errorCode: undefined;
} | {
    body: undefined;
    errorMessage: string;
    errorCode?: string;
}))) => void;
export default stubServerEndpoint;
