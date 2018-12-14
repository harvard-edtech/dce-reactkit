import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import LoadSplash from './Splash/Load';
import ErrorSplash from './Splash/Error';
import UserProfile from './UserProfile';

const STATUS = {
  LOADING: 'loading',
  ERROR: 'err',
  DISPLAYING: 'displaying',
};

class Roster extends Component {
  constructor(props) {
    super(props);

    // Deconstruct props
    const {
      users,
      courseId,
      filter,
      api,
    } = props;

    // Pull list of users (if not included)
    if (users) {
      this.state = {
        users,
        status: STATUS.DISPLAYING,
      };
    } else if (courseId) {
      // Pull users from course
      this.state = {
        status: STATUS.LOADING,
      };
      api.course.listEnrollments({
        courseId,
      })
        .then((enrollments) => {
          let loadedUsers = enrollments;
          if (filter) {
            loadedUsers = loadedUsers.filter(filter);
          }
          this.setState({
            users: loadedUsers,
            status: STATUS.DISPLAYING,
          });
        })
        .catch((err) => {
          this.setState({
            err,
            status: STATUS.ERROR,
          });
        });
    } else {
      // No context to pull from
      this.state = {
        status: STATUS.ERROR,
        err: 'No course selected',
      };
    }
  }

  render() {
    // Deconstruct state
    const {
      color,
      size,
      users,
      loadMessage,
      err,
      status,
    } = this.state;

    // Render loader
    if (status === STATUS.LOADING) {
      return (
        <LoadSplash
          message={loadMessage}
        />
      );
    }

    // Render error
    if (status === STATUS.ERROR) {
      return (
        <ErrorSplash
          err={err}
          allowClose
        />
      );
    }

    // Displaying
    const profiles = users.map((user) => {
      return (
        <UserProfile
          user={user}
          color={color}
          size={size}
        />
      );
    });
    return (
      <div>
        {profiles}
      </div>
    );
  }
}

export default Roster;
