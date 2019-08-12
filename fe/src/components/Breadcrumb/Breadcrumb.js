import React, { Component } from "react";
import PropsType from "prop-types";
import { Link } from "react-router-dom";
import { Breadcrumb, Icon } from "antd";
import "./Breadcrumb.scss";
class TheBreadcrumb extends Component {
  static propsType = {
    breadcrumb: PropsType.object.isRequired
  };
  render() {
    const { breadcrumb } = this.props;
    return (
      <Breadcrumb className="component-header-breadcrumb">
        {breadcrumb.map((item, index) => {
          if (index === breadcrumb.length - 1) {
            return (
              <Breadcrumb.Item key={item.id}>
                {item.icon ? <Icon type={item.icon} /> : null}
                <span>{item.name}</span>
              </Breadcrumb.Item>
            );
          }
          return (
            <Breadcrumb.Item key={item.id}>
              <Link to={item.path}>
                {item.icon ? <Icon type={item.icon} /> : null}
                <span>{item.name}</span>
              </Link>
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    );
  }
}

export default TheBreadcrumb;
