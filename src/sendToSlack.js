const { IncomingWebhook } = require('@slack/webhook');
const schedule = require('node-schedule');
const express = require('express');
const app = express();


//  function sendToSlack(message){
//      schedule.scheduleJob('12 00 * * *', webhook.send(message))
// };
module.exports = sendToSlack
function sendToSlack(message){
  const url = process.env.WebhookUrl;
  const webhook = new IncomingWebhook(url);
  webhook.send(message);
};
