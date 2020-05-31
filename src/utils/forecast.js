const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=314020d5d85de2f2a04ff9ffd7b298a1"
    request({url:url,json:true},(error,response) => {
        if(error) {
            callback('Unable to connect weather services')
        } else if(response.body.cod != 200) {
            callback('Unable to find location. Try another search')
        } else {
            callback(undefined,'It is currently ' + response.body.main.temp + ' degrees out. There is ' + response.body.clouds.all + '% of rain')
        }
    })
}

module.exports = forecast