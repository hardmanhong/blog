import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Layout, Icon, Row, Col, Badge, Menu, Dropdown } from "antd";
import style from "./PageHeader.module.scss";
import api from "@/api/user";
const { Header } = Layout;
class PageHeader extends PureComponent {
  logout = () => {
    api.logout().then(res => {
      sessionStorage.clear();
      this.props.history.replace("/login");
    });
  };
  render() {
    const username = window.sessionStorage.getItem("username") || "";
    const { collapsed, toggleCollapsed } = this.props;
    return (
      <Header className={style.header}>
        <Row type="flex" justify="space-between">
          <Icon
            className={style.trigger}
            type={collapsed ? "menu-unfold" : "menu-fold"}
            onClick={toggleCollapsed}
          />
          <Col className={style.info}>
            <Dropdown
              overlay={
                <Menu onClick={this.logout}>
                  <Menu.Item key="logout">退出</Menu.Item>
                </Menu>
              }
            >
              <div className={style.user}>{username}</div>
            </Dropdown>
          </Col>
        </Row>
      </Header>
    );
  }
}

PageHeader.propTypes = {
  collapsed: PropTypes.bool,
  toggleCollapsed: PropTypes.func
};

export default withRouter(PageHeader);
