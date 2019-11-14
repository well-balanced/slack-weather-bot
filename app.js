// 슬랙봇 초기화
const { IncomingWebhook } = require('@slack/webhook');
require('dotenv').config() // .env file config
const url = process.env.WebhookUrl; // env에 있는 url 로드
const webhook = new IncomingWebhook(url); 
var express = require('express'); // express 모듈 사용
var app = express();
const schedule = require('node-schedule'); // 스케줄러 모듈 사용
// 슬랙봇이 모든 메세지 받도록 하기
// rtm.on('message', (mesaage)=>{
//     var text = message.text
//     if (text.includes("안녕")) {rtm.sendMessage("안녕하세요!", message.channel);}
//     if (text.includes("주인")) {rtm.sendMessage("제 주인은 우식님입니다.", message.channel);}
// })

var rule = new schedule.RecurrenceRule();
//rule.dayOfWeek = new schedule.RecurrenceRule();
//rule.hour = 0;
//rule.minute = 1;
schedule.scheduleJob('00 22 * * *', function(){
weather = (async() =>{
  await webhook.send({
    text:"안녕하세요? 날씨봇입니다.",
    attachments:[
      {
        fallback:"<https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=%EB%82%B4%EC%9D%BC+%EB%82%A0%EC%94%A8| Tomorrow's weather>",
        pretext:"<https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=%EB%82%B4%EC%9D%BC+%EB%82%A0%EC%94%A8| Tomorrow's weather>",
        color: "#FFFFFF",
        fields:[
          {
            title:"내일 입을 옷이 고민이신가요?",
            value:"매일밤 10시 다음날의 날씨를 알려드립니다!",
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
});
  
  
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