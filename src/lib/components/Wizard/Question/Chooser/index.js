import React, { Component } from 'react';
import PropTypes from 'prop-types';
import genUUID from 'uuid/v1';

// Import other components
import Question from '..';
import ErrorSplash from '../../../Splash/Error';
import LoadSplash from '../../../Splash/Load';
import Well from '../../../Well';
import Button from '../../../Button';
import Dropdown from '../../../Dropdown';
import RightAddonLayout from '../../../Layout/RightAddon';

// Import glyphs
import WarningTriangle from '../../../../glyphs/WarningTriangle';
import Cog from '../../../../glyphs/Cog';

// Import helper functions
import genGetItemsPromise from './helpers/genGetItemsPromise';
import divideIntoSections from './helpers/divideIntoSections';
import preprocessSections from './helpers/preprocessSections';

const STATUS = {
  LOADING: 'loading',
  ERROR: 'error',
  CHOOSING: 'choosing',
};

/**
 * onAnswered is called with the following:
 * {
 *   dropdownItem: dropdownItems[].name OR undefined (if choose button clicked),
 *   value: the chosen item
 * }
 */

class Chooser extends Component {
  constructor(props) {
    super(props);

    // Initialize state
    this.state = {
      status: STATUS.LOADING,
    };

    // Bind functions
    this.onOptionChosen = this.onOptionChosen.bind(this);
    this.fetchOptions = this.fetchOptions.bind(this);
  }

  componentDidMount() {
    this.fetchOptions();
  }

  onOptionChosen(sectionIndex, optionIndex, itemName) {
    const { onAnswered } = this.props;
    const { sections } = this.state;

    if (sections) {
      onAnswered({
        dropdownItem: itemName,
        value: sections[sectionIndex].items[optionIndex],
      });
    }
  }

  fetchOptions() {
    // Set state
    this.setState({
      status: STATUS.LOADING,
    });

    // Deconstruct props
    const {
      items,
      getItems,
    } = this.props;

    // Wait for list of items
    genGetItemsPromise(items, getItems)
      .then((loadedOptions) => {
        const sections = divideIntoSections(loadedOptions);
        const preprocessedSections = preprocessSections(sections);

        // Save options to state
        this.setState({
          sections: preprocessedSections,
          status: STATUS.CHOOSING,
        });
      })
      .catch((err) => {
        // Error occurred while getting options
        this.setState({
          err,
          status: STATUS.ERROR,
        });
      });
  }

  render() {
    // Deconstruct state
    const {
      status,
      err,
      sections,
    } = this.state;

    // Deconstruct props
    const {
      title,
      subtitle,
      loadMessage,
      buttonTitle,
      buttonColor,
      dropdownTitle,
      dropdownColor,
      dropdownItems,
    } = this.props;

    let body;

    // Render error
    if (status === STATUS.ERROR) {
      const errorButtons = [{
        text: 'Try Again',
        color: 'primary',
        onClick: () => {
          this.fetchOptions();
        },
      }];
      body = (
        <ErrorSplash
          err={err}
          buttons={errorButtons}
        />
      );
    }

    // Render loading
    if (status === STATUS.LOADING) {
      body = (
        <LoadSplash
          message={loadMessage}
        />
      );
    }

    // Render options
    if (status === STATUS.CHOOSING) {
      let atLeastOneOption = false;
      const sectionElements = sections.map((section, sectionIndex) => {
        // Create all option elements in the section
        const optionWells = section.items.map((option, optionIndex) => {
          // Create option element

          let button;
          let dropdown;
          if (dropdownItems) {
            dropdown = (
              <Dropdown
                title={dropdownTitle || (
                  <Cog />
                )}
                rightAligned
                inline
                color={dropdownColor}
                items={dropdownItems.map((item) => {
                  return {
                    text: item.text,
                    divider: item.divider,
                    header: item.header,
                    disabled: item.disabled,
                    onClick: () => {
                      this.onOptionChosen(sectionIndex, optionIndex, item.name);
                    },
                  };
                })}
              />
            );
          }
          if (buttonTitle || buttonColor || !dropdownItems) {
            button = (
              <Button
                text={buttonTitle || 'Choose'}
                color={buttonColor || 'info'}
                className={dropdownItems ? 'mr-1' : null}
                onClick={() => {
                  this.onOptionChosen(sectionIndex, optionIndex);
                }}
                title={`${buttonTitle} - ${option.title}`}
              />
            );
          }

          atLeastOneOption = true;
          return (
            <Well
              key={genUUID()}
            >
              <RightAddonLayout>
                <div>
                  <h5>
                    {option.title}
                  </h5>
                  {option.subtitle && (
                    <p className="mb-0 mt-0">{option.subtitle}</p>
                  )}
                </div>
                <div className="text-nowrap">
                  {button}
                  {dropdown}
                </div>
              </RightAddonLayout>
            </Well>
          );
        });


        // Create section element
        return (
          <div key={genUUID()}>
            {section.title && (
              <h5 className="text-center">
                {section.title}
              </h5>
            )}
            {optionWells}
          </div>
        );
      });

      if (atLeastOneOption) {
        body = (
          <div>
            {sectionElements}
          </div>
        );
      } else {
        body = (
          <div>
            <WarningTriangle />
            &nbsp;No options to choose from.
          </div>
        );
      }
    }

    return (
      <Question
        title={title}
        subtitle={subtitle}
      >
        {body}
      </Question>
    );
  }
}

Chooser.propTypes = {
  /* Title of the chooser */
  title: PropTypes.string,
  /* Subtitle of the chooser */
  subtitle: PropTypes.string,
  /* Handler for when the question is answered */
  onAnswered: PropTypes.func.isRequired,
  /* Message to display while loading items */
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
  /* The list of items to display (this or getItems should be included) */
  items: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object), /* The list of items */
    PropTypes.func, /* a function that returns the list of items */
  ]),
  /* A promise that resolves with the list of items (this or items should be
   *   included) */
  getItems: PropTypes.oneOfType([
    PropTypes.instanceOf(Promise), /* Promise that resolves to items */
    PropTypes.func, /* a function that returns the Promise */
  ]),
};

Chooser.defaultProps = {
  title: 'Choose an Item:',
  subtitle: null,
  loadMessage: 'Loading Items',
  buttonTitle: 'Choose',
  buttonColor: 'info',
  dropdownTitle: null,
  dropdownColor: null,
  dropdownItems: null,
  items: null,
  getItems: null,
};

export default Chooser;
