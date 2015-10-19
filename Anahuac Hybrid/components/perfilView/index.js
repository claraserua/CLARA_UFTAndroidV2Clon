'use strict';

app.perfilView = kendo.observable({
    onShow: function() {  },
    afterShow: function() { getPerfil(); }
});

// START_CUSTOM_CODE_perfilView


function getPerfil(){
     
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    var websevicename = 'perfil/'+usuario;
    
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
     
      $.each(data, function(index, element) {
         
          $('#nivel1').html(element.crseTitl);
          $('#periodo').html(element.crseCrse);
          $('#idalumno').html(element.crseCrnn);
          $('#nombre').html(element.crseSubj);
           $('#nivel').html(element.crseTitl);
           $('#carrera').html(element.stcrGrde);
           $('#programa').html(element.stcrMidd);
           $('#status').html(element.nameFacu);
           $('#telefono').html(element.telefono);
           $('#correo').html(element.correo);
           $('#direccion').html(element.direccion);
         
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

// END_CUSTOM_CODE_perfilView