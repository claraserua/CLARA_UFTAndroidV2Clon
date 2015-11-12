'use strict';

app.perfilView = kendo.observable({
    onShow: function() { if(BPerfil_Refresh==true){ emptyPerfil(); }  },
    afterShow: function() { getPerfil(); }
});

// START_CUSTOM_CODE_perfilView
var BPerfil_Refresh = true;


function Refresh_perfil(){
      BPerfil_Refresh = true;
      getPerfil();
  }

function emptyPerfil(){
          $('#nivel1').html('');
          $('#periodo').html('');
          $('#idalumno').html('');
          $('#nombre').html('');
           $('#nivel').html('');
           $('#carrera').html('');
           $('#programa').html('');
           $('#status').html('');
           $('#telefono').html('');
           $('#correo').html('');
           $('#direccion').html(''); 
}

function getPerfil(){
     
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    var websevicename = 'perfil/'+usuario;
    
    
    
    if(BPerfil_Refresh==false)
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
         
         BPerfil_Refresh = false;
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
         
    showNotification('Intentalo Nuevamente','Alerta');
     }      
     });
    
    
}

// END_CUSTOM_CODE_perfilView