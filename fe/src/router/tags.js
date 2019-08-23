import React from "react";
import Loadable from "react-loadable";
const Tags = Loadable({
  loader: () => import("@/pages/Tags/Tags"),
  loading: () => <div />
});
export default [
  {
    menu: true,
    layout: true,
    icon: "tags",
    name: "标签",
    path: "/tags",
    component: Tags
  }
];
