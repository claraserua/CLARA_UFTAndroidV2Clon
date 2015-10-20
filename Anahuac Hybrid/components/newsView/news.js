'use strict';

var newsView_arrayNews = null;
var index_detail_news = 0;

app.newsView = kendo.observable({
    onShow: function() { },
    afterShow: function() { getNoticias();  }
});


app.newsdetailView = kendo.observable({
    onShow: function() { setDetailNews(); },
    afterShow: function() {}
});


var News_Refresh = true;

function Refresh_News(){
      News_Refresh = true;
      getNoticias();
  }


// START_CUSTOM_CODE_newsView
function getNoticias(){
    
     if(News_Refresh==false)
        return;
   
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    var websevicename = 'noticia/'+usuario;
    
    var url = 'http://redanahuac.mx/mobile/webservice/curl.php';
    
    $( "#noticias" ).empty();
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
      News_Refresh=false;
     var html = '';
     var categoria = true;
     var categoriaitem = '';
      
         newsView_arrayNews = data;
         
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
                        '<div class="swipeout-content" style="padding:10px 15px !important;"><a class="item-link item-content" onclick="getviewDetalle('+index+');">'+
                        '<div class="item-inner">'+
                        '<div class="item-title-row">'+
                        '<div class="item-subtitle">'+element.vsAsunto+'</div>'+
                        '<div class="item-after"></div>'+
                        '</div>'+
                        '<div class="item-after">Lugar: '+element.vsFechaNoticia+'</div>'+
                        '</div></a></div>'+
						'</li>';
          
          if(categoria){
          html += '</ul>';
		  html += '</div>';
           }
          
        });}else{
           html =
                 '<div class="card">'+
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

function getviewDetalle(index){
    
    index_detail_news = index;
    app.mobileApp.navigate('components/newsView/detallenews.html');
    
    
}



function setDetailNews(){
    
    var event = newsView_arrayNews[index_detail_news];
    $('#N_categoria').html(event.vsCategoria);
    $('#N_asunto').html(event.vsAsunto);
    $('#N_fecha').html(event.vsFechaNoticia);
    $('#N_campus').html(event.vsCampus);
    $('#N_detalle').html(event.vsDetalleNoticia);
    $('#N_link').html('<a href="'+event.vsLiga+'" data-rel="external">'+event.vsLiga+'</a>');
    
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