var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var request = require("request");

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://admin:1234@ds145395.mlab.com:45395/mdb_daw",function(err){
	if(err){
		console.log(err);	
	}else{
		console.log("Conexión exitosa!");
	}
	
});

var login = require('./routes/login');
var home = require('./routes/home');
var laboratorista = require('./routes/laboratorista');
var operario = require('./routes/operario');
var modelo = require("./routes/modelo.js");



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	secret: 'MY-SESSION-DEMO',
	resave: true,
	saveUninitialized: false	
}));


app.use('/', login);
app.use('/home', home);
app.use('/laboratorista', laboratorista);
app.use('/operario', operario);
app.use('/modelo', modelo);


app.post('/login', function(req, res){
	var username= req.body.username;
	var password= req.body.password;
	var rol= req.body.rol;
	var url1= "http://localhost:3000/paciente/";
	
	if (rol== "Paciente"){
	request({method: "GET", url: url1+username, json: true}, function(error, response, body){
		if (!error && response.statusCode === 200) {
		//console.log(body[0].datos_personales.contrasena);
		
			if (body[0].datos_personales.contrasena== password){
			req.session ["username"]= username;
			req.session ["rol"]= rol;
			res.send(200,'home');
			return;
			} else {
			res.send(500,'showAlert');
			}
		}
	});
	} else if (username =="admin" && password =="admin1234" && rol== "Operario"){
		req.session ["username"]= username;
		req.session ["rol"]= rol;
		res.send(200,'operario') ;
		return;
	} else if (username =="lab" && password =="lab1234" && rol== "Laboratorista"){
		req.session ["username"]= username;
		req.session ["rol"]= rol;
		res.send(200,'laboratorista');
		return;
	
	}else{res.send(500,'showAlert');}
	
	
	/*
	if (username =="user" && password =="user1234"&& rol=="Paciente"){
		req.session ["username"]= username;
		req.session ["rol"]= rol;
		res.redirect('home');
		return;
	}
	
	*/
	
});

app.get('/logout', function(req, res, next){
	req.session.destroy();
	res.render('login');
});



var auth= function(req, res, next) {
  //res.render('index', { title: 'Express' });
  //console.log("este es el middleware");
  if (req.session["rol"]!= "admin"){
		res.sendStatus(401);
		return;
	}
  next();
};

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
