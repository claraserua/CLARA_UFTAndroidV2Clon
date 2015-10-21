'use strict';
app.novencidosView = kendo.observable({
    onShow: function() {  },
    afterShow: function() { llenarFormaNoVencidos(); }
});



var SPNOVencidos_Refresh = true;

function SPNOVencidosFuct_Refresh(){
      SPNOVencidos_Refresh = true;
      llenarFormaNoVencidos();
  }


function llenarFormaNoVencidos()
{
       if(SPNOVencidos_Refresh==false)
        return;
    
    if(!checkConnection()){ showNotification('No network connection','Network'); return; }
    
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
            SPNOVencidos_Refresh = false;
               var html =
                        '<div class="card">'+
                         '<div class="card-content">'+
                          '<div class="card-content-inner">'+
                            '<table  width="100%">';
            
                   html +='<tr><td class="item-title" width="40%">Descripción</td><td class="item-title" width="30%" style="text-align:center;">Vencimiento</td><td class="item-title" width="30%" style="text-align:right;">Total</td></tr>';
             
            
			// do stuff with json (in this case an array)
			$.each(data, function(index, element) {
				
                        html +=
                          '<tr style="border-bottom: 1px solid #ccc;">'+
                             '<td>'+element.detlDesc+'</td>'+
                             '<td style="text-align:center;">'+element.detlFevn+'</td>'+
                             '<td style="text-align:right;">$'+element.detlAmnt.trim()+'</td>'+
                         '</tr>'+
                         '';
			});
            
               html +=
                      '</table>'+
                       '</div>'+
                        '</div>'+
                       '</div>';
            
           
            
            $('#id_novencidosSP').html(html);
            
            
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



// START_CUSTOM_CODE_academicStatus
// END_CUSTOM_CODE_academicStatus
