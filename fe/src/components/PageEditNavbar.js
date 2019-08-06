import React, { PureComponent } from "react";
import {withRouter} from 'react-router-dom';
import { Row, Col, Icon } from "antd";
import './PageEditNavbar.scss';
class PageEditNavbar extends PureComponent {
  handleBack() {
    this.props.history.goBack();
    console.log();
  }
  render() {
    return (
      <Row
        className="component-page-edit-navbar"
        type="flex"
        justify="space-between"
        align="middle"
      >
        <Icon
          type="left"
          className="button-back"
          onClick={() => {
            this.handleBack();
          }}
        />
        <Col>{this.props.children}</Col>
      </Row>
    );
  }
}

export default withRouter(PageEditNavbar);
