require('dotenv').config()
// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');


const app = express();

const routes = require('./routes/articles');

// DB Config
// const db = require('./config/keys').MONGODB_URI

// connect to MongoDB

  mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected!!!'))
  .catch(err => console.log(err))  

  const port = process.env.PORT || 5000

// mongoose.connection.on('connected', () => {
//     console.log('Mongoose is connected!');
// });



// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


// HTTP request logger
app.use(morgan('tiny'));

// Base Route
  app.use('/articles', routes);

app.listen(port, console.log(`Server is starting at ${port}`));




