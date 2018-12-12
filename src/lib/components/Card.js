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
      body,
      children,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
      ...props
    } = this.props;

    return (
      <BootstrapCard
        style={{
          marginLeft,
          marginRight,
          marginTop,
          marginBottom,
        }}
        {...props}
      >
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

export default Card;
