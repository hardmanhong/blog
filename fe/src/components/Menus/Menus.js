import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";

class Menus extends PureComponent {
  static propTypes = {
    menus: PropTypes.array,
    currentMenu: PropTypes.array
  };
  handleItemClick = ({ item, key, keyPath, domEvent }) => {
    console.log(item);
  };
  handleItemClick = ({ item, key, keyPath, domEvent }) => {
    console.log(item);
  };

  render() {
    const menuItemRender = menus => {
      return menus.map(menu => {
        if (menu.children) {
          return (
            <Menu.SubMenu
              title={
                <span>
                  {menu.icon && <Icon type={menu.icon} />}
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
            <Menu.Item key={menu.id} onClick={this.handleItemClick}>
              <Link to={menu.path}>
                {menu.icon && <Icon type={menu.icon} />}
                <span>{menu.name}</span>
              </Link>
            </Menu.Item>
          );
        }
      });
    };
    const { menus, currentMenu } = this.props;
    const defaultSelectedKeys = currentMenu.length ? currentMenu :["1"];
    const defaultOpenKeys = currentMenu.length ? currentMenu.slice(0, currentMenu.length - 1) : ["1"];
    console.log('defaultSelectedKeys',defaultSelectedKeys)
    console.log('defaultOpenKeys',defaultOpenKeys)
    return (
      <Menu
        mode="inline"
        defaultSelectedKeys={defaultSelectedKeys}
        defaultOpenKeys={defaultOpenKeys}
      >
        {menuItemRender(menus)}
      </Menu>
    );
  }
}

export default Menus;
