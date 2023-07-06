const express = require("express");
const {bookModel} = require("../models/book.model");

const bookRouter = express.Router();

bookRouter.get("/posts", async (req,res) => {
    const book = await bookModel.find()
    res.send(book);
})


bookRouter.post('/posts', (req, res) => {
    const { title, author, genre, description, price } = req.body;
  
    const book = new bookModel({
      title,
      author,
      genre,
      description,
      price,
    });
  
    book.save()
      .then(() => {
        res.status(201).json({ message: 'Data stored successfully' });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to store data' });
      });
  });

  // DELETE route to delete a specific entry
  bookRouter.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
  
    bookModel.findByIdAndDelete(id)
      .then(() => {
        res.status(200).json({ message: 'Data deleted successfully' });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to delete data' });
      });
  });
  
  bookRouter.get('/posts/filter', (req, res) => {
    const { genre } = req.query;
  
    bookModel.find({ genre })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to filter data' });
      });
  });
  

  // GET route to sort data by price per person
  bookRouter.get('/posts/sort', (req, res) => {
    
    bookModel.find()
      .sort({ price: 1 })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to sort data' });
      });
  });

module.exports={
    bookRouter
}