var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session["rol"]!= "Paciente"){
		res.sendStatus(401);
		return;
	}
  res.render('home',{cedula : req.session["username"]});
  
});


module.exports = router;
