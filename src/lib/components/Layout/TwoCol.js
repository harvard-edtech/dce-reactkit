import React, { Component } from 'react';

// Import boostrap components
import { Row, Col } from 'reactstrap';
// Import bootstrap stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';

class TwoCol extends Component {
  render() {
    const { children } = this.props;
    const leftChild = (children.length > 0 ? children[0] : {});
    const rightChild = (children.length > 1 ? children[1] : {});

    return (
      <Row>
        <Col className="text-left">
          {leftChild}
        </Col>
        <Col className="text-right">
          {rightChild}
        </Col>
      </Row>
    );
  }
}

export default TwoCol;
