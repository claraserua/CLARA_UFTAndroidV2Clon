'use strict';

app.gradesView = kendo.observable({
    onShow: function() {  },
    afterShow: function() { getCalificaciones(); }
});

// START_CUSTOM_CODE_gradesViewView

function getCalificaciones(){
   
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    var websevicename = 'parcial/'+usuario;
    
    var url = 'http://redanahuac.mx/mobile/webservice/curl.php';
    
    $( "#califparciales" ).empty();
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
      var titleCourse = '';
      var profesor = '';
      $.each(data, function(index, element) {
             
          titleCourse = element.crseSubj+' '+element.crseCrnn+' '+element.crseTitl;
          profesor = element.nameFacu;
          //$('#nivel1').html(element.crseTitl);
          //<li><a class="km-listview-link" data-role="listview-link">'+element.crseTitl+'</a></li>   
         var link = '<li><a class="km-listview-link" data-role="listview-link" onclick="getDetalleGrade(\''+element.crseCrnn+'\',\''+titleCourse+'\',\''+profesor+'\')">'+element.crseTitl+'</a></li>';
          
          $( "#califparciales" ).append( link );
          
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


// END_CUSTOM_CODE_gradesViewView

(function(parent) {
    var gradesViewModel = kendo.observable({
        openLink: function(url) {
            window.open(url, '_system');
            if (window.event) {
                window.event.preventDefault && window.event.preventDefault();
                window.event.returnValue = false;
            }
        }
    });

    parent.set('gradesViewModel', gradesViewModel);
})(app.gradesView);

// START_CUSTOM_CODE_aboutViewModel
// END_CUSTOM_CODE_aboutViewModel