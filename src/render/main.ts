import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";

import "./index.css";

const app = createApp(App as any);
app.use(router);
app.mount("#app").$nextTick(window.ClosePreloadLoading);
