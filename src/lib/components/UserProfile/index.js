import React, { Component } from 'react';
import PropTypes from 'prop-types';
import initCACCL from 'caccl/client/cached';
import CACCLInstance from 'caccl/APIInstanceClass';

import './style.css';

// Import bootstrap components
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
} from 'reactstrap';
// Import bootstrap stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';

// Import other components
import LoadSplash from '../Splash/Load';

const STATUS = {
  LOADING: 'loading',
  ERROR: 'error',
  DISPLAYING: 'displaying',
};

class UserProfile extends Component {
  constructor(props) {
    super(props);

    // Deconstruct props
    const {
      user,
      courseId,
      userId,
      api,
    } = this.props;
    console.log('USER PROFILE!');

    // Check if we need to load the user profile
    if (user) {
      // Already have user. No need to load
      this.state = {
        user,
        status: STATUS.DISPLAYING,
      };
    } else if (userId) {
      // Need to load the user's profile
      this.state = {
        status: STATUS.LOADING,
      };

      // Load via api
      api.course.getUser({
        courseId,
        userId,
        includeAvatar: true,
      })
        .then((fetchedUser) => {
          this.setState({
            user: fetchedUser,
            status: STATUS.DISPLAYING,
          });
        })
        .catch((err) => {
          console.log('Error', err);
          this.setState({
            status: STATUS.ERROR,
          });
        });
    } else {
      // No user information
      this.state = {
        status: STATUS.ERROR,
      };
    }
  }

  loadUser() {
    // Deconstruct props
    const { userId } = this.props;

    this.state = {}
  }

  render() {
    // Deconstruct state
    const {
      loadMessage,
      user,
      err,
      status,
    } = this.state;

    let body;

    // Render error
    if (status === STATUS.ERROR) {
      return (
        <Card>
          <CardBody>
            <CardTitle>
              Oops!
            </CardTitle>
            <CardText>
              We couldn&apos;t load this user&apos;s profile.
            </CardText>
          </CardBody>
        </Card>
      );
    }

    // Render loading
    if (status === STATUS.LOADING) {
      return (
        <Card>
          <CardBody>
            <CardText>
              <LoadSplash
                message={loadMessage}
              />
            </CardText>
          </CardBody>
        </Card>
      );
    }

    // Render user
    if (status === STATUS.DISPLAYING) {
      console.log(user);
      return (
        <div>
        WHOA THERE
          {user.name}asdf
          {user.avatar_url}
        </div>
      );
    }
  }
}

UserProfile.propTypes = {
  user: PropTypes.object,
  userId: PropTypes.number,
  api: PropTypes.instanceOf(CACCLInstance),
};

UserProfile.defaultProps = {
  user: null,
  userId: null,
  api: initCACCL(),
};

export default UserProfile;
