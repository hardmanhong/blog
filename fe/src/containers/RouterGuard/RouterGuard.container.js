import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RouterGuardComponent from "@/components/RouterGuard/RouterGuard";
import { setPathById, setBreadcrumb,setSelectedMenuKyes,setOpenMenuKyes } from "./RouterGuard.actions";
class RouterGuard extends Component {
  static defaultProps = {
    route: PropTypes.object.isRequired
  };
  render() {
    const { setPathById, setBreadcrumb,setSelectedMenuKyes, setOpenMenuKyes,routeTrace,router, route,menus} = this.props;
    return (
      <RouterGuardComponent
        setPathById={setPathById}
        setBreadcrumb={setBreadcrumb}
        setSelectedMenuKyes={setSelectedMenuKyes}
        setOpenMenuKyes={setOpenMenuKyes}
        routeTrace={routeTrace}
        router={router}
        route={route}
        menus={menus}
      />
    );
  }
}
const mapStateToProps = state => {
  const { router,routeTrace,menus } = state;
  return { router,routeTrace,menus };
};

const mapDispatchToProps = dispatch => {
  return {
    setPathById(id, pathName) {
      dispatch(setPathById(id, pathName));
    },
    setBreadcrumb(breadcrumb) {
      dispatch(setBreadcrumb(breadcrumb));
    },
    setSelectedMenuKyes(menu) {
      dispatch(setSelectedMenuKyes(menu));
    },
    setOpenMenuKyes(menu) {
      dispatch(setOpenMenuKyes(menu));
    },

  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouterGuard);
