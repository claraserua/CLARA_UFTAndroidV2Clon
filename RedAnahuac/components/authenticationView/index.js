'use strict';

app.authenticationView = kendo.observable({
    onShow: function() { onStart(); /*window.localStorage.setItem("access","FALSE");*/ },
    afterShow: function() { }
});

// START_CUSTOM_CODE_authenticationView
// END_CUSTOM_CODE_authenticationView

function onStart()
{
    addBackButtonEvent();
    
    $('#div_input_login').hide();
    $('#div_button_login').hide();
    var usuario =  window.localStorage.getItem("usuario");
    if(usuario != null)
    {
        $('#usuario').val(usuario.trim());
        var password =  window.localStorage.getItem("password");
        if(password != null && password != "")
        {
            var access =  window.localStorage.getItem("access");
            if (access == "TRUE")
            {
                console.log('Usuario, password y acceso recuperados.');
                $('#password').val(password.trim());
                IniciarSesion();
                return;
            }
            else
                console.log('access='+access);
        }
    }
    $('#div_input_login').show();
    $('#div_button_login').show();
}

function IniciarSesion(){
   
    if(!checkConnection()){
        showNotification('No hay Red disponible','Conexión');
        $('#div_input_login').show();
        $('#div_button_login').show();
        return;
    }
    
    var usuario = $('#usuario').val();
    var password = $('#password').val();
    window.localStorage.setItem("access","FALSE");
    
    if (kendo.support.mobileOS.ios && kendo.support.mobileOS.tablet)
    {
        // PORTRAIT:
        if ($(window).height()>$(window).width()){
           
        // LANDSCAPE:
        }else{
          // redirect = 'homeSplitView';
           //window.scrollTo(0,0);
        }
    }
    
    if (usuario=="") {
        showNotification('Ingrese el usuario','Campos obligatorios');
        return false;
    }
    
    if (password=="") {
        navigator.notification.alert(
            'Ingrese la contraseña!',  // message
            null,                      // callback
            'Alerta',                  // title
            'Aceptar'                  // buttonName
        );
        return false;
    }
    
    $('.km-loader').show();
    var websevicename = 'security/getUserInfo';
    
    
    $.ajax({
        data: {websevicename: websevicename,username:usuario,password:password},
        url: url_webservice,
        dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
        jsonp: 'callback',
        contentType: "application/json; charset=utf-8",
        success:function(data){
            // do stuff with json (in this case an array)
            
            
            window.localStorage.setItem("usuario",usuario);
            window.localStorage.setItem("password",password);
            window.localStorage.setItem("access","TRUE");
            
            getRolAccess();
        },
        error:function(){
            $('#div_input_login').show();
            $('#div_button_login').show();
            window.localStorage.setItem("access","FALSE");
            showErrorLogin();
        }
    });
}


function getRolAccess()
{
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    var websevicename = 'security/getUserInfo';
    var redirect = 'homeView';
    
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
         
         // do stuff with json (in this case an array)
         if(data.roles.length == 1){      
               if(data.roles[0].trim() == "student"){
                    vibrate();
                    setTimeout(function() {
                        app.mobileApp.navigate('components/' + redirect + '/view.html');
                        $('.km-loader').hide();
                    }, 0);
               }else{
                   showNotification('Disponible solo para Alumnos','Acceso Negado');
               }
         }else{
                if(data.roles[0].trim() == "student" || data.roles[1].trim() == "student"){
                    vibrate();
                    setTimeout(function() {
                        app.mobileApp.navigate('components/' + redirect + '/view.html');
                        $('.km-loader').hide();
                    }, 0);
                    
                }else{
                    showNotification('Disponible solo para Alumnos','Acceso Negado');
                }
         }
         
     },
     error:function(){
     
       showNotification('Intentalo Nuevamente','Alerta');
     }      
    });
    
    
}


function vibrate(){
        navigator.notification.vibrate(1000);
    }

function playBeep(){
        navigator.notification.beep(1);
}


function cleanLogin(){
    $('.km-loader').hide();
    $('#password').val('');
}



// START_CUSTOM_CODE_authenticationViewModel
// END_CUSTOM_CODE_authenticationViewModel