<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">崴崴的網站</h1>
    <NavigationLinks /> <!-- 引入導航列組件 -->

    <div class="row justify-content-center">
      <!-- 使用栅格系统的 row 和 justify-content-center 类创建居中的列 -->
  
      <router-view></router-view><!--提供了一個動態的容器，根據路由的變化，動態地呈現不同的內容。-->
      <!--
        <router-view> 是用來顯示匹配到的路由組件內容的地方。
        當使用 <router-link> 點擊路由時，匹配到的組件會在這裡被渲染顯示。
      -->
    </div>
  </div>
</template>

<script>
import NavigationLinks from './components/child_NavigationLinks.vue'; // 導入子組件

export default {
  components: {
    NavigationLinks // 註冊子組件
  },
  /*在父組件中，您需要使用 import 將子組件導入，並在父組件的 components 選項中註冊該子組件。 */
}
</script>

<style>
#chat-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
