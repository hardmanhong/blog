import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
const RouteRender = routes => {
  console.log("SwitchRoute RouteRender");
  const router = [];
  routes.forEach(route => {
    router.push(
      <Route
        exact
        key={route.path}
        path={route.path}
        component={route.component}
      />
    );
    if (route.children) {
      const children = RouteRender(route.children);
      router.push(...children);
    }
  });
  return router;
};

class SwitchRoute extends PureComponent {
  static propTypes = {
    router: PropTypes.array
  };
  render() {
    return <Switch>{RouteRender(this.props.router)}</Switch>;
  }
}

export default SwitchRoute;
