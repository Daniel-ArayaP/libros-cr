const { Router } = require('express');
const router = Router();

const path = require('path');
const { unlink } = require('fs-extra');

const Book = require('../models/Book');

router.get('/',async (req, res) => {
    //res.send('hola mundo');
    const books = await Book.find().sort('-_id');
    res.json(books);
});

router.post('/', async (req, res) => {
    const { title, author, isbn } = req.body;
    const imagePath = '/uploads/' + req.file.filename;
    const newBook = new Book({title, author, isbn,imagePath});
    //console.log(newBook);
    //console.log(req.body);
    await newBook.save();
    //res.send('recibido');
    res.json({'message': 'Book Saved'}); 
});

router.delete('/:id', async (req, res) => {
   // console.log(req.params.id);
    const book = await Book.findByIdAndDelete(req.params.id);
   // console.log(book);
    //res.send('borrando');
    await unlink(path.resolve('./backend/public/' + book.imagePath));
    res.json({message: 'Book Deleted'}); 
});


module.exports = router;