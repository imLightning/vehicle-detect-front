import { createRouter, createWebHashHistory } from "vue-router";
import mainRouter from "./mainRouter";

const router = createRouter({
    history: createWebHashHistory(),
    routes: mainRouter,
})

export default router