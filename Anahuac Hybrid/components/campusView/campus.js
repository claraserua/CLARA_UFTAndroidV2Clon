'use strict';

app.campusView = kendo.observable({
    onShow: function() {  },
    afterShow: function() { getCampus(); }
});

// START_CUSTOM_CODE_perfilView


function getCampus(){
   
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    var websevicename = 'campuz/'+usuario;
    
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
       
         var html='<ul class="km-widget km-listview km-list" >';
         $.each(data, function(index, element) {
          html += '<li><a class="km-listview-link" data-role="listview-link" onClick="setCampus(\''+element.campCode+'\',\''+element.campDesc+'\')">'+element.campDesc+'</a></li>';
        });
          html +='</ul>';
         
         $('#campus').html(html);
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

function setCampus(campuscode,name){
    
    $('#desc_campus').html(name);
    $('#val_campus').val(campuscode);
    app.mobileApp.navigate('components/searchCoursesView/view.html');
    
}

// END_CUSTOM_CODE_perfilView