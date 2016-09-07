$( document ).ready(function() {

		init();
    });


function dropdownCentro(val) {
  var y = $("#centroDrop");
  $("#centro").attr("value",val.replace(/\n|<.*?>/g,''));
  var aNode = y[0].innerHTML = val + ' <span class="caret"></span>';
}

function dropdownLab(val) {
  var y = $("#labDrop");
  $("#lab").attr("value",val.replace(/\n|<.*?>/g,''));
  var aNode = y[0].innerHTML = val + ' <span class="caret"></span>';
}

function dropdownTipo(val) {
  var y = $("#tipoDrop");
  var str= val.replace(/\n|<.*?>/g,'');
  str= str.replace('Muestra de ','');
  var aNode = y[0].innerHTML = val + ' <span class="caret"></span>';
  $("#tipo").attr("value",str);
  
  
  if ($("#tipo").val()== "Sangre"){
		$("#exOrina").hide();
		$("#exHeces").hide();
		$("#exSangre").show();
		$('input[name="rMuestra"]:checked').each(function() {//quita la selección de todos los checkboxes
		$(this).removeAttr('checked');
		});
		
  } else if ($("#tipo").val()== "Orina"){
		$("#exSangre").hide();
		$("#exHeces").hide();
		$("#exOrina").show();
		$('input[name="rMuestra"]:checked').each(function() {//quita la selección de todos los checkboxes
		$(this).removeAttr('checked');
		});
  } else if ($("#tipo").val()== "Heces"){
		$("#exOrina").hide();
		$("#exSangre").hide();
		$("#exHeces").show();
		$('input[name="rMuestra"]:checked').each(function() {//quita la selección de todos los checkboxes
		$(this).removeAttr('checked');
		});
  }
}

var muestra;
function registroMuestra(){

	var cedula= $("#paciente").val();
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	if(dd<10) {
		dd='0'+dd
	}

	if(mm<10) {
		mm='0'+mm
	}
	today = mm+'/'+dd+'/'+yyyy;

	muestra={
	fecha: "a",
	centro: "a",
	lab: "a",
	examenes: "",
	tipo: "a",
	estado: "a",
	cedula:"a"
	}
	muestra.fecha= today;
	muestra.centro= $("#centro").val();
	muestra.lab= $("#lab").val();
	muestra.cedula= cedula;
	muestra.estado= "enviado";
	muestra.tipo= $("#tipo").val();
	
	$('input[name="rMuestra"]:checked').each(function() {	
		muestra.examenes= muestra.examenes + this.value + ", ";
		
		});
		
		muestra.examenes= muestra.examenes.slice(0, -2);
		console.log(muestra);
	
	$.ajax({
	type: "POST",
	  url: "http://localhost:3000/modelo/muestra/"+cedula,
	  data: muestra,
	  success: function(){ alert("Muestra registrada satisfactoriamente.");},
	  error: function(error){
          if(error.responseText == 'showAlert')
              alert("Paciente no encontrado.")},
	  contentType: 'application/x-www-form-urlencoded'
	});


}

var paciente, datosMail;
function registroPaciente(){

	paciente={
	nombre: "a",
	apellido: "a",
	cedula: "a",
	correo: "a",
	contrasena: "a"
	}
	datosMail={
	 correo: "a",
	 contrasena: "a",
	 nombre: "a"
	}
	paciente.nombre= $("#nombres").val();
	paciente.apellido= $("#apellidos").val();
	paciente.cedula= $("#cedula").val();
	paciente.correo= $("#correo").val();
	paciente.contrasena= Math.random().toString(36).slice(-8);
	datosMail.correo=$("#correo").val();
	datosMail.contrasena=paciente.contrasena;
	datosMail.nombre= paciente.nombre+" "+ paciente.apellido;
		//console.log(paciente);
	$.ajax({
	type: "POST",
	  url: "http://localhost:3000/modelo/paciente",
	  data: JSON.stringify(paciente),
	  success: function(){ 
	  console.log(paciente);
	  window.alert("El paciente fue registrado exitosamente.");
	  $.ajax({
	type: "POST",
	  url: "http://localhost:3000/modelo/email",
	  data: JSON.stringify(datosMail),
	  success: function(){ console.log(datosMail);
	  window.alert("El mail fue enviado exitosamente.");},
	  contentType: 'application/json'
	});
	},error: function(error){
          if(error.responseText == 'showAlert')
              alert("Error registrando Paciente.")},
	  contentType: 'application/json'
	});
     
	

}

