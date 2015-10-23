'use strict';
app.novencidosView = kendo.observable({
    onShow: function() { if(Refresh_NOVENCSP_login2 == true){ $('#id_novencidosSP').empty(); } },
    afterShow: function() { llenarFormaNoVencidos(); }
});


var SPNOVencidos_Refresh = true;
var Refresh_NOVENCSP_login2 = false;

function SPNOVencidosFuct_Refresh(){
    SPNOVencidos_Refresh = true;
    llenarFormaNoVencidos();
}

var SPNV_array_json=null;
var SPNV_current_index=0;
var SPNV_array_period=[];

function llenarFormaNoVencidos()
{
    Refresh_NOVENCSP_login2 = false;
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
            var html = '';
            SPNV_array_json = data;
            SPNV_array_period=[];
          
            if(data.length==0){
                 
               html =
                 '<div class="card">'+
                 '<div class="card-header">NO TIENE NO VENCIDOS</div>'+
                 '</div>'+
                 '';
             $('#id_novencidosSP').html(html);
               
                  return;
                }
            
            
			// do stuff with json (in this case an array)
			$.each(data, function(index, element) {
				addElement(SPNV_array_period, element.termDesc);
			});
            SPNV_current_index = SPNV_array_period.length-1;
            SPNV_updateNoVencidos();
            
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

function SPNV_updateNoVencidos()
{
    var html =
            '<div class="card">'+
             '<div class="card-content">'+
              '<div class="card-content-inner">'+
                '<table  width="100%">';
    html +='<tr><td class="item-title" width="40%">Descripción</td><td class="item-title" width="30%" style="text-align:center;">Vencimiento</td><td class="item-title" width="30%" style="text-align:right;">Total</td></tr>';
    
    var termDesc = SPNV_array_period[SPNV_current_index];
    $.each(SPNV_array_json, function(index, element)
    {
        
        if(element.termDesc == termDesc)
        {
            html +=
            '<tr style="border-bottom: 1px solid #ccc;">'+
            '  <td>'+element.detlDesc+'</td>'+
            '  <td style="text-align:center;">'+element.detlFevn+'</td>'+
            '  <td style="text-align:right;">$'+element.detlAmnt.trim()+'</td>'+
            '</tr>';
        }
    });
    html +=
             '</table>'+
            '</div>'+
           '</div>'+
          '</div>';

    $('#id_novencidosSP').html(html);
    $('#term_periodo_nv').html(termDesc);
     initscrollTop();
    
    // ------- Flechas de navegacion de paginado -------
    $('#SPNV_prev_arrow').show();
    $('#SPNV_next_arrow').show();
    if(SPNV_current_index==0)
        $('#SPNV_prev_arrow').hide();
    if(SPNV_current_index==SPNV_array_period.length-1)
        $('#SPNV_next_arrow').hide();
}

function SPNV_showPrevius(){
    if(0<SPNV_current_index){
        SPNV_current_index--;
        SPNV_updateNoVencidos();
    }
}

function SPNV_showNext(){
    if(SPNV_current_index<SPNV_array_period.length-1){
        SPNV_current_index++;
        SPNV_updateNoVencidos();
    }
}


// START_CUSTOM_CODE_academicStatus
// END_CUSTOM_CODE_academicStatus
