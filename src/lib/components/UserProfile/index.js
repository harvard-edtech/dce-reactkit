import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import custom styles
import './style.css';

// Import bootstrap stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';

// Import other components
import Alert from '../Alert';

// Import glyphs
import Envelope from '../../glyphs/Envelope';
import IdCard from '../../glyphs/IdCard';

class UserProfile extends Component {
  render() {
    // Deconstruct props
    const {
      user,
      size,
      color,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
    } = this.props;

    // Deconstruct user information
    const {
      name,
      email,
    } = user;
    const sisUserId = user.sis_user_id;
    const avatarURL = user.avatar_url;

    // Dynamically size everything
    let wellWidth = '250px';
    let imageHeight = '150px';
    if (size === 'lg') {
      wellWidth = '500px';
      imageHeight = '300px';
    } else if (size === 'sm') {
      wellWidth = '200px';
      imageHeight = '100px';
    }

    // Set text color to black if color is light
    const textColor = (
      color === 'light'
        ? 'black'
        : undefined
    );

    return (
      <Alert
        className="profile-well"
        style={{
          marginRight,
          marginLeft,
          marginTop,
          marginBottom,
          width: wellWidth,
          color: textColor,
        }}
        color={color}
      >
        <img
          className="img-fluid profile-image"
          src={avatarURL}
          alt={`${name}'s profile`}
          style={{
            height: imageHeight,
          }}
        />
        <div>
          <div>
            <strong>{name}</strong>
          </div>
          <div className="data-container">
            {email && (
              <div
                className="datum-container"
                title={email}
              >
                <div className="icon-container">
                  <Envelope />
                </div>
                {email}
              </div>
            )}
            {sisUserId && (
              <div
                className="datum-container"
                title={sisUserId}
              >
                <div className="icon-container">
                  <IdCard />
                </div>
                {sisUserId}
              </div>
            )}
          </div>
        </div>
      </Alert>
    );
  }
}

UserProfile.propTypes = {
  /* Canvas user object */
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sis_user_id: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  /* Size of the profile */
  size: PropTypes.string,
  /* Bootstrap color of the background of the profile */
  color: PropTypes.string,
};

UserProfile.defaultProps = {
  size: 'md',
  color: 'secondary',
};

export default UserProfile;
