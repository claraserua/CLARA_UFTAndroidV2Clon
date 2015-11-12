'use strict';

app.retentionsView = kendo.observable({
    onShow: function() {  },
    afterShow: function() { getRetenciones(); }
});

var VRetention_Refresh = true;

function Refresh_VRetention(){
      VRetention_Refresh = true;
      getRetenciones();
  }


// START_CUSTOM_CODE_aboutView
function getRetenciones(){
   
    if(VRetention_Refresh==false)
        return;
    
     if(!checkConnection()){ showNotification('No hay Red disponible','Conexión'); return; }
    
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    var websevicename = 'retencion/'+usuario;
    
    var url = 'http://redanahuac.mx/mobile/webservice/curl.php';
    
   $( "#retenciones").empty();
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
         VRetention_Refresh=false;
         var html = '';
      $.each(data, function(index, element) {
           
        
            if(element.holdDesc.trim()!='not'){
          html +=
                 '<div class="card-light" style="border-bottom: 1px solid #ccc !important;">'+
                 '<div class="card-header" style="position:static !important;">'+element.holdDesc+'</div>'+
                 '<div class="card-footer" style="position:static !important;" ><span>Inicio:'+element.fInicio+'</span><span style="float:right;">Fin:'+element.fFin+'</span></div>'+
                 '</div>'+
                 '';
                }else{
                    
                    html +=
                 '<div class="card-light" style="border-bottom: 1px solid #ccc !important;">'+
                 '<div class="card-header" style="position:static !important;">No cuentas con restricciones en este momento</div>'+
                 '</div>'+
                 ''; 
                }
         
        });
         
         
         $( "#retenciones" ).html( html );
     },
     error:function(){
          showNotification('Intentalo Nuevamente','Alerta');
   
     }      
     });
    
    
}

// END_CUSTOM_CODE_aboutView
(function(parent) {
    var retentionsViewModel = kendo.observable({
        openLink: function(url) {
            window.open(url, '_system');
            if (window.event) {
                window.event.preventDefault && window.event.preventDefault();
                window.event.returnValue = false;
            }
        }
    });

    parent.set('retentionsViewModel', retentionsViewModel);
})(app.retentionsView);

// START_CUSTOM_CODE_aboutViewModel
// END_CUSTOM_CODE_aboutViewModel