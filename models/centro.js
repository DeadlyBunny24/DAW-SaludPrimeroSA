var mongoose = require("mongoose")
, Schema = mongoose.Schema



var centroSchema = new mongoose.Schema({
	nombre: { type: String, lowercase: true, trim: true },
	direccion: { type: String, lowercase: true, trim: true },
	descripcion: { type: String, lowercase: true, trim: true },
	horario: { type: String, lowercase: true, trim: true },
	galeria: { type: String, lowercase: true, trim: true },
	lat: { type: String, lowercase: true, trim: true },
	log: { type: String, lowercase: true, trim: true },
	muestras:[{ type: Schema.Types.ObjectId, ref: 'muestra' }],
	updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("centro", centroSchema);

