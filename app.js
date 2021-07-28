const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require("./config");

const app = express();


// connection to Mongo db
mongoose.connect(config.db.connectionUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    .then(db => console.log('db connected'))
    .catch(err => console.log(err));

// importing routescls
const indexRoutes = require('./routes/indexRoutes');


// settings
app.set('port', config.app.port);
app.set('views','views');
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static("public"));


// routes
app.use('/', indexRoutes);

app.listen(app.get('port'), () =>{
    console.log(`server on port ${app.get('port')}`);
})


