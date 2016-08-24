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
var muestra;
function registroMuestra(){
	
	
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
	laboratorio: "a",
	examenes: "a"
	}
	muestra.fecha= "today";
	muestra.centro= $("#centro").val();
	muestra.laboratorio= $("#lab").val();
	muestra.examenes= [];
	$('input[name="rMuestra"]:checked').each(function() {
		var examen;
		examen={
	tipo: "a",
	nombre: "a",
	estado: "a",
	}
		examen.tipo= this.getAttribute("class");
		examen.nombre= this.value;
		examen.resultado="";
		examen.estado= "enviado";
		muestra.examenes.push(examen);
		});
		console.log(muestra);
	/*$.ajax({
	type: "PUT",
	  url: "/paciente/fichas/2",
	  data: JSON.stringify(muestra),
	  success: function(){ console.log(muestra);},
	  contentType: 'application/json'
	});*/
	
		
}
/*function onSave(){
return false;
}*/

var paciente, datosMail;
function registroPaciente(){
	
	paciente={
	["datos_personales.nombre"]: "a",
	["datos_personales.apellido"]: "a",
	["datos_personales.cedula"]: "a",
	["datos_personales.correo"]: "a",
	["datos_personales.contrasena"]: "a"
	}
	datosMail={
	 correo: "a",
	 contrasena: "a"
	}
	paciente["datos_personales.nombre"]= $("#nombres").val();
	paciente["datos_personales.apellido"]= $("#apellidos").val();
	paciente["datos_personales.cedula"]= $("#cedula").val();
	paciente["datos_personales.correo"]= $("#correo").val();
	paciente["datos_personales.contrasena"]= Math.random().toString(36).slice(-8);
	datosMail.correo=$("#correo").val();
	datosMail.contrasena=paciente["datos_personales.contrasena"];
		//console.log(paciente);
	$.ajax({
	type: "POST",
	  url: "http://localhost:3000/paciente/",
	  data: JSON.stringify(paciente),
	  success: function(){ console.log(paciente);
	  window.alert("El paciente fue registrado exitosamente.");},
	  contentType: 'application/json'
	});
	
	$.ajax({
	type: "POST",
	  url: "http://localhost:3000/paciente/email",
	  data: JSON.stringify(datosMail),
	  success: function(){ console.log(datosMail);
	  window.alert("El mail fue enviado exitosamente.");},
	  contentType: 'application/json'
	});
		
}

