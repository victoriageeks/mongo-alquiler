const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new Schema({
    checkIn: Date, //TODO: Añadir validaciones (required)
    checkOut: Date
});

const apartmentSchema = new Schema({
    title: String,
    price: Number,
    meters: Number,
    photo: String,
    bookings: [bookingSchema]

});

// Creamos el modelo: relacionamos el esquema apartmentSchema a la colección 'apartments'
const Apartment = mongoose.model("apartments", apartmentSchema);

module.exports = Apartment;