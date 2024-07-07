const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the schema for the Transactions collection
const transactionSchema = new mongoose.Schema({
  dateOfSale: Date,
  saleAmount: Number,
  product: {
    title: String,
    description: String,
    price: Number
  },
  region: String
});

// Create the Transactions model
const Transactions = mongoose.model('Transactions', transactionSchema);

// API to list all transactions with search and pagination
app.get('/transactions', async (req, res) => {
  const { page = 1, perPage = 10, search } = req.query;
  const query = {};

  if (search) {
    query.$or = [
      { 'product.title': { $regex: search, $options: 'i' } },
      { 'product.description': { $regex: search, $options: 'i' } },
      { 'product.price': { $regex: search, $options: 'i' } }
    ];
  }

  const transactions = await Transactions.find(query)
    .skip((page - 1) * perPage)
    .limit(perPage);

  const count = await Transactions.countDocuments(query);

  res.send({
    transactions,
    pagination: {
      page,
      perPage,
      totalPages: Math.ceil(count / perPage),
      totalCount: count
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
