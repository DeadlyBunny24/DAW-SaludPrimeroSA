$( document ).ready(function() {
        init();
    });

function init(){
	
}

 function dropdown(val) {
  var y = document.getElementsByClassName('btn btn-default dropdown-toggle');
  $("#rol").attr("value",val.replace(/\n|<.*?>/g,''));
  var aNode = y[0].innerHTML = val + ' <span class="caret"></span>'; 
}