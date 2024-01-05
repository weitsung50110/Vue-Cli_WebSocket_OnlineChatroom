<template>
  <div class="ChatRoom">
    <h1>WebSocket Chat Room</h1>
    <span class="user-name">name: {{ username }}</span>
  
    <!-- Message display area -->
    <div id="messageBox">
      <div v-for="message in messages_qu"  class="message_item" :key="message.id">
        <span v-bind:class="{'nodeSpan1': message.name === username, 'otherClass': message.name !== username}">
          {{ message.name }}: {{ message.message }}
        </span>
        <span class="timestamp">{{ message.time }}</span>
      </div>
    </div>
    <!-- Input fields and send button -->
    <div>
      <label for="inputName">Name:</label>
      <input type="text" id="inputName" class="chat-input" placeholder="Enter your name..."><br/><br/>
    </div>
    <div>
      <label for="inputMessage">Text:</label>
      <input type="text" id="inputMessage" class="chat-input" placeholder="Enter your message...">
      <button id="smileyButton" class="emoji-button" v-on:click="insertEmoji('😊')">😊</button>
      <button id="heartButton" class="emoji-button" v-on:click="insertEmoji('❤️')">❤️</button>
    </div>
    <button id="text_btn" class="send-button" v-on:click="sendMessage">Send</button>

    <!-- Display area for showing real-time clock -->
    <div id="realTimeClock">{{ currentTime }}</div>
  </div>
</template>

<script>
export default {
  data() {
      return {
        socket: null,
        messages_qu: [], // 用來存放聊天訊息的陣列
        currentTime: '',
        username: 'empty'
      };
    },
    methods: {
      connectWebSocket() {
        this.socket = new WebSocket('ws://localhost:3000');
        
        this.socket.onopen = () => {
          console.log('已連接至 WebSocket 伺服器');
        };
  
        this.socket.onmessage = (event) => {
            // console.log('接收到伺服器訊息：', event.data);
            // 解析接收到的 JSON 資料
            console.log('only event接收到伺服器訊息：', event);
            console.log('before JSON.parse接收到伺服器訊息：', event.data);
            const data = JSON.parse(event.data);
            console.log('JSON.parse接收到伺服器訊息：', data.name+": "+data.message+";時間: "+data.time);

            this.messages_qu.push(data);
            // 將訊息放進messages_qu: [] 陣列中
        };
  
        this.socket.onclose = () => {
          console.log('WebSocket 連接已關閉');
        };
      },
      sendMessage() {
        let formattedTime = this.getTime();
        let inputName = document.getElementById('inputName').value;
        let inputMessage = document.getElementById('inputMessage').value;

         // 組合名稱和訊息成為一個物件，然後將其轉換成 JSON 格式的字串
        const data = JSON.stringify({ name: inputName, message: inputMessage, time: formattedTime });

        this.socket.send(data);
        document.getElementById('inputMessage').value = ''; // 清空輸入框

        //產生名字在頁面上
        this.username= inputName
        //document.querySelector('.user-name').textContent = "name: "+inputName
      },
      getTime() {
        // 獲取當前時間
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();

        // 將時間補零到兩位數
        // 它的作用是根據條件的真假來返回不同的值。如果條件成立，則返回冒號前面的值，否則返回冒號後面的值。
        const formattedHours = hours < 10 ? `0${hours}` : hours; 
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`; // 格式化為 HH:MM 格式

        // 將格式化後的時間值作為物件返回
        return formattedTime;
      },
      updateClock() {
        const formattedTime = this.getTime();
        this.currentTime = `Current Time: ${formattedTime}`;
      },
      insertEmoji(emoji) {
        const inputMessage = document.getElementById('inputMessage');
        inputMessage.value += emoji;
      },
    },
    mounted() {
      this.updateClock(); // 在 Vue 實例被掛載後先執行一次更新時間
  
      // 每秒更新一次時間
      setInterval(() => {
        this.updateClock();
      }, 1000);

    },
    created() {  //created 鉤子是在 Vue 實例被建立後立即觸發的
      this.connectWebSocket();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
// 定義變量
$primary-color: #007bff;
$secondary-color: #ccc;
$background-color: #f4f4f4;
$text-color: #460606;
$user-name-color: #333;
$timestamp-color: #500a0a;
$error-color: #c70202;
$shadow-color: rgba(0, 0, 0, 0.1);
$error-border-color: #7a0404;

// 重置部分預設瀏覽器樣式
body, ul {
    margin: 0;
    padding: 0;
}

// 聊天室容器
.chat-container {
    width: 80%;
    margin: 20px auto;
    border: 1px solid $secondary-color;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px $shadow-color;
}

// 聊天消息樣式
#messageBox {
    background-color: $background-color;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px dashed $error-border-color;
    justify-content: space-between;
}

// 輸入字段樣式
.chat-input {
    width: calc(100% - 20px);
    padding: 8px;
    margin-top: 10px;
    border-radius: 5px;
    border: 1px solid $secondary-color;
}

// 發送按鈕樣式
.send-button {
    padding: 8px 20px;
    margin-top: 10px;
    border-radius: 5px;
    background-color: $primary-color;
    color: #fff;
    border: none;
    cursor: pointer;
}

p {
    color: $text-color;
}

// 用戶名稱樣式
.user-name {
    font-weight: bold;
    color: $user-name-color;
    font-size: 18px;
}

// 時間戳樣式
.timestamp {
    color: $timestamp-color;
}

#realTimeClock {
    font-size: 20px;
    font-weight: bold;
    margin-top: 20px;
    padding: 10px;
    background-color: #f0c6c6;
    border-radius: 5px;
}

.message_item {
    display: flex;
    justify-content: space-between;
}

.nodeSpan1 {
    color: $error-color;
}


</style>
