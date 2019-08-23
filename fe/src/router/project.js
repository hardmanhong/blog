import React from "react";
import Loadable from "react-loadable";
const ProjectList = Loadable({
  loader: () => import("@/pages/Project/ProjectList/ProjectList"),
  loading: () => <div />
});
const ProjectEdit = Loadable({
  loader: () => import("@/pages/Project/ProjectEdit/ProjectEdit"),
  loading: () => <div />
});
export default [
  {
    menu: true,
    layout: true,
    icon: "project",
    name: "项目",
    path: "/project",
    component: ProjectList,
    children: [
      {
        layout: true,
        name: "新项目",
        path: "/project/edit",
        component: ProjectEdit,
        breadcrumb: "${title}"
      }
    ]
  }
];
