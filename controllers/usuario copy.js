const {response} = require('express')

//Importación de los modelos
const Permiso = require('../models/permiso')

//Método GET de la API

/*
const permisoGet = async(req, res = response) =>{
    //const {nombre} = req.query //Desestructuración

    //Consultar todos los permisos
    const permisos = await Permiso.find()

    res.json({  //Respuesta en JSON
        permisos
    })   
}
*/

const permisoGet = async(req, res = response) =>{
    //const {nombre} = req.query //Desestructuración
    const {_id} = req.query;
    //Consultar todos los usuarios
    try {
        let permisos;

        if (_id) {
            // Si se proporciona un id, realizar una búsqueda por nombre
            permisos = await Permiso.find({ _id: _id });
        } else {
            // Si no se proporciona un id, consultar todos los clientes
            permisos = await Permiso.find();
        }

        res.json({ permisos });
    } catch (error) {
        console.error('Error al buscar:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
}

//Método POST de la api
const permisoPost = async(req, res) => {
    let mensaje = 'Inserción Exitosa'
    const body = req.query //Captura de atributos
    try {
        const permiso = new Permiso(body) //Instanciando el objeto
        await permiso.save() //Inserta en la colección
    } catch (error) {
        mensaje = error
        console.log(error)
    }
        res.json({
        msg: mensaje
    })
}

//Modifcación
const permisoPut = async(req, res = response) => {

    const {nombre, password, rol, estado} = req.query
    let mensaje = 'Modificación exitosa'
    try{
         await Permiso.findOneAndUpdate({nombre: nombre}, 
            {password: password, rol:rol, estado:estado})
    }
    catch(error){
        mensaje = 'Se presentaron problemas en la modificación.'
    }

    res.json({
        msg: mensaje
    })
}





module.exports = {
    permisoGet,
    permisoPost,
    permisoPut
}