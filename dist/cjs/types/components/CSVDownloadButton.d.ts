/**
 * Button for downloading a csv file
 * @author Gabe Abrams
 */
import React from 'react';
type Props = {
    filename: string;
    csv: string;
    id?: string;
    className?: string;
    ariaLabel?: string;
    style?: {
        [k: string]: any;
    };
    onClick?: () => void;
    children?: React.ReactNode;
};
declare const CSVDownloadButton: React.FC<Props>;
export default CSVDownloadButton;
