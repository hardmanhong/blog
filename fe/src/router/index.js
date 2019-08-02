import Home from '../pages/Home';
import PostList from '../pages/Post/PostList/PostList';
import PostEdit from '../pages/Post/PostEdit/PostEdit';

import Project from '../pages/Project';
import Tags from '../pages/Tags/Tags';
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