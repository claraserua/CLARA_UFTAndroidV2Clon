'use strict';

app.inscriptionView = kendo.observable({
    onShow: function() { },
    afterShow: function() { getInscripcion(); }
});


var PSCitaIns_Refresh = true;

function Refresh_CitaIns(){
      PSCitaIns_Refresh = true;
      getInscripcion();
  }



// START_CUSTOM_CODE_aboutView
function getInscripcion(){
   
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    var websevicename = 'cita/'+usuario;
    
    if(PSCitaIns_Refresh==false)
        return;
    
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
                '<div class="card_light">'+
                '<div class="card-header"><span class="item-title">Campus:</span><span class="item-after-right">'+element.campDes+'</span></div>'+        
                '</div>'+
                 '<div class="card_light">'+
                '<div class="card-header"><span class="item-title">A partir de:</span><span class="item-after-right">'+element.fechIni+'</span></div>'+        
                '</div>'+
                 '<div class="card_light">'+
                '<div class="card-header"><span class="item-title">Hora inicio:</span><span class="item-after-right">'+element.horaIni+'</span></div>'+        
                '</div>'+
                 '<div class="card_light">'+
                '<div class="card-header"><span class="item-title">Hasta:</span><span class="item-after-right">'+element.fechFin+'</span></div>'+        
                '</div>'+
                 '<div class="card_light">'+
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
         
        navigator.notification.alert(
        'Opps!',  // message
        alertDismissed,         // callback
        'Inicie Sesion!',            // title
        'Aceptar'                  // buttonName
         );
     
         ExitApp();
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
