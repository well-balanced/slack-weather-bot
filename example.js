require('dotenv').config()

function crawl() {
    return {
        weather: -3
    }
}

function createMessage(weather) {
    const text = weather > 10 ? '셔츠 ㄲ' : '패딩 ㄱ'
    return text;
}

const sendToSlack = require('./src/sendToSlack')

c
function main() { 
    const crawledData = crawl();
    const message = createMessage(crawledData.weather)

    sendToSlack(message);
}

main()