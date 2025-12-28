import { createApp } from "vue";
import App from "./App.vue";
import { router } from "/src/item/presentation/router/index.ts";

import "./item/presentation/styles/global.css";

const app = createApp(App);

app.use(router);

app.mount("#app");
