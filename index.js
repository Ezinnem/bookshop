const express = require('express')
const mongoose = require('mongoose');

let config = require('config');
let options = { useNewUrlParser: true, useUnifiedTopology: true }

const dbConfig = config.get('DBHost');
mongoose.connect(dbConfig, options).then(() => {
    console.log('Database connected..')
})

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const {createBook, getAllBooks, getOneBook, updateOneBook, deleteOneBook} = require('./controllers/bookController');

app.post('/createBook', createBook);

app.get('/getAllBooks', getAllBooks);

app.get('/book/:id', getOneBook);

app.patch('/updateBook/:id', updateOneBook);

app.delete('/deleteBook/:id', deleteOneBook)

const PORT = config.get('serverPort');
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}...`)
})

module.exports = app;