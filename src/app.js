const path = require('path')
const express = require('express')
const hbs = require(`hbs`)
const geocode = require(`./util-file/geo`)
const weather = require(`./util-file/weather`)
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, `../templates/views`)
const partialpath = path.join(__dirname, `../templates/partials`)

app.set(`view engine`, `hbs`)
app.set(`views`, viewPath)
hbs.registerPartials(partialpath)

app.use(express.static(publicDirectoryPath))

app.get(``, (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Tushar Nagpal'
    })
})

app.get(`/about`, (req,res) => {
    res.render(`about`, {
        title: `About me`,
        name: `Tushar Nagpal`
    })
})

app.get('/help', (req, res) => {
    res.render(`help`,{
        title: `Help page`,
        message: `This is a message for help page.`,
        name: `Tushar Nagpal`
    })
})

app.get('/weather', (req, res) => {
    
   const address = req.query.search 
    if (!address){
        return res.send(`Enter search location`)
    }
    else {
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return console.log(error);
            
        }
        weather(latitude, longitude, (error, weatherdata) => {
           if(error){
               return console.log(error);
           }
           
           return res.send({
               place: location,
               message: `Current temp is ` + weatherdata.temperature
           })
           console.log(data.location);
           
           console.log(`Current temp is `+ weatherdata.temperature);
           
        })
    })
    }







app.get('/help/*', (req, res) => {
    res.render(`404`, {
        title: `404 Error page`,
        message: `Help article not found`,
        name: `Tushar Nagpal`
    })
})
})

app.get(`*`, (req, res) => {
    res.render(`404`, {
        title: `404 Error page`,
        message: `Page not found`,
        name: `Tushar Nagpal`
    })
})



app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})