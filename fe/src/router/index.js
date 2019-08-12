import React from "react";
import Loadable from "react-loadable";

const Home = Loadable({
  loader: () => import("@/pages/Home/Home"),
  loading: () => <div />
});
const PostList = Loadable({
  loader: () => import("@/pages/Post/PostList/PostList"),
  loading: () => <div />
});
const PostEdit = Loadable({
  loader: () => import("@/pages/Post/PostEdit/PostEdit"),
  loading: () => <div />
});
const Project = Loadable({
  loader: () => import("@/pages/Project/Project"),
  loading: () => <div />
});
const Tags = Loadable({
  loader: () => import("@/pages/Tags/Tags"),
  loading: () => <div />
});
const Login = Loadable({
  loader: () => import("@/pages/Login/Login"),
  loading: () => <div />
});
const NotFound = Loadable({
  loader: () => import("@/pages/NotFound/NotFound"),
  loading: () => <div />
});
const NotAuth = Loadable({
  loader: () => import("@/pages/NotAuth/NotAuth"),
  loading: () => <div />
});

const router = [
  {
    layout: true,
    menu: true,
    icon: "home",
    name: "统计",
    path: "/",
    component: Home
  },
  {
    menu: true,
    layout: true,
    icon: "read",
    name: "文章",
    path: "/post",
    component: PostList,
    children: [
      {
        layout: true,
        menu: true,
        name: "新文章",
        path: "/post/edit",
        component: PostEdit,
        breadcrumb: "${title}"
      }
    ]
  },
  {
    layout: true,
    name: "项目",
    path: "/project",
    component: Project
  },
  {
    // refusal: true,
    layout: true,
    icon: "tags",
    name: "标签",
    path: "/tags",
    component: Tags
  },
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
