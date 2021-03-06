import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '@/pages/login/Login';
import Home from '@/pages/home/Home';
import Browse from '@/pages/browse/Browse';
import Profile from '@/pages/profile/Profile';
import EnrolledCourse from '@/pages/enrolled-course/EnrolledCourse';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/home',
    name: 'home',
    alias: '/',
    component: Home,
  },
  {
    path: '/browse',
    name: 'browse',
    component: Browse,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
  },
  {
    path: '/enrolled-course/:courseGuid',
    props: true,
    name: 'enrolled-course',
    component: EnrolledCourse,
  }
];

const router = new VueRouter({
  routes
});

export default router;
