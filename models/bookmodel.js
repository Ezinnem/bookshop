const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
    pages: { type: Number, required: true, min: 1 },
    createdAt: { type: Date, default: Date.now },    
  });

  const Book = mongoose.model('Book', BookSchema)

  module.exports = Book