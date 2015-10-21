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
    var today = new Date();
    var to = new Date();
    to.setDate(today.getDate() + 5);
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
    dd='0'+dd;
    } 

    if(mm<10) {
    mm='0'+mm;
    }
    
    var ddto = to.getDate();
    var mmto = to.getMonth()+1; //January is 0!
    var yyyyto = to.getFullYear();

    if(ddto<10) {
    ddto='0'+ddto;
    } 

    if(mmto<10) {
    mmto='0'+mmto;
    }
    
    today = yyyy+'-'+mm+'-'+dd;
    to = yyyyto+'-'+mmto+'-'+ddto;
    
	var websevicename = 'schedule/'+usuario+'/'+today+'/'+to;
    
    var lastName = '';
    $('.km-loader').show();
    showScheduleView();
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
            var count_sch=0;
            ST_initialice();
            
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
                        
                        if(instructor!=null && instructor.lastName!=null){
                        lastName = instructor.lastName.replace("*"," ");
						html_instructors += ''+instructor.firstName+' '+lastName+'<br/>';
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
					
                    ST_addCourse2(date.date, course.startTime, course.endTime, course.title);
				});
				html += '</ul>';
				html += '</div>';
           		

            });
            /**/
            if(counter!=0)
                ST_buildTable(schedule);
            //*/
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


function buildScheduleOptionsCalendar(today)
{
	var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    var today = new Date(today);
    var to = new Date();
    to.setDate(today.getDate() + 5);
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
    dd='0'+dd;
    } 

    if(mm<10) {
    mm='0'+mm;
    }
    
    var ddto = to.getDate();
    var mmto = to.getMonth()+1; //January is 0!
    var yyyyto = to.getFullYear();

    if(ddto<10) {
    ddto='0'+ddto;
    } 

    if(mmto<10) {
    mmto='0'+mmto;
    }
    
    today = yyyy+'-'+mm+'-'+dd;
    to = yyyyto+'-'+mmto+'-'+ddto;
    
	var websevicename = 'schedule/'+usuario+'/'+today+'/'+to;
    
    $('#div_horario').empty();
    var lastName = '';
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
            
            var html = '';		
			var counter=0;
            $('#load-content').remove();
            
            if(data.length==0)
                return;
    
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
                        
                        if(instructor!=null && instructor.lastName!=null){
                        lastName = instructor.lastName.replace("*"," ");
						html_instructors += ''+instructor.firstName+' '+lastName+'<br/>';
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
    
    app.mobileApp.navigate('components/'+redirect+'/view.html');
    
}


var divScheduleTable=true;
function toogleScheduleView(){
    divScheduleTable = ! divScheduleTable;
    showScheduleView();
}
function showScheduleView()
{
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
    onShow: function() { buildScheduleOptions(); },
    afterShow: function() { 
       /*
       $('#dp3').datepicker({
           "setDate": new Date(),
           autoclose: true,
           todayHighlight: true,
           orientation: "bottom left",
                     }); 
        
       
        
       $('#date-daily').change(function () {
       
           buildScheduleOptionsCalendar($('#date-daily').val());
    });
        //*/
    }
});

// START_CUSTOM_CODE_academicHistoryView
// END_CUSTOM_CODE_academicHistoryView
