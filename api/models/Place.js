const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String, 
    address: String, 
    photos: [String],
    description: String, 
    features: [String],
    extraInfo: String,
    checkIn: String,
    checkOut: String,
    maxGuests: Number 
});

const PlaceModel = mongoose.model('Place', placeSchema);

module.exports = PlaceModel;