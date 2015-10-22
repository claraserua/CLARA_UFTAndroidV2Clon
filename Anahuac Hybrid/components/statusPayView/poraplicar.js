'use strict';

function llenarFormaporAplicar()
{

	var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
	var websevicename = 'estadopa/'+usuario;
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
              var html ='<tr><td class="item-title">Descripción</td><td class="item-title">Vencimiento</td><td class="item-title">Monto</td></tr>';
              
            
			// do stuff with json (in this case an array)
			$.each(data, function(index, element) {
				 
                        html +=
                          '<tr>'+
                             '<td>'+element.tranDeta+'</td>'+
                             '<td>'+element.termDesc+'</td>'+
                             '<td>$'+element.tranBalc+'</td>'+
                         '</tr>'+
                         '';
                
			});
            
           
            
            $('#id_poraplicar').html(html);
            
            
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

app.porAplicarView = kendo.observable({
    onShow: function() {  },
    afterShow: function() { llenarFormaporAplicar(); }
});

// START_CUSTOM_CODE_academicStatus
// END_CUSTOM_CODE_academicStatus
