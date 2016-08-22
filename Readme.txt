npm install -> Para instalar las dependencias.

localhost:3000/     		-> Pag. de Login
localhost:3000/home 		-> Pag. de paciente
localhost:3000/operario 	-> Pag. de operario
localhost:3000/laboratorista 	-> Pag. de laboratorista

Toda la informacion cargada en la pag. viene de la carpeta:
public/json. 

Ya la base de datos esta creada. Estoy utilizando mlab.

Utilizaremos el schema paciente para almacenar toda la informacion 
a presentar.

schema pacientes:
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

Tienen que asegurarse que el JSON enviado mantenga los nombres de los parametros.

Nota: Los exámenes se almacenan en el campo fichas, y en el requerimiento deben ser 
enviados como un json con el siguiente formato:

Ejemplo del campo fichas de un paciente:
	fichas: [{
			centro: " ",
			examen: [
							{tipo:" ",nombre:" ",resultado:"",estado:""}
							],
			laboratorio: " ",
			fecha: " ",
			fid=""
		} ]

Nota: Enviar una ficha por cada examen a realizarse.

Lo siguiente lo pueden probar usando "postman", todos retornan JSON.

URLS:

localhost:3000/pacientes 
	GET:
		localhost:3000/pacientes returns lista de pacientes		
		localhost:3000/paciente/:id returns paciente (id)
	POST:
		localhost:3000/paciente ingresa un paciente a la base de datos.
	PUT:
		localhost:3000/paciente/datospersonales/:id actualiza los datos
		personales del paciente (id) 
		
		localhost:3000/paciente/fichas/:id ingresa un nuevo examen al
		paciente (id) 
			
			Nota: Este método asocia un "fid" único a la ficha. Cada ficha es un objeto JSON. 
	
	
	DELETE:
		localhost:3000/paciente/:id elimina paciente(id)

Tareas:

	1. Datalists para presentar la informacion (con la opcion de buscar)
	2. Operario: Modificar examenes, eliminar examenes, registrar paciente
	3. Graficos
	4. Sesiones (manejo de sesiones, cuentas de usuarios)
	5. Laboratorista: Notificar, Ingreso de resultados
	6. Paciente: Modificar datos personales 
 