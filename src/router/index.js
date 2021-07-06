import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import login from "@/views/login";

Vue.use(Router);

const RouterList = [
  {
    path: "/HelloWorld",
    name: "HelloWorld",
    component: HelloWorld,
    meta: {
      title: "列表",
      isLogin: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: login
  }
];

const router = new Router({
  routes: RouterList
});

router.beforeEach((to, from, next) => {
  next();
  if (to.matched.some(res => res.meta.isLogin)) {
    // 判断是否需要登录
    if (sessionStorage["username"]) {
      next();
    } else {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    }
  } else {
    next();
  }
});
export default router;
