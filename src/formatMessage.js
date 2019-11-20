tomorrowLook = (tomorrowAverTmp) => {
  if (tomorrowAverTmp<5){
    return '날씨가 춥네요. 패딩과 두꺼운 코트가 좋겠어요. 목도리나 기모제품도 챙겨주는 센스!'
  } else if (tomorrowAverTmp<10){
    return '코트나 가죽자켓, 니트 정도가 좋겠네요. 내복은 필수!'
  } else if (tomorrowAverTmp<13){
    return '멋부리기 좋은 계절이에요 *^^* 트렌치코트나 야상, 자켓은 어떨까요?'
  } else if (tomorrowAverTmp<18){
    return '자켓이나 가디건은 어때요? 없다구요? 그러니까 여자친구가 없다구요.'
  } else if (tomorrowAverTmp<22){
    return '흰색 긴팔에 청바지는 사랑입니다. 밤에는 추울 수 있으니 얇은 겉옷도!'
  } else if (tomorrowAverTmp<26){
    return '반팔이나 얇은 셔츠, 반바지나 면바지. 어쨌든 가볍게 입고나와요~'
  } else {
    return '쪄죽을 날씨에요. 닥 민소매. 선크림도 당연히 필수겠죠?'
  }
};

exports.message = {
  type: 'mrkdwn',
  attachments:[
      {
      color: "#FFFFFF",
      fields:[
          {
          title: `날씨봇 ON !!! 기온과 옷차림을 알려드리겠습니다.`,
          value: 
`-\n
오늘 ${location}은 *최고 ${todayHighTmp}°, 최저 ${todayLowTmp}°* 였으며,\n
내일 ${location}은 *최고 ${tomorrowHighTmp}°, 최저 ${tomorrowLowTmp}°* 입니다.\n\n
${tomorrowLook(tomorrowAverTmp)}`,

          short:false
          }
      ]
      }
  ],
}
