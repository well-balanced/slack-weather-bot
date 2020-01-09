require('dotenv').config()
const { IncomingWebhook } = require('@slack/webhook');
const url = process.env.WebhookUrl;
const webhook = new IncomingWebhook(url);
const scrape = require('./scrape')

const sendToSlack = async() => {
    const weather = await scrape.getWeather()
    const tomorrowAverTemp = weather.tomorrowAverTemp
    const formattedMessage = scrape.createMessage(tomorrowAverTemp)
    const message = scrape.formatMessage(weather.location, weather.todayLowTemp, weather.todayHighTemp, weather.tomorrowLowTemp, weather.tomorrowHighTemp, formattedMessage)
    webhook.send(message);
}

sendToSlack();