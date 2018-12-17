import React, { Component } from 'react';
import PropTypes from 'prop-types';
import initCACCL from 'caccl/client/cached';
import CACCLInstance from 'caccl/APIInstanceClass';

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
      api.course.listStudents({
        courseId,
        includeAvatar: true,
        includeEmail: true,
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
          marginRight="5px"
          marginLeft="5px"
          marginBottom="5px"
        />
      );
    });
    return (
      <div
        className="text-center"
      >
        {profiles}
      </div>
    );
  }
}

Roster.propTypes = {
  /* Array of Canvas users */
  users: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    sis_user_id: PropTypes.string.isRequired,
  }),
  /* The course to pull users from (only valid when users is not included) */
  courseId: PropTypes.number,
  /* Filter function to apply to users (when pulled from course) */
  filter: PropTypes.func,
  /* CACCL instance to use to get the list of assignment */
  api: PropTypes.instanceOf(CACCLInstance),
};

Roster.defaultProps = {
  users: null,
  courseId: null,
  filter: null,
  api: initCACCL(),
};

export default Roster;
