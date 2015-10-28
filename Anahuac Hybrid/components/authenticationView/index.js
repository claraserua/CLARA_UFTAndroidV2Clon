'use strict';

app.authenticationView = kendo.observable({
    onShow: function() { window.localStorage.setItem("access","FALSE"); },
    afterShow: function() { }
});

// START_CUSTOM_CODE_authenticationView
// END_CUSTOM_CODE_authenticationView

function IniciarSesion(){
   
     if(!checkConnection()){ showNotification('No hay Red disponible','Conexión'); return; }
    
    var usuario = $('#usuario').val();
    var password = $('#password').val();
    window.localStorage.setItem("access","FALSE");
    
    
       if (kendo.support.mobileOS.ios && kendo.support.mobileOS.tablet) {
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
      null,         // callback
    'Alerta',            // title
    'Aceptar'                  // buttonName
     );
                    return false;
                }

            
   $('.km-loader').show();
    var websevicename = 'security/getUserInfo';
    var url = 'http://redanahuac.mx/mobile/webservice/curl.php';
    
    
    $.ajax({
     data: {websevicename: websevicename,username:usuario,password:password},
     url:url,
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
     window.localStorage.setItem("access","FALSE");
     showErrorLogin();
    
     }      
     });
    
    

    
}



function getRolAccess(){
    
    
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    var websevicename = 'security/getUserInfo';
    var redirect = 'homeView';
    
    var url = 'http://redanahuac.mx/mobile/webservice/curl.php';
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
                    //vibrate();
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
        //navigator.notification.vibrate(10000);
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