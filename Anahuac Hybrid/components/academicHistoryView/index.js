'use strict';

app.academicHistoryView = kendo.observable({
    onShow: function() {  },
    afterShow: function() { llenarFormaHistoria(); }
});


var VHA_Refresh = true;


function Refresh_HAcademic(){
      VHA_Refresh = true;
      llenarFormaHistoria();
  }



// Ejemplo: http://redanahuac.mx/mobile/webservice/curl.php?websevicename=promedio/00131632&username=00131632&password=chacha
var AH_promedio=null;
var AH_historia=null;
var AH_current_element=null;
var AH_current_index=0;

var AH_HTML_Promedios = '';

function llenarFormaHistoria()
{
	 if(VHA_Refresh==false)
        return;
    
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
	
    var websevicename_promedio = 'promedio/'+usuario;
	$('.km-loader').show();
    
    $.ajax({
		data: {websevicename: websevicename_promedio, username:usuario, password:password},
		url: 'http://redanahuac.mx/mobile/webservice/curl.php',
		dataType: 'jsonp', 
		jsonp: 'callback',
		contentType: "application/json; charset=utf-8",
        complete:function(data){
         
        },
		success:function(data)
		{
            AH_promedio = data;
            getDetalleHistory();
		},
		error:function(){
			alert("Error");
		}
	});

    
   
}


// Ejemplo: http://redanahuac.mx/mobile/webservice/curl.php?websevicename=historia/00131632&username=00131632&password=chacha
function getDetalleHistory(){
    
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    var websevicename_detalle = 'historia/'+usuario;
    
    $.ajax({
		data: {websevicename: websevicename_detalle, username:usuario, password:password},
		url: 'http://redanahuac.mx/mobile/webservice/curl.php',
		dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
		jsonp: 'callback',
		contentType: "application/json; charset=utf-8",
        complete:function(data){
         $('.km-loader').hide(); 
        },
		success:function(data)
		{
            VHA_Refresh=false;
            AH_historia = data;
            if(0<AH_promedio.length)
            {
                AH_current_index = AH_promedio.length-1;
                AH_current_element = AH_promedio[AH_current_index];
                
                updateDetalleHistory();
            }
		},
		error:function(){
			alert("Error");
		}
	});
    
}
function updateDetalleHistory()
{
    var html='';
    var periodo = '';
    
	html += '<div class="card_light"><div class="card-header">Promedio del periodo:<span style="float:right;" class="color-'+AH_promedio[AH_current_index].coloGlob+'">'+AH_promedio[AH_current_index].tgpaGpaa+'</span></div></div>';
	html +='<div class="card_light"><div class="card-header">Promedio global:<span style="float:right;" class="color-'+AH_promedio[AH_current_index].coloGpaa+'">'+AH_promedio[AH_current_index].promGlob+'</span></div></div>';
    
	$.each(AH_historia, function(index, element)
	{
        if(element.termCode == AH_current_element.termCode)
        {
            periodo = element.termDesc;
            html +=
             '<div class="card_light">'+
             '<div class="card-header"><span>'+element.subjCode+'&nbsp;'+element.crseNumb+'&nbsp;'+element.crseTitl+'</span><span style="float:right;" class="color-'+element.colorGrd+'">'+element.grdeFinl+'</span></div>'+
             '<div class="card-content">'+
             '<div class="card-content-inner"><span>Instructor: </span>'+element.nameFacu+'</div>'+
             '<div class="card-footer"><span>Créditos: '+element.credHour+'</span></div>'+
             '</div>'+
             '</div>'+
             '';
        }
	});
    $('.km-loader').hide();
    $('#div_content_idHA').html(html);
    $('#div_term_periodoHA').html(periodo);
    
    if(AH_promedio.length==1){
        $('#AH_prev_arrow').hide();
        $('#AH_next_arrow').hide();
    
    }else{
        if(AH_current_index==AH_promedio.length-1){
            $('#AH_next_arrow').hide();
            $('#AH_prev_arrow').show();
              return;
        }
         if(AH_current_index==0){
             $('#AH_prev_arrow').hide();
             return;
        }
        
        if(AH_current_index<=AH_promedio.length-1){$('#AH_next_arrow').show();  $('#AH_prev_arrow').show();}
    }
    
}

function AH_showPrevius(){
    if(0<AH_current_index){
        AH_current_index--;
        AH_current_element = AH_promedio[AH_current_index];
        updateDetalleHistory();
    }
    
}

function AH_showNext(){
    if(AH_current_index<AH_promedio.length-1){
        AH_current_index++;
        AH_current_element = AH_promedio[AH_current_index];
        updateDetalleHistory();
    }
}




// START_CUSTOM_CODE_academicHistoryView
// END_CUSTOM_CODE_academicHistoryView
