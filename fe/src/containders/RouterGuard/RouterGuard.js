import React, { Component } from "react";
import { connect } from "react-redux";
import RouterGuardComponent from "@/components/RouterGuard/RouterGuard";
import { setPathById } from "./RouterGuard.actions";
class RouterGuard extends Component {
  static defaultProps = {
    dispatch: PropTypes.func.isRequired
  };
  setPathById = (id, path) => {
    this.props.dispatch(setPathById(id, path));
  };
  render() {
    return <RouterGuardComponent setPathById={this.setPathById} />;
  }
}
const mapStateToProps = state => {
  const {} = state;
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouterGuard);
