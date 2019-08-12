import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RouterGuardComponent from "@/components/RouterGuard/RouterGuard";
import { setPathById, setBreadcrumb,setCurrentMenu } from "./RouterGuard.actions";
class RouterGuard extends Component {
  static defaultProps = {
    route: PropTypes.object.isRequired
  };
  render() {
    const { setPathById, setBreadcrumb,setCurrentMenu, router, route } = this.props;
    return (
      <RouterGuardComponent
        setPathById={setPathById}
        setBreadcrumb={setBreadcrumb}
        setCurrentMenu={setCurrentMenu}
        router={router}
        route={route}
      />
    );
  }
}
const mapStateToProps = state => {
  const { router } = state;
  return { router };
};

const mapDispatchToProps = dispatch => {
  return {
    setPathById(id, path) {
      dispatch(setPathById(id, path));
    },
    setBreadcrumb(breadcrumb) {
      dispatch(setBreadcrumb(breadcrumb));
    },
    setCurrentMenu(currentMenu) {
      dispatch(setCurrentMenu(currentMenu));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouterGuard);
