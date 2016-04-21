'use strict';

app.academicStatusView = kendo.observable({
    onShow: function() { if(SAcademica_Refresh==true){ emptySituAcadem(); } },
    afterShow: function() { llenarFormaAcademicStatus(); }
});


var SAcademica_Refresh = true;


function Refresh_SAcademica(){
      SAcademica_Refresh = true;
      llenarFormaAcademicStatus();
  }

function emptySituAcadem(){
    
                $('#periodo_id').html('');
				$('#intentos_cursos_id').html('');
				$('#reprobadas_id').html('');
				$('#nivel_ingles_id').html('');
				$('#prom_pond_periodo_id').html('');
				$('#prom_pond_global_id').html('');
				$('#avance_id').html('');
				$('#creditos_inscritos').html('');
				$('#estandar_academico_id').html('');   
}


function replaceNot(str){
    if(str==null)
        return '';
    str = str.trim();
    if(str=='not')
        str = 'no disponible';
    return str;
}

function llenarFormaAcademicStatus()
{
	var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
	var websevicename = 'situacion/'+usuario;
    
    if(SAcademica_Refresh==false)
        return;
    
    if(!checkConnection()){ showNotification('No hay Red disponible','Conexión'); return; }

    $('.km-loader').show();
	$.ajax({
		data: {websevicename: websevicename, username:usuario, password:password},
		url: url_webservice,
		dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
		jsonp: 'callback',
		contentType: "application/json; charset=utf-8",
        complete:function(data){
            $('.km-loader').hide(); 
        },
		success:function(data)
		{
            SAcademica_Refresh=false;
			// do stuff with json (in this case an array)
			$.each(data, function(index, element) {
				$('#periodo_id').html(replaceNot(element.headSitu));
				$('#intentos_cursos_id').html(replaceNot(element.siacOUou));
				$('#reprobadas_id').html(replaceNot(element.siacRPrp));
				$('#nivel_ingles_id').html(replaceNot(element.siacNIni));
				$('#prom_pond_periodo_id').html(replaceNot(element.promTerm));
				$('#prom_pond_global_id').html(replaceNot(element.promGlob));
				$('#avance_id').html(replaceNot(element.porcAvan));
				$('#creditos_inscritos').html(replaceNot(element.credInsc));
				$('#estandar_academico_id').html(replaceNot(element.estnAcdm));
			});
		},
		error:function()
        {
            showNotification('Intentalo Nuevamente','Alerta');
		}
        
	});
}



// START_CUSTOM_CODE_academicStatus
// END_CUSTOM_CODE_academicStatus
