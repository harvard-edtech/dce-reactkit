import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import bootstrap components
import {
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';
// Import bootstrap stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';

// Import custom styles
import './style.css';

// Import other components
import Alert from '../Alert';

// Import glyphs
import Ellipsis from '../../glyphs/Ellipsis';

class Wizard extends Component {
  constructor(props) {
    super(props);

    // Initialize state
    this.state = {
      currentStep: 0,
      results: {},
    };
  }

  render() {
    // Deconstruct state
    const {
      currentStep,
      results,
    } = this.state;

    // Deconstruct props
    const {
      title,
      subtitle,
      color,
      onFinish,
    } = this.props;

    // Turn children into an array if it isn't already
    let { children } = this.props;
    if (!Array.isArray(children)) {
      children = [children];
    }

    // Pre-process and wrap child
    const currQuestion = children[currentStep];
    const originalOnAnswered = currQuestion.props.onAnswered;
    const wrappedChild = React.cloneElement(currQuestion, {
      onAnswered: (answer) => {
        // Call original onChoose listener
        if (originalOnAnswered) {
          originalOnAnswered(answer);
        }

        // Record answer
        results[currQuestion.props.questionKey] = answer;

        // Finish (if done)
        if (currentStep === children.length - 1) {
          // Done!
          if (onFinish) {
            onFinish(results);
          }
          return;
        }

        // Advance to the next step
        this.setState({
          currentStep: currentStep + 1,
          results,
        });
      },
    });

    // Create breadcrumbs (pages)
    const breadcrumbs = [];
    // Show 4 steps at maximum
    // > Create a function that turns a child into a page item
    const childToPage = (child, index) => {
      let buttonTitle = 'Complete this step to advance';
      if (index < currentStep) {
        buttonTitle = 'Back to this step';
      } else if (index > currentStep) {
        buttonTitle = 'Complete previous steps to advance';
      } else if (
        (index === currentStep)
        && (index === children.length - 1)
      ) {
        buttonTitle = 'Complete this step to finish';
      }
      return (
        <PaginationItem
          disabled={index > currentStep}
          className={(index > currentStep ? 'faded-item' : null)}
          title={buttonTitle}
        >
          <PaginationLink
            href="#"
            className={(index === currentStep ? 'active-link' : 'inactive-link')}
            onClick={() => {
              if (index !== currentStep) {
                // Update current step (jump back in the chain)
                this.setState({
                  currentStep: index,
                });
              }
            }}
          >
            {child.props.stepTitle || `Step ${index + 1}`}
          </PaginationLink>
        </PaginationItem>
      );
    };
    const leavingOutSteps = (children.length > 4);
    let firstStepInBlock = 0;
    let lastStepInBlock = children.length - 1;
    if (leavingOutSteps) {
      if (currentStep === children.length - 1) {
        // On the last step
        firstStepInBlock = Math.max(currentStep - 3, 0);
        lastStepInBlock = currentStep;
      } else if (currentStep === 0) {
        // On the first step
        firstStepInBlock = 0;
        lastStepInBlock = 2;
      } else {
        // On a middle step
        firstStepInBlock = currentStep - 1;
        lastStepInBlock = currentStep + 1;
      }
    }
    // Add start ellipses
    if (firstStepInBlock > 0) {
      // Skipping at least one child
      // > Add initial child (for start over)
      breadcrumbs.push(childToPage(children[0], 0));
      // > Add '...'
      breadcrumbs.push((
        <PaginationItem
          style={{ opacity: 0.7 }}
          disabled
        >
          <PaginationLink>
            <Ellipsis
              style={{ color: '#aaa' }}
            />
          </PaginationLink>
        </PaginationItem>
      ));
    }
    // Add block of steps
    for (let i = firstStepInBlock; i <= lastStepInBlock; i++) {
      breadcrumbs.push(childToPage(children[i], i));
    }
    // Add end ellipses
    if (lastStepInBlock < children.length - 1) {
      // > Add '...'
      breadcrumbs.push((
        <PaginationItem
          style={{ opacity: 0.7 }}
          disabled
        >
          <PaginationLink>
            <Ellipsis
              style={{ color: '#aaa' }}
            />
          </PaginationLink>
        </PaginationItem>
      ));
    }

    // Render wizard
    return (
      <Alert
        color={color}
        className="mb-2 pb-0 text-center"
      >
        <h4>
          {title}
        </h4>
        {subtitle && (
          <div>
            {subtitle}
          </div>
        )}
        <Pagination
          style={{
            justifyContent: 'center',
            whiteSpace: 'nowrap',
          }}
          className="mb-0"
          aria-label="Steps navigator"
        >
          {breadcrumbs}
        </Pagination>
        {wrappedChild}
      </Alert>
    );
  }
}

Wizard.propTypes = {
  /* Title of the wizard */
  title: PropTypes.string,
  /* Subtitle of the wizard */
  subtitle: PropTypes.string,
  /* Bootstrap color of the wizard (background) */
  color: PropTypes.string,
  /* Handler to call when wizard is complete */
  onFinish: PropTypes.func.isRequired,
  /* The child questions of the wizard (shown one-by-one) */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Wizard.defaultProps = {
  title: 'Complete these steps to continue:',
  subtitle: null,
  color: 'info',
};

export default Wizard;
