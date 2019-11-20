const { IncomingWebhook } = require('@slack/webhook');
const schedule = require('node-schedule');
const express = require('express');
const app = express();


//  function sendToSlack(message){
//      schedule.scheduleJob('12 00 * * *', webhook.send(message))
// };
exports.sendToSlack = function(message){
  const url = process.env.WebhookUrl;
  const PORT = process.env.PORT;
  const webhook = new IncomingWebhook(url);
  webhook.send(message)
  app.listen(PORT, function () {
    console.log('Successed!');
  });
};