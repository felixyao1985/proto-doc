import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from './views/layout/Layout'
//import ProtoInfo from '@/components/ProtoInfo/index.js';

Vue.use(Router)

//var objProtoInfo = new ProtoInfo()
//var PackAgePath = objProtoInfo.getRouterPath();



export const constantRouterMap = [
    { path: '/login', component: () => import('@/views/login/index'), hidden: true },
    { path: '/404', component: () => import('@/views/404'), hidden: true },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: 'Dashboard',
        hidden: true,
        children: [{
            path: 'dashboard',
            component: () => import('@/views/dashboard/index')
        }]
    },
    {
        path: '/doc',
        component: Layout,
        redirect: '/doc/protodoc',
        name: 'Doc',
        // meta: { title: 'Example', icon: 'example' },
        meta: { title: 'Doc', icon: 'icon-fenleiorguangchangorqitatianchong' },
        children: [
            {
                path: 'protodoc',
                name: 'protodoc',
                component: () => import('@/views/protodoc/index'),
                meta: { title: 'protodoc', icon: 'icon-shoujitianchong' },
                //children: PackAgePath
            },
            {
                path: 'protoupload',
                name: 'protodocupload',
                component: () => import('@/views/protodoc/upload'),
                meta: { title: 'protodocupload', icon: 'icon-shoujitianchong' },
                //children: PackAgePath
            },
        ]
    },
    { path: '*', redirect: '/404', hidden: true }
];

export default new Router({
    // mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});
