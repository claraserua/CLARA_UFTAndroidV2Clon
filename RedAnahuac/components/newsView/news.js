'use strict';

var newsView_arrayNews = null;
var index_detail_news = 0;

function translateMes(mes_english){
	mes_english = mes_english.trim().toLowerCase();
	switch(mes_english){
		case 'january': return 'Enero';
		case 'february': return 'Febrero';
		case 'march': return 'Marzo';
		case 'april': return 'Abril';
		case 'may': return 'Mayo';
		case 'june': return 'Junio';
		case 'july': return 'Julio';
        case 'august': return 'Agosto';
        case 'september': return 'Septiembre';
        case 'october': return 'Octubre';
        case 'november': return 'Noviembre';
        case 'december': return 'Diciembre';
	}
	return mes_english;
}


app.newsView = kendo.observable({
    onShow: function() { },
    afterShow: function() { getNoticias();  }
});


app.newsdetailView = kendo.observable({
    onShow: function() { },
    afterShow: function() { setDetailNews(); }
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
    
     if(!checkConnection()){ showNotification('No hay Red disponible','Conexión'); return; }
   
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    var websevicename = 'noticia/'+usuario;
    
    $( "#noticias" ).empty();
    $('.km-loader').show();
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
        News_Refresh=false;
        var html = '';
        var categoria = true;
        var categoriaitem = '';
        var fecha='';
        var day='';
        var mes='';

        newsView_arrayNews = data;

        if(data.length!=0){
        
		$.each(data, function(index, element)
        {
             
               if(categoria)
               {
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
          
            fecha = element.vsFechaNoticia.split(" ");
            day = translateDay(fecha[0]);            
            fecha = fecha[4];
            if(fecha!=null){
            fecha = fecha.split("-");  
            mes = translateMes(fecha[1]);
            mes = fecha[0]+'-'+mes+'-'+fecha[2];
             }
          
            
          
            html+=
						'<li class="swipeout">'+
                        '<div class="swipeout-content" style="padding:10px 15px !important;"><a class="item-link item-content" onclick="getviewDetalle('+index+');">'+
                        '<div class="item-inner">'+
                        '<div class="item-title-row">'+
                        '<div class="item-subtitle">'+element.vsAsunto+'</div>'+
                        '<div class="item-after"></div>'+
                        '</div>'+
                        '<div class="item-after">Lugar: '+day+' '+mes+'</div>'+
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
          showNotification('Intentalo Nuevamente','Alerta');

     }      
     });
    
    
}

function getviewDetalle(index){
    
    index_detail_news = index;
    
    var event = newsView_arrayNews[index_detail_news];
    var datos= ''+
        event.vsCategoria+'~o~'+
        event.vsAsunto+'~o~'+
        event.vsFechaNoticia+'~o~'+
        event.vsCampus+'~o~'+
        event.vsDetalleNoticia+'~o~'+
        event.vsLiga+'~o~';
    window.localStorage.setItem('noticia',datos);
    
    app.mobileApp.navigate('components/newsView/detallenews.html');
}

function setDetailNews(){
    try{
        
        var datos=window.localStorage.getItem('noticia').split('~o~');
        var event = {
            vsCategoria: datos[0],
            vsAsunto: datos[1],
            vsFechaNoticia: datos[2],
            vsCampus: datos[3],
            vsDetalleNoticia: datos[4],
            vsLiga: datos[5],
        };
        
        $('#N_categoria').html(event.vsCategoria);
        $('#N_asunto').html(event.vsAsunto);
        
        var fecha='';
        var day='';
        var mes='';
        
        fecha = event.vsFechaNoticia.split(" ");
        day = translateDay(fecha[0]);            
        fecha = fecha[4];
        if(fecha!=null){
            fecha = fecha.split("-");  
            mes = translateMes(fecha[1]);
            mes = fecha[0]+'-'+mes+'-'+fecha[2];
            day = day + ' '+ mes; 
        }
        
        
        $('#N_fecha').html(day);
        $('#N_campus').html(event.vsCampus);
        $('#N_detalle').html(event.vsDetalleNoticia);
        //$('#N_link').html('<a href="'+event.vsLiga+'" data-rel="external">'+event.vsLiga+'</a>');
        //event.vsLiga
        $('#N_link').html('<a href="javascript:void(0)" onClick="OpenExternalLink(\''+event.vsLiga+'\')" >'+event.vsLiga+'</a>');
    }catch(Exception){}

}


function OpenExternalLink(liga){
    
    var ref = window.open(liga, '_blank', 'location=yes');
    
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