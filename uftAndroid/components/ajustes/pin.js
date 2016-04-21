'use strict';

app.pinView = kendo.observable({
    onShow: function() {  $('#nipanterior').val(''); $('#nipnuevo').val(''); $('#nipnuevo2').val('');  $('#formnip').show();
    $('#changeniptrue').hide();  },
    afterShow: function() { //getPerfil(); 
        
    }
});

// START_CUSTOM_CODE_perfilView
//var BPerfil_Refresh = true;


function Cancelpin(){
     app.mobileApp.navigate('components/ajustes/view.html');
    
}


function changeNIP(){
    
    var nipanterior = $('#nipanterior').val();
    var nipnuevo = $('#nipnuevo').val();
    var nipnuevo2 = $('#nipnuevo2').val();
    
    var password = window.localStorage.getItem("password");
    
    
    if(nipanterior==""){showNotification('El campo es necesario', 'NIP Anterior'); return;}
    
    if(nipanterior != password){showNotification('Ingreselo Nuevamente', 'Su NIP Anterior es incorrecto'); return;}
    
    if(nipnuevo==""){showNotification('El campo es necesario', 'NIP Nuevo'); return;}
    
    if(nipnuevo2==""){showNotification('El campo es necesario', 'Re-Ingresar NIP Nuevo'); return;}
    
    if(nipnuevo != nipnuevo2){showNotification('Ingreselo Nuevamente', 'Repita su NIP nuevo correctamente'); return;}
    
    if (nipanterior.length < 6 || nipanterior.length > 15) {
        showNotification('La longitud del campo deber ser de 6 a 15 caracteres','NIP Anterior'); return;
    }

    if (nipnuevo.length < 6 || nipnuevo.length > 15) {
        showNotification('La longitud del campo deber ser de 6 a 15 caracteres','NIP Nuevo'); return;
    }
    
    if (nipnuevo2.length < 6 || nipnuevo2.length > 15) {
        showNotification('La longitud del campo deber ser de 6 a 15 caracteres','Re-Ingresar NIP Nuevo'); return;
    }
    
    NipUpdate(nipnuevo);
    
}





function NipUpdate(nipnuevo){
     
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    var nipnew = nipnuevo;
    
    
    var websevicename = 'acceso/'+usuario+'/'+nipnew;
      
    
    if(!checkConnection()){ showNotification('No hay Red disponible','Conexión'); return; }
    
    $('.km-loader').show();
  
    $.ajax({
        data: {websevicename: websevicename,username:usuario,password:password},
        url: url_webservice,
        dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
        jsonp: 'callback',
        contentType: "application/json; charset=utf-8",
        complete:function(data)
        {
            $('.km-loader').hide();
        },
        success:function(data)
        {
            $.each(data, function(index, vals){
                if(vals.mensaje == null){
                    window.localStorage.setItem("password",nipnew);
                    showMessageTrue();
                }
                else{
                    showNotification(vals.mensaje,'Alerta');
                }
            });
        },
        error:function()
        {
            showNotification('Intentalo Nuevamente','Alerta');
        }
    });
}


function showMessageTrue()
{
    $('#formnip').hide();
    $('#changeniptrue').show();
}

// END_CUSTOM_CODE_perfilView