'use strict';

app.vencidosView = kendo.observable({
    onShow: function() {  },
    afterShow: function() { llenarFormaVencidos(); }
});

var SPVencidos_Refresh = true;

function SPVencidosFuct_Refresh(){
      SPVencidos_Refresh = true;
      llenarFormaVencidos();
  }


function llenarFormaVencidos()
{
    if(SPVencidos_Refresh==false)
        return;
    
    if(!checkConnection()){ showNotification('No network connection','Network'); return; }
    
	var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
	var websevicename = 'estadovs/'+usuario;
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
              SPVencidos_Refresh=false;
              var html = 
                       '<div class="card">'+
                       '<div class="card-content">'+
                       '<div class="card-content-inner">'+  
                       '<table width="100%">';
                     
            
              html +='<tr><td class="item-title" width="40%">Descripción</td><td class="item-title" width="30%" style="text-align:center;">Vencimiento</td><td class="item-title" width="30%" style="text-align:right;">Total</td></tr>';
              var indextram = 0;
            
			// do stuff with json (in this case an array)
			$.each(data, function(index, element) {
				 
                if(element.detlCode=="TRAM"){ indextram = index;}
                
                        html +=
                          '<tr style="border-bottom: 1px solid #ccc;">'+
                             '<td>'+element.detlDesc+'</td>'+
                             '<td style="text-align:center;">'+element.detlFevn+'</td>'+
                             '<td style="text-align:right;">$'+element.detlAmnt.trim()+'</td>'+
                         '</tr>'+
                         '';
                
			});
            
            html += '</table></div></div></div>';
            
            html +=
            '<div class="card">'+
             '<div class="card-content">'+
                  '<div class="card-header">Tramites y Derechos de Incorp.</div>'+  
                  '<div class="card-content-inner">'+
                     '<div>Monto: $<span id="trm_id_monto">'+data[indextram].detlAmnt.trim()+'</span></div>'+
                     '<div>Recargos: $<span id="trm_id_recagro">'+data[indextram].detlRecg.trim()+'</span></div>'+
                     '<div>Saldo: $<span id="trm_id_saldo">'+data[indextram].detlBaln.trim()+'</span></div>'+
                     '<div>Fecha Vencimiento:<span id="trm_id_fvencimiento">'+data[indextram].detlFevn+'</span></div>'+
                 '</div>'+
                 '</div>'+
            '</div>';
            
            $('#id_vencidosSP').html(html);
             
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
