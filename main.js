require('dotenv').config()
const { IncomingWebhook } = require('@slack/webhook');
const url = process.env.WebhookUrl;
const PORT = process.env.PORT;
const webhook = new IncomingWebhook(url);
const axios = require('axios')
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const schedule = require('node-schedule');

const crawler = async() => {
    const target_url = 'https://www.weather.go.kr/weather/forecast/timeseries.jsp'
    const response = await axios.get(target_url,{
        responseType: "arraybuffer"
    })
    if (response.status == 200) {
        const html = iconv.decode(response.data, 'EUC-KR').toString();
        const $ = cheerio.load(html)

        const locationDetail = $("span#addressName.text").text()
        const todayLowTemp = $("td.bg_tomorrow span.low_deg").text()
        const todayHighTemp = $("td.bg_tomorrow span.high_deg").text()
        let tomorrowLowTemp = $("td:nth-child(3) span.low_deg").text().split()
        tomorrowLowTemp = Number(tomorrowLowTemp)
        let tomorrowHighTemp = $("td:nth-child(3) span.high_deg").text().split()
        tomorrowHighTemp = Number(tomorrowHighTemp)

        const location = locationDetail.substring(0,2)
        const tomorrowAverTemp = (tomorrowLowTemp+tomorrowHighTemp)/2
        console.log(tomorrowHighTemp)
        console.log(tomorrowLowTemp)
        console.log(tomorrowAverTemp)
        return {location, todayLowTemp, todayHighTemp, tomorrowLowTemp, tomorrowHighTemp, tomorrowAverTemp}
    } 
}

const createMessage = function(tomorrowAverTemp) {
    if (tomorrowAverTemp<5){
        return '날씨가 춥네요. 패딩과 두꺼운 코트가 좋겠어요. 목도리나 기모제품도 챙겨주는 센스!'
    } else if (tomorrowAverTemp<10){
        return '코트나 가죽자켓, 니트 정도가 좋겠네요. 내복은 필수!'
    } else if (tomorrowAverTemp<13){
        return '멋부리기 좋은 계절이에요 *^^* 트렌치코트나 야상, 자켓은 어떨까요?'
    } else if (tomorrowAverTemp<18){
        return '자켓이나 가디건은 어때요? 없다구요? 그러니까 여자친구가 없다구요.'
    } else if (tomorrowAverTemp<22){
        return '흰색 긴팔에 청바지는 사랑입니다. 밤에는 추울 수 있으니 얇은 겉옷도!'
    } else if (tomorrowAverTemp<26){
        return '반팔이나 얇은 셔츠, 반바지나 면바지. 어쨌든 가볍게 입고나와요~'
    } else {
        return '쪄죽을 날씨에요. 닥 민소매. 선크림도 당연히 필수겠죠?'
    }
}

const formatMessage = function(location, todayLowTemp, todayHighTemp, tomorrowLowTemp, tomorrowHighTemp,  createdMessage){
    return {
        type: 'mrkdwn',
        attachments: [
            {
                color: "#FFFFFF",
                fields: [
                    {
                        title: `날씨봇 ON !!! 기온과 옷차림을 알려드리겠습니다.`,
                        value:
`-\n
오늘 ${location}은 *최고 ${todayHighTemp}°, 최저 ${todayLowTemp}°* 였으며,\n
내일 ${location}은 *최고 ${tomorrowHighTemp}°, 최저 ${tomorrowLowTemp}°* 입니다.\n
${createdMessage}`,
                        short:false
                    }
                ]
            }
        ]
    }
}

function sendToSlack(message){
    const url = process.env.WebhookUrl;
    const webhook = new IncomingWebhook(url);
    schedule.scheduleJob('21 00 * * *',async()=>await webhook.send(message));
};

async function main(){
    const crawledData = await crawler()
    const tomorrowAverTemp = crawledData.tomorrowAverTemp
    const createdMessage = createMessage(tomorrowAverTemp)
    const message = formatMessage(crawledData.location, crawledData.todayLowTemp, crawledData.todayHighTemp, crawledData.tomorrowLowTemp, crawledData.tomorrowHighTemp, createdMessage)
    schedule.scheduleJob('00 21 * * * ',sendToSlack(message));
}

main();