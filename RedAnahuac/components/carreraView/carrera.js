'use strict';

app.carreraView = kendo.observable({
    onShow: function() {  },
    afterShow: function() { getCarreras(); }
});

// START_CUSTOM_CODE_perfilView
var SCCarrera_Refresh = true;

function Refresh_carrera(){
      SCCarrera_Refresh = true;
      getCarreras();
  }



function getCarreras(){
   
    var periodo = $('#val_periodo').val();
    var campus = $('#val_campus').val();
    
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    
    var websevicename = 'materia/'+periodo+'/'+campus;
    
    if(SCCarrera_Refresh==false)
        return;
    
     if(!checkConnection()){ showNotification('No hay Red disponible','Conexión'); return; }
    
    $('#carreras').empty();
    $('.km-loader').show();
    $.ajax({
     data: {websevicename: websevicename,username:usuario,password:password},
     url: url_webservice,
     dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
     jsonp: 'callback',
     contentType: "application/json; charset=utf-8",
     complete:function(data){
         $('.km-loader').hide();  
     },
     success:function(data){
         // do stuff with json (in this case an array)
         SCCarrera_Refresh = false;
         var html='<ul class="km-widget km-listview km-list" >';
         
         
         html += '<li><a class="km-listview-link" data-role="listview-link" onClick="setCarreraNinguno()">Ninguna <span class="icon-right"></span></a></li>';
         $.each(data, function(index, element) {
          html += '<li><a class="km-listview-link" data-role="listview-link" onClick="setCarrera(\''+element.subjCode+'\',\''+element.subjDesc+'\')">'+element.subjDesc+'<span class="icon-right"></span></a></li>';
        });
          html +='</ul>';
         
         $('#carreras').html(html);
     },
     error:function(){
          showNotification('Intentalo Nuevamente','Alerta');
     
     }      
     });
    
    
}


function setCarreraNinguno(){
    
    $('#desc_carrera').html('Materia');
    $('#val_carrera').val('');
    app.mobileApp.navigate('components/searchCoursesView/view.html');
}

function setCarrera(carreracode,name){
   
    $('#desc_carrera').html(name);
    $('#val_carrera').val(carreracode);
    app.mobileApp.navigate('components/searchCoursesView/view.html');
    
}

// END_CUSTOM_CODE_perfilView