import Vue from "vue";
import VueRouter from "vue-router";
import TodoView from "../views/ToDoView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "todo",
    component: TodoView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  routes,
});

// this hook will be fired everytime our app switches route or pages before the page loads
router.beforeEach((to, from, next) => {
  // to: gives us info about the route we are going to
  // from: gives us info about the route we just came from
  // next: method needed to be trigerred that our app is trying to reach
  document.title = `${process.env.VUE_APP_TITLE} - ${to.name}`; // tab name
  next();
});

export default router;
