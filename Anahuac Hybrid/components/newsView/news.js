'use strict';

app.newsView = kendo.observable({
    onShow: function() { getNoticias(); },
    afterShow: function() {}
});

// START_CUSTOM_CODE_newsView
function getNoticias(){
   
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    var websevicename = 'noticia/'+usuario;
    
    var url = 'http://redanahuac.mx/mobile/webservice/curl.php';
    
    $( "#noticias" ).empty();
    
    $.ajax({
     data: {websevicename: websevicename,username:usuario,password:password},
     url:url,
     dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
     jsonp: 'callback',
     contentType: "application/json; charset=utf-8",
     success:function(data){
         // do stuff with json (in this case an array)
     var html = '';
     var categoria = true;
     var categoriaitem = '';
      if(data.length!=0){
        
      $.each(data, function(index, element) {
             
               if(categoria){
                    categoriaitem = element.vsCategoria; 
                   html +=
					'<div class="card-2">'+
                    '<div class="card-header">'+element.vsCategoria+'</div> '+
                    '</div><div class="list-block media-list">'+
					'<ul>';
                  
               }    
               
                if(categoriaitem == element.vsCategoria){  categoria = false; }else{ categoria = true; }
             
          if(categoria){
             html +=
					'<div class="card-2">'+
                    '<div class="card-header">'+element.vsCategoria+'</div> '+
                    '</div><div class="list-block media-list">'+
					'<ul>';
                  }
          
            html+=
						'<li class="swipeout">'+
                        '<div class="swipeout-content" style="padding:10px 15px !important;"><a class="item-link item-content">'+
                        '<div class="item-inner">'+
                        '<div class="item-title-row">'+
                        '<div class="item-subtitle">'+element.vsAsunto+'</div>'+
                        '<div class="item-after"></div>'+
                        '</div>'+
                        '<div class="item-title">Lugar: '+element.vsDetalleNoticia+'</div>'+
                        '</div></a></div>'+
						'</li>';
          
          if(categoria){
          html += '</ul>';
		  html += '</div>';
           }
          
        });}else{
           html =
                 '<div class="card-2">'+
                 '<div class="card-header">NO TIENE NOTICIAS</div>'+
                 '</div>'+
                 '';
      }
         
         $( "#noticias" ).html( html );
         
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