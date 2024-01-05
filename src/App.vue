<template>
  <ChatRoom  />
</template>

<script>
import ChatRoom  from './components/ChatRoom.vue'

export default {
  components: {
    ChatRoom 
  }
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
