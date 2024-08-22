const UserModel = require('../models/users');

const obtenerUsuarios = async (req, res) => {
    try{
        const  id  = req.params;

        const user = await UserModel.find(id);

        if (!user) {
            res.status(404).json({ message: 'Users not found' });
        }

        res.json(user);

        }   catch (error) {
         res.status(500).json({ message: error.message });
    }

}

const borrarUsuarios = async (req, res) => {
    try{
        const { id } = req.params;

        const user = await UserModel.findByIdAndDelete(id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted' });

    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

const editarUsuarios = async (req, res) => {
    try{
        const { id } = req.params;
        const { nombre, apellido, correo, usuario, rol, direccion, nombreDeEmpresa, numeroDeContacto } = req.body;

        const user = await UserModel.findByIdAndUpdate(id, {
            nombre,
            apellido,
            correo,
            usuario,
            rol,
            direccion,
            nombreDeEmpresa,
            numeroDeContacto
        });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        
        res.json({ message: 'User updated' });

    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

const suspenderUsuarios = async (req, res) => {
    try{
        const { id } = req.params;
        const { suspension } = req.body;

        const user = await UserModel.findByIdAndUpdate(id, {
            suspension: true
        });
       
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }

        
        
        res.json({
            message: 'User updated'
        })
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}


const quitarSuspension = async (req, res) => {
    try{
        const { id } = req.params;
        const { suspension } = req.body;

        const user = await UserModel.findByIdAndUpdate(id, {
            suspension: false
        });

    if (!user) {
        res.status(404).json({ message: 'User not found' });
    }

    

    res.json({ message: 'User updated' });

    }catch(error){
        res.status(500).json({ message: error.message });
    }
}


module.exports = { obtenerUsuarios, borrarUsuarios, editarUsuarios, suspenderUsuarios, quitarSuspension }