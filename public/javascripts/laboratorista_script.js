
var i=0;
var x=0;
						var indice = 1;
$( document ).ready(function() {
        init();
    });

function init(){
		//Laboratorista
	//	var lab;
	//	$.getJSON("../json/laboratorio.JSON",function(response){
	//		lab = response;
	//		//Comportamiento de los ex�menes
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
				for (; x<paciente.fichas.length ; x++ )
	 			//paciente.fichas.forEach(function(ficha)
	 			{

					i=0;
	 				for (; i<paciente.fichas[x]['examen'].length ; i++ )
					//for (var examen in ficha.examen )
	 				{
	 					if (paciente.fichas[x]['examen'][i]["tipo"] == "sangre")
	 					{
							filaS.push(i);
							filaS.push(paciente.fichas[x]["fecha"]);
	 						filaS.push(paciente.fichas[x]["centro"]);
	 						filaS.push(paciente.fichas[x]["laboratorio"]);
	 						filaS.push(paciente.fichas[x]['examen'][i]["tipo"]);
	 						filaS.push(paciente.fichas[x]['examen'][i]["nombre"]);
	 						filaS.push(paciente.fichas[x]['examen'][i]["estado"]);
	 						filaS.push('<button class="btn btn-warning btn-xs" data-toggle="modal" data-target="#notificar"><i class="glyphicon glyphicon-pencil"></i> Notificar</button>'+'&thinsp;'+'<button type="button" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#ingresar"><i class="glyphicon glyphicon-plus"></i> Ingresar</button>');
	 						filaS.push(paciente.fichas[x]["fid"]);
	 						dataSet.push(filaS);
	 						filaS = [];
	 					}
	 					else if (paciente.fichas[x]['examen'][i]["tipo"] == "orina")
	 					{
							filaO.push(i);
	 						filaO.push(paciente.fichas[x]["fecha"]);
	 						filaO.push(paciente.fichas[x]["centro"]);
	 						filaO.push(paciente.fichas[x]["laboratorio"]);
	 						filaO.push(paciente.fichas[x]['examen'][i]["tipo"]);
	 						filaO.push(paciente.fichas[x]['examen'][i]["nombre"]);
	 						filaO.push(paciente.fichas[x]['examen'][i]["estado"]);
	 						filaO.push('<button class="btn btn-warning btn-xs" data-toggle="modal" data-target="#notificar"><i class="glyphicon glyphicon-pencil"></i> Notificar</button>'+'&thinsp;'+'<button type="button" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#ingresar"><i class="glyphicon glyphicon-plus"></i> Ingresar</button>');
	 						filaO.push(paciente.fichas[x]["fid"]);
	 						dataSet.push(filaO);
	 						filaO = [];
	 					}
	 					else if (paciente.fichas[x]['examen'][i]["tipo"]  == "heces")
	 					{
							filaH.push(i);
	 						filaH.push(paciente.fichas[x]["fecha"]);
	 						filaH.push(paciente.fichas[x]["centro"]);
	 						filaH.push(paciente.fichas[x]["laboratorio"]);
	 						filaH.push(paciente.fichas[x]['examen'][i]["tipo"]);
	 						filaH.push(paciente.fichas[x]['examen'][i]["nombre"]);
	 						filaH.push(paciente.fichas[x]['examen'][i]["estado"]);
	 						filaH.push('<button class="btn btn-warning btn-xs" data-toggle="modal" data-target="#notificar"><i class="glyphicon glyphicon-pencil"></i> Notificar</button>'+'&thinsp;'+'<button type="button" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#ingresar"><i class="glyphicon glyphicon-plus"></i> Ingresar</button>');
	 						filaH.push(paciente.fichas[x]["fid"]);
	 						dataSet.push(filaH);
	 						filaH = [];
	 					};
	 				};
	 				if (flag==1)
	 				{
	 					dataSet.push(filaS);
	 				}

	 				filaS = [];

	 			};
	 		});
	 		console.log(dataSet);
			$('#Examenes_Laboratorista').DataTable(
		 	{
    	    	data: dataSet,
    	    	columns:
    	    	[
							{title: "Indice"},
    	    		{title: "Fecha"},
    	    	    { title: "Centro" },
    	    	    { title: "Laboratorio" },
    	    	    { title: "Tipo" },
    	    	    { title: "Ex�menes" },
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
