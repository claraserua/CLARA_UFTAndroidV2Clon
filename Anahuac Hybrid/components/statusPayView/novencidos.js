'use strict';

function llenarFormaNoVencidos()
{
    
	var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
	var websevicename = 'estadovn/'+usuario;
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
              var html ='<tr><td class="item-title">Descripción</td><td class="item-title">Vencimiento</td><td class="item-title">Total</td></tr>';
             
            
			// do stuff with json (in this case an array)
			$.each(data, function(index, element) {
				
                        html +=
                          '<tr>'+
                             '<td>'+element.detlDesc+'</td>'+
                             '<td>'+element.detlFevn+'</td>'+
                             '<td>$'+element.detlAmnt+'</td>'+
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
    afterShow: function() { llenarFormaNoVencidos(); }
});

// START_CUSTOM_CODE_academicStatus
// END_CUSTOM_CODE_academicStatus
