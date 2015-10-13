'use strict';

function llenarFormaHistoria()
{
	var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
	
    var websevicename_promedio = 'promedio/'+usuario;
	
	
    $.ajax({
		data: {websevicename: websevicename_promedio, username:usuario, password:password},
		url: 'http://redanahuac.mx/mobile/webservice/curl.php',
		dataType: 'jsonp', 
		jsonp: 'callback',
		contentType: "application/json; charset=utf-8",
		success:function(data)
		{
			$.each(data, function(index, element)
			{
				$('#prom_periodo_id').html(element.tgpaGpaa);
				$('#prom_global_id').html(element.promGlob);
			});
            
            getDetalleHistory();
		},
		error:function(){
			alert("Error");
		}
	});

    
   
}


function getDetalleHistory(){
    
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    var websevicename_detalle = 'historia/'+usuario;
    
    $.ajax({
		data: {websevicename: websevicename_detalle, username:usuario, password:password},
		url: 'http://redanahuac.mx/mobile/webservice/curl.php',
		dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
		jsonp: 'callback',
		contentType: "application/json; charset=utf-8",
		success:function(data)
		{
			var html = '';
			$.each(data, function(index, element)
			{
                html +=
                 '<div class="card">'+
                 '<div class="card-header"><span>'+element.subjCode+'&nbsp;'+element.crseNumb+'&nbsp;'+element.crseTitl+'</span><span>'+element.grdeFinl+'</span></div>'+
                 '<div class="card-content">'+
                 '<div class="card-content-inner"><div>Instructor:</div>'+element.nameFacu+'</div>'+
                 '<div class="card-footer"><span>Créditos</span><span>'+element.credHour+'</span></div>'+
                 '</div>'+
                 '</div>'+
                 '';
               
			});
		
			
			$('#div_content_id').html(html);
		},
		error:function(){
			alert("Error");
		}
	});
    
}


app.academicHistoryView = kendo.observable({
    onShow: function() { llenarFormaHistoria(); },
    afterShow: function() {  }
});

// START_CUSTOM_CODE_academicHistoryView
// END_CUSTOM_CODE_academicHistoryView
