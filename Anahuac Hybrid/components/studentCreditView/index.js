'use strict';

var RCEducativo_Refresh = true;


function CEducativoFuct_Refresh(){
      RCEducativo_Refresh = true;
      buildStudentCredit();
  }



function buildStudentCredit()
{
     if(RCEducativo_Refresh==false)
        return;
    
    if(!checkConnection()){ showNotification('No network connection','Network'); return; }
    
	var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
	
    var websevicename = 'creedu/'+usuario+'/';
	$('.km-loader').show();
	$.ajax({
		data: {websevicename: websevicename, username:usuario, password:password},
		url: 'http://redanahuac.mx/mobile/webservice/curl.php',
		dataType: 'jsonp',
		jsonp: 'callback',
		contentType: "application/json; charset=utf-8",
        complete:function(data){
         $('.km-loader').hide(); 
        }, 
		success:function(data)
		{
            Refresh_VSC_login2 = false;
            RCEducativo_Refresh = false;
            
            if(1<=data.length)
            { 
                $('#CANT_id').html('$'+data[0].capitalAnterior+'&nbsp;&nbsp;');
                $('#IANT_id').html('$'+data[0].interesAnterior+'&nbsp;&nbsp;');
                $('#CNVO_id').html('$'+data[0].capitalActual+'&nbsp;&nbsp;');
                $('#INVO_id').html('$'+data[0].interesActual+'&nbsp;&nbsp;');
            }
		},
		error:function(){  showNotification('Intentalo Nuevamente','Alerta');     }
	});
}
// __________________________________________

function initCapitalHastaPlan_Refresh(){
    CANT=true;
	buildTable('CANT','div_student_credit_1_id');
}
function initInteresHastaPlan_Refresh(){
    IANT=true;
	buildTable('IANT','div_student_credit_2_id');
}
function initCapitalPosteriorPlan_Refresh(){
    CNVO=true;
	buildTable('CNVO','div_student_credit_3_id');
}
function initInteresPosteriorPlan_Refresh(){
    INVO=true;
	buildTable('INVO','div_student_credit_4_id');
}
var CANT=true;
var IANT=true;
var CNVO=true;
var INVO=true;

var variabProgramName = false;



function initCapitalHastaPlan(){
   
	buildTable('CANT','div_student_credit_1_id');
}
function initInteresHastaPlan(){
	buildTable('IANT','div_student_credit_2_id');
}
function initCapitalPosteriorPlan(){
	buildTable('CNVO','div_student_credit_3_id');
}
function initInteresPosteriorPlan(){
	buildTable('INVO','div_student_credit_4_id');
}




function buildTable(programName, div_id)
{
	var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    
    var websevicename = 'creedudt/'+usuario+'/'+programName;
    var loaded = eval(programName);
    
    
        
    switch(programName){
        case 'CANT': variabProgramName = CANT; if(Refresh_CANT_login2 == true){variabProgramName = true;} break;
        case 'IANT': variabProgramName = IANT; if(Refresh_IANT_login2 == true){variabProgramName = true;} break;
        case 'CNVO': variabProgramName = CNVO; if(Refresh_CNVO_login2 == true){variabProgramName = true;} break;
        case 'INVO': variabProgramName = INVO; if(Refresh_INVO_login2 == true){variabProgramName = true;} break;
    }
    
    
     if(variabProgramName==false)
        return;
    
    if(!checkConnection()){ showNotification('No network connection','Network'); return; }
    
    
    
    $('.km-loader').show();
	$.ajax({
		data: {websevicename: websevicename, username:usuario, password:password},
		url: 'http://redanahuac.mx/mobile/webservice/curl.php',
		dataType: 'jsonp',
		jsonp: 'callback',
		contentType: "application/json; charset=utf-8",
        complete:function(data){
         $('.km-loader').hide(); 
        },
		success:function(data)
		{
            
            
            switch(programName){
                case 'CANT': CANT=false; Refresh_CANT_login2=false; break;
                case 'IANT': IANT=false; Refresh_IANT_login2=false; break;
                case 'CNVO': CNVO=false; Refresh_CNVO_login2=false; break;
                case 'INVO': INVO=false; Refresh_INVO_login2=false; break;
            }

            var html =
             '<div class="card">'+
             '<div class="card-content">'+
                 '<div class="card-content-inner">';
                     
            
            html +='<table style="width: 100%;">';
            html+='<tr>  <td class="item-title" width="40%" style="text-align:center;">Fecha</td><td class="item-title" width="30%" style="text-align:center;">Tipo</td><td class="item-title" width="30%" style="text-align:right;">Monto</td>  </tr>';
            
            if(data.length!=0){
            $.each(data, function(index1, capital){
                html+=
                    '<tr style="border-bottom: 1px solid #ccc;">'+
                    '	<td style="text-align:center;">'+capital.detFecTran+'</td>'+
                    '	<td style="text-align:center;">'+capital.detTipoAdeudo+'</td>'+
                    '	<td style="text-align:right;">$'+capital.detMonto.trim()+'</td>'+
                	'</tr>';
            });
            html+='</table></div></div></div>';
                }else{
                 
               html =
             '<div class="card">'+
             '<div class="card-content">'+
                 '<div class="card-content-inner">NO HAY ADEUDO </div></div></div>';
                    
                }
            $('#'+div_id).html(html);
		},
		error:function(){ alert("Error"); }
	});
}

function clickHandler_3(redirect) {
    app.mobileApp.navigate('components/studentCreditView/'+redirect+'.html');
}

var Refresh_VSC_login2 = false;
var Refresh_CANT_login2 = false;
var Refresh_IANT_login2=false; 
var Refresh_CNVO_login2=false; 
var Refresh_INVO_login2=false; 

function emptyCreStudent(){
                $('#CANT_id').html('$0.00');
                $('#IANT_id').html('$0.00');
                $('#CNVO_id').html('$0.00');
                $('#INVO_id').html('$0.00');
}

app.studentCreditView = kendo.observable({
    onShow: function() { if(Refresh_VHA_login2 == true){ emptyCreStudent(); variabProgramName = true; }  },
    afterShow: function() { buildStudentCredit(); }
});

// ----------------------------------------------
app.capitalHastaPlan = kendo.observable({
    onShow: function() { if(Refresh_CANT_login2 == true){ $('#div_student_credit_1_id').empty(); variabProgramName = true; } },
    afterShow: function() { initCapitalHastaPlan(); }
});

app.interesHastaPlan = kendo.observable({
    onShow: function() { if(Refresh_IANT_login2 == true){ $('#div_student_credit_2_id').empty(); variabProgramName = true; } },
    afterShow: function() { initInteresHastaPlan(); }
});

app.capitalPosteriorPlan = kendo.observable({
    onShow: function() { if(Refresh_CNVO_login2 == true){ $('#div_student_credit_3_id').empty(); variabProgramName = true; } },
    afterShow: function() {initCapitalPosteriorPlan(); }
});

app.interesPosteriorPlan = kendo.observable({
    onShow: function() { if(Refresh_INVO_login2 == true){ $('#div_student_credit_4_id').empty(); variabProgramName = true; } },
    afterShow: function() { initInteresPosteriorPlan(); }
});
// ----------------------------------------------
