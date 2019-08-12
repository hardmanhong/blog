import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import routers from "@/router";
import {
  generateMenus,
  generateRouter,
  generateRoutes
} from "./actions/actions";
import RouterGuard from "@/containers/RouterGuard/RouterGuard.container.js";
import RouterRender from "@/containers/RouterRender/RouterRender.container.js";
let routeId = 0;
const generateMenusRouter = router => {
  console.log("generateMenusRouter");
  const menus = [];
  const routes = [];
  router.forEach(route => {
    route.id = ++routeId;
    routes.push(
      <Route
        exact
        key={route.path}
        path={route.path}
        render={() => <RouterGuard route={route} />}
      />
    );
    let result = { menus: [], routes: [] };
    if (route.children) {
      result = generateMenusRouter(route.children);
    }
    routes.push(...result.routes);
    if (route.menu) {
      const { id, icon, name, path } = route;
      const menu = { id: id.toString(), icon, name, path };
      result.menus.length && (menu.children = result.menus)
      menus.push(menu);
    }
  });
  return {
    router,
    routes,
    menus
  };
};
class App extends Component {
  constructor(props) {
    super(props);
    const { generateMenus, generateRouter, generateRoutes } = this.props;
    const { menus, router, routes } = generateMenusRouter(routers);
    generateMenus(menus);
    generateRouter(router);
    generateRoutes(routes);
  }
  render() {
    return (
      <HashRouter>
        <RouterRender />
      </HashRouter>
    );
  }
}
const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    generateMenus(menus) {
      dispatch(generateMenus(menus));
    },
    generateRouter(router) {
      dispatch(generateRouter(router));
    },
    generateRoutes(routes) {
      dispatch(generateRoutes(routes));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
