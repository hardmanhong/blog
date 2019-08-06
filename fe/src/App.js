import React, { Component } from "react";
import { HashRouter} from "react-router-dom";
import { Layout, Icon } from "antd";
import router from "./router";
import style from "./App.module.css";
import HeaderBreadcrumb from "@/components/HeaderBreadcrumb";
import SwitchRoute from "@/components/SwitchRoute";
import Menus from "@/components/Menus";
const { Header, Sider, Content } = Layout;

class App extends Component {
  state = {
    collapsed: false
  };
  toggle() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
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
            onCollapse={(collapsed, type) => {
              this.setState({ collapsed });
            }}
          >
            <div className={style.logo} />
            <Menus menus={router}></Menus>
          </Sider>
          <Layout style={{ overflowY: "hidden" }}>
            <Header style={{ background: "#fff", padding: 0 }}>
              <Icon
                className={style.trigger}
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={() => {
                  this.toggle();
                }}
              />
            </Header>
            <Content className={style.content}>
              <HeaderBreadcrumb className={style.breadcrumb} />
              <SwitchRoute router={router} />
            </Content>
          </Layout>
        </Layout>
      </HashRouter>
    );
  }
}

export default App;
