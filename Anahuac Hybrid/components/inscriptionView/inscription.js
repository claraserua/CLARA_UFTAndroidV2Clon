'use strict';

app.inscriptionView = kendo.observable({
    onShow: function() { getInscripcion(); },
    afterShow: function() {}
});

var CI_array_json = null;
var CI_array_citas = [];
var CI_current_index = 0;
// START_CUSTOM_CODE_aboutView
function getInscripcion(){
   
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    var websevicename = 'cita/'+usuario;
    
    var url = 'http://redanahuac.mx/mobile/webservice/curl.php';
    
    $( "#inscripcion" ).empty();
    //$( "#inscripcion" ).append('<tr><td>Descripción</td><td>Inicio</td><td>Fin</td></tr>');
    
    $.ajax({
     data: {websevicename: websevicename,username:usuario,password:password},
     url:url,
     dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
     jsonp: 'callback',
     contentType: "application/json; charset=utf-8",
     success:function(data){
         // do stuff with json (in this case an array)
         
         //$('#load-content').remove();
         CI_array_json = data;
         console.log('data.length='+data.length);
         if(data.length>0)
         {
             $('#div_inscripcion_id').show();
             $('#div_nodata_id').hide();
             $.each(data, function(index, element)
             {
                 /*
                 $('#CI_campus_id').html(element.campDes);
                 $('#CI_fecha1_id').html(element.fechIni);
                 $('#CI_hora1_id').html(element.horaIni);
                 $('#CI_fecha2_id').html(element.fechFin);
                 $('#CI_hora2_id').html(element.horaFin);
                 //*/
                 CI_addCita(element.termDes);
             });
             CI_current_index = CI_array_citas.length-1;
             CI_updateCitas();
         }else{
             $('#div_inscripcion_id').hide();
             $('#div_nodata_id').show();
         }
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

function CI_searchCitaIndex(str_cita){
    if(PC_array_period!=null)
        for(var i=0; i<PC_array_period.length; i++)
            if(PC_array_period[i]==str_period)
                return i;
    return -1;
}
function CI_addCita(str_cita){
    str_cita = str_cita.trim();
    if(CI_searchCitaIndex(str_cita)==-1)
        CI_array_citas.push(str_cita);
}
function CI_updateCitas(){
    var termDes = CI_array_citas[CI_current_index];
    console.log('imprimir: '+termDes);
    var html='';
    $.each(data, function(index, element)
    {
        if(element.termDes == termDes)
        {
             html +=
                '<div>Campus:        <span>'+element.campDes+'</span> </div>'+
                '<div>A partir de:   <span>'+element.fechIni+'</span> </div>'+
                '<div>Horario inicio:<span>'+element.horaIni+'</span> </div>'+
                '<div>Hasta:         <span>'+element.fechFin+'</span> </div>'+
                '<div>Hora final:    <span>'+element.horaFin+'</span> </div>';
            /*
            $('#CI_campus_id').html(element.campDes);
            $('#CI_fecha1_id').html(element.fechIni);
            $('#CI_hora1_id').html(element.horaIni);
            $('#CI_fecha2_id').html(element.fechFin);
            $('#CI_hora2_id').html(element.horaFin);
            */
        }
    });
    $('#div_inscripcion_id').html(html);
    $('#div_periodo').html(termDes);
}
function CI_showPrevius(){
    if(0<CI_current_index){
        CI_current_index--;
        CI_updateCitas();
    }
}

function CI_showNext(){
    if(CI_current_index<CI_array_citas.length-1){
        CI_current_index++;
        CI_updateCitas();
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
