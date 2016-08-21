var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session["rol"]!= "Operario"){
		res.sendStatus(401);
		return;
	}
  res.render('operario');
});



module.exports = router;
