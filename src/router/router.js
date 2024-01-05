import { createRouter, createWebHistory } from 'vue-router';

// 創建路由實例並定義路由
const routes = [
  {
    path: '/', // 定義首頁路徑
    component: () => import('../views/Home-Page.vue') // 對應的組件 - 首頁
    // 使用動態載入，當路由匹配到時才載入組件，以減少初始加載時間
    // 使用箭頭函數和動態 import 語法，這樣組件會在需要時被動態加載
    // './views/Home.vue' 是首頁組件的路徑，請根據您的專案結構修改路徑
  },
  {
    path: '/ChatRoom', // 定義關於頁面路徑
    component: () => import('../views/ChatRoom.vue') // 對應的組件 - 關於頁面
    // 使用動態載入，當路由匹配到時才載入組件，以減少初始加載時間
    // 使用箭頭函數和動態 import 語法，這樣組件會在需要時被動態加載
    // './views/About.vue' 是關於頁面組件的路徑，請根據您的專案結構修改路徑
  }
];

const router = createRouter({
  history: createWebHistory(), // 使用 history 模式，也可以使用 createWebHashHistory() 來使用 hash 模式
  routes // 傳入路由配置
});

export default router;