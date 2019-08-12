import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";
const menuItemRender = menus => {
  return menus.map(menu => {
    if (menu.children) {
      return (
        <Menu.SubMenu
          title={
            <span>
              <Icon type={menu.icon} />
              <span>{menu.name}</span>
            </span>
          }
          key={menu.id}
        >
          {menuItemRender(menu.children)}
        </Menu.SubMenu>
      );
    } else {
      return (
        <Menu.Item key={menu.id}>
          <Link to={menu.path}>
            {menu.icon && <Icon type={menu.icon} />}
            <span>{menu.name}</span>
          </Link>
        </Menu.Item>
      );
    }
  });
};
class Menus extends PureComponent {
  static propTypes = {
    menus: PropTypes.array,
    currentMenu: PropTypes.array
  };

  render() {
    const { menus, currentMenu } = this.props;
    console.log("currentMenu", currentMenu);
    return (
      <Menu mode="inline" selectedKeys={currentMenu}>
        {menuItemRender(menus)}
      </Menu>
    );
  }
}

export default Menus;
