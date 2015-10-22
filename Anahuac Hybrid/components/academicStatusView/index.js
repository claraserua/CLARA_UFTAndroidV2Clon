'use strict';

app.academicStatusView = kendo.observable({
    onShow: function() {  },
    afterShow: function() { llenarFormaAcademicStatus(); }
});


var SAcademica_Refresh = true;

function Refresh_SAcademica(){
      SAcademica_Refresh = true;
      llenarFormaAcademicStatus();
  }


function llenarFormaAcademicStatus()
{
	var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
	var websevicename = 'situacion/'+usuario;
    
    if(SAcademica_Refresh==false)
        return;
    
     if(!checkConnection()){ showNotification('No network connection','Network'); return; }
    
                $('#periodo_id').html('');
				$('#intentos_cursos_id').html('');
				$('#reprobadas_id').html('');
				$('#nivel_ingles_id').html('');
				$('#prom_pond_periodo_id').html('');
				$('#prom_pond_global_id').html('');
				$('#avance_id').html('');
				$('#creditos_inscritos').html('');
				$('#estandar_academico_id').html('');
    
    
    $('.km-loader').show();
	$.ajax({
		data: {websevicename: websevicename, username:usuario, password:password},
		url: 'http://redanahuac.mx/mobile/webservice/curl.php',
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
				$('#periodo_id').html(element.headSitu);
				$('#intentos_cursos_id').html(element.siacOUou);
				$('#reprobadas_id').html(element.siacRPrp);
				$('#nivel_ingles_id').html(element.siacNIni);
				$('#prom_pond_periodo_id').html(element.promTerm);
				$('#prom_pond_global_id').html(element.promGlob);
				$('#avance_id').html(element.porcAvan);
				$('#creditos_inscritos').html(element.credInsc);
				$('#estandar_academico_id').html(element.estnAcdm);
			});
		},
		error:function(){
            
              showNotification('Intentalo Nuevamente','Alerta');
            

            /* navigator.notification.alert(
            'Opps!',  // message
            alertDismissed,         // callback
            'Inicie Sesion!',            // title
            'Aceptar'                  // buttonName
             );

                 ExitApp();*/       
            
            
            
		}
        
        
        
	});
}



// START_CUSTOM_CODE_academicStatus
// END_CUSTOM_CODE_academicStatus
