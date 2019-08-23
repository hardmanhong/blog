import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PageMenuComponent from "@/components/PageMenu/PageMenu";
class PageMenu extends Component {
  static defaultProps = {
    menus: PropTypes.arrayOf(PropTypes.object)
  };
  render() {
    const { menus, selectedMenuKeys, openMenuKeys } = this.props;
    return (
      <PageMenuComponent
        menus={menus}
        selectedMenuKeys={selectedMenuKeys}
        openMenuKeys={openMenuKeys}
      />
    );
  }
}
const mapStateToProps = state => {
  const { menus, selectedMenuKeys, openMenuKeys } = state;
  return { menus, selectedMenuKeys, openMenuKeys };
};

export default connect(mapStateToProps)(PageMenu);
