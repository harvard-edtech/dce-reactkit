declare type GetLaunchInfoFunction = (req: any) => {
    launched: boolean;
    launchInfo?: any;
};
/**
 * Get launch info via CACCL
 * @author Gabe Abrams
 * @param req express request object
 * @returns object { launched, launchInfo }
 */
export declare const cacclGetLaunchInfo: GetLaunchInfoFunction;
/**
 * Prepare dce-reactkit to run on the server
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.getLaunchInfo CACCL LTI's get launch info function
 */
declare const initServer: (opts: {
    getLaunchInfo: GetLaunchInfoFunction;
}) => void;
export default initServer;
