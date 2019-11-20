const { IncomingWebhook } = require('@slack/webhook');
const schedule = require('node-schedule');
const app = express();

const url = process.env.WebhookUrl;
const PORT = process.env.PORT;
const webhook = new IncomingWebhook(url);
//  function sendToSlack(message){
//      schedule.scheduleJob('12 00 * * *', webhook.send(message))
// };
function sendToSlack(message){
    webhook.send(message)
};
app.listen(PORT, function () {
    console.log('Successed!');
  });


export default sendToSlack