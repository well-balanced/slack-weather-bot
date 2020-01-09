# slack-weather-bot
> 원하는 시간에 슬랙 채널로 다음날의 서울시의 기온을 미리 받아보실 수 있습니다.

<img width="631" alt="스크린샷 2020-01-09 18 03 54" src="https://user-images.githubusercontent.com/48206623/72054169-cf12e400-330b-11ea-8e80-e03d0120f82a.png">


## 시작하기

1. [Incoming Webhook 생성하기](https://api.slack.com/apps?new_app=1)

2. `Incoming Webhooks`
<img width="646" alt="스크린샷 2020-01-09 19 20 18" src="https://user-images.githubusercontent.com/48206623/72059546-96780800-3315-11ea-963d-de50121e7cde.png">

3. `Activate Incoming Webhooks` On

4. `Add New Webhook to Workspace`
<img width="648" alt="스크린샷 2020-01-09 18 02 07" src="https://user-images.githubusercontent.com/48206623/72054167-cf12e400-330b-11ea-8855-c63a4ed90c1b.png">

5. URL 복사


## 사용법

```
npm install
```

```
touch .env
```

`.env` 파일에 내용 추가
```
WebhookUrl=[위에서 복사한 Webhook URL]
```

`main.js` 시간 셋팅
> ex) 30 10 15 * * 1-5 : 매주 월요일부터 금요일까지 15시 10분 30초에 코드 동작
```
초기 셋팅은 매일 21시 00분에 오도록 되어있습니다.
new cronJob('00 00 21 * * *', () => {
    sendToSlack();
},null,true,"Asia/Seoul")
```

```npm start```
