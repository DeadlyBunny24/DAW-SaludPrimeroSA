$( document ).ready(function() {
        init();
    });

function init(){
	//Inicialización
	$("#container_sucursales").hide();
	$("#container_datos").hide();


	
		// Objetos de datos
		//Examenes
		var exa;
	//	$.getJSON("../json/examenes.JSON",function(response){
	//		exa=response;
	//		exa.examenes.forEach(function(item){
	//			$("#examenes_contenido").append("<tr>");
	//			$("#examenes_contenido tr:last-child").append("<td>"+item.tipo+"</td>");
	//			$("#examenes_contenido tr:last-child").append("<td>"+item.fecha+"</td>");
	//			if(item.estado=="estado_1"){
	//				$("#examenes_contenido tr:last-child").append("<td><div id="+"'circle_espera'"+"></div></td>");
	//			}else{
	//				$("#examenes_contenido tr:last-child").append("<td><div id="+"'circle_completo'"+"></div></td>");
	//			}	
	//		});	
	//	});
		var muestras = new Array;
		var fila = [];
		var flag = 0;
		var user = $("#cedula").text();


		console.log(user);
		


		
	 	$.getJSON("http://localhost:3000/modelo/muestra/paciente/" + user, function(response)
	 	{
	 		console.log(response);
			response.forEach(function(muestra)
	 		{	

	 			fila.push(muestra.fecha);
	 			fila.push(muestra.centro);
	 			fila.push(muestra.lab);
	 			fila.push(muestra.tipo);
	 			fila.push(muestra.examenes);
	 			fila.push(muestra.estado);
	 			fila.push('<a href = "#" >pdf</> ');

	 			muestras.push(fila);

	 			fila = [];

	 		});


	 		console.log(muestras);
	 		$('#Examenes_Paciente').DataTable( 
		 	{
    	    	data: muestras,
    	    	columns: 
    	    	[
    	    	    { title: "Fecha" },
    	    	    { title: "Centro"},
    	    	    { title: "Laboratorio"},
    	    	    { title: "Tipo" },
    	    	    { title: "Ex&aacutemen" },
    	    	    { title: "Estado" },
    	    	    { title: "Resultado" }
    	    	]
    		} );

	 	});

	 	$.getJSON("http://localhost:3000/modelo/paciente/" + user, function(response)
	 	{
	 		paciente = response[0];

	 		$("#nombre_i").val(paciente.nombre);
			$("#apellido_i").val(paciente.apellido);
			$("#correo_i").val(paciente.correo);
			$("#cedula_i").val(paciente.cedula);
			$("#direccion_i").val(paciente.direccion);
			$("#telefono_i").val(paciente.telefono);
			$("#imagen_i").attr("src",paciente.foto);
	 	});
	 	

				
		//Sucursales
		var suc;
		var opt;
		var opt2;
		var fotos;
		var i = 0;
		$.getJSON("http://localhost:3000/modelo/centro/",function(response){
			
			response.forEach(function(centro){
				$("#centrosm").append('<li role="presentation"><a role="menuitem" tabindex="-1" href="#">' + centro.nombre +'</a></li>');
				console.log(centro.nombre); 

				$(".dropdown-menu li:last-child a").click(function(){
					$("#datos_sucursal p:first-child span").text(centro.direccion);
					$("#datos_sucursal p:nth-child(2) span").text(centro.descripcion);
					$("#datos_sucursal p:nth-child(3) span").text(centro.horario);
					fotos = centro.galeria.split(',');
					i = 0;
					$(".carousel-inner").empty();
					fotos.forEach(function(foto)
					{
						console.log(foto);
						if (i==0)
						{
							$(".carousel-inner").append('<div class="item active"><img src="'+ foto +'" alt="portada_1"></div>');
						}
						else
						{
							$(".carousel-inner").append('<div class="item"><img src="'+ foto +'" alt="portada_1"></div>');
						}
						i=i+1;
					})
					
					// Inicialización del API de google maps
					initMap(""+centro.lat, "" + centro.log);
				});				
			});
			//Comportamiento de menú de sucursales
	
			

		});
	
		//Datos usuario
		
		
		//Sucursales
		/* var suc = jQuery.parseJSON('{"lista":[\
		{"direccion":"direccion_1","descripcion":"descripcion_1","horario":"horario_1"},\
		{"direccion":"direccion_2","descripcion":"descripcion_2","horario":"horario_2"}\
		]}');
		
		//Operario
		var ope = jQuery.parseJSON('{"lista":[\
		{"paciente":"paciente_1","centro":"centro_1","examen":"examen_1"},\
		{"paciente":"paciente_2","centro":"centro_2","examen":"examen_2"}\
		]}');
		
		//Laboratorista
		var lab = jQuery.parseJSON('{"lista":[\
		{"paciente":"paciente_1","centro":"centro_1","examen":"examen_1", "estado":"estado_1"},\
		{"paciente":"paciente_2","centro":"centro_2","examen":"examen_2","estado":"estado_2"}\
		]}');
	
		//Datos usuario
		var user = jQuery.parseJSON('{"datos":[\
		{"nombre":"nombre_1","apellido":"Apellido_1","correo":"correo@espol", "cedula":"111111111", "direccion":"Direccion_1","telefono":"000000000","img":"images/user_icon.png"},\
		{"nombre":"nombre_2","apellido":"Apellido_2","correo":"correo@espol", "cedula":"111111111", "direccion":"Direccion_2","telefono":"000000000","img":"images/user_icon.png"}\
		]}');
		console.log(user); */

	
	//Comportamiento del menú principal
	$(".menu li:nth-child(2) a").click(function(){
		$(".breadcrumb li h2").text("Sucursales");
		$(".menu li:nth-child(2)").siblings("li").removeClass("active");
		$(".menu li:nth-child(2)").addClass("active");
		$("#container_examenes").hide();
		$("#container_datos").hide();	
		$("#container_sucursales").show();
	});	

	$(".menu li:nth-child(1) a").click(function(){
		$(".breadcrumb li h2").text("Examenes");
		$(".menu li:nth-child(1)").siblings("li").removeClass("active");
		$(".menu li:nth-child(1)").addClass("active");
		$("#container_sucursales").hide();
		$("#container_datos").hide();	
		$("#container_examenes").show();		
	});

	$(".menu li:nth-child(3) a").click(function(){
		$(".breadcrumb li h2").text("Datos Personales");
		$(".menu li:nth-child(3)").siblings("li").removeClass("active");
		$(".menu li:nth-child(3)").addClass("active");
		$("#container_sucursales").hide();
		$("#container_examenes").hide();
		$("#container_datos").show();		
	});	
	
	//Comportamiento de los exámenes
	
	

	
	//Comportamiento datos
	//Cargar datos
	
	
	//Comportamiento boton editar
	$("#boton_editar").click(function(){
		$("#nombre_i").prop('disabled', false);
		$("#apellido_i").prop('readonly', false);
		$("#correo_i").prop('readonly', false);
		$("#cedula_i").prop('readonly', false);
		$("#direccion_i").prop('readonly', false);
		$("#telefono_i").prop('readonly', false);
		$("#boton_editar").text("Guardar");
	});
	$("#boton_cancelar").click(function(){
		$("#nombre_i").prop('readonly', true);
		$("#apellido_i").prop('readonly', true);
		$("#correo_i").prop('readonly', true);
		$("#cedula_i").prop('readonly', true);
		$("#direccion_i").prop('readonly', true);
		$("#telefono_i").prop('readonly', true);
		$("#boton_editar").text("Editar");
	});
	
	
		
	
	
}
	
function initMap(lat_p,lng_p) {
	var mapDiv = document.getElementById('map');
	var myLatLng = {lat: parseInt(lat_p), lng: parseInt(lng_p)};
	
	$("#map").empty();

	var map = new google.maps.Map(mapDiv, {
		center: myLatLng,
		zoom: 13
	});
				
	var marker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		title: 'Salud Primero S.A'
	});
						  
}