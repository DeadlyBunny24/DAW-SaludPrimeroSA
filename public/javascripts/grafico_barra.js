

var key = function (obj) {
                // some unique object-dependent key
    return obj.totallyUniqueEmployeeIdKey; // just an example
};

var datos = function (fecha1, fecha2) {
   var dict = {};
   var map = new Map;
   var labo="";
   var valores="";
  $.getJSON("http://localhost:3000/paciente", function(response){
    var dateFrom = fecha1;
    var dateTo = fecha2;
    var d1 = dateFrom.split("/");
    var d2 = dateTo.split("/");
    var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
    var to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
    response.forEach(function(paciente){
      paciente.fichas.forEach(function(ficha){
        var dateCheck = ficha.fecha;
        var c = dateCheck.split("/");
        var check = new Date(c[2], parseInt(c[1])-1, c[0]);
        if (check > from && check < to){
          ficha.examen.forEach(function(examen){
            if (map.get(ficha.laboratorio) === undefined || map.get(ficha.laboratorio) ==null || map.get(ficha.laboratorio)===null){
              map.put(ficha.laboratorio, {"laboratotio":ficha.laboratorio,"sangre":0,"orina":0,"heces":0});
            }
            if (map.get(ficha.laboratorio)[examen.tipo]=== undefined) {
              map.get(ficha.laboratorio)[examen.tipo] = 1;
            } else {
              map.get(ficha.laboratorio)[examen.tipo] = map.get(ficha.laboratorio)[examen.tipo] +1;
            }

          });

        }
      });
    });
      for(var i = 0; i++ < map.size; map.next()) {
        labo=labo+map.value()["laboratotio"]+",";
        valores=valores+map.value()["sangre"]+";"+map.value()["orina"]+";"+map.value()["heces"]+", ";
          //console.log(map.value()["laboratotio"]+"  -//"+map.value()["sangre"]);
      }
      labo = labo.substring(0,labo.length-1),
      valores = valores.substring(0,valores.length-2),
      //console.log("="+labo);
      //console.log("="+valores);

      graph = new BAR_GRAPH("hBar");
      //definimos las etiquetas que acompañarán a cada pareja de valores
      graph.labels = labo;
      graph.titles = "Muestras,Cantidad,Porcentaje";
      graph.values = valores;
      graph.legend = "Sangre,Orina,Heces";
      graph.legendAbsValues = true;
      graph.showValues = 1;


      document.getElementById('grafico_enfermedades').innerHTML =graph.create();
  });



}

function submitForm(oFormElement) {
  var fecha1 = document.forms['myform'].elements['fecha1'].value
  var fecha2 = document.forms['myform'].elements['fecha2'].value
  //console.log("--->"+fecha1)
  datos(fecha1,fecha2);
  return false;
}

datos("08/15/2016","08/20/2016");
