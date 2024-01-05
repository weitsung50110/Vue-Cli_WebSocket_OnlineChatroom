import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'; // 引入剛剛建立的 router 實例
import 'bootstrap/dist/css/bootstrap.css'; // 引入 Bootstrap CSS 樣式


const app = createApp(App); // 創建應用程式實例

app.use(router); // 使用 router

app.mount('#chat-container'); // 掛載應用程式到指定的元素上

/*在 Vue 3 中，你需要在 createApp 之後使用路由。
應該將路由與應用程式進行關聯，然後將應用程式掛載到指定的 DOM 元素上。 */