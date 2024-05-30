// Define Artwork model schema using Mongoose
const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

// Export the Artwork model
module.exports = mongoose.model('Artwork', artworkSchema);