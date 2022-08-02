const express = require("express");
const { json } = require("express/lib/response");
const { response } = require("../../server");
const list = require("./json");
var fs = require('fs');

const routes = express.Router();

// Obtener mediante parametros

routes.get("/", (req, res) => {  
    res.status(200).send(list.map((user) => user))
})

routes.get("/:id", (req, res) => {
    const {id} = req.params;
    const user = list.find(user => user.id == id);
    console.log(user);
    res.status(200).send(id);
    console.log(id)
})

// Crear datos con objeto json

routes.post("/", (req, res) => {
    const {name, email} = req.body
    list.push({name, email})
    res.status(201).send({name, email})
    fs.writeFileSync(list, JSON.stringify({name, email}), {
    })
})

routes.patch("/:id", (req, res) => {
    const {name, email} = req.body
    const {id} = Number(req.params)
    let userIndex = list.findIndex((object) => object.id === id)
    list[userIndex] = {
     name, email
    }
    response.status(200).send(list[userIndex])
})

routes.delete("/:id", (req, res) => {
    const { id } = Number(req.params)
    list.splice(list.findIndex((contact) => contact.id === id), 1)
    res.status(201)
    res.json('delete')
})

routes.put("/:id", (req, res) => {
    console.log(req.body)
    const {name, email} = req.body;
    const {id} = Number(req.params);
    list.splice(list.findIndex((contact) => contact.id === id), 1)
    list.splice(id, 0, {
        'name': name,
        'email': email,
        'id': 4,
    });
    console.log(list)
    res.status(201)
    res.json(req.body)
});

module.exports = routes;
