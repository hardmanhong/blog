import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";

const menuItemRender = menus => {
  return menus.map(menu => {
    if (menu.children) {
      return (
        <Menu.SubMenu
          key={menu.id}
          title={
            <span>
              {menu.icon && <Icon type={menu.icon} />}
              <span>{menu.name}</span>
            </span>
          }
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
  componentDidMount() {
    const { selectedMenuKeys, openMenuKeys } = this.props;
    console.log('componentDidMount',selectedMenuKeys,openMenuKeys)
  }
  render() {
    const { menus, selectedMenuKeys, openMenuKeys } = this.props;
    // const theselectedMenuKeys = ['2','3','4'];
    // const theopenMenuKeys = ['2','3'];

    return (
      <Menu
        mode="inline"
        defaultSelectedKeys={[...selectedMenuKeys]}
        defaultOpenKeys={[...openMenuKeys]}
      >
        {menuItemRender(menus)}
      </Menu>
    );
  }
}

export default Menus;
