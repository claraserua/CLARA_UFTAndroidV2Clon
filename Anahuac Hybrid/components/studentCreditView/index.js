'use strict';

function buildStudentCredit()
{
	var usuario = '00131632';
	var password = 'chacha';
	var websevicename = 'creedu/00131632/';
	
	$.ajax({
		data: {websevicename: websevicename, username:usuario, password:password},
		url: 'http://redanahuac.mx/mobile/webservice/curl.php',
		dataType: 'jsonp',
		jsonp: 'callback',
		contentType: "application/json; charset=utf-8",
		success:function(data)
		{
            if(1<=data.length)
            {
                $('#CANT_id').html(''+data[0].capitalActual+'&nbsp;&nbsp;');
                $('#IANT_id').html(''+data[0].interesActual+'&nbsp;&nbsp;');
                $('#CNVO_id').html(''+data[0].capitalAnterior+'&nbsp;&nbsp;');
                $('#INVO_id').html(''+data[0].interesAnterior+'&nbsp;&nbsp;');
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
	var usuario = '00131632';
	var password = 'chacha';
    var websevicename = 'creedudt/'+usuario+'/'+programName;
    var loaded = eval(programName);
    if(loaded){
        //alert('Previamente cargado');
        return;
    }
    switch(programName){
        case 'CANT': CANT=true; break;
        case 'IANT': IANT=true; break;
        case 'CNVO': CNVO=true; break;
        case 'INVO': INVO=true; break;
    }
	$.ajax({
		data: {websevicename: websevicename, username:usuario, password:password},
		url: 'http://redanahuac.mx/mobile/webservice/curl.php',
		dataType: 'jsonp',
		jsonp: 'callback',
		contentType: "application/json; charset=utf-8",
		success:function(data)
		{
            var html='<table border="0" style="width: 100%;">';
            html+='<tr>  <th>Tipo</th><th>Monto</th><th>Fecha</th>  </tr>';
            $.each(data, function(index1, capital){
                html+=
                    '<tr>'+
                    '	<td><div>'+capital.detTipoAdeudo+'</div></td>'+
                    '	<td><div>'+capital.detMonto+'</div></td>'+
                    '	<td><div>'+capital.detFecTran+'</div></td>'+
                	  '</tr>';
            });
            html+='</table>';
            $('#'+div_id).html(html);
		},
		error:function(){ alert("Error"); }
	});
}

function clickHandler_3(redirect) {
    
    console.log(redirect);
    app.mobileApp.navigate('components/studentCreditView/'+redirect+'.html');
}


app.studentCreditView = kendo.observable({
    onShow: function() { buildStudentCredit(); },
    afterShow: function() { }
});

// ----------------------------------------------
app.capitalHastaPlan = kendo.observable({
    onShow: function() { initCapitalHastaPlan(); },
    afterShow: function() { }
});

app.interesHastaPlan = kendo.observable({
    onShow: function() { initInteresHastaPlan(); },
    afterShow: function() { }
});

app.capitalPosteriorPlan = kendo.observable({
    onShow: function() { initCapitalPosteriorPlan(); },
    afterShow: function() { }
});

app.interesPosteriorPlan = kendo.observable({
    onShow: function() { initInteresPosteriorPlan(); },
    afterShow: function() { }
});
// ----------------------------------------------
