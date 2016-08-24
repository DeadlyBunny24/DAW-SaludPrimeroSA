var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var paciente_db = require("../models/paciente_db.js");
var nodemailer = require('nodemailer');


/* GET lista de pacientes. */
router.get("/",function(req,res){
	paciente_db.find({},function(err,docs){
		if(err){
			res.send({mensaje:"Tarea no encontrada!"});
		}else{
			res.send(docs);
		}
	});	
});

router.get("/:id",function(req,res){
	var id = req.params["id"];
	paciente_db.find({"datos_personales.cedula":id},function(err,docs){
		if(err){
			res.send({mensaje:"Tarea no encontrada!"});
		}else{
			res.send(docs);
		}
	});
});


router.get("/fichas/:id",function(req,res){
	var id = req.params["id"];
	paciente_db.find({"id":id},"fichas",function(err,docs){
		if(err){
			res.send({mensaje:"Tarea no encontrada!"});
		}else{
			res.send(docs);
		}
	});
});

router.post("/",function(req,res){
	paciente_db.count({}, function (err, count) {
      req.body["id"] = count;
	  paciente_db.create(req.body,function(err,post){
			if(err){
				res.send({mensaje:"Error en el ingreso!"});
			}else{
				res.send(req.body);
			}
		});  
    });
});

router.post("/email",function(req,res){
		//console.log(req.body.contrasena);
		
		var transporter = nodemailer.createTransport('smtps://salud1ero%40gmail.com:dawesgenial@smtp.gmail.com');
	var mailOptions = {
		from: 'Laboratorios Salud Primero S.A. <salud1ero@gmail.com>', // sender address 
		to: req.body.correo, // list of receivers 
		subject: 'Creacion de Cuenta en Salud Primero SA.', // Subject line 
		text: 'Su cuenta fue creada exitosamente. Su usuario para ingresar a nuestra pagina es su cedula y su contraseña es: '+req.body.contrasena // plaintext body 
	};
	
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			return console.log(error);
		}
		console.log('Message sent: ' + info.response);
	});
});


router.put("/datospersonales/:id",function(req,res){
	var id_i = req.params["id"];
	
	paciente_db.update({id:id_i},req.body)
	.then(function (success) {
      res.json();
    })
    .catch(function (error) {
        res.status(404).send(err);
    });

	
});

router.put("/fichas/:id",function(req,res){
	var ficha_i = req.body.fichas;
	var ficha_json = JSON.parse(ficha_i);
	var date = new Date();
	var id_i = req.params["id"];	
	ficha_json.fid=date.getTime().toString();

		  paciente_db.update({id:id_i},{$push:{fichas:ficha_json}},function(err){
			if(err){
				res.send({message:"Error en la actualizacion!"})
			}else{
				res.send({message:"Actualizacion exitosa!"})
			}
		});
});

router.delete("/:id",function(req,res){
	var id_i = req.params["id"];
	paciente_db.remove({
		"datos_personales.cedula": id_i
	}, function (err, docs) {
		 if(err){
				res.send({mensaje:"Error en el borrado!"});
			}else{
				res.send(id_i);
			}
	});	
});

module.exports = router;
