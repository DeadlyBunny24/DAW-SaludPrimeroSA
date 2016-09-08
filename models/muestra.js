var mongoose = require("mongoose")
, Schema = mongoose.Schema


var muestraSchema = new Schema({
	tipo: { type: String, trim: true, required: true },
	resultado: { type: String, trim: true },
	estado: { type: String,  trim: true, default:"Ingresado" },
	lab: { type: String, trim: true, required: true },
	centro: { type: String, trim: true, required: true},
	paciente: { type: Schema.Types.ObjectId, ref: 'paciente'},
	examenes: { type: String,  trim: true, required: true },
	fecha: { type: String,  trim: true , required: true},
	notificacion:{ type: String,  trim: true },
	cedula:{ type: String,  trim: true , required: true},
	updated_at: { type: Date, default: Date.now }
});


module.exports = mongoose.model("muestra", muestraSchema);

