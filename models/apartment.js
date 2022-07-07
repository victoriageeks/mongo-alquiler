
// MongoDB driver para acceder a la base de datos
// PROHIBIDO COPIAR MI URI
const uri = "mongodb+srv://root:root@cluster0.lo8dg.mongodb.net/?retryWrites=true&w=majority";
const { MongoClient } = require('mongodb');
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Conectarnos a la base de datos
client.connect(() => {
    console.log("Conectados correctamente a la base de datos");
});


const addNewApartment = async (title, price, meters, photo) => {
    // Seleccionar la base de datos
    const database = client.db('mongorent');

    // Seleccionar colección
    const apartments = database.collection('apartments');
    await apartments.insertOne({
        title,
        price,
        meters,
        photo
    });
}

module.exports = {
    addNewApartment
}