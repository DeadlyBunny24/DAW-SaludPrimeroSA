var mongoose = require("mongoose")
, Schema = mongoose.Schema

var pacienteSchema = new Schema({
	nombre: { type: String, lowercase: true, trim: true },
	apellido: { type: String, lowercase: true, trim: true },
	cedula: { type: String, lowercase: true, trim: true },
	correo: { type: String, lowercase: true, trim: true },
	direccion: { type: String, lowercase: true, trim: true },
	foto: { type: String, lowercase: true, trim: true },
	contrasena: { type: String, lowercase: true, trim: true },
	telefono: { type: String, lowercase: true, trim: true },
	muestras: [{ type: Schema.Types.ObjectId, ref: 'muestra' }],
	updated_at: { type: Date, default: Date.now }
});

pacienteSchema.pre('remove', function(next) {
    // Remove all the assignment docs that reference the removed person.
    this.model('muestra').remove({ paciente: this.cedula }, next);
});

module.exports = mongoose.model("paciente", pacienteSchema);


