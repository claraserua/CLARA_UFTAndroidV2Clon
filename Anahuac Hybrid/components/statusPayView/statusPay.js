'use strict';

app.statusPayView = kendo.observable({
    onShow: function() { if(Refresh_VEC_login2 == true){ emptyEstadoCuenta(); }  },
    afterShow: function() { getEstadoCuenta(); }
});

// START_CUSTOM_CODE_statusPayView

var SPCuenta_Refresh = true;
var Refresh_VEC_login2 = false;

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
   
    Refresh_VEC_login2 = false;
    
    if(SPCuenta_Refresh==false)
        return;
    
    if(!checkConnection()){ showNotification('No network connection','Network'); return; }
    
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    var websevicename = 'estado/'+usuario;
    
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
         
      SPCuenta_Refresh=false;
         // do stuff with json (in this case an array)
      $.each(data, function(index, element) {
         
          $('#vencidos').html("$"+element.adeudoSiVenc.trim());
          $('#novencidos').html("$"+element.adeudoNoVenc.trim());
          $('#stotal').html("$"+element.saldoACuenta.trim());
          
           
         
        });
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