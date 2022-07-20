const express = require("express");
const Contact = require("../models/contact");
const createPath = require('../helpers/create-path')

const getContacts = (req,res) => {
    Contact
        .find()
        .then((contacts)=>{
            res.render(createPath('contacts'),{contacts})
        })
        .catch((error)=> {
            console.log(error)
            res.render(createPath('error'))
        })
}

module.exports = {
    getContacts
}