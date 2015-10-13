'use strict';

function llenarFormaVencidos()
{
    app.mobileApp.navigate('components/statusPayView/vencidos.html');
    
	var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
	var websevicename = 'estadovs/'+usuario;
	
    $.ajax({
		data: {websevicename: websevicename, username:usuario, password:password},
		url: 'http://redanahuac.mx/mobile/webservice/curl.php',
		dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
		jsonp: 'callback',
		contentType: "application/json; charset=utf-8",
		success:function(data)
		{
              var html ='<tr><td>Descripción</td><td>Fecha de Vencimiento</td><td>Total</td></tr>';
              var indextram = 0;
            
			// do stuff with json (in this case an array)
			$.each(data, function(index, element) {
				 
                if(element.detlCode=="TRAM"){ indextram = index;  }
                
                        html +=
                          '<tr>'+
                             '<td>'+element.detlDesc+'</td>'+
                             '<td>'+element.detlFevn+'</td>'+
                             '<td>'+element.detlAmnt+'</td>'+
                         '</tr>'+
                         '';
                
			});
            
           
            
            $('#id_vencidos').html(html);
            
            $('#trm_id_monto').html(data[indextram].detlAmnt);
            $('#trm_id_recagro').html(data[indextram].detlRecg);
            $('#trm_id_saldo').html(data[indextram].detlBaln);
            $('#trm_id_fvencimiento').html(data[indextram].detlFevn);
            
            
            
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

app.vencidosView = kendo.observable({
    onShow: function() {  },
    afterShow: function() { }
});

// START_CUSTOM_CODE_academicStatus
// END_CUSTOM_CODE_academicStatus
