if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    //console.log(process.env.NODE_ENV)
} 

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const exphbs = require('express-handlebars');

// Initializations
const app = express();
require('./database');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
    defaultLayout:'main',
layoutsDir: path.join(app.get('views'),'layouts'),
partialsDir: path.join(app.get('views'),'partials'),
extname: '.hbs' 
}));
app.set('view engine','.hbs');


// middlewares
app.use(morgan('dev'));
app.use(cors());
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})
app.use(multer({storage}).single('image'));
app.use(express.urlencoded({extended: false}));
app.use(express.json()); 

// routes
app.use('/api/books', require('./routes/books'));
//app.get('/',(req,res) =>{
    //res.render('index')
//})

// static files
app.use(express.static(path.join(__dirname, 'public')));

// start the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});