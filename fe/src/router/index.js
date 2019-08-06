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
        icon:'home',
        name:'统计',
        path: '/',
        component: Home
    },
    {
        icon:'read',
        name:'文章',
        path:'/post',
        component: PostList,
        children:[
            {
                name:'新文章',
                path:'/post/edit',
                component: PostEdit,
            },
        ]
    },
    {
        icon: "project",
        name:'项目',
        path:'/project',
        component: Project,
    },
    {
        icon: "tags",
        name:'标签',
        path:'/tags',
        component: Tags,
    },
]
export default router;