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
		var filaS = [];
		var filaO = [];
		var filaH = [];
		var filap = [];
		var flag = 0;
		var user = $("#cedula").text();


		console.log(user);
		


		
	 	$.getJSON("http://localhost:3000/paciente/" + user, function(response)
	 	{
	 		
			response.forEach(function(paciente)
	 		{	

	 			$("#nombre_i").val(paciente.datos_personales.nombre);
				$("#apellido_i").val(paciente.datos_personales.apellido);
				$("#correo_i").val(paciente.datos_personales.correo);
				$("#cedula_i").val(paciente.datos_personales.cedula);
				$("#direccion_i").val(paciente.datos_personales.direccion);
				$("#telefono_i").val(paciente.datos_personales.telefono);
				$("#imagen_i").attr("src",paciente.datos_personales.foto);

	 			//filap = [];

	 			paciente.fichas.forEach(function(ficha)
	 			{
	 				filaS.push(ficha.fecha);
	 				filaS.push(ficha.centro);
	 				filaS.push(ficha.laboratorio);
	 				filaS.push("");
	 				filaS.push("");
	 				filaS.push("");
	 				filaS.push("");
	 				flag = 0;

	 				ficha.examen.forEach(function(examen)
	 				{
	 					
	 					if (examen.tipo == "sangre")
	 					{
	 						filaS[3]=examen.tipo;
	 						filaS[4]= filaS[4].concat(examen.nombre, ", ");
	 						filaS[5] = examen.estado;
	 						if (examen.estado == "listo")
	 						{
	 							filaS[6] ='<a href = "#" >pdf</> ';
	 						}
	 						flag =1;
	 					}
	 					else if (examen.tipo == "orina")
	 					{
	 						filaO.push(ficha.fecha);
	 						filaO.push(ficha.centro);
	 						filaO.push(ficha.laboratorio);
	 						filaO.push(examen.tipo);
	 						filaO.push(examen.nombre);
	 						filaO.push(examen.estado);
	 						if (examen.estado == "listo")
	 						{
	 							filaO.push('<a href = "#" >pdf</> ');
	 						}
	 						else
	 						{
	 							filaO.push("");
	 						}
	 						muestras.push(filaO);
	 						filaO = [];
	 					}
	 					else if (examen.tipo == "heces")
	 					{
	 						filaH.push(ficha.fecha);
	 						filaH.push(ficha.centro);
	 						filaH.push(ficha.laboratorio);
	 						filaH.push(examen.tipo);
	 						filaH.push(examen.nombre);
	 						filaH.push(examen.estado);
	 						if (examen.estado == "listo")
	 						{
	 							filaH.push('<a href = "#" >pdf</> ');
	 						}
	 						else
	 						{
	 							filaH.push("");
	 						}
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
	 		console.log(muestras);
	 		$('#Examenes_Paciente').DataTable( 
		 	{
    	    	data: muestras,
    	    	columns: 
    	    	[
    	    	    { title: "Fecha" },
    	    	    { title: "Centro"},
    	    	    { title: "laboratorio"},
    	    	    { title: "Tipo" },
    	    	    { title: "Exámen" },
    	    	    { title: "Estado" },
    	    	    { title: "Resultado" }
    	    	]
    		} );

	 	});


	 



	 	

				
		//Sucursales
		var suc;
		$.getJSON("http://localhost:3000/modelo/centro/",function(response){
			
			response.forEach(function(centro){
				//Sucursal_1
				$(".dropdown-menu li:first-child a").click(function(){
					$(".carousel-inner .item:first-child img").attr("src","");
					$(".carousel-inner .item:nth-child(2) img").attr("src","");
					$("#datos_sucursal p:first-child span").text(suc.lista[0].direccion);
					$("#datos_sucursal p:nth-child(2) span").text(suc.lista[0].descripcion);
					$("#datos_sucursal p:nth-child(3) span").text(suc.lista[0].horario);
					$(".carousel-inner .item:first-child img").attr("src","images/surcursal_1_1.jpg");
					$(".carousel-inner .item:nth-child(2) img").attr("src","images/surcursal_1_2.jpg");
					
					// Inicialización del API de google maps
					initMap(-2.148726,-79.9648);
				});				
			});
			//Comportamiento de menú de sucursales
			$(".carousel-inner .item:first-child img").attr("src","");
			$(".carousel-inner .item:nth-child(2) img").attr("src","");
			$("#datos_sucursal p:first-child span").text(suc.lista[0].direccion);
			$("#datos_sucursal p:nth-child(2) span").text(suc.lista[0].descripcion);
			$("#datos_sucursal p:nth-child(3) span").text(suc.lista[0].horario);
			$(".carousel-inner .item:first-child img").attr("src","images/surcursal_1_1.jpg");
			$(".carousel-inner .item:nth-child(2) img").attr("src","images/surcursal_1_2.jpg");
			
			// Inicialización del API de google maps
			initMap(-2.148726,-79.9648);	
			//Sucursal_1
			$(".dropdown-menu li:first-child a").click(function(){
				$(".carousel-inner .item:first-child img").attr("src","");
				$(".carousel-inner .item:nth-child(2) img").attr("src","");
				$("#datos_sucursal p:first-child span").text(suc.lista[0].direccion);
				$("#datos_sucursal p:nth-child(2) span").text(suc.lista[0].descripcion);
				$("#datos_sucursal p:nth-child(3) span").text(suc.lista[0].horario);
				$(".carousel-inner .item:first-child img").attr("src","images/surcursal_1_1.jpg");
				$(".carousel-inner .item:nth-child(2) img").attr("src","images/surcursal_1_2.jpg");
				
				// Inicialización del API de google maps
				initMap(-2.148726,-79.9648);
			});
			
			//Sucursal_2
			$(".dropdown-menu li:nth-child(2) a").click(function(){
				$(".carousel-inner .item:first-child img").attr("src","");
				$(".carousel-inner .item:nth-child(2) img").attr("src","");
				$("#datos_sucursal p:first-child span").text(suc.lista[1].direccion);
				$("#datos_sucursal p:nth-child(2) span").text(suc.lista[1].descripcion);
				$("#datos_sucursal p:nth-child(3) span").text(suc.lista[1].horario);
				$(".carousel-inner .item:first-child img").attr("src","images/surcursal_2_1.jpg");
				$(".carousel-inner .item:nth-child(2) img").attr("src","images/surcursal_2_2.jpg");
				
				// Inicialización del API de google maps
				initMap(-2.145274,-79.948906);
			});
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
	var myLatLng = {lat: lat_p, lng: lng_p};
						
						
	var map = new google.maps.Map(mapDiv, {
		center: myLatLng,
		zoom: 15
	});
						
	var marker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		title: 'Salud Primero S.A'
	});
						  
}