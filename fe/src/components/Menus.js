import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";
const menuItemRender = menus => {
  return menus.map(menu => {
    return (
      <Menu.Item key={menu.path}>
        <Link to={menu.path}>
          <Icon type={menu.icon} />
          <span>{menu.name}</span>
        </Link>
      </Menu.Item>
    );
  });
};
class Menus extends PureComponent {
  static propTypes = {
    menus: PropTypes.array
  }
  render() {
    return (
      <Menu mode="inline" defaultSelectedKeys={["post"]}>
        {menuItemRender(this.props.menus)}
      </Menu>
    );
  }
}

export default Menus;
