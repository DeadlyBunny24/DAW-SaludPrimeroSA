var mongoose = require("mongoose")
, Schema = mongoose.Schema

var labSchema = new mongoose.Schema({
	nombre: { type: String, lowercase: true, trim: true },
	muestras:[{ type: Schema.Types.ObjectId, ref: 'muestra' }],
	updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("lab", labSchema);


