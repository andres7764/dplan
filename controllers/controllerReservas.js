var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
require('../models/modelReservas');
require('../models/modelOrganizators');
require('../models/modelUsers');
require('../models/modelActivities');
var reserva = mongoose.model('reservasmodel');
var reservaByUser = mongoose.model('organizatorInfo');
var User = mongoose.model('usuariosmodel');
var Activities = mongoose.model('activitiesmodel');
var sendMail = require('../config/sendMail');
var mensaje = 'Gracias por adquirir tu plan con nosotros, <p>DPlan</p> el mejor lugar para estar al tanto de las actividades unicas que puedes realizar a menos de 2 horas de tu ubicación';

exports.saveBooking = function(req, res) {
	checkUserExist(req.body, function(result) {
		if (!result.err) {
			return res.status(200).send(result);
		} else {
			return res.status(500).send(result);
		}
	});
};

exports.getReservas = function(req, res) {
	reserva.find({}).populate('event', 'name').exec(function(err, reservas) {
		if (!err) return res.status(200).json({
			reservas: reservas
		});
		return res.status(500).json({
			err: err
		});
	});
};

exports.getReserva = function(req, res) {
	reserva.findOne({
		'_id': mongoose.Types.ObjectId(req.query.id)
	}, function(err, reserva) {
		if (!err) return res.status(200).json({
			reserva: reserva
		});
		return res.status(500).json({
			err: err
		});
	});
};

exports.updateReserva = function(req, res) {
	reserva.findByIdAndUpdate({
		_id: req.body.id
	}, {
		$set: req.body.dataToUpdate
	}, function(err, updated) {
		if (!err) return res.status(200).json({reserva: updated});
		return res.status(500).json({err: err});
	});
};

exports.searchInvoice = function(req,res) {
 reserva.find(req.body,function(err, val) {
	if (err) {
		return res.status(201).json({err: err});
	} else {
		if(val.length === 0){
			return res.status(200).json({code:1,result:"No está creado"});
		} else {
			return res.status(200).json({code:2,result:"Ya está creado"});
		}
	}
 });
}

function checkUserExist(objectReserv, cb) {
    var existMail = User.findOne({mail:objectReserv.reserv.mail},'mail',function(err, info){
    	if(err) {cb({ err: true, message: err.message });}

    	if(info != null && info.mail == objectReserv.reserv.mail) {
    		objectReserv.reserv.idUser = info._id;
    		createReserv(objectReserv, function(result){
    		  cb(result);
    		});
    	} else {
    		var pho = (objectReserv.reserv.phone === 'N/A')?0:objectReserv.reserv.phone;
    		newUser = new User({name:objectReserv.reserv.name,mail:objectReserv.reserv.mail,phone:pho,pass:"generateTemporalPass()",notification:true,city:objectReserv.reserv.city,rol:3});
    		newUser.save(function(err, saved){
    			if(err){
    			 cb({ err: true, message: err.message });
    			} else {
    			  objectReserv.reserv.idUser = saved._id;
    			  createReserv(objectReserv,function(result){
    				cb(result);
    			  });
    			}
    		})
    	}
    })
};

function createReserv(object,cb){
 var newReserv = new reserva({idActivity:object.reserv.idActivity,idUser:object.reserv.idUser,mount:object.reserv.mount,quantity:object.reserv.quantity,codes:object.reserv.codes,wasPayment:object.reserv.wasPayment,statusPayment:object.reserv.statusPayment,codeTransaction:object.reserv.codeTransaction,dateReserv:object.reserv.dateReserv,city:object.reserv.city,bankName:object.reserv.bankName});
	 newReserv.save(function(err, newreserva) {
		if (err) {
		  	cb({err:true,message: err.message});
		} else {
			if (object.reserv.statusPayment === 'Aceptada') {
				sendMail.send(object);
				cb({err: false,message: 'Reserva creada correctamente, te contactaremos para confirmar tu reserva'});
			} else {
				cb({err: true,message: 'Compra rechazada'});
			}
		}
	 });
}