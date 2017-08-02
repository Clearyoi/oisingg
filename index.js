const path = require('path')  
const express = require('express')  
const exphbs = require('express-handlebars')
const config = require('./config.json')
const riot = require('./riotCaller.js')

const app = express()

var profile = {}

app.engine('.hbs', exphbs({  
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')  
app.set('views', path.join(__dirname, 'views'))
app.get('/:name', (request, response) => {
	profile.name = request.params['name']
	console.log(profile.name)
	console.log(config["key"])
	riot.generateProfile(profile, printResult) 
	globalresponse = response
  
})
var printResult = function(status, body){
	console.log(status)
	console.log(body)
	if(status = 200){
		globalresponse.render('profile', {
   		summonerName: body.name,
   		summonerLevel: body.summonerLevel,
   		id: body.id
		})
	}else{
		globalresponse.render('error', {
   		name: profile.name,
		})
	}
	
}

app.listen(3000)