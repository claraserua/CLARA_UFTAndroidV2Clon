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
           
         // alert(element.crseCrnn); 
          
          html +=
                 '<div class="card-light">'+
                 '<div class="card-header">'+element.holdDesc+'</div>'+
                 '<div class="card-footer"><span>Inicio:'+element.fInicio+'</span><span>Fin:'+element.fFin+'</span></div>'+
                 '</div>'+
                 '';
          
          
          
          $( "#retenciones" ).append( html );
         
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