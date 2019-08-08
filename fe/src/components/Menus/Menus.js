import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";
const menus = [
  {
    icon: "home",
    name: "统计",
    path: "/"
  },
  {
    icon: "read",
    name: "文章",
    path: "/post"
  },
  {
    icon: "project",
    name: "项目",
    path: "/project"
  },
  {
    icon: "tags",
    name: "标签",
    path: "/tags"
  }
];
const menuItemRender = () => {
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
  };
  render() {
    return (
      <Menu mode="inline" defaultSelectedKeys={["post"]}>
        {menuItemRender()}
      </Menu>
    );
  }
}

export default Menus;