function init(){
	//Inicialización
	$("#container_sucursales").hide();
	$("#container_datos").hide();
	$("#container_pacientes").hide();
	$("#botonRegistro").hide();

	// Objetos de datos
	//Operario
		var ope;
	//	$.getJSON("../json/operario.JSON",function(response){
	//		ope = response;
	//		ope.lista.forEach(function(item){
	//			$("#examenes_contenido").append("<tr>");
	//			$("#examenes_contenido tr:last-child").append("<td>"+item.paciente+"</td>");
	//			$("#examenes_contenido tr:last-child").append("<td>"+item.centro+"</td>");
	//			$("#examenes_contenido tr:last-child").append("<td>"+item.examen+"</td>");
	//			$("#examenes_contenido tr:last-child").append('<td>'+			
	//				'<button class="btn btn-warning btn-xs"><i class="glyphicon glyphicon-pencil" data-toggle="modal" data-target="#editar"></i> Editar</button>'+
	//				'&thinsp;'+
	//				'<button type="button" class="btn btn-danger btn-xs" data-toggle="modal" data-target="#eliminar"><i class="glyphicon glyphicon-trash"></i> Borrar</button>'+
	//				'</td>');	
	//		});	
	//	});	

		var muestras = new Array;
		var pacientes = new Array;
		var filaS = [];
		var filaO = [];
		var filaH = [];
		var filap = [];
		var flag = 0;
		


		
	 	$.getJSON("http://localhost:3000/paciente", function(response)
	 	{

	 		response.forEach(function(paciente)
	 		{	
	 			console.log(paciente)
	 			filap.push(paciente.datos_personales.cedula);
	 			filap.push(paciente.datos_personales.nombre);
	 			filap.push(paciente.datos_personales.apellido);
	 			filap.push(paciente.datos_personales.correo);
	 			filap.push('<button class="btn btn-warning btn-xs"><i class="glyphicon glyphicon-pencil" data-toggle="modal" data-target="#editar"></i> Editar</button>'+'&thinsp;'+'<button type="button" class="btn btn-danger btn-xs " data-toggle="modal" data-target="#eliminar"><i class="glyphicon glyphicon-trash"></i> Borrar</button>');
	 			filap.push(paciente.id);
	 			pacientes.push(filap);

	 			filap = [];

	 			paciente.fichas.forEach(function(ficha)
	 			{
	 				filaS.push(ficha.fecha);
	 				filaS.push(paciente.datos_personales.cedula);
	 				filaS.push(ficha.centro);
	 				filaS.push(ficha.laboratorio);
	 				filaS.push("");
	 				filaS.push("");
	 				filaS.push('<button class="btn btn-warning btn-xs"><i class="glyphicon glyphicon-pencil" data-toggle="modal" data-target="#editar"></i> Editar</button>'+'&thinsp;'+'<button type="button" class="btn btn-danger btn-xs" data-toggle="modal" data-target="#eliminar"><i class="glyphicon glyphicon-trash"></i> Borrar</button>');
	 				filaS.push(ficha.fid);
	 				flag = 0;

	 				ficha.examen.forEach(function(examen)
	 				{
	 					
	 					if (examen.tipo == "sangre")
	 					{
	 						filaS[4]=examen.tipo;
	 						filaS[5]= filaS[5].concat(examen.nombre, ", ");
	 						flag =1;
	 					}
	 					else if (examen.tipo == "orina")
	 					{
	 						filaO.push(ficha.fecha);
	 						filaO.push(paciente.datos_personales.cedula);
	 						filaO.push(ficha.centro);
	 						filaO.push(ficha.laboratorio);
	 						filaO.push(examen.tipo);
	 						filaO.push(examen.nombre);
	 						filaO.push('<button class="btn btn-warning btn-xs"><i class="glyphicon glyphicon-pencil" data-toggle="modal" data-target="#editar"></i> Editar</button>'+'&thinsp;'+'<button type="button" class="btn btn-danger btn-xs" data-toggle="modal" data-target="#eliminar"><i class="glyphicon glyphicon-trash"></i> Borrar</button>');
	 						filaO.push(ficha.fid);
	 						muestras.push(filaO);
	 						filaO = [];
	 					}
	 					else if (examen.tipo == "heces")
	 					{
	 						filaH.push(ficha.fecha);
	 						filaH.push(paciente.datos_personales.cedula);
	 						filaH.push(ficha.centro);
	 						filaH.push(ficha.laboratorio);
	 						filaH.push(examen.tipo);
	 						filaH.push(examen.nombre);
	 						filaH.push('<button class="btn btn-warning btn-xs"><i class="glyphicon glyphicon-pencil" data-toggle="modal" data-target="#editar"></i> Editar</button>'+'&thinsp;'+'<button type="button" class="btn btn-danger btn-xs" data-toggle="modal" data-target="#eliminar"><i class="glyphicon glyphicon-trash"></i> Borrar</button>');
	 						filaH.push(ficha.fid);
	 						muestras.push(filaH);
	 						filaH = [];
	 					};

	 				});
	 				if (flag==1)
	 				{
	 					muestras.push(filaS);
	 				}

	 				filaS = [];
	 				

	 			});
	 		});
	 		


	 		//Crear Tabla para muestras medicas

	 		$('#Examenes_Operario').DataTable( 
		 	{
    	    	data: muestras,
    	    	columns: 
    	    	[
    	    		{title: "fecha"},
    	    	    { title: "Paciente" },
    	    	    { title: "Centro" },
    	    	    { title: "Laboratorio" },
    	    	    { title: "Tipo" },
    	    	    { title: "Exámenes" },
    	    	    { title: "Acciones",
    	    	    "className":  'dc'
    	    		},
    	    	    {
    	    	    	title: "Id",
    	    	    	"visible": true,
                		"searchable": true
    	    	    }
    	    	]


    		} );


    		//Tabla para Pacientes 

    		$('#Pacientes_Operario').DataTable( 
		 	{
    	    	data: pacientes,
    	    	columns: 
    	    	[
    	    		{ title: "Cedula"},
    	    	    { title: "Nombre" },
    	    	    { title: "Apellido" },
    	    	    { title: "Correo" },
    	    		{ title: "Acciones",
    	    	    "className":  'dc'
    	    		},
    	    	    {
    	    	    	title: "Id",
    	    	    	"visible": true,
                		"searchable": true
    	    	    }
    	    	]


    		} );

    		$('#Examenes_Operario tbody .dc').on('click', 'button.btn-danger', function () {
    	    	var tr = $(this).closest('tr');
    	    	
    	    	tr.hide();
    	    	console.log("borrar de la base de datos la ficha");
    		} );
    		$('#Examenes_Operario tbody .dc').on('click', 'button.btn-warning', function () {
    	    	console.log("mostrar modal para editar");
    		} );
    		$('#Pacientes_Operario tbody .dc').on('click', 'button.btn-danger', function () {
    	    	var tr = $(this).closest('tr');
    	    	
    	    	tr.hide();
    	    	console.log("borrar de la base de datos la ficha");
    		} );
    		$('#Pacientes_Operario tbody .dc').on('click', 'button.btn-warning', function () {
    	    	console.log("mostrar modal para editar");
    		} );
    		muestras = [];
	 	});

	 	



	
	
	//Comportamiento del menú principal
	$(".menu li:nth-child(2) a").click(function(){
		$(".breadcrumb li h2").text("Reportes");
		$(".menu li:nth-child(2)").siblings("li").removeClass("active");
		$(".menu li:nth-child(2)").addClass("active");
		$("#container_examenes").hide();
		$("#container_datos").hide();
		$("#botonRegistro").hide();
		$("#container_pacientes").hide();	
		$("#container_sucursales").show();
	});	

	$(".menu li:nth-child(1) a").click(function(){
		$(".breadcrumb li h2").text("Examenes");
		$(".menu li:nth-child(1)").siblings("li").removeClass("active");
		$(".menu li:nth-child(1)").addClass("active");
		$("#container_sucursales").hide();
		$("#container_datos").hide();	
		$("#container_pacientes").hide();
		$("#botonRegistro").hide();
		$("#container_examenes").show();		
	});

	$(".menu li:nth-child(3) a").click(function(){
		$(".breadcrumb li h2").text("Información de registro");
		$(".menu li:nth-child(3)").siblings("li").removeClass("active");
		$(".menu li:nth-child(3)").addClass("active");
		$("#container_sucursales").hide();
		$("#container_examenes").hide();
		$("#botonRegistro").hide();
		$("#container_pacientes").hide();
		$("#container_datos").show();	
	});	

	$(".menu li:nth-child(4) a").click(function(){
		$(".breadcrumb li h2").text("Pacientes");
		$(".menu li:nth-child(4)").siblings("li").removeClass("active");
		$(".menu li:nth-child(4)").addClass("active");
		$("#container_sucursales").hide();
		$("#container_examenes").hide();
		$("#container_datos").hide();	
		$("#container_pacientes").show();
		$("#botonRegistro").show();
		
	});	
	
	//Comportamiento de los exámenes
	
	
	//Compa?ro
		var parseTime = d3.timeParse("%M");

		var svg = d3.select("svg");

		var margin = {top: 30, right: 50, bottom: 30, left: 30},
			width = +svg.attr("width") - margin.left - margin.right,
			height = +svg.attr("height") - margin.top - margin.bottom,
			labelPadding = 3;

		var g = svg.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		d3.requestTsv("data-por-mes.tsv", function(d) {
		  d.date = parseTime(d.date);
		  for (var k in d) if (k !== "date") d[k] = +d[k];
		  return d;
		}, function(error, data) {
		  if (error) throw error;

		  var series = data.columns.slice(1).map(function(key) {
			return data.map(function(d) {
			  return {
				key: key,
				date: d.date,
				value: d[key]
			  };
			});
		  });

		  var x = d3.scaleTime()
			  .domain([data[0].date, data[data.length - 1].date])
			  .range([0, width]);

		  var y = d3.scaleLinear()
			  .domain([0, d3.max(series, function(s) { return d3.max(s, function(d) { return d.value; }); })])
			  .range([200, 0]);

		  var z = d3.scaleCategory10();

		  g.append("g")
			  .attr("class", "axis axis--x")
			  .attr("transform", "translate(0," + height + ")")
			  .call(d3.axisBottom(x));

		  var serie = g.selectAll(".serie")
			  .data(series)
			.enter().append("g")
			  .attr("class", "serie");

		  serie.append("path")
			  .attr("class", "line")
			  .style("stroke", function(d) { return z(d[0].key); })
			  .attr("d", d3.line()
				  .x(function(d) { return x(d.date); })
				  .y(function(d) { return y(d.value); }));

		  var label = serie.selectAll(".label")
			  .data(function(d) { return d; })
			.enter().append("g")
			  .attr("class", "label")
			  .attr("transform", function(d, i) { return "translate(" + x(d.date) + "," + y(d.value) + ")"; });

		  label.append("text")
			  .attr("dy", ".35em")
			  .text(function(d) { return d.value; })
			.filter(function(d, i) { return i === data.length - 1; })
			.append("tspan")
			  .attr("class", "label-key")
			  .text(function(d) { return " " + d.key; });

		  label.append("rect", "text")
			  .datum(function() { return this.nextSibling.getBBox(); })
			  .attr("x", function(d) { return d.x - labelPadding; })
			  .attr("y", function(d) { return d.y - labelPadding; })
			  .attr("width", function(d) { return d.width + 2 * labelPadding; })
			  .attr("height", function(d) { return d.height + 2 * labelPadding; });
		});
}