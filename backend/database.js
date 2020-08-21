const mongoose = require('mongoose');

//const NOTES_APP_MONGODB_HOST = process.env.NOTES_APP_MONGODB_HOST;

//const NOTES_APP_MONGODB_DATABASE = process.env.NOTES_APP_MONGODB_DATABASE;

const { NOTES_APP_MONGODB_DATABASE, NOTES_APP_MONGODB_HOST } = process.env;
const MONGODB_URI =`mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`;

//const MONGODB_URI ='process.env.MONGODB_URI';
console.log(process.env.MONGODB_URI);


mongoose.connect(process.env.MONGODB_URI, {
    //useUnifiedTopology: true,
    useNewUrlParser: true
}) 
    .then(db => console.log(`DB is connected`))
    .catch(err => console.error(err));