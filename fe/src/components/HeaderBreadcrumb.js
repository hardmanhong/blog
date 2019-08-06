import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Breadcrumb, Icon } from "antd";
import "./HeaderBreadcrumb.scss";
class HeaderBreadcrumb extends Component {
  render() {
    return (
      <Breadcrumb className="component-header-breadcrumb">
        <Link to="/">
          <Breadcrumb.Item>
            <Icon type="home" />
          </Breadcrumb.Item>
        </Link>
        <Link to="/post">
          <Breadcrumb.Item>
            <Icon type="read" />
            <span>文章</span>
          </Breadcrumb.Item>
        </Link>
        <Breadcrumb.Item>
          <span>新文章</span>
        </Breadcrumb.Item>
      </Breadcrumb>
    );
  }
}

export default HeaderBreadcrumb;
