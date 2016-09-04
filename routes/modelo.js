var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var paciente = require("../models/paciente.js");
var lab = require("../models/laboratorio.js");
var centro = require("../models/centro.js");
var muestra = require("../models/muestra.js");
var nodemailer = require('nodemailer');


/* Funciones GET */
router.get("/paciente",function(req,res){
	paciente.find({},function(err,docs){
		if(err){
			res.send({mensaje:"No existen pacientes!"});
		}else{
			res.send(docs);
		}
	});	
});

router.get("/laboratorio",function(req,res){
	lab.find({},function(err,docs){
		if(err){
			res.send({mensaje:"No existen laboratorios!"});
		}else{
			res.send(docs);
		}
	});	
});

router.get("/centro",function(req,res){
	centro.find({},function(err,docs){
		if(err){
			res.send({mensaje:"No existen centros!"});
		}else{
			res.send(docs);
		}
	});	
});

router.get("/muestra",function(req,res){
	muestra.find({},function(err,docs){
		if(err){
			res.send({mensaje:"No existen muestras!"});
		}else{
			res.send(docs)
		}
	});	
});

router.get("/muestra/:id",function(req,res){
	var id = req.params["id"];
	muestra.find({"_id":id},function(err,docs){
		if(err){
			res.send({mensaje:"No existe muestra"});
		}else{
			res.send(docs)
		}
	});	
});

router.get("/paciente/:id",function(req,res){
	var id = req.params["id"];
	paciente.find({"cedula":id},function(err,docs){
		if(err){
			res.send({mensaje:"No existen pacientes!"});
		}else{
			res.send(docs);
		}
	});	
});


router.get("/muestra/laboratorio/:id",function(req,res){
	var id = req.params["id"];
	muestra.find({"lab":id},function(err,docs){
		if(err){
			res.send({mensaje:"No existen muestras!"});
		}else{
			res.send(docs);
		}
	});	
});

/* Funciones POST */
router.post("/paciente",function(req,res){
	var nuevoPaciente = new paciente(req.body);
	nuevoPaciente.save(function(err){
		if(err){
			res.send({mensaje:"Error en el ingreso"});
		}else{
			res.send({mensaje:"Ingreso exitoso"});
		}
	});
});


router.post("/muestra/:id",function(req,res){
	var nuevaMuestra = new muestra(req.body);	
	var id = req.params["id"];
	paciente.find({"cedula":id},function(err,docs){
		if(err){
			res.send({mensaje:"Paciente no encontrado!"});
		}else{
			console.log(docs);
			if (docs[0] == null){
				res.send({mensaje:"No existe el paciente!"})
			}
			nuevaMuestra.paciente = docs[0]._id;
			console.log(nuevaMuestra);
			nuevaMuestra.save(function(err){
				if(err){
					res.send({mensaje:"Error en el ingreso!"});
				}else{
					res.send({mensaje:"Ingreso exitoso!"});	
				}
			});
			docs[0].muestras.push(nuevaMuestra);
			docs[0].save();
		}
	});			
});

router.post("/laboratorio",function(req,res){
	var nuevoLab = new lab(req.body);
	nuevoLab.save(function(err){
		if(err){
			res.send({mensaje:"Error en el ingreso!"});
		}else{
			res.send({mensaje:"Ingreso exitoso!"});
		}
	});
});

router.post("/centro",function(req,res){
	var nuevoCentro = new centro(req.body);
	nuevoCentro.save(function(err){
		if(err){
			res.send({mensaje:"Error en el ingreso!"});
		}else{
			res.send({mensaje:"Ingreso exitoso!"});
		}
	});
});

/* Funciones PUT */
router.put("/paciente/:id",function(req,res){
	var id_i = req.params["id"];
	paciente.update({"cedula":id_i},req.body)
	.then(function (success) {
      res.json();
    })
    .catch(function (error) {
        //error.send({mensaje:"Error en el ingreso!"});
    });
});

router.put("/muestra/:id",function(req,res){
	var id_i = req.params["id"];
	
	muestra.update({_id:id_i},req.body)
	.then(function (success) {
      res.json();
    })
    .catch(function (error) {
        error.send({mensaje:"Error en el ingreso!"});
    });
});

router.put("/muestra/resultado/:id",function(req,res){
	var id_i = req.params["id"];
	var resp  = req.body.res;
	muestra.update({_id:id_i},{ $set: { resultado: resp }})
	.then(function (success) {
      res.json();
    })
    .catch(function (error) {
        //error.send({mensaje:"Error en el ingreso!"});
    });
});

router.put("/muestra/paciente/:id",function(req,res){
	var id_i = req.params["id"];
	var resp  = req.body.paciente;
	muestra.update({_id:id_i},{ $set: { paciente: resp }})
	.then(function (success) {
      //res.json(resp);
    })
    .catch(function (error) {
        //error.send({mensaje:"Error en el ingreso!"});
    });
});

router.put("/muestra/notificacion/:id",function(req,res){
	var id_i = req.params["id"];
	var not  = req.body.not;
	muestra.update({_id:id_i},{ $set: { notificacion: not }})
	.then(function (success) {
      res.json();
    })
    .catch(function (error) {
        //error.send({mensaje:"Error en el ingreso!"});
    });
});

/* Funciones DELETE*/

router.delete("/paciente/:id",function(req,res){
	var id_i = req.params["id"];
	paciente.remove({
		cedula: id_i
	}, function (err, docs) {
		 if(err){
				res.send({mensaje:"Error en el borrado!"});
			}else{
				muestra.remove({
					cedula: id_i
				}, function (err, docs) {
					 if(err){
							res.send({mensaje:"Error en el borrado!"});
						}else{
							res.send(id_i);
						}
				});	
			}
	});	
});

router.delete("/muestra/:id",function(req,res){
	muestra.findById(req.params.id, function(err, muest){
         muest.remove(function(err){
             if(!err) {
                 paciente.update({_id: muest.paciente},{$pull: {muestras: muest._id}},function (err, numberAffected) {
                      if(!err) {      
						res.send({mensaje:"Borrado exitoso!"});
                      } else {
                        res.send({mensaje:"Error en el borrado!"});                                      
                    }
                  });
			}else{
				res.send({mensaje:"Error en el borrado!"});
			}
            });
        });		
});




module.exports = router;
