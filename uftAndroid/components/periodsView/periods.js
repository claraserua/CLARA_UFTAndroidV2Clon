'use strict';

app.periodsView = kendo.observable({
    onShow: function() {  },
    afterShow: function() {  getPeriodos(); }
});

// START_CUSTOM_CODE_perfilView
var PSC_Refresh = true;

function Refresh_periodos(){
      PSC_Refresh = true;
      getPeriodos();
  }

function getPeriodos(){
   
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    var websevicename = 'termoa/'+usuario;
    
    if(PSC_Refresh==false)
        return;
    
    if(!checkConnection()){ showNotification('No hay Red disponible','Conexión'); return; }
    
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
         PSC_Refresh = false;
         var html='<ul class="km-widget km-listview km-list">';
         $.each(data, function(index, element) {
         // alert(element.crseCrnn);
          html += '<li><a class="km-listview-link" data-role="listview-link" onClick="setPeriodo(\''+element.termCode+'\',\''+element.termDesc+'\')">'+element.termDesc+'<span class="icon-right"></span></a></li>';
          
        });
         
         html +='</ul>';
         
         $('#periodos').html(html);
     },
     error:function(){
          showNotification('Intentalo Nuevamente','Alerta');
   
     }      
     });
    
    
}

function setPeriodo(termperiodo,name){
    SCCarrera_Refresh = true;
    $('#val_carrera').val('');
    $('#desc_carrera').html('Materia');
    $('#desc_periodo').html(name);
    $('#val_periodo').val(termperiodo);
    app.mobileApp.navigate('components/searchCoursesView/view.html');
    
}

// END_CUSTOM_CODE_perfilView