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

var HashMap = require('hashmap');
var json2csv = require('json2csv');
router.get("/laboratorio/total",function(req,res){
	paciente_db.find({},function(err,docs){
		if(err){
			res.send({mensaje:"Tarea no encontrada!"});
		}else{
			var map = new HashMap();
			docs.forEach(function (u) {
				u.fichas.forEach(function (x) {
					x.examen.forEach(function (y) {
						if (map.get(y.nombre) === null || map.get(y.nombre) == null){
								map.set(y.nombre, 1);
								//console.log("111 : " + map.get(y.nombre));
						} else {
								var cant =map.get(y.nombre)+1;
								//console.log(" : " + cant);
								map.set(y.nombre, cant);
						}
					});
				});
			});
			var myCars = [];
			map.forEach(function(value, key) {
				var jsonObj = {"age":key+": "+value,"population":value};
				myCars.push(jsonObj);
			});
			var fields = ['age', 'population'];
			json2csv({ data: myCars, fields: fields }, function(err, csv) {
				res.setHeader('Content-disposition', 'attachment; filename=data.csv');
				res.set('Content-Type', 'text/csv');
				res.status(200).send(csv);
			});
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
	ficha_json.examen.forEach(function(examen){
		examen.eid=date.getTime().toString();
	});
		  paciente_db.update({id:id_i},{$push:{fichas:ficha_json}},function(err){
			if(err){
				res.send({message:"Error en la actualizacion!"})
			}else{
				res.send({message:"Actualizacion exitosa!"})
			}
		});
});


router.put("/examen/:fid/:resultado",function(req,res){
	var fid_i = req.params["fid"];
	var res_i = req.params["resultado"];
	 paciente_db.update({"fichas.fid":fid_i},{$set:{"fichas.$.examen.0.resultado":res_i}},function(err){
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
