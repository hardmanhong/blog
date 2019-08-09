import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RouterGuardComponent from "@/components/RouterGuard/RouterGuard";
import { setPathById, setBreadcrumb } from "./RouterGuard.actions";
class RouterGuard extends Component {
  static defaultProps = {
    dispatch: PropTypes.func.isRequired,
    route: PropTypes.object.isRequired
  };
  render() {
    const { setPathById, setBreadcrumb, route } = this.props;
    return (
      <RouterGuardComponent
        setPathById={setPathById}
        setBreadcrumb={setBreadcrumb}
        route={route}
      />
    );
  }
}
const mapStateToProps = state => {
  const { routePath } = state;
  return {
    routePath
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setPathById(id, path) {
      dispatch(setPathById(id, path));
    },
    setBreadcrumb(breadcrumb) {
      dispatch(setBreadcrumb(breadcrumb));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouterGuard);
