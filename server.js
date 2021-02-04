let express = require('express') 
let app = express()
let bodyParser = require('body-parser')
let session = require('express-session')

//MOTEUR DE TEMPLATES
app.set('view engine', 'ejs')

//MIDDLEWARE
app.use('/assets',express.static('public'))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(session({
    secret: 'fad',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))
app.use(require('./middlewares/flash'))

// ROUTES
app.get('/', (request, response) => {    
    let Message = require('./models/message')

    Message.all(function(messages){
        response.render('pages/index', {messages: messages})
    })
})

app.post('/', (request, response) => {
    if(request.body.message === undefined || request.body.message === ''){
        request.flash('error',"Vous n'avez pas posté de message")
        response.redirect('/')
    }else{

        let Message = require('./models/message')

        Message.create(request.body.message, function(){
            request.flash('success', "Merci pour votre commentaire")
            response.redirect('/')
        })
    }
}) 

app.get('/message/:id', (request, response) => {
    let Message = require('./models/message')
    Message.find(request.params.id, function(message){
        response.render('messages/show', {message: message})
    })
})


app.listen(8080)