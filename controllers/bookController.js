const Book = require('../models/bookmodel');


exports.createBook = async (req, res) => {
    const book = new Book(req.body)
    try {
        await book.save()
        res.status(201).json({
            status: 'Success!',
            data: { book }
        })
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err
        })
    }
};

exports.getAllBooks = async (req, res) => {
    const Books = await Book.find({})
    try {
        res.status(200).json({
            status: 'Success',
            data: { Books }
        })
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err
        })
    }
};

exports.getOneBook = async (req, res) => {
    const book = await Book.findById(req.params.id)
    try {
        res.status(200).json({
            status: 'Success',
            data: { book }
        })
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err
        })
    }
};

exports.updateOneBook = async (req, res) => {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    try {
        res.status(200).json({
            status: 'Success',
            data: { updatedBook }
        })
    } catch (err) {
        console.log(err)
    }
};

exports.deleteOneBook = async (req, res) => {
    await Book.findByIdAndDelete(req.params.id)

    try {
        res.status(204).json({
            status: 'Success',
            data: {}
        })
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err
        })
    }
};