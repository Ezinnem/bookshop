const express = require('express')
const app = express();

const bookController = require('./controllers/bookController');


const mongoose = require('mongoose');

//db config and options 
let config = require('config');
let options = { useNewUrlParser: true, useUnifiedTopology: true }

//db connection      
mongoose.connect(config.DBHost, options);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.post('/createBook', bookController.createBook);

app.get('/getAllBooks', bookController.getAllBooks);

app.get('/book/:id', bookController.getOneBook);

app.patch('/updateBook/:id', bookController.updateOneBook);

app.delete('/deleteBook/:id', bookController.deleteOneBook)

const PORT = 1994
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}...`)
})
