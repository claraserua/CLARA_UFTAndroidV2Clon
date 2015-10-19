'use strict';

function buildStudentCredit()
{
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
            if(1<=data.length)
            {
                $('#CANT_id').html('$'+data[0].capitalActual+'&nbsp;&nbsp;');
                $('#IANT_id').html('$'+data[0].interesActual+'&nbsp;&nbsp;');
                $('#CNVO_id').html('$'+data[0].capitalAnterior+'&nbsp;&nbsp;');
                $('#INVO_id').html('$'+data[0].interesAnterior+'&nbsp;&nbsp;');
            }
		},
		error:function(){ alert("Error"); }
	});
}
// __________________________________________

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
var CANT=false;
var IANT=false;
var CNVO=false;
var INVO=false;



function buildTable(programName, div_id)
{
	var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    
    var websevicename = 'creedudt/'+usuario+'/'+programName;
    var loaded = eval(programName);
    
    /*if(loaded){
        //alert('Previamente cargado');
        return;
    }*/
    switch(programName){
        case 'CANT': CANT=true; break;
        case 'IANT': IANT=true; break;
        case 'CNVO': CNVO=true; break;
        case 'INVO': INVO=true; break;
    }
    
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
            var html='<table style="width: 100%;">';
            html+='<tr>  <td class="item-title">Tipo</td><td class="item-title">Monto</td><td class="item-title">Fecha</td>  </tr>';
            $.each(data, function(index1, capital){
                html+=
                    '<tr>'+
                    '	<td>'+capital.detTipoAdeudo+'</td>'+
                    '	<td>$'+capital.detMonto+'</td>'+
                    '	<td>'+capital.detFecTran+'</td>'+
                	  '</tr>';
            });
            html+='</table>';
            $('#'+div_id).html(html);
		},
		error:function(){ alert("Error"); }
	});
}

function clickHandler_3(redirect) {
    app.mobileApp.navigate('components/studentCreditView/'+redirect+'.html');
}


app.studentCreditView = kendo.observable({
    onShow: function() {  },
    afterShow: function() { buildStudentCredit(); }
});

// ----------------------------------------------
app.capitalHastaPlan = kendo.observable({
    onShow: function() {  },
    afterShow: function() { initCapitalHastaPlan(); }
});

app.interesHastaPlan = kendo.observable({
    onShow: function() {  },
    afterShow: function() { initInteresHastaPlan(); }
});

app.capitalPosteriorPlan = kendo.observable({
    onShow: function() {  },
    afterShow: function() {initCapitalPosteriorPlan(); }
});

app.interesPosteriorPlan = kendo.observable({
    onShow: function() {  },
    afterShow: function() { initInteresPosteriorPlan(); }
});
// ----------------------------------------------
