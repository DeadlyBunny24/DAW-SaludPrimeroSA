npm install -> Para instalar las dependencias.

localhost:3000/     		-> Pag. de Login
localhost:3000/home 		-> Pag. de paciente
localhost:3000/operario 	-> Pag. de operario
localhost:3000/laboratorista 	-> Pag. de laboratorista

Schemas:

Pacientes

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

Muestras

	var muestraSchema = new Schema({
		tipo: { type: String, lowercase: true, trim: true },
		resultado: { type: String, lowercase: true, trim: true },
		estado: { type: String, lowercase: true, trim: true },
		lab: { type: String, lowercase: true, trim: true },
		centro: { type: String, lowercase: true, trim: true },
		paciente: { type: Schema.Types.ObjectId, ref: 'paciente' },
		examenes: { type: String, lowercase: true, trim: true },
		fecha: { type: String, lowercase: true, trim: true },
		notificacion:{ type: String, lowercase: true, trim: true },
		cedula:{ type: String, lowercase: true, trim: true },
		updated_at: { type: Date, default: Date.now }
	});

Laboratorios

	var labSchema = new mongoose.Schema({
		nombre: { type: String, lowercase: true, trim: true },
		muestras:[{ type: Schema.Types.ObjectId, ref: 'muestra' }],
		updated_at: { type: Date, default: Date.now }
	});

Centros
	
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

Métodos:

GET

	/modelo/paciente
	
	/modelo/laboratorio
	
	/modelo/centro
	
	/modelo/muestra
	
	/modelo/paciente/:id
	
		Retorna info de paciente con cedula = id
	
	/modelo/muestra/paciente/:id

		Retorna las muestras del paciente con _id = id
	
	/modelo/laboratorio/:id

		Retorna las muestras por laboratorio con _id = id
	
POST
	
	modelo/paciente
	
	modelo/centro
	
	modelo/laboratorio
	
	modelo/muestra/:id
		
		Añade una muestra la paciente con cedula = id

PUT

	modelo/paciente/:id
	
		Actualiza la info de un paciente con cedula = id
		
	modelo/muestra/:id

		Actualiza la info de una muestra con _id = id
		
	modelo/muestra/resultado/:id/

		Actualiza el resultado con el valor de req.body.res, de una muestra con _id = id 

	modelo/muestra/notificacion/:id/	
	
		Actualiza la notificacion con el valor de req.body.not, de una muestra con _id = id

DELETE

	modelo/paciente/:id
		
		Elimina el paciente con cedula = id

	modelo/muestra/:id
		
		Elimina la muestra con _id = id
	
		