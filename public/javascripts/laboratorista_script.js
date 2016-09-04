
var i=0;
var x=0;
var indice = 1;
$( document ).ready(function() 
{
    init();
});

var pos ;
var fid;
var fila = [];


function init(){
		//Laboratorista


		var dataSet = new Array;
		var flag = 0;

		$.getJSON("http://localhost:3000/modelo/muestra", function(response)
	 	{
			i = 0;
			response.forEach(function(muestra)
	 		{
	 			i = i+1;
				//console.log(muestra);


					fila.push(i);
					fila.push(muestra.fecha);
					fila.push(muestra.centro);
					fila.push(muestra.lab);
					fila.push(muestra.tipo);
					fila.push(muestra.examenes);
					fila.push(muestra.estado);
					fila.push('<button class="btn btn-warning btn-xs" data-toggle="modal" data-target="#notificar"><i class="glyphicon glyphicon-pencil"></i> Notificar</button>'+'&thinsp;'+'<button type="button" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#ingresar"><i class="glyphicon glyphicon-plus"></i> Ingresar</button>');
					fila.push(muestra._id);
					dataSet.push(fila);
					fila  = [];

	 		});
			
			
			
			
	 		//console.log(dataSet);
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


    		} );
			
			
    		$('#Examenes_Operario tbody .dc').on('click', 'button.btn-warning', function () {

    	    	console.log("notificar");
    		} );
    		$('#Examenes_Laboratorista tbody .dc').on('click', 'button.btn-primary', function () {
    	    	var tr = $(this).closest('tr');
    	    	 pos = $(this).parent().parent().find('td:first-child').text();
				 fid = $(this).parent().parent().find('td:last-child').text();
				document.getElementById("examen_ingresar").innerHTML=$(this).parent().parent().find('td:nth-child(6)').text();
    	    	// $this
				/*
    	    	var ced = tds.text();

    	    	$.ajax({
    				url: 'http://localhost:3000/paciente/examen/"fid//pos + ced,
    				type: 'DELETE',
    				success: function(result) {
    					tr.hide();        				
   					 }
				});
    	    	console.log(ced);
      	    	console.log(tds);
    	    	//tr.hide();
    	    	//console.log("borrar de la base de datos la ficha");
				*/
    		} );
    		dataSet = [];
	 	});

		
		
}
/*
function registrar(){
	var res = document.getElementById("resultado").value;
	var ced = tds.text();

	$.ajax({
		url: 'http://localhost:3000/paciente/examen/"fid//pos + ced,
		type: 'DELETE',
		success: function(result) {
			tr.hide();        				
		 }
	});
	console.log(ced);
	console.log(tds);
	//tr.hide();
	//console.log("borrar de la base de datos la ficha");
}*/
