import React, { Component } from "react";
import { HashRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import router from "./router";
import style from "./App.module.css";
const { Header, Sider, Content } = Layout;
class App extends Component {
  state = {
    collapsed: false
  };
  toggle(){
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    const RouteRender = routes =>
      routes.map(route => {
        return (
          <Route
            exact
            key={route.path}
            path={route.path}
            component={route.component}
          />
        );
      });
    const menus = [
      {
        key: "home",
        name: "统计",
        icon: "home",
        to: "/"
      },
      {
        key: "post",
        name: "文章",
        icon: "read",
        to: "/post"
      },

      {
        key: "project",
        name: "项目",
        icon: "project",
        to: "/project"
      },
      {
        key: "tags",
        name: "标签",
        icon: "tags",
        to: "/tags"
      }
    ];
    const menuItemRender = menus =>
      menus.map(menu => {
        return (
          <Menu.Item key={menu.key}>
            <Link to={menu.to}>
              <Icon type={menu.icon} />
              <span>{menu.name}</span>
            </Link>
          </Menu.Item>
        );
      });
    return (
      <HashRouter>
        <Layout className={style.layout}>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            className={style.sider}
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={(collapsed,type)=>{this.setState({collapsed})}}
          >
            <div className={style.logo} />
            <Menu
              className={style.menu}
              mode="inline"
              defaultSelectedKeys={["post"]}
            >
              {menuItemRender(menus)}
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: 0 }}>
              <Icon
                className={style.trigger}
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={()=>{this.toggle()}}
              />
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                minHeight: 280
              }}
            >
              <Switch>{RouteRender(router)}</Switch>
            </Content>
          </Layout>
        </Layout>
      </HashRouter>
    );
  }
}

export default App;
