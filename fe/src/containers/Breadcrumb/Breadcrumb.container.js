import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import BreadcrumbComponent from "@/components/Breadcrumb/Breadcrumb";
class Breadcrumb extends Component {
  static defaultProps = {
    route: PropTypes.object.isRequired
  };
  render() {
    const { breadcrumb, route } = this.props;
    return <BreadcrumbComponent breadcrumb={breadcrumb} route={route} />;
  }
}
const mapStateToProps = state => {
  const { breadcrumb } = state;
  return { breadcrumb };
};

export default connect(mapStateToProps)(Breadcrumb);
