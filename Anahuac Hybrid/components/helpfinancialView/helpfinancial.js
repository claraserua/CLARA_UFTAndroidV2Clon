'use strict';

app.helpfinancialView = kendo.observable({
    onShow: function() { getApoyoFinanciero(); },
    afterShow: function() {}
});

// START_CUSTOM_CODE_aboutView
function getApoyoFinanciero(){
   
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    var websevicename = 'apoyo/'+usuario;
    
    var url = 'http://redanahuac.mx/mobile/webservice/curl.php';
    
    $( "#apoyof" ).empty();
    $('#load-content').remove();
    
    $.ajax({
     data: {websevicename: websevicename,username:usuario,password:password},
     url:url,
     dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
     jsonp: 'callback',
     contentType: "application/json; charset=utf-8",
     success:function(data){
         // do stuff with json (in this case an array)
     
         var html = '';
         $.each(data, function(index, element) {
           
              html =
                 '<div class="card">'+
                 '<div class="card-header"><span>Periodo:</span><span>'+element.periodo+'</span></div>'+
                 '<div class="card-content">'+
                 '<div class="card-content-inner"><div><strong>BECA:</strong> '+element.desBeca+'</div><div><strong>CREDITO:</strong>'+element.desCredito+'</div></div>'+
                 '</div>'+
                 '</div>'+
                 '';
         
          $( "#apoyof" ).append( html );
         
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

// END_CUSTOM_CODE_aboutView
(function(parent) {
    var helpfinancialViewModel = kendo.observable({
        openLink: function(url) {
            window.open(url, '_system');
            if (window.event) {
                window.event.preventDefault && window.event.preventDefault();
                window.event.returnValue = false;
            }
        }
    });

    parent.set('helpfinancialViewModel', helpfinancialViewModel);
})(app.retentionsView);

// START_CUSTOM_CODE_helpfinancialViewModel
// END_CUSTOM_CODE_helpfinancialViewModel