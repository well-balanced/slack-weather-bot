var axios = require("axios");
var cheerio = require('cheerio');
var request = require('request');

const getHtml = async() => {
    try{
        return await axios.get("https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=%EB%82%B4%EC%9D%BC+%EB%82%A0%EC%94%A8");
    }catch (error){
        console.error(error);
    }
};

getHtml()
.then(html =>{
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.table_info weekly_weeklyWeather ul.list_area _pageList").children("li.date_info today")

$bodyList.each(function(i, elem) {
    ulList[i] = {
        title: $(this).find('day_info').text(),
        url: $(this).find('point_time morning').text(),
        image_url: $(this).find('point_time afternoon').text(),
        image_alt: $(this).find('p.poto a img').text(),
        summary: $(this).find('p.lead').text(),
        date: $(this).find('span.p-time').text()
    };
  });

  const data = ulList.filter(n => n.title);
  return data;
})
.then(res => console.log(res));

// $bodyList.each(function(i,elem){
//     ulList[i]={
//         title: $(this).find('')
//     }
// })