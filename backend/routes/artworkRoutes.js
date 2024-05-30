// Define API routes for Artwork model
const express = require('express');
const router = express.Router();
const Artwork = require('../models/artwork');

// GET all artworks
router.get('/', async (req, res) => {
    try {
        const artworks = await Artwork.find();
        res.json(artworks);
    } catch (err) {
        res.status(500).json('Error: ' + err);
    }
});

// GET one artwork 
router.get('/:id', async (req, res) => {
  res.json(res.artwork);
});

// Create an artwork
router.post('/', async (req, res) => {
    const artwork = new Artwork({
      title: req.body.title,
      artist: req.body.artist,
      year: req.body.year,
      description: req.body.description
    });
  
    try {
      const newArtwork = await artwork.save();
      res.status(201).json(newArtwork);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // Update an artwork
router.put('/:id', getArtwork, async (req, res) => {
    if (req.body.title != null) {
      res.artwork.title = req.body.title;
    }
    if (req.body.artist != null) {
      res.artwork.artist = req.body.artist;
    }
    if (req.body.year != null) {
      res.artwork.year = req.body.year;
    }
    if (req.body.description != null) {
      res.artwork.description = req.body.description;
    }
  
    try {
      const updatedArtwork = await res.artwork.save();
      res.json(updatedArtwork);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  

// Delete an artwork
router.delete('/:id', getArtwork, async (req, res) => {
    try {
      await res.artwork.remove();
      res.json({ message: 'Deleted Artwork' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Middleware to get artwork by ID
async function getArtwork(req, res, next) {
    let artwork;
    try {
      artwork = await Artwork.findById(req.params.id);
      if (artwork == null) {
        return res.status(404).json({ message: 'Cannot find artwork' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  
    res.artwork = artwork;
    next();
  }
  
  module.exports = router;
