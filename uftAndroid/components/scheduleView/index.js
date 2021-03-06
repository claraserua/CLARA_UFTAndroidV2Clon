'use strict';

var month = new Array();
month[0] = "Enero";
month[1] = "Febrero";
month[2] = "Marzo";
month[3] = "Abril";
month[4] = "Mayo";
month[5] = "Junio";
month[6] = "Julio";
month[7] = "Agosto";
month[8] = "Septiembre";
month[9] = "Octubre";
month[10] = "Noviembre";
month[11] = "Diciembre";




function showDetail(idOption)
{
	$('#div_detalle_'+idOption).toggle();
      initscrollTop();
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



var H_today = '';
var H_to = '';
var H_calendar= false;


var H_date_Actual = '';


function Refresh_Shedule(){
    
    gateDayActual();
}

function H_showPrevius(){
    var customDay = new Date(H_date_Actual);
    customDay.setDate(customDay.getDate() - 7);
    getdayCalendar(customDay);
}
function H_showNext(){
    
    var customDay = new Date(H_date_Actual);
    customDay.setDate(customDay.getDate() + 7);
    //console.log('H_showNext() / H_date_Actual='+H_date_Actual+',  customDay='+format_YYYY_MM_DD(customDay));
    getdayCalendar(customDay);
}

function gateDayActual(){
    var today = new Date();               // dia actual.
    var monday = getMonday(today);        // lunes de la semana actual
    //var friday = getFriday(today);        // viernes de la semana actual
    var sunday = getSunday(today);        // domingo de la semana actual
    
    var dd = today.getDate();
    var mm = today.getMonth(); //January is 0!
    var yyyy = today.getFullYear();

    var descmes =  month[mm] +' '+yyyy;
    $('#desc_H_Fecha').html(descmes);
   
    
    H_today = format_YYYY_MM_DD(monday);
    H_to = format_YYYY_MM_DD(sunday);
    H_date_Actual = format_YYYY_MM_DD(today);

    numeracionXSemana(monday,H_today);
    buildScheduleOptions();
}



function getdayCalendar(customDay){
    var today = new Date(customDay);      // dia actual.
    var monday = getMonday(today);        // lunes de la semana actual
    //var friday = getFriday(today);        // viernes de la semana actual
    var sunday = getSunday(today);        // domingo de la semana actual LMWJVSD
    
    var dd = today.getDate();
    var mm = today.getMonth(); //January is 0!
    var yyyy = today.getFullYear();

    var descmes =  month[mm] +' '+yyyy;
    $('#desc_H_Fecha').html(descmes);
   
    
    H_today = format_YYYY_MM_DD(monday);
    H_to = format_YYYY_MM_DD(sunday);
    H_date_Actual = format_YYYY_MM_DD(today);

    numeracionXSemana(monday,H_today);
    buildScheduleOptions();
}

function convert_YYYYMMDD_to_DDMMYYYY(YYYYMMDD)
{
    var arr=YYYYMMDD.split('-');
    return arr[2]+'-'+arr[1]+'-'+arr[0];
}

function buildScheduleOptions()
{
	var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    
	var websevicename = 'schedule/'+usuario+'/'+H_today+'/'+H_to;
    var lastName = '';
    
    if(!checkConnection()){ showNotification('No hay Red disponible','Conexión'); return; }
    console.log('/'+H_today+'/'+H_to+'?');
    
    $('.km-loader').show();
    showScheduleView();
    
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
            var html = '<br/>';
			var counter=0;
            if(data==null || data.dates==null)
            {
                for (var i=0; i<ST_numDia.length; i++)
                    ST_numDia[i]=dias[i];
            }
            else
            {
                $('#load-content').remove();
                SV_initialice();
                
    			$.each(data.dates, function(index1, date)
    			{
    				if(date.courses.length==0)
    					return;
    				var fecha = new Date(date.date);
                    
                    html +=
    					'<div class="card-2">'+
                        '<div class="card-header"><span>'+diaDeLaSemana(date.date)+'</span><span class="item-after" style="float:right;">'+convert_YYYYMMDD_to_DDMMYYYY(date.date)+'</span></div> '+
                        '</div><div class="list-block media-list">'+
    					'<ul>';
    				$.each(date.courses, function(index2, course)
    				{
    					var html_instructors='';
    					
    					$.each(course.instructors, function(index3, instructor){
                            
                            if(instructor!=null && instructor.lastName!=null){
                                lastName = instructor.lastName.replace("*"," ");
        						html_instructors += ''+instructor.firstName+' '+lastName+', ';
                            }
    					});
    					
    					html+=
    						'<li class="swipeout">'+
                            '<div class="swipeout-content" style="padding:10px 15px !important;">'+
                            '<div class="item-inner">'+
                            '<div class="item-title-row">'+
                            '<div class="item-subtitle">'+course.title+' - '+course.description+'</div>'+
                            '<div class="item-after"></div>'+
                            '</div>'+
                            '<div class="item-after">Instructor: '+html_instructors+'</div>'+
                            '<div class="item-after">Horario: '+course.startTime.substring(0,5)+' - '+course.endTime.substring(0,5)+'</div>'+
                            '<div class="item-after">Lugar: '+course.location+'</div>'+
                            '</div></div>'+
    						'</li>';
    					counter++;
                        var arr = course.location.split('|');
                        var salon='';
                        if(arr!=null && 0<arr.length) salon=arr[1];
                        var tooltip =
                            '<div>'+
                            '  <a data-toggle="tooltip" class="red-tooltip" '+
                            '  title="'+course.title+' - '+course.description+' | Instructores: '+html_instructors+' | Horario: '+course.startTime.substring(0,5)+' - '+course.endTime.substring(0,5)+' | Lugar: '+course.location+'">'+course.title+'<br/>'+((salon === undefined) ? 'Sin salón' : salon)+'</a></div>'; // <br/><img src="resources/img/plus.png"/>
    					
                        SV_addCourse(date.date, course.startTime, course.endTime, tooltip, course);
    				});
    				html += '</ul>';
    				html += '</div>';
               		

                });
            }
                
            //if(counter!=0)
                SV_buildTable(counter);
                $('[data-toggle="tooltip"]').tooltip();  
            if(counter==0){
                 html =
                 '<div class="card">'+
                 '<div class="card-content">'+
                 '<div class="card-content-inner"><span class="item-blue-bold">NO TIENE HORARIOS DISPONIBLES.</span></div>'+
                 '</div>'+
                 '</div>'+
                 '';
                //$('#tbody_sched_id').html('<tr><td>'+html+'</td></tr>');
            }
			
			$('#div_horario').html(html);

			for(var i=0; i<counter; i++)
				$('#div_detalle_'+i).hide();
			
			
		},
		error:function(){
			 showNotification('Intentalo Nuevamente','Alerta');
		}
	});
}



function clickHandler_2(redirect) {
    app.mobileApp.navigate('components/'+redirect+'/view.html');
}

var divScheduleTable=true;

function toggleScheduleView(){
    divScheduleTable = ! divScheduleTable;
    showScheduleView();
}

function showScheduleView()
{
    initscrollTop();
    if(divScheduleTable){
        $('#div_horario').hide();
        $('#tbody_sched_id').show();
    }
    else{
        $('#div_horario').show();
        $('#tbody_sched_id').hide();
    }
}

app.scheduleView = kendo.observable({
    onShow: function() { if(H_calendar==false){ $('#tbody_sched_id').html(''); } },
    afterShow: function() { if(H_calendar==false){gateDayActual();} }
});

        
      
// START_CUSTOM_CODE_academicHistoryView
// END_CUSTOM_CODE_academicHistoryView
