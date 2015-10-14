'use strict';

app.statusPayView = kendo.observable({
    onShow: function() { getEstadoCuenta(); },
    afterShow: function() {}
});

// START_CUSTOM_CODE_statusPayView
function getEstadoCuenta(){
   
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    var websevicename = 'estado/'+usuario;
    
    var url = 'http://redanahuac.mx/mobile/webservice/curl.php';
    
    $.ajax({
     data: {websevicename: websevicename,username:usuario,password:password},
     url:url,
     dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
     jsonp: 'callback',
     contentType: "application/json; charset=utf-8",
     success:function(data){
         // do stuff with json (in this case an array)
      $.each(data, function(index, element) {
         
          $('#vencidos').html(element.adeudoSiVenc);
          $('#novencidos').html(element.adeudoNoVenc);
          $('#paplicar').html(element.saldoACuenta);
          $('#stotal').html(element.totalCargo);
          
           
         
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