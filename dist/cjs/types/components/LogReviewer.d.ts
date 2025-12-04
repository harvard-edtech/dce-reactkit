/**
 * Log reviewer panel that allows users (must be approved admins) to
 *   review logs written by dce-reactkit
 * @author Gabe Abrams
 */
import React from 'react';
import { LogMetadataType } from 'dce-commonkit';
type Props = {
    LogMetadata: LogMetadataType;
    onClose: () => void;
};
declare const LogReviewer: React.FC<Props>;
export default LogReviewer;
