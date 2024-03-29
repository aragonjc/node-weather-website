const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000


const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

console.log(publicDirectoryPath)


app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index', {
        title:'Weather',
        name:'Juan'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        message:'Hello World',
        title:'help',
        name:'Juan'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address) {
        return res.send({
            error:'You must provide an address'
        });
    }

    geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{

        if(error) {
            return res.send({
                error
            });
        }

        forecast(latitude,longitude,(error,forecastData)=>{

            if(error) {
                return res.send({
                    error
                });
            }

            return res.send({
                location,
                forecast:forecastData,
                address:req.query.address
            })
        })

    })

})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:404,
        message:'Help article not found'
    })
})

app.get('*',(req,res)=> {
    res.render('404',{
        title:404,
        message:'My 404 page'
    })
})

app.listen(port,()=>{
    console.log('Server is up on Port 3000')
})
