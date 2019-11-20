require('dotenv').config()
const { IncomingWebhook } = require('@slack/webhook');
const url = process.env.WebhookUrl;
const PORT = process.env.PORT;
const webhook = new IncomingWebhook(url);
const axios = require('axios')
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

const crawler = function() {
    const target_url = 'https://www.weather.go.kr/weather/forecast/timeseries.jsp'
    axios.get(target_url,{
        responseType: "arraybuffer"
    })
    console.log(response.status)