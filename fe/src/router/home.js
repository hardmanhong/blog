import React from "react";
import Loadable from "react-loadable";

const Home = Loadable({
  loader: () => import("@/pages/Home/Home"),
  loading: () => <div />
});

export default [
  {
    layout: true,
    menu: true,
    icon: "home",
    name: "统计",
    path: "/",
    component: Home
  }
];
