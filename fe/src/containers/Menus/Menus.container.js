import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MenusComponent from "@/components/Menus/Menus";
class Menus extends Component {
  static defaultProps = {
    menus: PropTypes.arrayOf(PropTypes.object)
  };
  render() {
    const { menus, currentMenu } = this.props;
    return <MenusComponent menus={menus} currentMenu={currentMenu} />;
  }
}
const mapStateToProps = state => {
  const { menus, currentMenu } = state;
  return { menus, currentMenu };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menus);
