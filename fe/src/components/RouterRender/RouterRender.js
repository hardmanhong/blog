import React, { PureComponent } from "react";
import { Route,Switch } from "react-router-dom";
import routers from "@/router";
import RouterGuard from "@/components/RouterGuard/RouterGuard";
const RouteRender = (routes) => {
  console.log("RouteRender");
  const router = [];
  routes.forEach(route => {
    router.push(
      <Route
        exact
        key={route.path}
        path={route.path}
        render={props => <RouterGuard route={route}/>}
      />
    );
    if (route.children) {
      const children = RouteRender(route.children);
      router.push(...children);
    }
  });
  return router;
};

class RouterRender extends PureComponent {
  render() {
    return (
      <Switch>{RouteRender(routers)}</Switch>
    )
  }
}

export default RouterRender;
