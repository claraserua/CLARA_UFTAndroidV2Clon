'use strict';

app.statusPayView = kendo.observable({
    onShow: function() { if(SPCuenta_Refresh == true){ emptyEstadoCuenta(); }  },
    afterShow: function() { getEstadoCuenta(); }
});

// START_CUSTOM_CODE_statusPayView
var EC_array_json    = null;
var EC_current_index = 0;
var EC_array_period  = [];
var SPCuenta_Refresh = true;

function SPCuentaPay_Refresh(){
      SPCuenta_Refresh = true;
      getEstadoCuenta();
  }

function emptyEstadoCuenta(){
    /*
     $('#vencidos').html('');
     $('#novencidos').html('');
     $('#stotal').html('');
    */
    $('#ecContrato').html('');
    $('#ecMontoOrgnl').html('');
    $('#ecDocsPagados').html('');
    $('#ecDocsActivos').html('');
    $('#ecDocsVencidos').html('');
}


function getEstadoCuenta(){

    if(SPCuenta_Refresh == false)
        return;
    
    if(!checkConnection()){ showNotification('No hay Red disponible','Conexión'); return; }
    
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    var websevicename = 'estado/'+usuario;

    $('.km-loader').show();
    
    $.ajax({
        data: {websevicename: websevicename,username:usuario,password:password},
        url: url_webservice,
        dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
        jsonp: 'callback',
        contentType: "application/json; charset=utf-8",
      
        complete:function(data) {
            $('.km-loader').hide();
        },
        
        success:function(data) {
            SPCuenta_Refresh = false;
            EC_array_json    = data;
            EC_array_period  = [];
            
            // do stuff with json (in this case an array)
            $.each(data, function(index, element) {
                /*$('#vencidos').html("$"+element.adeudoSiVenc.trim());
                $('#novencidos').html("$"+element.adeudoNoVenc.trim());
                $('#stotal').html("$"+element.saldoACuenta.trim());*/

                addElement(EC_array_period, element.periodo);
            });
            
            EC_current_index = EC_array_period.length - 1;
            EC_updateEstadoCuenta();
        },
        error:function() {
            showNotification('Intentalo Nuevamente','Alerta');
        }
    });
}

function EC_updateEstadoCuenta()
{   
    //alert(EC_current_index);

    var termDesc = EC_array_period[EC_current_index];
    $.each(EC_array_json, function(index, element)
    {
        if(element.periodo == termDesc)
        {
            $('#ecContrato').html(element.contrato.trim());
            $('#ecMontoOrgnl').html('$' + element.montoOriginal.trim());
            $('#ecDocsPagados').html('$' + element.totPagados.trim());
            $('#ecDocsActivos').html('$' + element.totActivos.trim());
            $('#ecDocsVencidos').html('$' + element.totVencidos.trim());
            window.localStorage.setItem("periodo",termDesc);
        }
    });
    
    $('#term_periodo_ec').html(termDesc);
    initscrollTop();
    // ------- Flechas de navegacion de paginado -------
    $('#EC_prev_arrow').show();
    $('#EC_next_arrow').show();
    
    if(EC_current_index == 0)
        $('#EC_prev_arrow').hide();
    
    if(EC_current_index == EC_array_period.length - 1)
        $('#EC_next_arrow').hide();
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

function EC_showPrevius(){
    if(0 < EC_current_index){
        EC_current_index--;
        EC_updateEstadoCuenta();
    }
}

function EC_showNext(){
    if(EC_current_index < EC_array_period.length-1){
        EC_current_index++;
        EC_updateEstadoCuenta();
    }
}

// END_CUSTOM_CODE_statusPayView
(function(parent) {
    var statusPayViewModel = kendo.observable({
        openLink: function(url) {
            window.open(url, '_system');
            if (window.event) {
                window.event.preventDefault && window.event.preventDefault();
                window.event.returnValue = false;
            }
        }
    });

    parent.set('statusPayViewModel', statusPayViewModel);
})(app.statusPayView);

// START_CUSTOM_CODE_statusPayViewModel
// END_CUSTOM_CODE_statusPayViewModel