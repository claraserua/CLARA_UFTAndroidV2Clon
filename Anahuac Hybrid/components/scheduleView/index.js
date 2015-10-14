'use strict';


function showDetail(idOption)
{
	$('#div_detalle_'+idOption).toggle();
}

function diaDeLaSemana(date_yyyymmdd){
	var arr = date_yyyymmdd.split("-");
	var fecha = new Date(arr[0],-1+parseInt(arr[1]),arr[2], 0,0,0,0);

	var dia_0 = "Domingo";
	var dia_1 = "Lunes";
	var dia_2 = "Martes";
	var dia_3 = "Mi&eacute;rcoles";
	var dia_4 = "Jueves";
	var dia_5 = "Viernes";
	var dia_6 = "S&aacute;bado";

	return eval("dia_" + fecha.getDay());
}

function buildScheduleOptions()
{
	var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
	var websevicename = 'schedule/'+usuario+'/2015-10-02/2015-10-09';
    
    var lastName = '';
    
	$.ajax({
		data: {websevicename: websevicename, username:usuario, password:password},
		url: 'http://redanahuac.mx/mobile/webservice/curl.php',
		dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
		jsonp: 'callback',
		contentType: "application/json; charset=utf-8",
		success:function(data)
		{
            
            var html = '';		
			var counter=0;
            $('#load-content').remove();
    
			$.each(data.dates, function(index1, date)
			{
             
				if(date.courses.length==0)
                  
					return;
				var fecha = new Date(date.date);
				
                
                html +=
					'<div class="card-2">'+
                    '<div class="card-header"><span>'+diaDeLaSemana(date.date)+'</span><span class="item-after">'+date.date+'</span></div> '+
                    '</div><div class="list-block media-list">'+
					'<ul>';
				$.each(date.courses, function(index2, course)
				{
					var html_instructors='';
					
					$.each(course.instructors, function(index3, instructor){
                        lastName = instructor.lastName.replace("*"," ");
						html_instructors += ''+instructor.firstName+' '+lastName+'<br/>';
					});
					
					html+=
						'<li class="swipeout">'+
                        '<div class="swipeout-content" style="padding:10px 15px !important;"><a class="item-link item-content" onclick="javascript:showDetail('+counter+');">'+
                        '<div class="item-inner">'+
                        '<div class="item-title-row">'+
                        '<div class="item-subtitle">'+course.title+' - '+course.description+'</div>'+
                        '<div class="item-after"></div>'+
                        '</div>'+
                        '<div class="item-title">Lugar: '+course.location+'</div>'+
                        '<div class="item-title">Horario: '+course.startTime+' - '+course.endTime+'</div>'+
                        '<div class="item-title" id="div_detalle_'+counter+'">Profesor:'+html_instructors+'</div>'+
                        '</div></a></div>'+
						'</li>';
						counter++;
						//console.log('counter='+counter);
				});
				html += '</ul>';
				html += '</div>';
           
            });
            
            if(counter==0){
                 html =
                 '<div class="card">'+
                 '<div class="card-content">'+
                 '<div class="card-content-inner"><span class="item-orange-bold">NO TIENE HORARIOS DISPONIBLES.</span></div>'+
                 '</div>'+
                 '</div>'+
                 '';
            }
			
			$('#div_horario').html(html);

			for(var i=0; i<counter; i++)
				$('#div_detalle_'+i).hide();
			
			//*/
		},
		error:function(){
			alert("Error");
		}
	});
}

function clickHandler_2(redirect) {
    console.log('scheduleView / clickHandler      before');
    app.mobileApp.navigate('components/'+redirect+'/view.html');
    console.log('scheduleView / clickHandler      after');
}

app.scheduleView = kendo.observable({
    onShow: function() { buildScheduleOptions(); },
    afterShow: function() {  }
});

// START_CUSTOM_CODE_academicHistoryView
// END_CUSTOM_CODE_academicHistoryView
