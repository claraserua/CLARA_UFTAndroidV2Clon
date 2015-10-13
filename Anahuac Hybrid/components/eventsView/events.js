'use strict';

app.eventsView = kendo.observable({
    onShow: function() { getEventos(); },
    afterShow: function() {}
});

// START_CUSTOM_CODE_newsView
function getEventos(){
   
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    var websevicename = 'evento/'+usuario;
    
    var url = 'http://redanahuac.mx/mobile/webservice/curl.php';
    $('#load-content').show();
    $( "#noticias" ).empty();
    
    $.ajax({
     data: {websevicename: websevicename,username:usuario,password:password},
     url:url,
     dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
     jsonp: 'callback',
     contentType: "application/json; charset=utf-8",
     success:function(data){
         // do stuff with json (in this case an array)
      $('#load-content').hide();
      if(data.length!=0){
      $.each(data, function(index, element) {
             
          
          //<li><a class="km-listview-link" data-role="listview-link">'+element.crseTitl+'</a></li>   
         var link = '<li><a class="km-listview-link" data-role="listview-link">'+element.vsAsunto+'</a></li>';
          
          $( "#eventos" ).append( link );
          
        });}else{
          $( "#eventos" ).append( '<li>NO TIENES EVENTOS</li>');
      }
         
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


// END_CUSTOM_CODE_newsView

(function(parent) {
    var newsViewModel = kendo.observable({
        openLink: function(url) {
            window.open(url, '_system');
            if (window.event) {
                window.event.preventDefault && window.event.preventDefault();
                window.event.returnValue = false;
            }
        }
    });

    parent.set('newsViewModel', newsViewModel);
})(app.newsView);

// START_CUSTOM_CODE_newsViewModel
// END_CUSTOM_CODE_newsViewModel