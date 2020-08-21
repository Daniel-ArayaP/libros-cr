const { Schema, model } = require('mongoose');

const bcrypt = require('bcrypt');

const UsuariosSchema = new Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

UsuariosSchema.methods.encrypPassword = async password =>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
};
//devuelv un true o un false si la contraseña es incorrecta
UsuariosSchema.methods.matchPassword = function(password){
    return await bcrypt.compare(password,this.password);
}

module.exports = model('Usuario', UsuariosSchema);