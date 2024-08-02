import {  createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import TVShow from '../views/TVShow/TVShow.vue'
import TVShowDetails from '../views/TVShow/TVShowDetails.vue'
import NotFoundPage from '../views/NotFoundPage.vue'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/tvshow',
        name: 'TVShow',
        component: TVShow
    },
    {
        path: '/tvshow/:id',
        name: 'TVShowDetails',
        component: TVShowDetails,
        props: true
    },
    // this for redirectionc
    {
        path: '/tvshows',
        name: 'TVShow',
        component: TVShow,
    },

    //catch all 404 i.e not existent pages
    {
        path: '/:catchAll(.*)',
        name: 'NotFoundPage',
        component: NotFoundPage,

    }
]

const router = createRouter({
    history: createWebHistory(''),
    routes
})


export default router