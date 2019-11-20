const axios = require('axios')
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

const crawler = async() => {
    const target_url = 'https://www.weather.go.kr/weather/forecast/timeseries.jsp'
    const response = await axios.get(target_url,{responseType : "arraybuffer"});
    if (response.status == 200) {
      const html = iconv.decode(response.data, 'EUC-KR').toString();
      const $ = cheerio.load(html)
  
  
      const locationDetail = $("span#addressName.text")
      .text()

      const todayLowTmp = $("td.bg_tomorrow span.low_deg")
      .text()
      .split()

      const todayHighTmp = $("td.bg_tomorrow span.high_deg")
      .text()
      .split()

      const tomorrowLowTmp = $("td:nth-child(3) span.low_deg")
      .text()
      .split()

      const tomorrowHighTmp = $("td:nth-child(3) span.high_deg")
      .text()
      .split()
      
      const location = locationDetail.substring(0,2)
      const tomorrowAverTmp = (tomorrowLowTmp+tomorrowHighTmp)/ 2
    }
};
return crawler()
export default scrapeWeatherInfo;