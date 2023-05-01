import { createRouter, createWebHistory } from "vue-router";
import UsersList from "@/pages/UsersList";
import Events from "@/pages/Events";

const routes = [
  {
    path: "/",
    component: UsersList,
  },
  {
    path: "/:id",
    component: Events,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
