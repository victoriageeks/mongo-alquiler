var express = require('express');
var adminApartmentsController = require('../controllers/adminApartments');

var router = express.Router();

/* Ruta que muestra el formul ario para añadir un nuevo apartmento */
router.get('/apartment/new-apartment', adminApartmentsController.getAddApartment);
router.post('/apartment/new-apartment', adminApartmentsController.postAddApartment);

module.exports = router;
