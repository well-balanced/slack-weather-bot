// 슬랙봇 초기화
const { IncomingWebhook } = require('@slack/webhook');
require('dotenv').config()
const url = process.env.WebhookUrl;
const tomorrowWeather = "Tomorrow's weather"
const webhook = new IncomingWebhook(url);
// 슬랙봇이 모든 메세지 받도록 하기
// rtm.on('message', (mesaage)=>{
//     var text = message.text
//     if (text.includes("안녕")) {rtm.sendMessage("안녕하세요!", message.channel);}
//     if (text.includes("주인")) {rtm.sendMessage("제 주인은 우식님입니다.", message.channel);}
// })

(async() =>{
  await webhook.send({
    text:"안녕하세요? 날씨봇입니다.",
    attachments:[
      {
        fallback:"<https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=%EB%82%A0%EC%94%A8| Tomorrow's weather>",
        pretext:"<https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=%EB%82%A0%EC%94%A8| Tomorrow's weather>",
        color: "#FFFFFF",
        fields:[
          {
            title:"내일 입을 옷이 고민이신가요?",
            value:"여러분이 사는 지역의 날씨를 확인할 수 있습니다!",
            short:false}
              ]
            }
          ]
        }, function(err,response){
          console.log(response);
        }
      );
    }
)()


  
  var express = require('express');
  var app = express();
  
  // app.get('/', function (req, res) {
  //   res.send('Hello world');
  // });
  // app.get('/', function (req, res) {
  //     (async () => {
  //         await webhook.send({
  //           text: '잔디봇입니당',
  //         });
  //       })();
  // });
  
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });