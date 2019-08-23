import React from "react";
import Loadable from "react-loadable";
const PostList = Loadable({
  loader: () => import("@/pages/Post/PostList/PostList"),
  loading: () => <div />
});
const PostEdit = Loadable({
  loader: () => import("@/pages/Post/PostEdit/PostEdit"),
  loading: () => <div />
});
export default [
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
        // menu: true,
        name: "新文章",
        path: "/post/edit",
        component: PostEdit,
        breadcrumb: "${title}"
      }
    ]
  }
];
