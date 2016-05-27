'use strict';

app.CreditoView = kendo.observable({
    onShow: function() {
        $('#SPCR_prev_arrow').hide();
        $('#SPCR_next_arrow').hide();
        $('#term_periodo_credito').html('');
        if(SPCredito_Refresh == true){ $('#id_creditoSP').empty(); }
    },
    afterShow: function() { llenarFormaCredito(); }
});

var SPCR_array_json    = null;
var SPCR_current_index = 0;
var SPCR_array_period  = [];
var SPCredito_Refresh    = true;

function SPCreditoFuct_Refresh(){
      SPCredito_Refresh = true;
      llenarFormaCredito();
}

function llenarFormaCredito()
{
    /*if(SPCredito_Refresh == false)
        return;*/
    
    if(!checkConnection()){ showNotification('No hay Red disponible','Conexión'); return; }
  
	var usuario       = window.localStorage.getItem("usuario");
    var password      = window.localStorage.getItem("password");
	var websevicename = 'credito/'+usuario;
    
	$('.km-loader').show();
    
    $.ajax({
        data: {websevicename: websevicename, username:usuario, password:password},
		url: url_webservice,
		dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
		jsonp: 'callback',
		contentType: "application/json; charset=utf-8",
        
        complete:function(data){
            $('.km-loader').hide(); 
        },
        
		success:function(data)
		{
            SPCredito_Refresh = false;
            SPCR_array_json   = data;
            SPCR_array_period = [];

			$.each(data, function(index, element) {
				addElement(SPCR_array_period, element.periodo);
			});
            
            SPCR_current_index = SPCR_array_period.length - 1;
            SPCR_updateCredito();
		},
        
		error:function(){
            showNotification('Intentalo Nuevamente','Alerta');
		}
	});
}

function SPCR_updateCredito()
{
    var html =
             '<div class="card">'+
             '<div class="card-content">'+
                 '<div class="card-content-inner">'+
                     '<table  width="100%">';
    
    if (SPCR_array_json.length >= 1) {
        html +='<tr><td class="item-title" width="60%">Cr&eacute;ditos</td><td class="item-title" width="40%" style="text-align:right;">Monto</td></tr>';
    } else {
        html +='<tr><td class="item-title" width="100%" colspan="2">No cuentas con Cr&eacute;dito.</td></tr>';
    }
    
    var termDesc = SPCR_array_period[SPCR_current_index];
    $.each(SPCR_array_json, function(index, element)
    {
        if(element.periodo == termDesc)
        {
            html +=
                '<tr style="border-top: 1px solid #BFBFD2;">'+
                    '<td>'                             + element.desCredito + '</td>'+
                    '<td style="text-align:right;">$ ' + element.monto      + '</td>'+
                '</tr>';
        }
    });
    html += '</table></div></div></div>';
    
    $('#id_creditoSP').html(html);
    $('#term_periodo_credito').html(termDesc);
    initscrollTop();
    // ------- Flechas de navegacion de paginado -------
    $('#SPCR_prev_arrow').show();
    $('#SPCR_next_arrow').show();
    
    if(SPCR_current_index == 0)
        $('#SPCR_prev_arrow').hide();

    if(SPCR_current_index == -1)
        $('#SPCR_prev_arrow').hide();
    
    if(SPCR_current_index == SPCR_array_period.length - 1)
        $('#SPCR_next_arrow').hide();

    if (SPCR_array_json.length === 0) {
        $('#SPCR_prev_arrow').hide();
        $('#SPCR_next_arrow').hide();    
    }
        
}

function searchElement(array, element){
    if(array != null)
        for(var i = 0; i < array.length; i++)
            if(array[i] == element)
                return i;
    return -1;
}

function addElement(array,element){
    element = element.trim();
    if(searchElement(array,element) == -1)
        array.push(element);
}

function SPCR_showPrevius(){
    if(0 < SPCR_current_index){
        SPCR_current_index--;
        SPCR_updateCredito();
    }
}

function SPCR_showNext(){
    if(SPCR_current_index < SPCR_array_period.length-1){
        SPCR_current_index++;
        SPCR_updateCredito();
    }
}

// START_CUSTOM_CODE_academicStatus
// END_CUSTOM_CODE_academicStatus