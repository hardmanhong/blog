import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RouterRenderComponent from "@/components/RouterRender/RouterRender";
class RouterRender extends Component {
  static defaultProps = {
    routes: PropTypes.arrayOf(PropTypes.object)
  };
  constructor(props) {
    super(props);
  }
  render() {
    const { routes } = this.props;
    return <RouterRenderComponent routes={routes} />;
  }
}
const mapStateToProps = state => {
  const { routes } = state;
  return { routes };
};

export default connect(mapStateToProps)(RouterRender);
