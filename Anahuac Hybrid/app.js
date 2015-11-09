(function() {
    // store a reference to the application object that will be created
    // later on so that we can use it if need be
    var app = {
        data: {}
    };

    var bootstrap = function() {
        $(function() {
            app.mobileApp = new kendo.mobile.Application(document.body, {

                // you can change the default transition (slide, zoom or fade)
                transition: 'slide',
                // the application needs to know which view to load first
                initial: 'components/authenticationView/view.html',
                statusBarStyle: 'black-translucent',
                useNativeScrolling: false
                             
            });
        });
    };

    if (window.cordova) {
        // this function is called by Cordova when the application is loaded by the device
        document.addEventListener('deviceready', function() {
            // hide the splash screen as soon as the app is ready. otherwise
            // Cordova will wait 5 very long seconds to do it for you.
            if (navigator && navigator.splashscreen) {
                navigator.splashscreen.hide();
            }

            var element = document.getElementById('appDrawer');
            if (typeof(element) != 'undefined' && element != null) {
                if (window.navigator.msPointerEnabled) {
                    $("#navigation-container").on("MSPointerDown", "a", function(event) {
                        app.keepActiveState($(this));
                    });
                } else {
                    $("#navigation-container").on("touchstart", "a", function(event) {
                        app.keepActiveState($(this));
                    });
                }
            }

            bootstrap();
        }, false);
    } else {
        bootstrap();
    }

    app.keepActiveState = function _keepActiveState(item) {
        var currentItem = item;
        $("#navigation-container li a.active").removeClass("active");
        currentItem.addClass('active');
    };

    window.app = app;

    app.isOnline = function() {
        if (!navigator || !navigator.connection) {
            return true;
        } else {
            return navigator.connection.type !== 'none';
        }
    };
}());

// START_CUSTOM_CODE_kendoUiMobileApp


function showNotification(message,title){
    
    navigator.notification.alert(
    message,  // message
    null,         // callback
    title,            // title
    'Aceptar'                  // buttonName
     );
    
}


function showErrorLogin(){
    
 
     navigator.notification.alert(
    'El usuario y/o password ingresados son incorrectos',  // message
    cleanLogin,         // callback
    'Datos Incorrectos',            // title
    'Aceptar'                  // buttonName
     );
    
}

function initscrollTop(){
    
    $('.km-content:visible').data('kendoMobileScroller').reset();
     
}


function checkConnection ()
  {
      var networkState = navigator.connection.type;
 
      var states = {};
      states[Connection.UNKNOWN] = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI] = 'WiFi connection';
      states[Connection.CELL_2G] = 'Cell 2G connection';
      states[Connection.CELL_3G] = 'Cell 3G connection';
      states[Connection.CELL_4G] = 'Cell 4G connection';
      states[Connection.CELL] = 'Cell generic connection';
      states[Connection.NONE] = 'No network connection';
 
     
      if (states[networkState] == 'No network connection') {
          return false;
      }else{
          return true; 
      }
  
  }

function goHome()
{
    app.mobileApp.navigate('components/homeView/view.html');
} 
    


// END_CUSTOM_CODE_kendoUiMobileApp