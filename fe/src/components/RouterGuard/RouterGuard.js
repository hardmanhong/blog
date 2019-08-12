import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import PropsType from "prop-types";
import { spliceUrlParams, parseUrlParams } from "@/utils";
import PageLayout from "@/components/PageLayout/PageLayout";
import { findPathByLeafId } from "@/utils";
const renderRouteComponent = (props, urlParams) => {
  const { location, history, match, route } = props;
  return (
    <route.component
      location={location}
      history={history}
      match={match}
      urlParams={urlParams}
      historyPush={({ pathname, search }) =>
        props.history.push({
          pathname,
          search: spliceUrlParams(search)
        })
      }
    />
  );
};
const renderRouteComponentWithLayout = (props, urlParams) => {
  return <PageLayout>{renderRouteComponent(props, urlParams)}</PageLayout>;
};
const handleRenderRoute = (route, props, urlParams) => {
  if (route.redirect) return <Redirect to={route.redirect} />;
  if (route.layout) {
    return renderRouteComponentWithLayout(props, urlParams);
  } else {
    return renderRouteComponent(props, urlParams);
  }
};
class RouterGuard extends Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    this.urlParams = parseUrlParams(location.search);
  }
  static propsType = {
    setPathById: PropsType.func.isRequired,
    setBreadcrumb: PropsType.func.isRequired,
    setCurrentMenu: PropsType.func.isRequired
  };
  componentDidMount() {
    const {
      router,
      setPathById,
      setBreadcrumb,
      setCurrentMenu,
      route,
      location
    } = this.props;
    const id = route.id;
    const path = location.pathname + location.search;

    const home = router[0];
    const breadcrumb = findPathByLeafId(id, router);
    const currentMenu = [];
    if (route.path !== "/")
      breadcrumb.forEach(item => {
        if (item.id === id) {
          item.path = path;
          if (route.breadcrumb) {
            const re = new RegExp(/[^${\}]+(?=})/g);
            const field = route.breadcrumb.match(re);
            if (field && this.urlParams[field]) {
              item.name = this.urlParams[field];
            }
          }
        }
        if (item.menu) currentMenu.push(item.id.toString());
      });
    breadcrumb.unshift({
      id: home.id,
      path: home.path,
      icon: home.icon,
      menu: home.menu
    });
    setPathById(id, path);
    setCurrentMenu(currentMenu);
    setBreadcrumb(breadcrumb);
  }
  render() {
    const { route } = this.props;
    const isLogin = true;
    if (route.path === "/login") {
      if (isLogin) {
        return <Redirect to="/" />;
      }
    }
    if (route.path === "/not-auth") {
      if (isLogin) {
        return handleRenderRoute(route, this.props, this.urlParams);
      } else {
        return <Redirect to="/login" />;
      }
    }
    if (route.visitor) {
      return handleRenderRoute(route, this.props, this.urlParams);
    } else {
      if (isLogin) {
        if (route.refusal) {
          return <Redirect to="/not-auth" />;
        } else {
          return handleRenderRoute(route, this.props, this.urlParams);
        }
      } else {
        return <Redirect to="/login" />;
      }
    }
  }
}

export default withRouter(RouterGuard);
