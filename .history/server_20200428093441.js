require('dotenv').config()
// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 2020;   

const routes = require('./routes/articles');

  mongoose.connect(process.env.MONGODB_URI, {

    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!');
});

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}


// HTTP request logger
app.use(morgan('tiny'));

// Base Route
  app.use('/articles', routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));

