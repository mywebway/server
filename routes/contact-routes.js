const express = require("express");
const router = express.Router();
const {getContacts} = require('../controllers/contact-conoller');

router.get('/contacts', getContacts);

module.exports = router;
