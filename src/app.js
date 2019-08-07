const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Martin Balke'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About me',
		name: 'Martin Balke'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help Page',
		help: 'Hey I need help',
		name: 'Martin Balke'
	});
});


app.get('/weather', (req, res) => {
	const { address } = req.query;
	if (!address) {
		return res.send({
			error: `Please provide an address`
		})
	}
	geoCode(address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		}
		forecast(latitude, longitude, (error, forecast) => {
			if (error) {
				return res.send({ error });
			}
			res.send({
				forecast,
				location,
				address,
			});
		});
	});
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: `You must provide a search term`
		});
	}
	res.send({
		products: []
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: `404`,
		error: `Help article not found.`,
		name: `Martin Balke`
	})
});

app.get('*', (req, res) => {
	res.render('404', {
		title: `404`,
		error: `Page not found.`,
		name: `Martin Balke`
	})
});

app.listen(3000, () => {
	console.log('Server is live on port 3000');
});