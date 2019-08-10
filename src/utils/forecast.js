const request = require('request');

const forecast = (latitude, longitude, callback) => {

	const url = `https://api.darksky.net/forecast/9723424f9740519edcbfefb9759431df/${latitude},${longitude}`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to the weather service', undefined);
		} else if (body.error) {
			callback('Unable to find location', undefined);
		} else {
			const weather = body.currently;
			const { temperature, precipProbability: rainChance } = weather;
			const summary = body.daily.data[0].summary;
			callback(undefined, `Temperature high today will be ${body.daily.data[0].temperatureHigh}. It is currently ${temperature} out. There is a ${rainChance}% chance of rain. 
${summary}`);
		}
	});


}

module.exports = forecast;