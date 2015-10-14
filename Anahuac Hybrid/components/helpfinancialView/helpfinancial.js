'use strict';

var HF_max_elements=0;
var HF_current_index=0;
var array_periodos_HF = new Array();

app.helpfinancialView = kendo.observable({
    onShow: function() { getApoyoFinanciero(); },
    afterShow: function() {}
});

// START_CUSTOM_CODE_aboutView
function getApoyoFinanciero(){
   
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    var websevicename = 'apoyo/'+usuario;
    
    var url = 'http://redanahuac.mx/mobile/webservice/curl.php';
    
    $( "#apoyof" ).empty();
    array_periodos_HF = new Array();
    
    $.ajax({
     data: {websevicename: websevicename,username:usuario,password:password},
     url:url,
     dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
     jsonp: 'callback',
     contentType: "application/json; charset=utf-8",
     success:function(data){
         // do stuff with json (in this case an array)
     
         var html = '';
         $.each(data, function(index, element)
         {
             array_periodos_HF[index] = element.periodo;
              html =
                 '<div class="card" id="HF_div_'+index+'">'+
                 '<div class="card-content">'+
                 '<div class="card-content-inner"><div><strong>BECA:</strong> '+element.desBeca+'</div><div><strong>CREDITO:</strong>'+element.desCredito+'</div></div>'+
                 '</div>'+
                 '</div>'+
                 '';
              $( "#apoyof" ).append( html );
        });
        
         HF_max_elements= data.length;
        HF_current_index = data.length-1;
        HF_update();
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
function HF_update(){
    
    $('#term_periodo_hf').html(array_periodos_HF[HF_current_index]);
    
    for(var i=0; i<HF_max_elements; i++)
        if(i==HF_current_index)
            $('#HF_div_'+i).show();
        else
            $('#HF_div_'+i).hide();
}

function HF_showPrevius(){
    if(0<HF_current_index){
        HF_current_index--;
        HF_update();
    }
}
function HF_showNext(){
    if(HF_current_index<HF_max_elements-1){
        HF_current_index++;
        HF_update();
    }
}

// END_CUSTOM_CODE_aboutView
(function(parent) {
    var helpfinancialViewModel = kendo.observable({
        openLink: function(url) {
            window.open(url, '_system');
            if (window.event) {
                window.event.preventDefault && window.event.preventDefault();
                window.event.returnValue = false;
            }
        }
    });

    parent.set('helpfinancialViewModel', helpfinancialViewModel);
})(app.retentionsView);

// START_CUSTOM_CODE_helpfinancialViewModel
// END_CUSTOM_CODE_helpfinancialViewModel