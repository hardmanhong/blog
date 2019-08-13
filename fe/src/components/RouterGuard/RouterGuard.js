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
    const {
      router,
      routeTrace,
      setPathById,
      setBreadcrumb,
      setSelectedMenuKyes,
      setOpenMenuKyes,
      route,
      location
    } = this.props;
    this.urlParams = parseUrlParams(location.search);

    const id = route.id;
    const path = location.pathname + location.search;

    const home = router[0];
    const breadcrumb = findPathByLeafId(id, router);
    const selectedMenuKeys = [];
    let pathParams = "";
    if (route.path !== "/") {
      breadcrumb.forEach(item => {
        console.log("routeTrace", routeTrace);
        const routeTra = routeTrace[item.id];
        if (routeTrace && routeTra) {
          // 赋值动态路径
          let pathAndName = routeTra.split("@@");
          pathAndName[0] && (item.path = pathAndName[0]);
          pathAndName[1] && (item.name = pathAndName[1]);
        }
        if (item.id === id) {
          item.path = path;
          if (route.breadcrumb) {
            const re = new RegExp(/[^${\}]+(?=})/g); // 匹配${}中的内容
            const field = route.breadcrumb.match(re);
            if (field && this.urlParams[field]) {
              item.name = pathParams = this.urlParams[field];
            }
          }
        }
        if (item.menu) selectedMenuKeys.push(item.id.toString());
      });
    }
    breadcrumb.unshift({
      id: home.id,
      path: home.path,
      icon: home.icon,
      menu: home.menu
    });
    const openMenuKeys = selectedMenuKeys.slice(0, selectedMenuKeys.length - 1);
    let pathName = path;
    pathParams && (pathName = pathName + "@@" + pathParams);
    setPathById(id, pathName); // path@@动态参数 如标题等
    setBreadcrumb(breadcrumb);
    setOpenMenuKyes(openMenuKeys);
    setSelectedMenuKyes(selectedMenuKeys);
  }
  static propsType = {
    setPathById: PropsType.func.isRequired,
    setBreadcrumb: PropsType.func.isRequired,
    setSelectedMenuKyes: PropsType.func.isRequired
  };
  componentDidMount() {
    // 不应该在这里执行任务初始化任务，疑问：暂时怀疑是页面已经渲染再初始化,但是react-redux改变state，不是会自动刷新页面吗？？？
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
