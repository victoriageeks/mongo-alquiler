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

const getEditApartment = async (req, res) => {
    // 1. Recuperar el apartamento que se quiere editar
    const { id } = req.params;
    // 2. Ir a MongoDB y traerte el documento identificado con ese ID
    const document = await modelApartments.getApartmentById(id);

    // 3. Renderizar el formulario pero ahora se deben rellenar los campos con los valores del documento
    // TODO: En add-apartment.ejs comprobar si la variable document tiene valor. En tal caso, rellenar cada uno de los campos del formularo con los datos del objeto. 
    res.render("add-apartment", {
        document
    })
}

module.exports = {
    getAddApartment,
    postAddApartment,
    getEditApartment
}