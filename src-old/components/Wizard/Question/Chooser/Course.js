import React, { Component } from 'react';
import PropTypes from 'prop-types';
import initCACCL from 'caccl/client/cached';
import CACCLInstance from 'caccl/APIInstanceClass';

// Import other components
import Chooser from '.';

/**
 * onAnswered is called with the following:
 * {
 *   dropdownItem: dropdownItems[].name OR undefined (if choose button clicked),
 *   value: the chosen course
 * }
 */

class CourseChooser extends Component {
  render() {
    // Deconstruct props
    const {
      title,
      subtitle,
      onAnswered,
      loadMessage,
      buttonTitle,
      buttonColor,
      dropdownTitle,
      dropdownColor,
      dropdownItems,
      filter,
      api,
    } = this.props;

    // Set up chooser
    const getItems = () => {
      return api.user.self.listCourses({ includeTerm: true })
        .then((courses) => {
          // Filter courses
          let filteredCourses = courses;
          if (filter) {
            filteredCourses = courses.filter(filter);
          }

          // Pre-process courses
          // > Add user's role
          // > Divide into terms
          const terms = {}; // Name to [] list of courses
          filteredCourses.forEach((course) => {
            const updatedCourse = course;
            // Get role in course
            updatedCourse.subtitle = 'You\'re a member of this course.';
            if (
              course.enrollments
              && course.enrollments.length > 0
            ) {
              let isTeacher;
              let isTA;
              let isDesigner;
              let isStudent;
              let isObserver;
              course.enrollments.forEach((enrollment) => {
                switch (enrollment.type) {
                  case 'teacher':
                    isTeacher = true;
                    break;
                  case 'ta':
                    isTA = true;
                    break;
                  case 'designer':
                    isDesigner = true;
                    break;
                  case 'student':
                    isStudent = true;
                    break;
                  case 'observer':
                    isObserver = true;
                    break;
                  default:
                    break;
                }
              });
              if (isTeacher) {
                updatedCourse.subtitle = (
                  <span>
                    You&apos;re a
                    <em>  teacher  </em>
                    in this course.
                  </span>
                );
              } else if (isTA) {
                updatedCourse.subtitle = (
                  <span>
                    You&apos;re a
                    <em> TA </em>
                    in this course.
                  </span>
                );
              } else if (isDesigner) {
                updatedCourse.subtitle = (
                  <span>
                    You&apos;re a
                    <em> designer </em>
                    for this course.
                  </span>
                );
              } else if (isStudent) {
                updatedCourse.subtitle = (
                  <span>
                    You&apos;re a
                    <em> student </em>
                    in this course.
                  </span>
                );
              } else if (isObserver) {
                updatedCourse.subtitle = (
                  <span>
                    You&apos;re an
                    <em> observer </em>
                    of this course.
                  </span>
                );
              }
            }

            // Prepare the term
            const termName = course.term.name;
            if (!terms[termName]) {
              terms[termName] = {
                title: termName,
                items: [],
              };
            }
            terms[termName].items.push(updatedCourse);
          });

          // Sort terms
          const termsList = Object.values(terms);
          function _compareFunction(a, b) {
            if (a.title < b.title) {
              return 1;
            }
            if (a.title > b.title) {
              return -1;
            }
            return 0;
          }
          termsList.sort(_compareFunction);

          // Resolve with list of terms
          return Promise.resolve(termsList);
        });
    };

    // Render a chooser
    return (
      <Chooser
        title={title || 'Choose a Course'}
        subtitle={subtitle}
        getItems={getItems}
        onAnswered={onAnswered}
        buttonTitle={buttonTitle}
        buttonColor={buttonColor}
        dropdownTitle={dropdownTitle}
        dropdownColor={dropdownColor}
        dropdownItems={dropdownItems}
        loadMessage={loadMessage || 'Waiting on Canvas'}
      />
    );
  }
}

CourseChooser.propTypes = {
  /* Title of the chooser */
  title: PropTypes.string,
  /* Subtitle of the chooser */
  subtitle: PropTypes.string,
  /* Filter function (for courses.filter) to filter the course list */
  filter: PropTypes.func,
  /* Handler for when the question is answered */
  onAnswered: PropTypes.func.isRequired,
  /* Message to display while loading courses */
  loadMessage: PropTypes.string,
  /* Title of the "choose" button (also displayed if no dropdown) */
  buttonTitle: PropTypes.string,
  /* Color of the "choose" button (also displayed if no dropdown) */
  buttonColor: PropTypes.string,
  /* Title of the dropdown menu (not displayed if no dropdown items) */
  dropdownTitle: PropTypes.string,
  /* Color of the dropdown menu (not displayed if no dropdown items) */
  dropdownColor: PropTypes.string,
  /* Dropdown items (mostly same definition as those in /components/Dropdown)
   *   but also an additional 'name' prop that is passed when the dropdown is
   *   clicked. */
  dropdownItems: PropTypes.arrayOf(PropTypes.object),
  /* CACCL instance to use to get the list of assignment */
  api: PropTypes.instanceOf(CACCLInstance),
};

const { api } = initCACCL();

CourseChooser.defaultProps = {
  api,
  title: 'Choose a Course:',
  subtitle: null,
  filter: null,
  loadMessage: 'Waiting on Canvas',
  buttonTitle: 'Choose',
  buttonColor: 'info',
  dropdownTitle: null,
  dropdownColor: null,
  dropdownItems: null,
};

export default CourseChooser;
