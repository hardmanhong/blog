import {combineReducers} from 'redux';
import {routePath,breadcrumb} from '@/containers/RouterGuard/RouterGuard.reduces.js'
export default combineReducers({
    routePath,
    breadcrumb,
});