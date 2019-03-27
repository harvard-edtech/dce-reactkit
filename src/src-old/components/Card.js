import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import bootstrap components
import {
  Card as BootstrapCard,
  CardHeader,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'reactstrap';
// Import bootstrap stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';

class Card extends Component {
  render() {
    // Extract properties
    const {
      title,
      subtitle,
      children,
      ...props
    } = this.props;

    return (
      <BootstrapCard {...props}>
        {title && (
          <CardHeader>
            <CardTitle className="mb-0">
              {title}
            </CardTitle>
            {subtitle && (
              <CardSubtitle className="mt-1">
                {subtitle}
              </CardSubtitle>
            )}
          </CardHeader>
        )}
        <CardBody>
          {children}
        </CardBody>
      </BootstrapCard>
    );
  }
}

Card.propTypes = {
  /* The title of the card */
  title: PropTypes.string,
  /* The subtitle of the card */
  subtitle: PropTypes.string,
  /* Children/body of the card */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Card.defaultProps = {
  title: null,
  subtitle: null,
};

export default Card;
