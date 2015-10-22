'use strict';

var SPV_vencido_json=null;
var SPV_current_index=0;
var SPV_indexTRAM=0;
var SPV_array_period=[];

app.vencidosView = kendo.observable({
    onShow: function() {  },
    afterShow: function() { llenarFormaVencidos(); }
});

var SPVencidos_Refresh = true;

function SPVencidosFuct_Refresh(){
      SPVencidos_Refresh = true;
      llenarFormaVencidos();
}


function llenarFormaVencidos()
{
    if(SPVencidos_Refresh==false)
        return;
    if(!checkConnection()){ showNotification('No network connection','Network'); return; }
    
	var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
	var websevicename = 'estadovs/'+usuario;
	$('.km-loader').show();
    $.ajax({
		data: {websevicename: websevicename, username:usuario, password:password},
		url: 'http://redanahuac.mx/mobile/webservice/curl.php',
		dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
		jsonp: 'callback',
		contentType: "application/json; charset=utf-8",
        complete:function(data)
        {
             $('.km-loader').hide(); 
        },
		success:function(data)
		{
            SPVencidos_Refresh=false;
            var html = '';
            SPV_vencido_json = data;
            SPV_array_period=[];
            
			// do stuff with json (in this case an array)
            if(data.length==0){
                 
               html =
                 '<div class="card">'+
                 '<div class="card-header">NO TIENE VENCIDOS</div>'+
                 '</div>'+
                 '';
                
            
            $('#id_vencidosSP').html(html);
               
                  return;}
            
			$.each(data, function(index, element)
            {
                if(element.detlCode=="TRAM"){ SPV_indexTRAM = index; }
                
                addElement(SPV_array_period, element.termDesc);
			});
            
            SPV_current_index = SPV_array_period.length-1;
            SPV_updateVencidos();
            
            
		},
		error:function()
        {
           
		}
	});
}
/*
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
//*/

function SPV_updateVencidos()
{
    var html = 
       '<div class="card">'+
       '<div class="card-content">'+
       '<div class="card-content-inner">'+  
       '<table width="100%">';
    html +='<tr><td class="item-title" width="40%">Descripción</td><td class="item-title" width="30%" style="text-align:center;">Vencimiento</td><td class="item-title" width="30%" style="text-align:right;">Total</td></tr>';

    var termDesc = SPV_array_period[SPV_current_index];
    $.each(SPV_vencido_json, function(index, element)
    {
        if(element.termDesc == termDesc)
        {
            html +=
              '<tr style="border-bottom: 1px solid #ccc;">'+
                 '<td>'+element.detlDesc+'</td>'+
                 '<td style="text-align:center;">'+element.detlFevn+'</td>'+
                 '<td style="text-align:right;">$'+element.detlAmnt.trim()+'</td>'+
              '</tr>';
        }
    });
    html += '</table></div></div></div>';
    
    var data=SPV_vencido_json;
    html +=
    '<div class="card">'+
     '<div class="card-content">'+
          '<div class="card-header">Tramites y Derechos de Incorp.</div>'+  
          '<div class="card-content-inner">'+
             '<div>Monto: $<span id="trm_id_monto">'+data[SPV_indexTRAM].detlAmnt.trim()+'</span></div>'+
             '<div>Recargos: $<span id="trm_id_recagro">'+data[SPV_indexTRAM].detlRecg.trim()+'</span></div>'+
             '<div>Saldo: $<span id="trm_id_saldo">'+data[SPV_indexTRAM].detlBaln.trim()+'</span></div>'+
             '<div>Fecha Vencimiento:<span id="trm_id_fvencimiento">'+data[SPV_indexTRAM].detlFevn+'</span></div>'+
         '</div>'+
         '</div>'+
    '</div>';
    
    $('#id_vencidosSP').html(html);
    $('#term_periodo_ve').html(termDesc);    
    initscrollTop();
    
    // ------- Flechas de navegacion de paginado -------
    $('#SPV_prev_arrow').show();
    $('#SPV_next_arrow').show();
    if(SPV_current_index==0)
        $('#SPV_prev_arrow').hide();
    if(SPV_current_index==SPV_array_period.length-1)
        $('#SPV_next_arrow').hide();
}

function SPV_showPrevius()
{
    if(0<SPV_current_index){
        SPV_current_index--;
        SPV_updateVencidos();
    }
}

function SPV_showNext(){
     if(SPV_current_index<SPV_array_period.length-1){
        SPV_current_index++;
        SPV_updateVencidos();
    }
}




// START_CUSTOM_CODE_academicStatus
// END_CUSTOM_CODE_academicStatus

