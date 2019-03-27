import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import file download button
import DownloadLink from 'react-download-link';

// Import glyphs
import Download from './glyph/Download';

// Import bootstrap stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';

/* Download Button Component */
class DownloadButton extends Component {
  // Deconstruct props (see propTypes below for detailed information)
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

    // Render the component
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
  // The title of the button
  text: PropTypes.string,
  // The filename of the download (the name the contents are downloaded as)
  filename: PropTypes.string.isRequired,
  // The contents of the file
  contents: PropTypes.string.isRequired,
  // If true, the button is a bootstrap large button
  large: PropTypes.bool,
  // Margins for the button
  marginLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  marginRight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  marginTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  marginBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

DownloadButton.defaultProps = {
  // Title of the button is 'Download' by default
  text: 'Download',
  // Button is a normal sized bootstrap button by default
  large: false,
  // Button has no margins by default
  marginLeft: null,
  marginRight: null,
  marginTop: null,
  marginBottom: null,
};

export default DownloadButton;
