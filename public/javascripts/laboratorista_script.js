
var normalize = (function() {
  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
      to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};

  for(var i = 0, j = from.length; i < j; i++ )
      mapping[ from.charAt( i ) ] = to.charAt( i );

  return function( str ) {
      var ret = [];
      for( var i = 0, j = str.length; i < j; i++ ) {
          var c = str.charAt( i );
          if( mapping.hasOwnProperty( str.charAt( i ) ) )
              ret.push( mapping[ c ] );
          else
              ret.push( c );
      }
      return ret.join( '' );
  }

})();

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
					fila.push('<button class="btn btn-warning btn-xs" data-toggle="modal"'+
					'data-target="#notificar" onclick="agregarNotificacion(\''+muestra._id+'\');" ><i class="glyphicon glyphicon-pencil"></i> Notificar</button>'
					+'&thinsp;'+'<button type="button" class="btn btn-primary btn-xs" data-toggle="modal"'
					+'onclick=" agregarEXAMEN(\''+muestra._id+'\',\''+muestra.examenes+'\',\''+muestra.estado+'\');" data-target="#myModal1"><i class="glyphicon glyphicon-plus"></i> Ingresar</button>');
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

    		$('#Examenes_Laboratorista tbody .dc').on('click', 'button.btn-warning', function () {

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


function agregarNotificacion(id_m) {
	console.log("===>"+id_m);
	$("#id_muestra").val(id_m);
}

var map_resulta = new Map();
function agregarEXAMEN(id_m,examen1, estado_) {
    var cad_examenes = "";
    var examenes = examen1.split(",");
    if(estado_ != "Listo") {
      $("#id_muestra_resultado").val(id_m);
      examenes.forEach(function(ficha){
      ficha = normalize(ficha);
      ficha = ficha.replace(" ","");

        cad_examenes= cad_examenes+''
        +"<fieldset class='scheduler-border'>"
        +"<legend class='scheduler-border'>"+ficha+"</legend>"
            +'<table class="table">'
                +'<tbody>'
                    +'<tr>'
                        +'<td><input type="text" style="width: 110px;" class="form-control" id="'+ficha+'Inputparametro"'
                        +'placeholder="Parámetro" ><td>'
                        +'<td><input type="text" class="form-control" style="width: 90px;" id="'+ficha+'Inputunidad"'
                        +'placeholder="Unidade" ></td>'
                        +'<td><input type="text" class="form-control" style="width: 90px;" id="'+ficha+'Inputresultado"'
                        +'placeholder="Resultado" ></td>'
                        +'<td><input type="text" class="form-control" style="width: 90px;" id="'+ficha+'Inputvalor"'
                        +'placeholder="Valores de Ref." ></td>'
                        +'<td><button type="button" onclick="agregar_resultado(\''+ficha+'\')" class="btn btn-primary">add</button></td>'
                    +'</tr>'
                +'</tbody>'
            +'</table>'
        +'<table  class="table">'
            +'<thead tabla" >'
                +'<tr>'
                    +'<th>Parámetro</th>'
                    +'<th>Unidade</th>'
                    +'<th>Resultado</th>'
                    +'<th>Valores de Ref.</th>'
                +'</tr>'
            +'</thead>'
            +'<tbody id="'+ficha+'tabla">'

            +'</tbody>'
        +'</table>'
        +'</fieldset>';

        map_resulta.put(ficha, {examen:ficha,resultados:[]});
        }
    );

    document.getElementById("contenedor_examen_add").innerHTML= cad_examenes;
  } else {
    document.getElementById("contenedor_examen_add").innerHTML= "<h4>Esta muestra ya a sido revisada</h4>";
  }
}



function agregar_resultado(examen) {
    var parametro_ = $("#"+examen+"Inputparametro").val()
    var unidad_ = $("#"+examen+"Inputunidad").val()
    var resultado_ = $("#"+examen+"Inputresultado").val()
    var valor_ = $("#"+examen+"Inputvalor").val()
    var a = (map_resulta.get(examen));
    a.resultados.push({parametro:parametro_,unidad:unidad_,valor:valor_});
 var cad_examenes_=""
     +'<td>'+parametro_+'</td>'
     +'<td>'+unidad_+'</td>'
     +'<td>'+resultado_+'</td>'
     +'<td>'+valor_+'</td>';
 var node = document.createElement("tr");                 // Create a <li> node
  node.innerHTML=cad_examenes_;         // Create a text noe
  //node.appendChild(textnode);                              // Append the text to <li>
  document.getElementById(examen+"tabla").appendChild(node);
}

var modificar_estado_muestra_op = function modificarMuestraEstado(id_muetsra){

	var muestra={
	estado: "Listo"
	}

	$.ajax({
	type: "PUT",
	  url: "http://localhost:3000/modelo/muestra/"+id_muetsra,
	  data: muestra,
	  success: function(){ alert("Muestra modificada satisfactoriamente.");},
	  error: function(error){
          if(error.responseText == 'showAlert')
              alert("Paciente no encontrado.")},
	  contentType: 'application/x-www-form-urlencoded'
	});

	 location.reload();
}

function guardarExamenes() {
  var id_muestra = $("#id_muestra_resultado").val();
  var nota = document.forms['agragar_notificacion_form'].elements['notificacion_'].value
  console.log("id--->"+id_muestra)
  var series_1 = [];
  for(var i = 0; i++ < map_resulta.size; map_resulta.next()) {
    let lista = [];
    (map_resulta.value()).resultados.forEach(function(mes_) {
      lista.push(mes_);
    });
    series_1.push({name:(map_resulta.value()).examen,data:lista});
  }
  ;
  console.log("id--->"+JSON.stringify(series_1))
  //console.log("--->"+fecha1)
	muentra_nota={
		["res"]: ""+JSON.stringify(series_1)
	}
  $.ajax({
	type: "PUT",
	  url: "http://localhost:3000/modelo/muestra/resultado/"+id_muestra+"/",
	  data: JSON.stringify(muentra_nota),
	  success: function(){ console.log(muentra_nota);
      document.getElementById("mensaje_suces").innerHTML="la nota fue enviada con exito";
        },
	  contentType: 'application/json'
	});
    document.getElementById("mensaje_suces").innerHTML="la nota fue enviada con exito";
  modificar_estado_muestra_op(id_muestra);
}


function submitForm1(oFormElement) {
  var id_m_ = document.forms['agragar_notificacion_form'].elements['id_muestra'].value
  var nota = document.forms['agragar_notificacion_form'].elements['notificacion_'].value

  //console.log("--->"+fecha1)
	muentra_nota={
		["not"]: ""+nota
	}
  $.ajax({
	type: "PUT",
	  url: "http://localhost:3000/modelo/muestra/notificacion/"+id_m_+"/",
	  data: JSON.stringify(muentra_nota),
	  success: function(){ console.log(muentra_nota);
      document.getElementById("mensaje_suces").innerHTML="la nota fue enviada con exito";
        },
	  contentType: 'application/json'
	});
    document.getElementById("mensaje_suces").innerHTML="la nota fue enviada con exito";
    $("#notificacion_").val("");
  return false;
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
