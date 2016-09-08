var mongoose = require("mongoose")
, Schema = mongoose.Schema


var muestraSchema = new Schema({
	tipo: { type: String, lowercase: true, trim: true, required: true },
	resultado: { type: String, lowercase: true, trim: true },
	estado: { type: String, lowercase: true, trim: true, default:"Ingresado" },
	lab: { type: String, lowercase: true, trim: true, required: true },
	centro: { type: String, lowercase: true, trim: true, required: true},
	paciente: { type: Schema.Types.ObjectId, ref: 'paciente'},
	examenes: { type: String, lowercase: true, trim: true, required: true },
	fecha: { type: String, lowercase: true, trim: true , required: true},
	notificacion:{ type: String, lowercase: true, trim: true },
	cedula:{ type: String, lowercase: true, trim: true , required: true},
	updated_at: { type: Date, default: Date.now }
});


module.exports = mongoose.model("muestra", muestraSchema);

