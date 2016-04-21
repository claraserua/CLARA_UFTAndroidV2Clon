'use strict';

app.movimientosView = kendo.observable({
    onShow: function() {
        if(SPMovimientos_Refresh == true){
            //$('#SPMO_prev_arrow').hide();
            //$('#SPMO_next_arrow').hide();
            // $('#term_periodo_mov').html('');
            $('#id_movimientosSP').empty();
        }
    },
    afterShow: function() { llenarFormaMovimientos(); }
});

var SPMO_array_json       = null;
var SPMO_current_index    = 0;
var SPMovimientos_Refresh = true;
//var SPMO_array_period=[];

function SPMovimientosFuct_Refresh(){
      SPMovimientos_Refresh = true;
      llenarFormaMovimientos();
  }


function llenarFormaMovimientos()
{
   
    /*if(SPMovimientos_Refresh==false)
        return;*/
    if(!checkConnection()){ showNotification('No hay Red disponible','Conexión'); return; }
  
    var periodo  = window.localStorage.getItem("periodo");
	var usuario  = window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
	var websevicename = 'estadodt/'+usuario+'/'+periodo;
    
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
            SPMovimientos_Refresh = false;
            SPMO_array_json = data;
            //SPMO_array_period = [];
            /*
            for(var i=0; i<data.length; i++)
            {
                addElement(SPMO_array_period, data[i].termDesc);
            }*/
			/*$.each(data, function(index, element) {
				addElement(SPMO_array_period, element.termDesc);
			});
            
            SPMO_current_index = SPMO_array_period.length-1;*/
            SPMO_updateMovimientos();
		},
		error:function(){
            
             showNotification('Intentalo Nuevamente','Alerta');
         
           
		}
	});
}

function SPMO_updateMovimientos()
{
    var monto;
    var pago;
    var repro;
    var saldo;
    
    var saldoTotal = 0;
    
    var html =
             '<div class="card">'+
             '<div class="card-content">'+
                 '<div class="card-content-inner">'+
                     '<table  width="100%">';
    
    //html +='<tr><td class="item-title" width="40%">Descripción</td><td class="item-title" width="30%" style="text-align:center;">Tipo</td><td class="item-title" width="30%" style="text-align:right;">Monto</td></tr>';
    
    //var termDesc = SPMO_array_period[SPMO_current_index];
    $.each(SPMO_array_json, function(index, element)
    {
        monto = element.monto.trim().replace(/\,/g,'');
        pago  = element.pago.trim().replace(/\,/g,'');
        repro = element.reprogamado.trim().replace(/\,/g,'');
        saldo = element.saldo.trim().replace(/\,/g,'');
        
        html +=
           '<tr style="border-top: 1px solid #BFBFD2;">' +
           '<td class="item-title" width="50%" style="vertical-align: top;">Medio de pago</td>' +
           '<td style="text-align:right;">'  + element.medioPago.trim()   + '</td></tr>' +
           '<tr>' +
           '<td class="item-title" width="50%">Monto                         </td>';
        monto.search(/\-/i) != -1 ? html += '<td style="text-align:right;">- $' + element.monto.trim().replace(/\-/i,'').replace(/\s/g,'') + '</td></tr>' : html += '<td style="text-align:right;">$' + element.monto.trim() + '</td></tr>';
        html += '<tr>' + 
           '<td class="item-title" width="50%">Pago                          </td>';
        pago.search(/\-/i) != -1 ? html += '<td style="text-align:right;">- $' + element.pago.trim().replace(/\-/i,'').replace(/\s/g,'') + '</td></tr>' : html += '<td style="text-align:right;">$' + element.pago.trim() + '</td></tr>';
        html += '<tr>' +
           '<td class="item-title" width="50%">Reprogramación                </td>';
        repro.search(/\-/i) != -1 ? html += '<td style="text-align:right;">- $' + element.reprogamado.trim().replace(/\-/i,'').replace(/\s/g,'') + '</td></tr>' : html += '<td style="text-align:right;">$' + element.reprogamado.trim() + '</td></tr>';
        html += '<tr>' +
           '<td class="item-title" width="50%">Saldo                         </td>';
        saldo.search(/\-/i) != -1 ? html += '<td style="text-align:right;">- $' + element.saldo.trim().replace(/\-/i,'').replace(/\s/g,'') + '</td></tr>' : html += '<td style="text-align:right;">$' + element.saldo.trim() + '</td></tr>';
        
        saldoTotal += parseInt(element.saldo.trim().replace(/\,/g,''));
        
        /*if(element.termDesc == termDesc)
        {
            html +=
                '<tr style="border-top: 1px solid #BFBFD2;">'+
                    '<td>'+element.detlDesc+'</td>'+
                    '<td style="text-align:center;">'+element.detlType+'</td>'+
                    '<td style="text-align:right;">$'+element.detlAmon.trim()+'</td>'+
                '</tr>';
        }*/
    });
    
        saldoTotal = '$ ' + saldoTotal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    
    html += '<tr><td colspan="2">&nbsp;</td></tr>' +
            '<tr style="border-top: 1px solid #0079BA; border-bottom: 1px solid #0079BA;">' +
            '<td class="item-title" width="50%" style="text-align: left; padding-top: 5px; padding-bottom: 5px;">Saldo Total</td>' +
            '<td style="text-align: right; padding-top: 5px; padding-bottom: 5px;">' + saldoTotal + '</td>' +
            '</tr>';
    html += '</table></div></div></div>';
    
    $('#id_movimientosSP').html(html);
    $('#term_periodo_mov').html(window.localStorage.getItem("periodo"));
    initscrollTop();
    // ------- Flechas de navegacion de paginado -------
    /*$('#SPMO_prev_arrow').show();
    $('#SPMO_next_arrow').show();
    if(SPMO_current_index==0)
        $('#SPMO_prev_arrow').hide();
    if(SPMO_current_index==SPMO_array_period.length-1)
        $('#SPMO_next_arrow').hide();*/
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


function SPMO_showPrevius(){
    if(0<SPMO_current_index){
        SPMO_current_index--;
        SPMO_updateMovimientos();
    }
}

function SPMO_showNext(){
    if(SPMO_current_index<SPMO_array_period.length-1){
        SPMO_current_index++;
        SPMO_updateMovimientos();
    }
}


// START_CUSTOM_CODE_academicStatus
// END_CUSTOM_CODE_academicStatus
