'use strict';

app.inscriptionView = kendo.observable({
    onShow: function() { if(Refresh_VINSC_login2 == true){ $('#div_inscripcion_id').empty(); } },
    afterShow: function() { getInscripcion(); }
});


var PSCitaIns_Refresh = true;
var Refresh_VINSC_login2 = false;
var INSC_array_periods = [];
var INSC_current_index = 0;
var INSC_data_json = null;

function Refresh_CitaIns()
{
      PSCitaIns_Refresh = true;
      getInscripcion();
}



// START_CUSTOM_CODE_aboutView
function getInscripcion(){
   
    Refresh_VINSC_login2 = false;
    
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    var websevicename = 'cita/'+usuario;
    
    if(PSCitaIns_Refresh==false)
        return;
    
    if(!checkConnection()){ showNotification('No hay Red disponible','Conexión'); return; }
    
    $('.km-loader').show();
    
    $.ajax({
         data: {websevicename: websevicename,username:usuario,password:password},
         url: url_webservice,
         dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
         jsonp: 'callback',
         contentType: "application/json; charset=utf-8",
         complete:function(data){
             $('.km-loader').hide(); 
            }, 
        success:function(data){
            // do stuff with json (in this case an array)
            PSCitaIns_Refresh = false;
            INSC_array_periods = [];
            if(data.length>0)
            {
                INSC_data_json = data;
                $.each(data, function(index, element)
                {
                    addElement(INSC_array_periods, element.termDes);
                });
                INSC_current_index = INSC_array_periods.length - 1;
            }else
            {
                INSC_data_json = null;
            }
            
            updateInscription();
        },
        error:function()
        {
            showNotification('Intentalo Nuevamente','Alerta');
        }
    });
}

function updateInscription()
{
    initscrollTop();
    var html;
    if(INSC_data_json != null)
    {
        var element = INSC_data_json[INSC_current_index];
        html =
            '<div class="card">'+
            '<div class="card-header"><span class="item-title">Campus:</span><span class="item-after-right">'+element.campDes+'</span></div>'+
        
            '<div class="card-header"><span class="item-title">A partir de:</span><span class="item-after-right">'+element.fechIni+'</span></div>'+
        
            '<div class="card-header"><span class="item-title">Hora inicio:</span><span class="item-after-right">'+element.horaIni+'</span></div>'+
        
            '<div class="card-header"><span class="item-title">Hasta:</span><span class="item-after-right">'+element.fechFin+'</span></div>'+
        
            '<div class="card-header"><span class="item-title">Hora final:</span><span class="item-after-right">'+element.horaFin+'</span></div>'+
            '</div>';
        $('#div_inscripcion_id').html(html);
        $('#ci_periodo01').html(element.termDes);
    }
    else{
        html ='<div class="card-content-inner">NO HAY FECHAS DISPONIBLES PARA INSCRIPCI&Oacute;N.</div>';
        $('#div_inscripcion_id').html(html);
        $('#ci_periodo01').html('');
    }
    
    // ------- Flechas de navegacion de paginado -------
    $('#INSC_prev_arrow').show();
    $('#INSC_next_arrow').show();
    if(INSC_current_index==0 || INSC_array_periods.length==0)
        $('#INSC_prev_arrow').hide();
    if(INSC_current_index==INSC_array_periods.length-1 || INSC_array_periods.length==0)
        $('#INSC_next_arrow').hide();
}

function INSC_showPrevius(){
    if(0<INSC_current_index){
        INSC_current_index--;
        updateInscription();
    }
}

function INSC_showNext(){
    if(INSC_current_index<INSC_array_periods.length-1)
    {
        INSC_current_index++;
        updateInscription();
    }
}




// END_CUSTOM_CODE_aboutView
(function(parent) {
    var inscriptionViewModel = kendo.observable({
        openLink: function(url) {
            window.open(url, '_system');
            if (window.event) {
                window.event.preventDefault && window.event.preventDefault();
                window.event.returnValue = false;
            }
        }
    });

    parent.set('inscriptionViewModel', inscriptionViewModel);
})(app.inscriptionView);

// START_CUSTOM_CODE_inscriptionModel
// END_CUSTOM_CODE_inscriptionModel
