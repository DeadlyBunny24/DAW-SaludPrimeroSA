
function submitForm(oFormElement) {
  var fecha1 = document.forms['myform'].elements['fecha1'].value
  var fecha2 = document.forms['myform'].elements['fecha2'].value
  //console.log("--->"+fecha1)
  var cc1 = fecha1.split("/");
  var cc2 = fecha2.split("/");
  datos(parseInt(cc1[1])-1,parseInt(cc2[1])-1);
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
  $.getJSON("http://localhost:3000/modelo/muestra", function(response){

    response.forEach(function(ficha){
        var dateCheck = ficha.fecha;
        var c = dateCheck.split("/");
        var mesCheck = parseInt(c[1])-1;
        if (mesCheck >= fecha1 && mesCheck <= fecha2){
          if (map.get(ficha.lab) === undefined || map.get(ficha.lab) ==null || map.get(ficha.lab)===null){
            map.put(ficha.lab, {laboratotio:ficha.lab,cantidad:[]});
            for(let cont= fecha1; cont<=fecha2; cont++){
                (map.get(ficha.lab)).cantidad.push({mes:meseAnio(cont), cant:0});

                  categorias.push(meseAnio(cont));
            }
          }
          (map.get(ficha.lab)).cantidad.forEach(function(mes_) {
            if ((mes_.mes).localeCompare(meseAnio(mesCheck))==0){
              mes_.cant = mes_.cant+1;
            }
          });
        }
    });

    var series_ = [];
    for(var i = 0; i++ < map.size; map.next()) {
      let lista = [];
      (map.value()).cantidad.forEach(function(mes_) {
        lista.push(mes_.cant);
      });
      series_.push({name:(map.value()).laboratotio,data:lista});
      console.log((map.value()).laboratotio);
    }

    $('#container_grafico_3').highcharts({
           chart: {
               type: 'column'
           },
           title: {
               text: 'Numero de muestras por laboratorio en un intervalo de tiempo'
           },
           subtitle: {
               text: ''
           },
           xAxis: {
               categories: categorias,
               crosshair: true
           },
           yAxis: {
               min: 0,
               title: {
                   text: 'Numero de muestras'
               }
           },
           tooltip: {
               headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
               pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                   '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
               footerFormat: '</table>',
               shared: true,
               useHTML: true
           },
           plotOptions: {
               column: {
                   pointPadding: 0.2,
                   borderWidth: 0
               }
           },
           series: series_
       });

  });
}

var initGraph= function() {
  var map = new Map;
  $.getJSON("http://localhost:3000/modelo/muestra", function(response){

    response.forEach(function(ficha){
      if (map.get(ficha.lab) === undefined || map.get(ficha.lab) ==null || map.get(ficha.lab)===null){
        map.put(ficha.lab, {laboratotio:ficha.lab,cantidad:0});
      }
      (map.get(ficha.lab)).cantidad = (map.get(ficha.lab)).cantidad +1;
    });
    var series_ = [];
    for(var i = 0; i++ < map.size; map.next()) {
        series_.push({name:(map.value()).laboratotio+": "+(map.value()).cantidad+" muestras",y:(map.value()).cantidad});
    }

    $('#container_grafico_1').highcharts({
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: 'Numero de muestras por Laboratorio'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            data: series_

        }]
    });

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

initGraph();
datos(1,12);
