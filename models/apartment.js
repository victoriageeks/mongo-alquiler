
// MongoDB driver para acceder a la base de datos
// PROHIBIDO COPIAR MI URI
const uri = "mongodb+srv://root:root@cluster0.lo8dg.mongodb.net/?retryWrites=true&w=majority";
const { MongoClient, ObjectId } = require('mongodb');
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

// Obtener apartamento a partir de su _id
const getApartmentById = async (id) => {
    // Seleccionar la base de datos
    const database = client.db('mongorent');

    // Seleccionar colección
    const apartments = database.collection('apartments');

    const document = await apartments.findOne({
        _id: ObjectId(id)
    });

    return document;
}

module.exports = {
    addNewApartment,
    getApartmentById
}
