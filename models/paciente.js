var mongoose = require("mongoose")
, Schema = mongoose.Schema

var pacienteSchema = new Schema({
	nombre: { type: String, trim: true, required: true },
	apellido: { type: String, trim: true, required: true },
	cedula: { type: String, trim: true, unique: true, required: true},
	correo: { type: String, lowercase: true, trim: true, required: true},
	direccion: { type: String, trim: true},
	foto: { type: String, lowercase: true, trim: true },
	contrasena: { type: String, lowercase: true, trim: true, required: true },
	telefono: { type: String, trim: true },
	muestras: [{ type: Schema.Types.ObjectId, ref: 'muestra' }],
	updated_at: { type: Date, default: Date.now }
	
});

pacienteSchema.pre('remove', function(next) {
    // Remove all the assignment docs that reference the removed person.
    this.model('muestra').remove({ paciente: this.cedula }, next);
});

module.exports = mongoose.model("paciente", pacienteSchema);


