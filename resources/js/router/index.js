import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/Index'
/* Route module */
import SignInRoute from './routes/signin'
import ContractRoute from './routes/contract'
import CategoryRoute from './routes/category'
import AccountRoute from './routes/account'
import ShopRoute from './routes/shop'
import ShelfLocationRoute from './routes/shelf-location'
import POSDataRoute from './routes/pos-data'
import AdminDashboard from "./routes/dashboard-admin"
import AccountDashboard from "./routes/dashboard-account"
import AdminPOSDataAnalysis from "./routes/pos-data-analysis-admin"
import AccountPOSDataAnalysis from "./routes/pos-data-analysis-account"
import AssetManagement from './routes/asset-management'
import PageNotFoundRoute from './routes/page-not-found'

import multiguard from 'vue-router-multiguard'
import {AuthGuard} from '../guards/auth.guard'


Vue.use(Router)
const router = new Router({
    mode: 'history',
    routes: [
        SignInRoute,
        {
            path: '',
            redirect: '/cms/signin',
        },
        {
            path: '/cms',
            component: Index,
            children: [
                ...CategoryRoute
            ],
            beforeEnter: multiguard([AuthGuard]),
        },
        {
            path: '/cms/admin',
            name: 'UserAdmin',
            component: Index,
            children: [
                ...ContractRoute,
                ...AccountRoute,
                ...AdminDashboard,
                ...AssetManagement,
                ...AdminPOSDataAnalysis
            ],
            beforeEnter: multiguard([AuthGuard]),
        },
        {
            path: '/cms/account',
            name: 'UserAccount',
            component: Index,
            children: [
                ...ShopRoute,
                ...ShelfLocationRoute,
                ...POSDataRoute,
                ...AccountDashboard,
                ...AccountPOSDataAnalysis
            ],
            beforeEnter: multiguard([AuthGuard]),
        },
        PageNotFoundRoute,
    ],
})

export default router
