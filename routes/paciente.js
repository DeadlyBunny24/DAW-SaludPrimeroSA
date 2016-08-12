var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var paciente_db = require("../models/paciente_db.js");

//var nuevo_paciente = new paciente_db({id:"2",datos_personales.cedula:000000000,fichas:});

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
	paciente_db.find({"id":id},function(err,docs){
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
	var id_i = req.params["id"];
	console.log(ficha_i);
	paciente_db.update({id:id_i},{$push:{fichas:ficha_i}},function(err){
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
		id: id_i
	}, function (err, docs) {
		 if(err){
				res.send({mensaje:"Error en el borrado!"});
			}else{
				res.send(id_i);
			}
	});	
});

module.exports = router;
