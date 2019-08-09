import React, { Component } from "react";
import { withRouter, Redirect, Route } from "react-router-dom";
import { spliceUrlParams, parseUrlParams } from "@/utils";
import PageLayout from "@/components/PageLayout/PageLayout";

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
const renderRouteComponentWithLayout = (props,urlParams) => {
  return <PageLayout>{renderRouteComponent(props,urlParams)}</PageLayout>;
};
const handleRenderRoute = (route, props, urlParams) => {
  if (route.redirect) return <Redirect to={route.redirect} />;
  if (route.layout) {
    return renderRouteComponentWithLayout(props,urlParams);
  } else {
    return renderRouteComponent(props, urlParams);
  }
};
class RouterGuard extends Component {
  constructor(props) {
    super(props);
    console.log("props", this.props);
    const { location } = this.props;
    this.urlParams = parseUrlParams(location.search);
  }
  componentDidMount() {
    console.log("路由守卫 componentDidMount");
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
