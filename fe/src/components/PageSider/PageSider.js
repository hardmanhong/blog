import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Layout } from "antd";
import PageMenu from "@/containers/PageMenu/PageMenu.container";
import style from "./PageSider.module.scss";
import logo from "./logo.png";
const { Sider } = Layout;

class PageSider extends PureComponent {
  setCollapsed = collapsed => {
    this.props.setCollapsed(collapsed);
  };
  render() {
    const { collapsed } = this.props;
    return (
      <Sider
        breakpoint="lg"
        className={style.sider}
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={this.setCollapsed}
      >
        <div className={style.logo}>
          <img src={logo} alt="" />
        </div>
        <PageMenu />
      </Sider>
    );
  }
}

PageSider.propTypes = {
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func
};

export default PageSider;
