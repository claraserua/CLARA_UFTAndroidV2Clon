'use strict';

app.inscriptionView = kendo.observable({
    onShow: function() { getInscripcion(); },
    afterShow: function() {}
});

// START_CUSTOM_CODE_aboutView
function getInscripcion(){
   
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    var websevicename = 'cita/'+usuario;
    
    var url = 'http://redanahuac.mx/mobile/webservice/curl.php';
    
    $( "#inscripcion" ).empty();
    //$( "#inscripcion" ).append('<tr><td>Descripción</td><td>Inicio</td><td>Fin</td></tr>');
    
    $.ajax({
     data: {websevicename: websevicename,username:usuario,password:password},
     url:url,
     dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
     jsonp: 'callback',
     contentType: "application/json; charset=utf-8",
     success:function(data){
         // do stuff with json (in this case an array)
         
         var html = '';
         $('#load-content').remove();
         if(data.length!=0){
         $.each(data, function(index, element) {
         // alert(element.crseCrnn); 
          //var link = '<tr><td>'+element.holdDesc+'</td><td>'+element.fInicio+'</td><td>'+element.fFin+'</td></tr>';
        //  $( "#retenciones" ).append( link );
         
        });
         }else{
              html +=
                 '<div class="card">'+
                 '<div class="card-content">'+
                 '<div class="card-content-inner"><span class="item-orange-bold">NO HAY FECHAS DISPONIBLES PARA INSCRIPCIÓN.</span></div>'+
                 '</div>'+
                 '</div>'+
                 '';
             $('#inscripcion').html(html);
         }
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