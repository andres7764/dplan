var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//User collection
activities = new mongoose.Schema({
    name:                   { type: String  },
    distanceTime:           { type: String  },
    description:            { type: String  },
    legalInfo:              { type: String},
    isActive:               { type: Boolean },
    location:               { type: Object  },
    dateCreated:            { type: Date, default: new Date() },
    prefixCode:             { type: String  },
    availablePersons:       { type: Number  },
    categories:             { type: String  },
    carousel:               { type: Array, default: []},
    url:                    { type: String  },
    exitBy:                 { type: String  },
    city:                   { type: String  },
    detailplan:             { type: String  },
    mount:                  { type: Number  },
    organizationId:         { type: Schema.Types.ObjectId, ref: 'organizatorInfo' },
    order:                  { type: Number  },
    arrival:                { type: String  }
}); 


module.exports = mongoose.model('activitiesmodel',activities);
