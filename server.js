const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// 提供靜態資源（HTML 檔案）
// Setting path for public directory 
const path = require("path")
const static_path = path.join(__dirname, "dist") //變成絕對路徑 D:\qqq\public，nodejs使用絕對路徑較安全可靠，在 Node 中使用相對路徑進行檔案讀取是很危險的, 建議一律都透過絕對路徑的方式來處理
app.use(express.static(static_path)) 
//app.use(express.static('.'));

wss.on('connection', function connection(ws) {
  console.log('有新的 WebSocket 連接');

  ws.on('message', function incoming(message) {
    const data = JSON.parse(message);
    //message = message.toString('utf-8')
    console.log('server接收到Name：'+data.name+" ; "+'server接收到訊息：'+data.message+" ; "+
    'server接收到Time：'+data.time);

    // 廣播訊息給所有客戶端
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {  //加了client !== ws && 代表訊息不傳給自己
        console.log("(沒JSON.parse)-message: ", message );
        console.log("(有JSON.parse)-data: ", data );
        client.send(JSON.stringify(data)); //重點!! 這裡需要再把data轉成JSON檔案一次，不然front.js前端拿不到
      }
    });
  });
});

// 啟動伺服器監聽指定的埠口
const PORT = process.env.PORT || 3000;
server.listen(PORT, function() {
  console.log(`伺服器正在監聽埠口 ${PORT}`);
});