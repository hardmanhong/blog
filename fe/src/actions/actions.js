export const types = {
    GENERATE_MENUS:'GENERATE_MENUS',
    GENERATE_ROUTER:'GENERATE_ROUTER',
    GENERATE_ROUTES:'GENERATE_ROUTES',
}
export const generateMenus = (menus)=>({
    type:types.GENERATE_MENUS,
    menus,
})
export const generateRouter = (router)=>({
    type:types.GENERATE_ROUTER,
    router,
})
export const generateRoutes = (routes)=>({
    type:types.GENERATE_ROUTES,
    routes,
})


