'use strict';

app.periodsView = kendo.observable({
    onShow: function() { getPeriodos(); },
    afterShow: function() {  }
});

// START_CUSTOM_CODE_perfilView


function getPeriodos(){
   
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    var websevicename = 'termoa/'+usuario;
    
    var url = 'http://redanahuac.mx/mobile/webservice/curl.php';
    
    $.ajax({
     data: {websevicename: websevicename,username:usuario,password:password},
     url:url,
     dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
     jsonp: 'callback',
     contentType: "application/json; charset=utf-8",
     success:function(data){
         // do stuff with json (in this case an array)
         
         var html='';
         $.each(data, function(index, element) {
         // alert(element.crseCrnn);
          html += '<li><a class="km-listview-link" data-role="listview-link" onClick="setPeriodo(\''+element.termCode+'\',\''+element.termDesc+'\')">'+element.termDesc+'</a></li>';
          
        });
         $('#load-content').remove();
         $('#periodos').html(html);
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

function setPeriodo(termperiodo,name){
    
    $('#desc_periodo').html(name);
    $('#val_periodo').val(termperiodo);
    app.mobileApp.navigate('components/searchCoursesView/view.html');
    
}

// END_CUSTOM_CODE_perfilView