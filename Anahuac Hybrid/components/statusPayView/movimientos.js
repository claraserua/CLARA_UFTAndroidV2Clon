'use strict';

app.movimientosView = kendo.observable({
    onShow: function() { if(Refresh_VMSP_login2 == true){ $('#id_movimientosSP').empty(); }  },
    afterShow: function() { llenarFormaMovimientos(); }
});


var SPMO_array_json=null;
var SPMO_current_index=0;
var SPMO_array_period=[];


var SPMovimientos_Refresh = true;
var Refresh_VMSP_login2 = false;

function SPMovimientosFuct_Refresh(){
      SPMovimientos_Refresh = true;
      llenarFormaMovimientos();
  }


function llenarFormaMovimientos()
{
    Refresh_VMSP_login2 = false;
    if(SPMovimientos_Refresh==false)
        return;
    if(!checkConnection()){ showNotification('No network connection','Network'); return; }
  
	var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
	var websevicename = 'estadodt/'+usuario;
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
            SPMovimientos_Refresh = false;
            SPMO_array_json = data;
            SPMO_array_period = [];
            /*
            for(var i=0; i<data.length; i++)
            {
                addElement(SPMO_array_period, data[i].termDesc);
            }*/
			$.each(data, function(index, element) {
				addElement(SPMO_array_period, element.termDesc);
			});
            
            SPMO_current_index = SPMO_array_period.length-1;
            SPMO_updateMovimientos();
		},
		error:function(){
            
             showNotification('Intentalo Nuevamente','Alerta');
         
            /*navigator.notification.alert(
            'Opps!',  // message
            alertDismissed,         // callback
            'Inicie Sesion!',            // title
            'Aceptar'                  // buttonName
            );
            ExitApp();*/
		}
	});
}

function SPMO_updateMovimientos()
{
    var html =
             '<div class="card">'+
             '<div class="card-content">'+
                 '<div class="card-content-inner">'+
                     '<table  width="100%">';
    
    html +='<tr><td class="item-title" width="40%">Descripción</td><td class="item-title" width="30%" style="text-align:center;">Tipo</td><td class="item-title" width="30%" style="text-align:right;">Monto</td></tr>';
    
    var termDesc = SPMO_array_period[SPMO_current_index];
    $.each(SPMO_array_json, function(index, element)
    {
        if(element.termDesc == termDesc)
        {
            html +=
                '<tr style="border-bottom: 1px solid #ccc;">'+
                    '<td>'+element.detlDesc+'</td>'+
                    '<td style="text-align:center;">'+element.detlType+'</td>'+
                    '<td style="text-align:right;">$'+element.detlAmon.trim()+'</td>'+
                '</tr>';
        }
    });
    html += '</table></div></div></div>';
    
    $('#id_movimientosSP').html(html);
    $('#term_periodo_mov').html(termDesc);
    initscrollTop();
    // ------- Flechas de navegacion de paginado -------
    $('#SPMO_prev_arrow').show();
    $('#SPMO_next_arrow').show();
    if(SPMO_current_index==0)
        $('#SPMO_prev_arrow').hide();
    if(SPMO_current_index==SPMO_array_period.length-1)
        $('#SPMO_next_arrow').hide();
}

function searchElement(array, element){
    if(array!=null)
        for(var i=0; i<array.length; i++)
            if(array[i]==element)
                return i;
    return -1;
}
function addElement(array,element){
    element = element.trim();
    if(searchElement(array,element)==-1)
        array.push(element);
}


function SPMO_showPrevius(){
    if(0<SPMO_current_index){
        SPMO_current_index--;
        SPMO_updateMovimientos();
    }
}

function SPMO_showNext(){
    if(SPMO_current_index<SPMO_array_period.length-1){
        SPMO_current_index++;
        SPMO_updateMovimientos();
    }
}


// START_CUSTOM_CODE_academicStatus
// END_CUSTOM_CODE_academicStatus
