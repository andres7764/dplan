var mongoose = require('mongoose'),

//User collection
contacto = new mongoose.Schema({
  name:               { type: String, default: "Suscripción" },
  mail:               { type: String },
  date:               { type: Date, default: new Date()},
  activeSubscription: { type: Boolean, default: true},
  description: 		    { type: String },
  phone: 			        { type: String }
});

customplan = new mongoose.Schema({
  name:               { type: String  },
  mail:               { type: String  },
  phone: 			        { type: String  },
  transp:             { type: Boolean },
  food:               { type: Boolean },
  hostal:             { type: Boolean },
  qty:                { type: String  },
  dateExit:           { type: Date    },
  description:        { type: String  },
});

module.exports = mongoose.model('contactmodel',contacto);
module.exports = mongoose.model('customplan', customplan);
