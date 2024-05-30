//Setup  Express server
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

// Use body-parser middleware
app.use(bodyParser.json());

// Define API routes for Artwork model
const artworkRouter = require('./routes/artworkRoutes');
app.use('/artworks', artworkRouter);

// Start the server
app.listen(3000, () => console.log('Server started'));
