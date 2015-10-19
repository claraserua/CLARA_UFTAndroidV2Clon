'use strict';

app.authenticationView = kendo.observable({
    onShow: function() { window.localStorage.setItem("access","FALSE"); },
    afterShow: function() { }
});

// START_CUSTOM_CODE_authenticationView
// END_CUSTOM_CODE_authenticationView

function IniciarSesion(){
   
    var usuario = $('#usuario').val();
    var password = $('#password').val();
    window.localStorage.setItem("access","FALSE");
    var redirect = 'homeView';
    
    
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
        setTimeout(function() {
                    app.mobileApp.navigate('components/' + redirect + '/view.html');
                    $('.km-loader').hide();
                }, 0);
     },
     error:function(){
     window.localStorage.setItem("access","FALSE");
     showErrorLogin();
    
     }      
     });
    
    

    
}

function cleanLogin(){
    $('.km-loader').hide();
    $('#usuario').val('');
    $('#password').val('');
}

/*(function(parent) {
    var provider = app.data.defaultProvider,
        mode = 'signin',
        registerRedirect = 'homeView',
        signinRedirect = 'homeView',
        init = function(error) {
            if (error) {
                if (error.message) {
                    alert(error.message);
                }

                return false;
            }

            var activeView = mode === 'signin' ? '.signin-view' : '.signup-view';

            if (provider.setup && provider.setup.offlineStorage && !app.isOnline()) {
                $('.offline').show().siblings().hide();
            } else {
                $(activeView).show().siblings().hide();
            }
        },
        successHandler = function(data) {
            var redirect = mode === 'signin' ? signinRedirect : registerRedirect;

            if (data && data.result) {
                app.user = data.result;

                setTimeout(function() {
                    app.mobileApp.navigate('components/' + redirect + '/view.html');
                }, 0);
            } else {
                init();
            }
        },
        authenticationViewModel = kendo.observable({
            displayName: '',
            email: '',
            password: '',
            validateData: function(data) {
                if (!data.email) {
                    alert('Missing email');
                    return false;
                }

                if (!data.password) {
                    alert('Missing password');
                    return false;
                }

                return true;
            },
            signin: function() {
                var model = authenticationViewModel,
                    email = model.email.toLowerCase(),
                    password = model.password;

                if (!model.validateData(model)) {
                    return false;
                }

                provider.Users.login(email, password, successHandler, init);
            },
            register: function() {
                var model = authenticationViewModel,
                    email = model.email.toLowerCase(),
                    password = model.password,
                    displayName = model.displayName,
                    attrs = {
                        Email: email,
                        DisplayName: displayName
                    };

                if (!model.validateData(model)) {
                    return false;
                }

                provider.Users.register(email, password, attrs, successHandler, init);
            },
            toggleView: function() {
                mode = mode === 'signin' ? 'register' : 'signin';
                init();
            }
        });

    parent.set('authenticationViewModel', authenticationViewModel);
    parent.set('afterShow', function() {
        provider.Users.currentUser().then(successHandler, init);
    });
})(app.authenticationView);*/

// START_CUSTOM_CODE_authenticationViewModel
// END_CUSTOM_CODE_authenticationViewModel