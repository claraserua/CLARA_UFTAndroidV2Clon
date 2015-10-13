'use strict';

function CoursesPlaned()
{
	var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
	var websevicename = 'planeados/'+usuario;
	
    $.ajax({
		data: {websevicename: websevicename, username:usuario, password:password},
		url: 'http://redanahuac.mx/mobile/webservice/curl.php',
		dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
		jsonp: 'callback',
		contentType: "application/json; charset=utf-8",
		success:function(data)
		{
	    var html = '';
        $('#load-content').remove();
        if(data.length != 0){
             
			$.each(data, function(index, element)
			{
                html +=
                 '<div class="card">'+
                 '<div class="card-header"><span>'+element.plTerD+'</span><span><img src="resources/img/delete-icon.png"/></span></div>'+
                 '<div class="card-content">'+
                 '<div class="card-content-inner"><div><span class="item-orange-bold">Instructor:</span><span class="item-after"> '+element.plNomD+'</span></div><div><span class="item-orange-bold">Horario:</span><span class="item-after"> '+element.plHCre+'</span></div>'+element.plTitu+'</div>'+
                 '</div>'+
                 '</div>'+
                 '';
               
			});
             }else{
             
                 html +=
                 '<div class="card">'+
                 '<div class="card-content">'+
                 '<div class="card-content-inner"><span class="item-orange-bold">NO CUENTA CON CURSOS PLANEADOS.</span></div>'+
                 '</div>'+
                 '</div>'+
                 '<ul class="km-widget km-listview km-list">'+
                 '<li><a class="km-listview-link" data-role="listview-link" href="components/searchCoursesView/view.html"><img src="resources/img/icons/BusquedaCursos42x38.png" alt="Busqueda de de Cursos" class="km-thumbnail"><span class="link-text-center">Busqueda de Cursos</span></a></li>'+
                 '</ul>'+
                 '';    
             }
		
			
			 $('#courseplaneados').html(html);
		},
		error:function(){
			alert("Error");
		}
	});
   
}


app.plannedCoursesView = kendo.observable({
    onShow: function() { CoursesPlaned(); },
    afterShow: function() {  }
});

// START_CUSTOM_CODE_plannedCoursesView
// END_CUSTOM_CODE_plannedCoursesView
