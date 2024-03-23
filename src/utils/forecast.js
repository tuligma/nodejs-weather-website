const request = require('request')

const forecast = (lat, lon, callback) => {
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=26f644cd0eb42da9a9808e9e2d4a3d50`

	request({url, json: true}, (error, {body} = {}) => {
		if (error) {
			callback(`'Unable to connect to weather service! (error: ${response.statusCode})`, undefined)
		} else if (!body.main) {
			callback(`Unable to find location. Try another search (error: ${body.cod})`, undefined)
		} else {
			const temp = body.main
			const description = body.weather[0].description
			const modifiedDesc = description.charAt(0).toUpperCase() + description.slice(1)
			const liveForcast = `${modifiedDesc}. It is currently ${temp.temp}°C. It feels like ${temp.feels_like}°C out.`
			callback(undefined, liveForcast)
		}
	})
}

module.exports = forecast
