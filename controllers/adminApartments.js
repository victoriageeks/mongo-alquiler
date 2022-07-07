const modelApartments = require('../models/apartment');

const getAddApartment = (req, res) => {
    res.render('add-apartment');
}

const postAddApartment = async (req, res) => {
    // 1. Recuperar los campos del formulario
    const { title, meters, photo, price } = req.body;

    // 2. Insertar el apartmento en la base de datos
    await modelApartments.addNewApartment(title, price, meters, photo);

    // 3. Devolver el control al cliente
    res.send("Apartamento insertado correctamente.")
}

module.exports = {
    getAddApartment,
    postAddApartment
}