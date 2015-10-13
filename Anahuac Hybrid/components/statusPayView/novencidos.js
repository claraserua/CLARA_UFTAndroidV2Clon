'use strict';

function llenarFormaNoVencidos()
{
    app.mobileApp.navigate('components/statusPayView/novencidos.html');
    
	var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
	var websevicename = 'estadovn/'+usuario;
	
    $.ajax({
		data: {websevicename: websevicename, username:usuario, password:password},
		url: 'http://redanahuac.mx/mobile/webservice/curl.php',
		dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
		jsonp: 'callback',
		contentType: "application/json; charset=utf-8",
		success:function(data)
		{
              var html ='<tr><td>Descripción</td><td>Fecha de Vencimiento</td><td>Total</td></tr>';
             
            
			// do stuff with json (in this case an array)
			$.each(data, function(index, element) {
				
                        html +=
                          '<tr>'+
                             '<td>'+element.detlDesc+'</td>'+
                             '<td>'+element.detlFevn+'</td>'+
                             '<td>'+element.detlAmnt+'</td>'+
                         '</tr>'+
                         '';
                
			});
            
           
            
            $('#id_novencidos').html(html);
            
            
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

app.novencidosView = kendo.observable({
    onShow: function() {  },
    afterShow: function() { }
});

// START_CUSTOM_CODE_academicStatus
// END_CUSTOM_CODE_academicStatus
