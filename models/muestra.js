var mongoose = require("mongoose")
, Schema = mongoose.Schema


var muestraSchema = new Schema({
	tipo: { type: String, lowercase: true, trim: true },
	resultado: { type: String, lowercase: true, trim: true },
	estado: { type: String, lowercase: true, trim: true },
	lab: { type: String, lowercase: true, trim: true },
	centro: { type: String, lowercase: true, trim: true},
	paciente: { type: Schema.Types.ObjectId, ref: 'paciente' },
	examenes: { type: String, lowercase: true, trim: true },
	fecha: { type: String, lowercase: true, trim: true },
	notificacion:{ type: String, lowercase: true, trim: true },
	cedula:{ type: String, lowercase: true, trim: true },
	updated_at: { type: Date, default: Date.now }
});


module.exports = mongoose.model("muestra", muestraSchema);

