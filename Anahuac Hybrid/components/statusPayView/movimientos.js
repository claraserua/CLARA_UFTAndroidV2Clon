'use strict';

function llenarFormaMovimientos()
{
    app.mobileApp.navigate('components/statusPayView/movimientos.html');
    
	var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
	var websevicename = 'estadodt/'+usuario;
	
    $.ajax({
		data: {websevicename: websevicename, username:usuario, password:password},
		url: 'http://redanahuac.mx/mobile/webservice/curl.php',
		dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
		jsonp: 'callback',
		contentType: "application/json; charset=utf-8",
		success:function(data)
		{
             
            var html ='<tr><td>Descripción</td><td>Tipo</td><td>Total</td></tr>';
              
			// do stuff with json (in this case an array)
			$.each(data, function(index, element) {
				 
                        html +=
                          '<tr>'+
                             '<td>'+element.detlDesc+'</td>'+
                             '<td>'+element.detlType+'</td>'+
                             '<td>'+element.detlAmon+'</td>'+
                         '</tr>'+
                         '';
                
			});
            
            
            $('#id_movimientos').html(html);
            
            
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

app.movimientosView = kendo.observable({
    onShow: function() {  },
    afterShow: function() { }
});

// START_CUSTOM_CODE_academicStatus
// END_CUSTOM_CODE_academicStatus
