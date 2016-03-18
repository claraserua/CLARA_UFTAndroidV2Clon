'use strict';

app.statusPayView = kendo.observable({
    onShow: function() { if(SPCuenta_Refresh == true){ emptyEstadoCuenta(); }  },
    afterShow: function() { getEstadoCuenta(); }
});

// START_CUSTOM_CODE_statusPayView

var SPCuenta_Refresh = true;


function SPCuentaPay_Refresh(){
      SPCuenta_Refresh = true;
      getEstadoCuenta();
  }

function emptyEstadoCuenta(){
    
     $('#vencidos').html('');
     $('#novencidos').html('');
     $('#stotal').html('');
}


function getEstadoCuenta(){

    
    if(SPCuenta_Refresh==false)
        return;
    
    if(!checkConnection()){ showNotification('No hay Red disponible','Conexión'); return; }
    
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    var websevicename = 'estado/'+usuario;

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
         
      SPCuenta_Refresh=false;
         // do stuff with json (in this case an array)
      $.each(data, function(index, element) {
         
          $('#vencidos').html("$"+element.adeudoSiVenc.trim());
          $('#novencidos').html("$"+element.adeudoNoVenc.trim());
          $('#stotal').html("$"+element.saldoACuenta.trim());
          
          
        });
     },
     error:function(){
         
    showNotification('Intentalo Nuevamente','Alerta');
     }      
     });
    
    
}
// END_CUSTOM_CODE_statusPayView
(function(parent) {
    var statusPayViewModel = kendo.observable({
        openLink: function(url) {
            window.open(url, '_system');
            if (window.event) {
                window.event.preventDefault && window.event.preventDefault();
                window.event.returnValue = false;
            }
        }
    });

    parent.set('statusPayViewModel', statusPayViewModel);
})(app.statusPayView);

// START_CUSTOM_CODE_statusPayViewModel
// END_CUSTOM_CODE_statusPayViewModel