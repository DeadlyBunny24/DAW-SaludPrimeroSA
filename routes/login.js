var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
	if (req.session["rol"]== "Paciente"){
		res.redirect('home');
		return;
	} else if (req.session["rol"]== "Operario"){
		res.redirect('operario');
		return;
	} else if (req.session["rol"]== "Laboratorista"){
		res.redirect('laboratorista');
		return;
	} else{
	res.render('login');
	}
});

module.exports = router;

