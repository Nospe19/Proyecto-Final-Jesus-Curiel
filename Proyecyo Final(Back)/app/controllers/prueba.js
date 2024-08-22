const { hashSync } = require('bcrypt');
const UserModel = require('../models/productos');

const obtenerTodosLosProductos = async (req, res) => {
    const { page = 1 } = req.query;  // Obtener la página de los parámetros de consulta, por defecto a la página 1
    const options = {
        page: parseInt(page, 10),   // Convertir a entero
        limit: 4                    // Puedes ajustar el límite según tus necesidades
    };
    
    try {
        const products = await UserModel.paginate({}, options);
        res.json(products);
    } catch (e) {
        res.status(404).json({ error: e });
    }
};





const filtro = async (req, res) => {
  try {
    const { categoria, precio, page = 1, limit = 10 } = req.query;
    const aprobado = true;

    console.log('Categoria:', categoria);
    console.log('Precio:', precio);

    // Creación de la consulta de búsqueda
    const match = {};

    if (categoria) {
      match.categoria = categoria;
    }

    if (precio) {
      const precio2 = parseInt(precio, 10);

      if (!isNaN(precio2)) {
        match.precio = { $lte:precio2 };
      }
    }

    if (aprobado) {
      match.aprobado = aprobado;
    }

    console.log('Match:', match);

    // Opciones de paginación
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 8),
    };

    const products = await UserModel.paginate(match, options);

    if (!products.docs.length) {
      return res.status(400).json({message:'No hay resultados para esta busqueda'});
    }

    res.status(200).json(products);

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};




const filtrarProducto = async (req, res) => {
    const  aprobado   = true;
    try{
        const products = await UserModel.find( { aprobado } );
        res.json(products);
    }catch(e){
       res.status(404).json({ error: e });
    }
}





module.exports = { obtenerTodosLosProductos, filtro, filtrarProducto /*filtrarCategoria, filtrarPrecio*/ };



/*const filtrarCategoria = async (req, res) => {

    const  categoria  = req.body.categoria;

    try {

        const products = await UserModel.find( { categoria } );
        res.json(products);
    } catch (e) {
        res.status(404).json({ error: e });

    }

}*/


/*const filtrarPrecio = async (req, res) => {
  const precio = parseInt(req.body.precio, 10);

  if (isNaN(precio)) { /*si el precio es valido*/
    /*return res.status(400).json({ error: "El precio proporcionado no es un número válido." });
  }*/

  /*try {
    const products = await UserModel.find({ precio: { $lte: precio } });
    res.json(products);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
}; */