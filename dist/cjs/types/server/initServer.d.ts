type GetLaunchInfoFunction = (req: any) => {
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
 * Get log collection
 * @author Gabe Abrams
 * @returns log collection if one was included during launch or null if we don't
 *   have a log collection (yet)
 */
export declare const internalGetLogCollection: () => any;
/**
 * Get cross-server credential collection
 * @author Gabe Abrams
 * @return cross-server credential collection if one was included during launch or null
 *   if we don't have a cross-server credential collection (yet)
 */
export declare const internalGetCrossServerCredentialCollection: () => any;
/**
 * Prepare dce-reactkit to run on the server
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.app express app from inside of the postprocessor function that
 *   we will add routes to
 * @param opts.getLaunchInfo CACCL LTI's get launch info function
 * @param [opts.logCollection] mongo collection from dce-mango to use for
 *   storing logs. If none is included, logs are written to the console
 * @param [opts.logReviewAdmins=all] info on which admins can review
 *   logs from the client. If not included, all Canvas admins are allowed to
 *   review logs. If null, no Canvas admins are allowed to review logs.
 *   If an array of Canvas userIds (numbers), only Canvas admins with those
 *   userIds are allowed to review logs. If a dce-mango collection, only
 *   Canvas admins with entries in that collection ({ userId, ...}) are allowed
 *   to review logs
 * @param [opts.crossServerCredentialCollection] mongo collection from dce-mango to use for
 *   storing cross-server credentials. If none is included, cross-server credentials
 *   are not supported
 */
declare const initServer: (opts: {
    app: any;
    getLaunchInfo: GetLaunchInfoFunction;
    logCollection?: any;
    logReviewAdmins?: (number[] | any);
    crossServerCredentialCollection?: any;
}) => void;
export default initServer;
