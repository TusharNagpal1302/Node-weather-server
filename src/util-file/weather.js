const request = require('request')

const getWeather = (latitude,longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fcc66bfa647c5f17b536db414cf85b0e&query='+ latitude + ',' + longitude

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                temperature: response.body.current.temperature
            })
        }
    })
}

module.exports = getWeather