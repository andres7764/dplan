var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var encryption = require('../helpers/cripto');
//User collection
var usuarios = new mongoose.Schema({
     _id:         Schema.Types.ObjectId,
    name:         { type: String },
    mail:         { type: String },
    phone:        { type: Number },
    dateCreated:  { type: Date, default: new Date() },
    pass:         { type: String },
    notification: { type: Boolean, default: true },
    city:         { type: Boolean, default: true },
    foto:         { type: String, default: 'https://cdn3.iconfinder.com/data/icons/outdoor-and-camping/80/Camping_icons-10-512.png' },
    rol:          { type: Number, default: 1 } //For users 1 Admin, 2 Organizators, 3 Users
});

usuarios.method({
      authenticate: function(password) {
       if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
              return true;
          }
          else {
              return false;
          }
      }
});

module.exports = mongoose.model('usuariosmodel', usuarios);