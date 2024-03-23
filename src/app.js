const path = require('path')
const express = require('express')
const hbs = require('hbs')
const {request} = require('http')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Banjo Pentinio'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Banjo Pentinio'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'Banjo',
		message: 'This is where you can find help'
	})
})

// Weather Page
app.get('/weather', (req, res) => {
	const address = req.query.address
	if (!address) {
		return res.send({
			error: 'You must provide an adress.'
		})
	} else {
		geocode(address, (error, {latitude, longtitude, location} = {}) => {
			if (error) {
				return res.send({error})
			}
			forecast(latitude, longtitude, (error, forecastData) => {
				if (error) {
					return res.send({error})
				}
				res.send({
					forecast: forecastData,
					location,
					address
				})
			})
		})
	}
})

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term'
		})
	}
	// console.log(req.query.search)
	res.send({
		product: []
	})
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Banjo',
		message: 'Help article not found!'
	})
})

// 404 page
app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Banjo',
		message: 'Page not found'
	})
})

app.listen(port, () => {
	console.log('Server is up on port 3000')
})
