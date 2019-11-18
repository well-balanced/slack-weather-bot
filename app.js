// 슬랙봇 초기화
const { IncomingWebhook } = require('@slack/webhook');
require('dotenv').config() // .env file config
const url = process.env.WebhookUrl; // env에 있는 url 로드
const webhook = new IncomingWebhook(url); 
const express = require('express'); // express 모듈 사용
const app = express();
const schedule = require('node-schedule'); // 스케줄러 모듈 사용
const cheerio = require('cheerio');
const axios = require('axios')
const iconv = require('iconv-lite');

// Crawling
//image_url= 'https://cosmian.tistory.com/42'
target_url = 'https://www.weather.go.kr/weather/forecast/timeseries.jsp'
const crawler = async() => {
  const response = await axios.get(target_url,{
    responseType : "arraybuffer",
  });
  if (response.status == 200) {
    html = iconv.decode(response.data, 'EUC-KR').toString();
    const $ = cheerio.load(html);
    const locationDetail = $("span#addressName.text").text()
    const todayLowTmp = $("td.bg_tomorrow span.low_deg").text().split()
    const todayHighTmp = $("td.bg_tomorrow span.high_deg").text().split()
    const tomorrowLowTmp = $("td:nth-child(3) span.low_deg").text().split()
    const tomorrowHighTmp = $("td:nth-child(3) span.high_deg").text().split()
    const location = locationDetail.substring(0,2)
    const tomorrowAverTmp = (tomorrowLowTmp+tomorrowHighTmp)/2
    tomorrowLook = (tomorrowAverTmp) => {
      if (tomorrowAverTmp<4){
        return '날씨가 춥네요. 패딩과 두꺼운 코트가 좋겠어요.\n목도리나 기모제품도 챙겨주는 센스!'
      } else if (tomorrowAverTmp<8){
        return '코트나 가죽자켓, 니트 정도가 좋겠네요.\n히트텍은 필수!'
      } else if (tomorrowAverTmp<11){
        return '멋부리기 좋은 계절이에요^^*\n트렌치코트나 야상, 자켓은 어떨까요?'
      } else if (tomorrowAverTmp<16){
        return '자켓이나 가디건은 어때요?\n없다구요? 그러니까 여자친구가 없다구요.'
      } else if (tomorrowAverTmp<20){
        return '흰색 긴팔에 청바지는 사랑입니다.\n밤에는 추울 수 있으니 얇은 겉옷도!'
      } else if (tomorrowAverTmp<24){
        return '반팔이나 얇은 셔츠, 반바지나 면바지.\n어쨌든 가볍게 입고나와요~'
      } else {
        return '쪄죽을 날씨에요. 닥 민소매. \n선크림도 당연히 필수겠죠?'
      }};
      schedule.scheduleJob('00 23 * * *', ()=>{
        //(async() =>{
          //await 
          webhook.send({
            type: 'mrkdwn',
            // accessory: {
            //   type: 'image',
            //   image_url: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbkiKoB%2FbtqzQ8pBFMr%2F4PKp0rLrhS3qAcr1SX4TK1%2Fimg.jpg"
            //},
            attachments:[{
              color: "#FFFFFF",
              fields:[
              {
                title:`날씨봇 ON !!! 기온과 옷차림을 알려드리겠습니다.`,
                value:`-----------------------------------------------------\n오늘 ${location}은 *최고 ${todayHighTmp}°, 최저 ${todayLowTmp}°* 였으며,\n
                내일 ${location}은 *최고 ${tomorrowHighTmp}°, 최저 ${tomorrowLowTmp}°* 입니다.\n-----------------------------------------------------${tomorrowLook(tomorrowAverTmp)}`,
                short:false}
                  ]}],
        
            
            })
          // })
        })
      }
    };
    // const response = await axios.get(image_url,{
    //   responseType : "arraybuffer",
    // });
    //  if (response.status == 200) {
    //   imageHtml = iconv.decode(response.data, 'EUC-KR').toString();
    //   const $ = cheerio.load(imageHtml);
      

crawler()
// schedule.scheduleJob('48 04 * * *', ()=>{
// (async() =>{
//   await webhook.send({
//     text:"안녕하세요? 날씨봇입니다.",
//     attachments:[
//       {
//         fallback:"<https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=%EB%82%B4%EC%9D%BC+%EB%82%A0%EC%94%A8| Tomorrow's weather>",
//         pretext:"<https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=%EB%82%B4%EC%9D%BC+%EB%82%A0%EC%94%A8| Tomorrow's weather>",
//         color: "#FFFFFF",
//         fields:[
//           {
//             title:"내일 입을 옷이 고민이신가요?",
//             value:"매일밤 10시 다음날의 날씨를 알려드립니다!",
//             short:false}
//               ]
//             }
//           ]
//         }, function(err,response){
//           console.log(response);
//         }
//       );
//     }
// )()
// });

      // (async () => {
      //     await webhook.send({
      //       text: '날씨봇 ON!! 11시가 되면 날씨를 알려드리겠습니다.',
      //     });
      //   })();


  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });