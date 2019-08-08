import React, { PureComponent } from "react";
import { Layout, Icon } from "antd";
import Menus from "@/components/Menus/Menus";
import HeaderBreadcrumb from "@/components/HeaderBreadcrumb/HeaderBreadcrumb";
import style from "./PageLayout.module.scss";
const { Header, Sider, Content } = Layout;

class PageLayout extends PureComponent {
  constructor(props) {
    super(props);
  }
  state = {
    collapsed: false
  };
  toggle() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    console.log("PageLayout render");
    return (
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
          <Menus />
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
            {this.props.children}
            
          </Content>
        </Layout>
      </Layout>
    );
  }
}

PageLayout.propTypes = {};

export default PageLayout;
