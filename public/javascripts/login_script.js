$( document ).ready(function() {
        init();
    });

function init(){
	//Inicialización
	$("#boton_inicio").click(function(){
		if($("#username").val()=="usuario"){
			$("#boton_inicio").attr("href", "home")
		}
		else if($("#username").val()=="operario"){
			$("#boton_inicio").attr("href", "operario")
		}
		else{
			$("#boton_inicio").attr("href", "laboratorista")
		}
	});
}