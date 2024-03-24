const request = require('request')

const geocodeApiKey = process.env.GEOCODE_API_KEY

const geocode = (address, callback) => {
	const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(address)}.json?key=${geocodingApiKey}&limit=1`

	request({url, json: true}, (error, {body} = {}) => {
		if (error) {
			callback('Unable to connect to location services', undefined)
		} else if (body.features.length === 0) {
			callback('Unable to find location', undefined)
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longtitude: body.features[0].center[0],
				location: body.features[0].place_name
			})
		}
	})
}

module.exports = geocode
