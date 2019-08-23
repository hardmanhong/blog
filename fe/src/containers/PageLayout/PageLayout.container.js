import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PageLayoutComponent from "@/components/PageLayout/PageLayout";
import { setCollapsed, toggleCollapsed } from "./PageLayout.action";
class PageLayout extends PureComponent {
  render() {
    const { setCollapsed, toggleCollapsed, collapsed,children } = this.props;
    return (
      <PageLayoutComponent
        setCollapsed={setCollapsed}
        toggleCollapsed={toggleCollapsed}
        collapsed={collapsed}
      >{children}</PageLayoutComponent>
    );
  }
}
const mapStateToProps = state => {
  const { collapsed } = state;
  return { collapsed };
};
const mapDispatchToProps = dispatch => {
  return {
    setCollapsed(collapsed) {
      dispatch(setCollapsed(collapsed));
    },
    toggleCollapsed() {
      dispatch(toggleCollapsed());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageLayout);
