var mongoose = require("mongoose");

var pacienteSchema = new mongoose.Schema({
	id: String, 
	datos_personales: {
		nombre: { type: String, lowercase: true, trim: true },
		apellido: { type: String, lowercase: true, trim: true },
		cedula: { type: String, lowercase: true, trim: true },
		correo: { type: String, lowercase: true, trim: true },
		direccion: { type: String, lowercase: true, trim: true },
		foto: { type: String, lowercase: true, trim: true },
		contrasena: { type: String, lowercase: true, trim: true },
		telefono: { type: String, lowercase: true, trim: true }
	},
	fichas: [],
	updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("paciente", pacienteSchema);

/*	[{
				centro: { type: String, lowercase: true, trim: true }
				examenes: { type: String, lowercase: true, trim: true }
				laboratorio: { type: String, lowercase: true, trim: true }
				resultado: { type: String, lowercase: true, trim: true }
				fecha: { type: Date, lowercase: true, trim: true }
	}]*/