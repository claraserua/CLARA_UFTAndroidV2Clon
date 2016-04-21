'use strict';

app.retentionsView = kendo.observable({
    onShow: function() {  },
    afterShow: function() { getRetenciones(); }
});

var VRetention_Refresh = true;

function Refresh_VRetention(){
      VRetention_Refresh = true;
      getRetenciones();
}


// START_CUSTOM_CODE_aboutView
function getRetenciones()
{
    if(VRetention_Refresh==false)
        return;
    
    if(!checkConnection()){ showNotification('No hay Red disponible','Conexión'); return; }
    
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    var websevicename = 'retencionnv/'+usuario;
    
    $( "#retenciones").empty();
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
            VRetention_Refresh=false;
            var html = '';

            if (data!=null && 0<data.length)
            {
                $.each(data, function(index, element)
                {
                    if(element.holdDesc != 'not'){
                        html +=
                            '<div class="card-light" style="border-bottom: 1px solid #ccc !important;">'+
                            '  <div class="card-header"><div style="font-size:11pt;">Tipo de retenci&oacute;n: <br/><div style="color:Gray;">'+element.holdDesc+'</div></div></div>'+
                            '  <div class="card-header"><div style="font-size:11pt;">Raz&oacute;n: <br/><div style="color:Gray;">'+element.holdRazon+'</div></div></div>'+
                            '  <div class="card-header"><div style="font-size:11pt;">Procesos afectados: <br/><div style="color:Gray;">'+element.holdAfecta+'</div></div></div>'+
                            '  <div class="card-footer"><span>Inicio:'+element.fInicio+'</span><span style="float:right;">Fin:'+element.fFin+'</span></div>'+
                            '</div>';
                    }else{
                        html +=
                            '<div class="card-light" style="border-bottom: 1px solid #ccc !important;">'+
                            '<div class="card-header" style="position:static !important;">'+element.holdRazon+'</div>'+
                            '</div>';
                    }
                });
            }
            else{
                html +=
                    '<div class="card-light" style="border-bottom: 1px solid #ccc !important;">'+
                    '<div class="card-header" style="position:static !important;">No cuentas con restricciones en este momento</div>'+
                    '</div>';
            }
            
            $( "#retenciones" ).html( html );
        },
        error:function(){
            showNotification('Intentalo Nuevamente','Alerta');
        }
    });

}

// END_CUSTOM_CODE_aboutView
(function(parent) {
    var retentionsViewModel = kendo.observable({
        openLink: function(url) {
            window.open(url, '_system');
            if (window.event) {
                window.event.preventDefault && window.event.preventDefault();
                window.event.returnValue = false;
            }
        }
    });

    parent.set('retentionsViewModel', retentionsViewModel);
})(app.retentionsView);

// START_CUSTOM_CODE_aboutViewModel
// END_CUSTOM_CODE_aboutViewModel