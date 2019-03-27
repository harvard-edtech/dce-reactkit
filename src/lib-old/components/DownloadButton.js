import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import file download button
import DownloadLink from 'react-download-link';

// Import glyphs
import Download from '../glyphs/Download';

// Import bootstrap stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';

class DownloadButton extends Component {
  render() {
    const {
      text,
      filename,
      contents,
      large,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
    } = this.props;

    return (
      <DownloadLink
        filename={filename}
        exportFile={() => { return contents; }}
        label={
          (
            <span>
              <Download className="mr-2" />
              {text}
            </span>
          )
        }
        tagName="div"
        className={`btn btn-dark text-white${large ? ' btn-lg' : ''}`}
        style={{
          textDecoration: 'none !important',
          marginLeft,
          marginRight,
          marginTop,
          marginBottom,
        }}
      />
    );
  }
}

DownloadButton.propTypes = {
  text: PropTypes.string,
  filename: PropTypes.string.isRequired,
  contents: PropTypes.string.isRequired,
  large: PropTypes.bool,
  marginLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  marginRight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  marginTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  marginBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

DownloadButton.defaultProps = {
  text: 'Download',
  large: false,
  marginLeft: null,
  marginRight: null,
  marginTop: null,
  marginBottom: null,
};

export default DownloadButton;
