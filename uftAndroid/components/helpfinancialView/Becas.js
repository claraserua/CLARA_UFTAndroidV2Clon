'use strict';

app.BecasView = kendo.observable({
    onShow: function() {
        $('#SPBE_prev_arrow').hide();
        $('#SPBE_next_arrow').hide();
        $('#term_periodo_beca').html('');
        if(SPBecas_Refresh == true){ $('#id_becasSP').empty(); }
    },
    afterShow: function() { llenarFormaBecas(); }
});

var SPBE_array_json    = null;
var SPBE_current_index = 0;
var SPBE_array_period  = [];
var SPBecas_Refresh    = true;

function SPBecasFuct_Refresh(){
      SPBecas_Refresh = true;
      llenarFormaBecas();
}

function llenarFormaBecas()
{
    /*if(SPBecas_Refresh == false)
        return;*/
    
    if(!checkConnection()){ showNotification('No hay Red disponible','Conexión'); return; }
  
	var usuario       = window.localStorage.getItem("usuario");
    var password      = window.localStorage.getItem("password");
	var websevicename = 'apoyo/'+usuario;
    
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
            SPBecas_Refresh   = false;
            SPBE_array_json   = data;
            SPBE_array_period = [];

			$.each(data, function(index, element) {
				addElement(SPBE_array_period, element.periodo);
			});
            
            SPBE_current_index = SPBE_array_period.length - 1;
            SPBE_updateBecas();
		},
        
		error:function(){
            showNotification('Intentalo Nuevamente','Alerta');
		}
	});
}

function SPBE_updateBecas()
{
    var html =
             '<div class="card">'+
             '<div class="card-content">'+
                 '<div class="card-content-inner">'+
                     '<table  width="100%">';
    
    if (SPBE_array_json.length >= 1) {
        html +='<tr><td class="item-title" width="40%">Becas</td></tr>';
    } else {
        html +='<tr><td class="item-title" width="40%">No cuentas con Beca.</td></tr>';
    }
    
    var termDesc = SPBE_array_period[SPBE_current_index];
    $.each(SPBE_array_json, function(index, element)
    {
        if(element.periodo == termDesc)
        {
            html +=
                '<tr style="border-top: 1px solid #BFBFD2;">'+
                    '<td>'+element.desBeca+'</td>'+
                '</tr>';
        }
    });
    html += '</table></div></div></div>';
    
    $('#id_becasSP').html(html);
    $('#term_periodo_beca').html(termDesc);
    initscrollTop();
    // ------- Flechas de navegacion de paginado -------
    $('#SPBE_prev_arrow').show();
    $('#SPBE_next_arrow').show();
    
    if(SPBE_current_index == 0)
        $('#SPBE_prev_arrow').hide();
    
    if(SPBE_current_index == SPBE_array_period.length - 1)
        $('#SPBE_next_arrow').hide();
    
    if (SPBE_array_json.length === 0) {
        $('#SPBE_prev_arrow').hide();
        $('#SPBE_next_arrow').hide();    
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

function SPBE_showPrevius(){
    if(0 < SPBE_current_index){
        SPBE_current_index--;
        SPBE_updateBecas();
    }
}

function SPBE_showNext(){
    if(SPBE_current_index < SPBE_array_period.length-1){
        SPBE_current_index++;
        SPBE_updateBecas();
    }
}

// START_CUSTOM_CODE_academicStatus
// END_CUSTOM_CODE_academicStatus