import React, { Component } from "react";
import { Layout } from "antd";
import PageSider from "../PageSider/PageSider";
import PageHeader from "../PageHeader/PageHeader";
import Breadcrumb from "@/containers/Breadcrumb/Breadcrumb.container";
import style from "./PageLayout.module.scss";
const { Content } = Layout;

class PageLayout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("PageLayout render");
    const { collapsed, setCollapsed, toggleCollapsed } = this.props;
    return (
      <Layout className={style.layout}>
        <PageSider collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout style={{ overflowY: "hidden" }}>
          <PageHeader collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
          <Content className={style.content}>
            <Breadcrumb className={style.breadcrumb} />
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

PageLayout.propTypes = {};

export default PageLayout;
