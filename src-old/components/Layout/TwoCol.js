import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import boostrap components
import { Row, Col } from 'reactstrap';
// Import bootstrap stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';

/*
Looks like:
|'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''|
| ........................................................................... |
| |     Left Column (first child)     | |    Right Column (second child)    | |
| ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''' |
|'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
*/

class TwoCol extends Component {
  render() {
    const {
      col1Align,
      col2Align,
      children,
    } = this.props;

    const leftChild = (children.length > 0 ? children[0] : {});
    const rightChild = (children.length > 1 ? children[1] : {});

    return (
      <Row>
        <Col className={`text-${col1Align}`}>
          {leftChild}
        </Col>
        <Col className={`text-${col2Align}`}>
          {rightChild}
        </Col>
      </Row>
    );
  }
}

TwoCol.propTypes = {
  // Text alignment for the left column
  col1Align: PropTypes.oneOf([
    'left',
    'right',
    'center',
  ]),
  // Text alignment for the right column
  col2Align: PropTypes.oneOf([
    'left',
    'right',
    'center',
  ]),
  /* Must have two children: first child is the item on the left that fills up
   * the ret of the space, the second child is the item that's added on the
   * right
   */
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

TwoCol.defaultProps = {
  col1Align: 'left',
  col2Align: 'right',
};

export default TwoCol;
