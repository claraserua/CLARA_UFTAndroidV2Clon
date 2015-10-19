'use strict';

var SPM_array_json=null;
var SPM_current_index=0;
var SPM_array_period=[];

function llenarFormaMovimientos()
{
  
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
            SPM_array_json = data;
            SPM_array_period = [];
            
            for(var i=0; i<data.length; i++){
                addElement(SPM_array_period, data[i].termDesc);
                
            }
            
            SPM_current_index = 0;
            SPM_updateMovimientos();
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

function SPM_updateMovimientos()
{
    var SPM_html='<tr><td class="item-title">Descripción</td><td class="item-title">Tipo</td><td class="item-title" width="30%">Monto</td></tr>';
    var termDesc = SPM_array_period[SPM_current_index];
    $.each(SPM_array_json, function(index, element)
    {
        if(element.termDesc == termDesc)
        {
            SPM_html +=
                '<tr>'+
                    '<td>'+element.detlDesc+'</td>'+
                    '<td>'+element.detlType+'</td>'+
                    '<td>$'+element.detlAmon+'</td>'+
                '</tr>';
            
          
        }
    });
    //console.log('>>html.length='+SPM_html.length);
    $('#id_movimientos').html(SPM_html);
    $('#term_periodo_vc').html(termDesc);
    
    if(SPM_array_period.length==1){
        $('#SPM_prev_arrow').hide();
        $('#SPM_next_arrow').hide();
    
    }else{
        if(SPM_current_index==0){
            $('#SPM_next_arrow').hide();
            $('#SPM_prev_arrow').show();
              return;
        }
         if(SPM_current_index==SPM_array_period.length-1){
             $('#SPM_prev_arrow').hide();
             return;
        }
        
        if(SPM_current_index<=SPM_array_period.length-1){$('#SPM_next_arrow').show();  $('#SPM_prev_arrow').show();}
    }
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

function SPM_showPrevius(){
     if(SPM_current_index<SPM_array_period.length-1){
        SPM_current_index++;
        SPM_updateMovimientos();
    }
}

function SPM_showNext(){
    if(0<SPM_current_index){
        SPM_current_index--;
        SPM_updateMovimientos();
    } 
}

app.movimientosView = kendo.observable({
    onShow: function() {  },
    afterShow: function() { llenarFormaMovimientos(); }
});

// START_CUSTOM_CODE_academicStatus
// END_CUSTOM_CODE_academicStatus