function init(){
	var fila = [];
	var fila2 = [];

	var dataSet1 = new Array;
	var dataSet2 = new Array;

	$.getJSON("http://localhost:3000/modelo/muestra", function(response)
	{
		response.forEach(function(muestra)
		{
			
			//console.log(muestra);
			
			fila.push(muestra.cedula);
			fila.push(muestra.fecha);
			fila.push(muestra.centro);
			fila.push(muestra.lab);
			fila.push(muestra.tipo);
			fila.push(muestra.examenes);
			fila.push(muestra.estado);
			fila.push('<button class="btn btn-warning btn-xs"><i class="glyphicon glyphicon-pencil" data-toggle="modal" data-target="#editar"></i> Editar</button>'+'&thinsp;'+'<button type="button" class="btn btn-danger btn-xs " data-toggle="modal" data-target="#eliminar"><i class="glyphicon glyphicon-trash"></i> Borrar</button>');
			fila.push(muestra._id);
			dataSet1.push(fila);
			fila  = [];
		});
				//console.log(dataSet);
		$('#Examenes_Operario').DataTable(
		{
        	data: dataSet1,
        	columns:
        	[
				{title: "Paciente"},
        		{title: "Fecha"},
        	    { title: "Centro" },
        	    { title: "Laboratorio" },
        	    { title: "Tipo" },
        	    { title: "Exámenes" },
        	    { title : "Estado"},
        	    { title: "Acciones",
        	    "className":  'dc'
        		},
        	    {
        	    	title: "Id",
        	    	"visible": false,
               		"searchable": false
        	    }
        	]
    	});

		// EVENTOS Muestras
		$('#Examenes_Operario tbody .dc').on('click', 'button.btn-warning', function () 
		{
				console.log("Modificar muestra");
    	} );
    	$('#Examenes_Operario tbody .dc').on('click', 'button.btn-danger', function () 
		{
				console.log("Eliminar Muestra");
    	} );

	});
		
	$.getJSON("http://localhost:3000/modelo/paciente", function(response)
	{
		
		response.forEach(function(paciente)
		{
			fila2.push(paciente.cedula);
			fila2.push(paciente.nombre);
			fila2.push(paciente.apellido);
			fila2.push(paciente.correo);
			fila2.push(paciente.direccion);
			fila2.push(paciente.telefono);
			fila2.push('<button class="btn btn-warning btn-xs"><i class="glyphicon glyphicon-pencil" data-toggle="modal" data-target="#editar"></i> Editar</button>'+'&thinsp;'+'<button type="button" class="btn btn-danger btn-xs " data-toggle="modal" data-target="#eliminar"><i class="glyphicon glyphicon-trash"></i> Borrar</button>');
			dataSet2.push(fila2);
			fila2 = [];
		});




		$('#Pacientes_Operario').DataTable(
		{
        	data: dataSet2,
        	columns:
        	[
				{title: "Cédula"},
        		{title: "Nombre"},
        	    { title: "Apellido" },
        	    { title: "Correo" },
        	    { title: "Dirección" },
        	    { title: "Teléfono" },
           	    { title: "Acciones",
        	    "className":  'dc'
        		}
        	]
    	});

    	$('#Pacientes_Operario tbody .dc').on('click', 'button.btn-warning', function () 
		{
				console.log("Modificar Paciente");
    	} );
    	$('#Pacientes_Operario tbody .dc').on('click', 'button.btn-danger', function () 
		{
				console.log("ELiminar Paciente");
    	} );

	});	








	//Inicialización
	$("#container_sucursales").hide();
	$("#container_datos").hide();
	$("#container_pacientes").hide();
	$("#botonRegistro").hide();
	$("#exOrina").hide();
	$("#exHeces").hide();
	$("#exSangre").hide();
	$('#myModalPaciente').on('hidden.bs.modal', function () {//resetea el modal de ingreso del paciente cada vez que se cierre
    $(this).find("input,textarea,select").val('').end();
	});
	
	$('#myModalMuestra').on('hidden.bs.modal', function () {//resetea el modal de ingreso de muestra cada vez que se cierre
    var x = $("#centroDrop");
	var y = $("#labDrop");
	var z = $("#tipoDrop");
	$(this).find("input,textarea,select").val('').end();
	var aNode = x[0].innerHTML = 'Seleccione un Centro <span class="caret"></span>';
	var bNode = y[0].innerHTML = 'Seleccione un Laboratorio <span class="caret"></span>';
	var cNode = z[0].innerHTML = 'Seleccione un tipo de Muestra <span class="caret"></span>';
	$("#exOrina").hide();
	$("#exHeces").hide();
	$("#exSangre").hide();
	$('input[name="rMuestra"]:checked').each(function() {//quita la selección de todos los checkboxes
		$(this).removeAttr('checked');
		});
	});



	//Comportamiento del menú principal
	$(".menu li:nth-child(2) a").click(function(){
		$(".breadcrumb li h2").text("Reportes");
		$(".menu li:nth-child(2)").siblings("li").removeClass("active");
		$(".menu li:nth-child(2)").addClass("active");
		$("#container_examenes").hide();
		$("#container_datos").hide();
		$("#botonRegistro").hide();
		$("#botonRegistroMuestra").hide();
		$("#container_pacientes").hide();
		$("#container_sucursales").show();
	});

	$(".menu li:nth-child(1) a").click(function(){
		$(".breadcrumb li h2").text("Exámenes");
		$(".menu li:nth-child(1)").siblings("li").removeClass("active");
		$(".menu li:nth-child(1)").addClass("active");
		$("#container_sucursales").hide();
		$("#container_datos").hide();
		$("#container_pacientes").hide();
		$("#botonRegistro").hide();
		$("#container_examenes").show();
		$("#botonRegistroMuestra").show();
		
	});

	$(".menu li:nth-child(3) a").click(function(){
		$(".breadcrumb li h2").text("Pacientes");
		$(".menu li:nth-child(3)").siblings("li").removeClass("active");
		$(".menu li:nth-child(3)").addClass("active");
		$("#container_sucursales").hide();
		$("#container_examenes").hide();
		$("#container_datos").hide();
		$("#botonRegistroMuestra").hide();
		$("#container_pacientes").show();
		$("#botonRegistro").show();

	});
}
	//Comportamiento de los exámenes


	//Compa?ro
