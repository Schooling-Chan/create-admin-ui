import { createApp } from "vue";
import router from "./router";
import store from "./store";
import Icons from './lib/icons';


import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(Antd);
app.use(Icons);

app.mount("#app");
