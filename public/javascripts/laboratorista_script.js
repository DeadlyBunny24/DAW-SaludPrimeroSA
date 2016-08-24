$( document ).ready(function() {
        init();
    });

function init(){
		//Laboratorista
	//	var lab;
	//	$.getJSON("../json/laboratorio.JSON",function(response){
	//		lab = response;
	//		//Comportamiento de los exámenes
	//		lab.lista.forEach(function(item){
	//			$("#examenes_contenido").append("<tr>");
	//			$("#examenes_contenido tr:last-child").append("<td>"+item.paciente+"</td>");
	//			$("#examenes_contenido tr:last-child").append("<td>"+item.centro+"</td>");
	//			$("#examenes_contenido tr:last-child").append("<td>"+item.examen+"</td>");
	//			if(item.estado=="estado_1"){
	//				$("#examenes_contenido tr:last-child").append("<td><div id="+"'circle_espera'"+"></div></td>");
	//			}else{
	//				$("#examenes_contenido tr:last-child").append("<td><div id="+"'circle_completo'"+"></div></td>");
	//			}	
	//			$("#examenes_contenido tr:last-child").append('<td>'+			
	//				'<button class="btn btn-warning btn-xs" data-toggle="modal" data-target="#notificar"><i class="glyphicon glyphicon-pencil"></i> Notificar</button>'+
	//				'&thinsp;'+
	//				'<button type="button" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#ingresar"><i class="glyphicon glyphicon-plus"></i> Ingresar</button>'+
	//				'</td>');	
	//		});	
	//	});
		
		var dataSet = new Array;
		var filaS = [];
		var filaO = [];
		var filaH = [];
		var flag = 0;

		$.getJSON("http://localhost:3000/paciente", function(response)
	 	{
	 		

	 		response.forEach(function(paciente)
	 		{	
	 			paciente.fichas.forEach(function(ficha)
	 			{
	 				filaS.push(ficha.fecha);
	 				filaS.push(ficha.centro);
	 				filaS.push(ficha.laboratorio);
	 				filaS.push("");
	 				filaS.push("");
	 				filaS.push("");
	 				filaS.push('<button class="btn btn-warning btn-xs" data-toggle="modal" data-target="#notificar"><i class="glyphicon glyphicon-pencil"></i> Notificar</button>'+'&thinsp;'+'<button type="button" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#ingresar"><i class="glyphicon glyphicon-plus"></i> Ingresar</button>');
	 				filaS.push(ficha.fid);
	 				flag = 0;

	 				ficha.examen.forEach(function(examen)
	 				{
	 					
	 					if (examen.tipo == "sangre")
	 					{
	 						filaS[3]=examen.tipo;
	 						filaS[4]= filaS[4].concat(examen.nombre, ", ");
	 						filaS[5] = examen.estado;
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
	 						filaO.push('<button class="btn btn-warning btn-xs" data-toggle="modal" data-target="#notificar"><i class="glyphicon glyphicon-pencil"></i> Notificar</button>'+'&thinsp;'+'<button type="button" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#ingresar"><i class="glyphicon glyphicon-plus"></i> Ingresar</button>');
	 						filaO.push(ficha.fid);
	 						dataSet.push(filaO);
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
	 						filaH.push('<button class="btn btn-warning btn-xs" data-toggle="modal" data-target="#notificar"><i class="glyphicon glyphicon-pencil"></i> Notificar</button>'+'&thinsp;'+'<button type="button" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#ingresar"><i class="glyphicon glyphicon-plus"></i> Ingresar</button>');
	 				        filaH.push(ficha.fid);
	 						dataSet.push(filaH);
	 						filaH = [];
	 					};

	 				});
	 				if (flag==1)
	 				{
	 					dataSet.push(filaS);
	 				}

	 				filaS = [];

	 			});
	 		});
	 		console.log(dataSet);
	 		$('#Examenes_Laboratorista').DataTable( 
		 	{
    	    	data: dataSet,
    	    	columns: 
    	    	[
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
    	    	    	"visible": true,
                		"searchable": true
    	    	    }
    	    	]


    		} );
    		$('#Examenes_Operario tbody .dc').on('click', 'button.btn-warning', function () {
    	    	
    	    	console.log("notificar");
    		} );
    		$('#Examenes_Operario tbody .dc').on('click', 'button.btn-primary', function () {
    	    	console.log("Ingresar");
    		} );
    		dataSet = [];
	 	});

}

