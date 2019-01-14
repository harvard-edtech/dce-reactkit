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
 *   value: the chosen assignment
 * }
 */

class AssignmentChooser extends Component {
  render() {
    // Deconstruct props
    const {
      title,
      subtitle,
      courseId,
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
      return api.course.assignment.list({ courseId })
        .then((assignments) => {
          if (filter) {
            return assignments.filter(filter);
          }
          return assignments;
        });
    };

    // Render a chooser
    return (
      <Chooser
        title={title || 'Choose an Assignment'}
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

AssignmentChooser.propTypes = {
  /* Title of the chooser */
  title: PropTypes.string,
  /* Subtitle of the chooser */
  subtitle: PropTypes.string,
  /* The course ID to query for assignments */
  courseId: PropTypes.number.isRequired,
  /* Filter function (for assignments.filter) to filter the assignment list */
  filter: PropTypes.func,
  /* Handler for when the question is answered */
  onAnswered: PropTypes.func.isRequired,
  /* Message to display while loading assignments */
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

AssignmentChooser.defaultProps = {
  api,
  title: 'Choose an Assignment:',
  subtitle: null,
  filter: null,
  loadMessage: 'Waiting on Canvas',
  buttonTitle: 'Choose',
  buttonColor: 'info',
  dropdownTitle: null,
  dropdownColor: null,
  dropdownItems: null,
};

export default AssignmentChooser;
