
function submitForm(oFormElement) {
  var fecha1 = document.forms['myform'].elements['fecha1'].value
  var fecha2 = document.forms['myform'].elements['fecha2'].value
  //console.log("--->"+fecha1)
  datos(fecha1,fecha2);
  return false;
}


var datos = function (fecha1, fecha2) {
  var dict = {};
  var map = new Map;
  var categorias = [];
  var labo="";
  var valores="";
  let muestraObj={

  }
  $.getJSON("http://localhost:3000/paciente/muestra", function(response){

    response.forEach(function(ficha){
        var dateCheck = ficha.fecha;
        var c = dateCheck.split("/");
        var mesCheck = parseInt(c[1])-1;
        if (mesCheck >= fecha1 && mesCheck <= fecha2){
          if (map.get(ficha.lab) === undefined || map.get(ficha.lab) ==null || map.get(ficha.lab)===null){
            map.put(ficha.lab, {laboratotio:ficha.lab,cantidad:[]});
            for(let cont= fecha1; cont<=fecha2; cont++){
                (map.get(ficha.lab)).cantidad.push({mes:meseAnio(cont), cant:0});
            }
          }
          (map.get(ficha.lab)).cantidad.forEach(function(mes_) {
            if ((mes_.mes).localeCompare(meseAnio(cont))==0){
              mes_.cant = mes_.cant;
            }
          });
        }
    });

    for(var i = 0; i++ < map.size; map.next()) {


     console.log((map.value()).laboratotio);
    }

  });
}

var meseAnio = function (mes) {
  var cad="";
  switch(mes) {
    case 1:
        cad="ENERO";
        break;
    case 2:
        cad="FEBRERO";
        break;
    case 3:
        cad="MARZO";
        break;
    case 4:
        cad="ABRIL";
        break;
    case 5:
        cad="MAYO";
        break;
    case 6:
        cad="JUNIO";
        break;
    case 7:
        cad="JULIO";
        break;
    case 8:
        cad="AGOSTO";
        break;
    case 9:
        cad="SEPTIEMBRE";
        break;
    case 10:
        cad="OBTUBRE";
        break;
    case 11:
        cad="NOVIEMBRE";
        break;
    case 12:
        cad="DICIEMBRE";
        break;
    default:
        break;
      }
      return cad;
}


datos(1,12);
