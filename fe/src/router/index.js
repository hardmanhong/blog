import React from "react";
import Loadable from "react-loadable";
const Login = Loadable({
  loader: () => import(/* webpackChunkName: "Login" */ "@/pages/Login/Login"),
  loading: () => <div />
});
const NotFound = Loadable({
  loader: () => import( /* webpackChunkName: "NotFound" */"@/pages/NotFound/NotFound"),
  loading: () => <div />
});
const NotAuth = Loadable({
  loader: () => import(/* webpackChunkName: "NotAuth" */ "@/pages/NotAuth/NotAuth"),
  loading: () => <div />
});
const files = require.context(".", false, /\.js$/);
const routers = [];
files.keys().forEach(key => {
  if (key === "./index.js") return;
  routers.push(...files(key).default);
});
const router = [
  ...routers,
  {
    visitor: true,
    name: "登录",
    path: "/login",
    component: Login
  },
  {
    layout: true,
    name: "没有权限",
    path: "/not-auth",
    component: NotAuth
  },
  {
    visitor: true,
    name: "404",
    path: "*",
    component: NotFound
  }
];
export default router;
