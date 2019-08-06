import React from 'react';
import Loadable from 'react-loadable';

const Home = Loadable({
    loader:()=> import('@/pages/Home/Home'),
    loading:()=><div/>
})
const PostList = Loadable({
    loader:()=> import(/* webpackChunkName: 'PostList' */'@/pages/Post/PostList/PostList'),
    loading:()=><div/>
})
const PostEdit = Loadable({
    loader:()=> import('@/pages/Post/PostEdit/PostEdit'),
    loading:()=><div/>
})
const Project = Loadable({
    loader:()=> import('@/pages/Project/Project'),
    loading:()=><div/>
})
const Tags = Loadable({
    loader:()=> import('@/pages/Tags/Tags'),
    loading:()=><div/>
})
const router = [
    {
        path: '/',
        component: Home
    },
    {
        path:'/post',
        component: PostList,
    },
    {
        path:'/post/list',
        component: PostList,
    },
    {
        path:'/post/edit',
        component: PostEdit,
    },
    {
        path:'/project',
        component: Project,
    },
    {
        path:'/tags',
        component: Tags,
    },
]
export default router;