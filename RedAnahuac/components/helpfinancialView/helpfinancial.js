'use strict';

var HF_max_elements=0;
var HF_current_index=0;
var array_periodos_HF = new Array();

app.helpfinancialView = kendo.observable({
    onShow: function() { getApoyoFinanciero(); },
    afterShow: function() {}
});


// START_CUSTOM_CODE_perfilView
var HFinancial_Refresh = true;

function Refresh_HFinancial(){
      HFinancial_Refresh = true;
      getApoyoFinanciero();
  }


// START_CUSTOM_CODE_aboutView
function getApoyoFinanciero(){
   
    if(HFinancial_Refresh==false)
        return;
    
     if(!checkConnection()){ showNotification('No hay Red disponible','Conexión'); return; }
    
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    var websevicename = 'apoyo/'+usuario;
    
    $( "#apoyof" ).empty();
    $('.km-loader').show();
    array_periodos_HF = new Array();
    
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
       HFinancial_Refresh=false;  
       var html = '';
         var credito = '';
         var beca = '';
         
         
         if(data.length!=0)
         {
             $.each(data, function(index, element)
             {
                 if(element.desBeca=='nulo'){beca='NINGUNA';}else{beca=element.desBeca; }
                 if(element.desCredito=='nulo'){credito='NINGUNO';}else{credito=element.desCredito; }
                 array_periodos_HF[index] = element.periodo;
                 
                 html =
                 '<div id="HF_div_'+index+'" style="margin-top:15px;">'+
                 '<div class="card_light" id="HF_div_'+index+'">'+
                 '<div class="card-header"><span class="item-title">Beca:</span><span class="item-after-right">'+beca+'</span></div>'+
                 '</div>'+
                  
                 '<div class="card_light">'+
                 '<div class="card-header"><span class="item-title">Crédito:</span><span class="item-after-right">'+credito+'</span></div>'+
                 '</div>'+
                 '</div>'+
                 '';
                 
                 
                 $( "#apoyof" ).append( html );
             });
         }else{
             
              html =
                 '<div class="card">'+
                 '<div class="card-header">NO CUENTAS CON APOYO FINANCIERO</div>'+
                 '</div>'+
                 '';
            
                 $('#term_periodo_hf').html('');
                 $('#HF_prev_arrow').hide();
                 $('#HF_next_arrow').hide();
              
             $( "#apoyof" ).append( html );
         }
        
         HF_max_elements= data.length;
         HF_current_index = data.length-1;
         HF_update();
     },
     error:function(){
         
          showNotification('Intentalo Nuevamente','Alerta');      
       
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
    
    
    $('#HF_prev_arrow').show();
    $('#HF_next_arrow').show();
    
    if (array_periodos_HF.length<=1 || HF_current_index==0){
        $('#HF_prev_arrow').hide();
    }
    if (array_periodos_HF.length<=1 || HF_current_index==array_periodos_HF.length-1){
        $('#HF_next_arrow').hide();
    }
    
    //*/
    /*
    //_______
    if(array_periodos_HF.length==1){
        $('#HF_prev_arrow').hide();
        $('#HF_next_arrow').hide();
    
    }else{
        if(HF_current_index==array_periodos_HF.length-1){
            $('#HF_next_arrow').hide();
            $('#HF_prev_arrow').show();
              return;
        }
         if(HF_current_index==0){
             $('#HF_prev_arrow').hide();
             return;
        }
        
        if(HF_current_index<=array_periodos_HF.length-1){$('#HF_next_arrow').show();  $('#HF_prev_arrow').show();}
    }
    //*/
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