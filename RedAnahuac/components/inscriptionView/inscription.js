'use strict';

app.inscriptionView = kendo.observable({
    onShow: function() { if(Refresh_VINSC_login2 == true){ $('#div_inscripcion_id').empty(); } },
    afterShow: function() { getInscripcion(); }
});


var PSCitaIns_Refresh = true;
var Refresh_VINSC_login2 = false;

function Refresh_CitaIns(){
      PSCitaIns_Refresh = true;
      getInscripcion();
  }



// START_CUSTOM_CODE_aboutView
function getInscripcion(){
   
    Refresh_VINSC_login2 = false;
    
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    var websevicename = 'cita/'+usuario;
    
    if(PSCitaIns_Refresh==false)
        return;
    
     if(!checkConnection()){ showNotification('No hay Red disponible','Conexión'); return; }
    
    var url = 'http://redanahuac.mx/mobile/webservice/curl.php';
    
    $('.km-loader').show();
    
    $.ajax({
     data: {websevicename: websevicename,username:usuario,password:password},
     url:url,
     dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
     jsonp: 'callback',
     contentType: "application/json; charset=utf-8",
     complete:function(data){
         $('.km-loader').hide(); 
        }, 
     success:function(data){
         // do stuff with json (in this case an array)
        PSCitaIns_Refresh = false;
       var html='';
       if(data.length>0)
         {
        
             $.each(data, function(index, element)
             {
                 html +=
                '<div class="card">'+
                '<div class="card-header"><span class="item-title">Campus:</span><span class="item-after-right">'+element.campDes+'</span></div>'+        
                
                
                '<div class="card-header"><span class="item-title">A partir de:</span><span class="item-after-right">'+element.fechIni+'</span></div>'+        
                
                
                '<div class="card-header"><span class="item-title">Hora inicio:</span><span class="item-after-right">'+element.horaIni+'</span></div>'+        
                
                
                '<div class="card-header"><span class="item-title">Hasta:</span><span class="item-after-right">'+element.fechFin+'</span></div>'+        
                
                
                '<div class="card-header"><span class="item-title">Hora final:</span><span class="item-after-right">'+element.horaFin+'</span></div>'+        
                '</div>';
                 
                 $('#ci_periodo01').html(element.termDes);
             });
             
            
             
            
         }else{
              html ='<div class="card-content-inner">NO HAY FECHAS DISPONIBLES PARA INSCRIPCIÓN.</div>';
                             
         }
         $('#div_inscripcion_id').html(html);
     },
     error:function(){
          showNotification('Intentalo Nuevamente','Alerta');
       
     }      
     });
}




// END_CUSTOM_CODE_aboutView
(function(parent) {
    var inscriptionViewModel = kendo.observable({
        openLink: function(url) {
            window.open(url, '_system');
            if (window.event) {
                window.event.preventDefault && window.event.preventDefault();
                window.event.returnValue = false;
            }
        }
    });

    parent.set('inscriptionViewModel', inscriptionViewModel);
})(app.inscriptionView);

// START_CUSTOM_CODE_inscriptionModel
// END_CUSTOM_CODE_inscriptionModel
