const { response, request } = require('express');

const getUser = (req = request, res = response) => {
    const query = req.query;
    const {q, name = 'No name', apikey, page = 1, limit = 20} = req.query;
    console.log(query);
    res.json({
        msg: 'Que dice la raza en GET - Controlador',
        query,
        q,
        name,
        apikey
    });
}

const putUser = (req = request,res = response) => {
    console.log("************************");
    //console.log(req);
    const {id} = req.params;
    console.log(id);
    if(id){
        console.log("enter id");
        res.json({
            msg: 'Que dice la raza en PUT - controler',
            id
        });
    } else {
        console.log("enter else");
        res.status(400).json({
            msg: 'Que dice la raza en PUT - controler',
            id
        });
    }
}

const postUser = (req = request,res = response) => {
    const body = req.body;
    const {nombre, edad} = req.body
    console.log(body);
    res.json({
        msg: 'Que dice la raza en POST - controler',
        nombre,
        edad,
        body
    });
}

const patchUser = (req = request,res = response) => {
   // console.log(req);
    res.json({
        msg: 'Que dice la raza en PATCH - controler'
    });
}

const deleteUser = (req = request,res = response) => {
    //console.log(req);
    res.json({
        msg: 'Que dice la raza en DELETE - controler'
    });
}


module.exports = {
    getUser,
    putUser,
    postUser,
    patchUser,
    deleteUser
}