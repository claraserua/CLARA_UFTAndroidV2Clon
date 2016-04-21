'use strict';

var PC_array_period=[]; // arreglo de periodos
var PC_current_index=0; // indice del periodo
var PC_max_courses=0;
var PC_id_periodo=0;
var PC_id_crn=0;
var PC_id_card = 0;

var _PC_schedule = [];
var _PC_arr_schedule = [];

function PC_getDayActual(){
    var today = new Date();               // dia actual.
    var monday = getMonday(today);        // lunes de la semana actual
    var friday = getFriday(today);        // viernes de la semana actual
    
    var dd = today.getDate();
    var mm = today.getMonth(); //January is 0!
    var yyyy = today.getFullYear();
    
    var descmes =  month[mm] +' '+yyyy;
    $('#desc_H_Fecha').html(descmes);
    
    
    H_today = format_YYYY_MM_DD(monday);
    H_to = format_YYYY_MM_DD(friday);
    H_date_Actual = format_YYYY_MM_DD(today);

    numeracionXSemana(monday,H_today);
    CoursesPlaned();
}

function CoursesPlaned()
{
	var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
	var websevicename = 'planeados/'+usuario;
    
    $('#courseplaneados').empty();
    $('#PC_next_arrow').hide();
    $('#PC_prev_arrow').hide();
    $('#div_term_CPperiodo').empty();
    
    if(!checkConnection()) { showNotification('No hay Red disponible','Conexión'); return; }
    
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
            if(data==null)
                return;
            
    	    var html = '';
            PC_max_courses = data.length;
            PC_current_index = 0;

            $('#load-content').remove();
            if(data.length != 0)
            {
                _PC_schedule = _PCT_initialice();
                
                PC_array_period=[];
    			$.each(data, function(index, element)
    			{
                    html +=
                        '<div class="card" id="PC_div_'+index+'">'+
                        '<div class="card-header"><span>'+element.plCRN+' '+element.plSubj+element.plCrse+' '+element.plTitu+'</span><a onclick="delete_favorit_CoursePC(\''+element.plCRN+'\',\''+element.plTerm+'\','+index+');"><span class="km-icon km-trash" style="float:right;"></span></a></div>'+
                        '<div class="card-content">'+
                        '<div class="card-content-inner"><div><span class="item-blue-bold">Instructor:</span><span class="item-after"> '+element.plNomD+'</span></div><div><span class="item-orange-bold">Horario:</span><span class="item-after"> '+element.plHCre+'</span></div></div>'+
                        '</div>'+
                        '<input type="hidden" id="PC_hidden_'+index+'" value="'+element.plTerD.trim()+'"> </div>'+
                        '';
                    /**/
                    PC_addPeriod(element.plTerD);
                    
                    _PC_schedule = PC_array_period[ PC_searchPeriodIndex(element.plTerD) ].schedule;
                    _PCT_addCourse(element.plHCre, element, _PC_schedule);
                    //*/
    			});
                PC_current_index = PC_array_period.length-1;
                
                $('#courseplaneados').html(html); 
                PC_updateCourses();
            }
            else
            {
                html +=
                '<div class="card">'+
                '<div class="card-content">'+
                '<div class="card-content-inner"><span class="item-blue-bold">NO CUENTA CON CURSOS PLANEADOS.</span></div>'+
                '  <ul class="km-widget km-listview km-list">'+
                '    <li><a class="km-listview-link" data-role="listview-link" href="components/searchCoursesView/view.html"><img src="resources/img/icons/BusquedaCursos42x38.png" alt="Búsqueda de de Cursos" class="km-thumbnail"><span class="link-text-center">Búsqueda de Cursos</span></a></li>'+
                '</ul>'+
                '</div>'+
                '</div>'+
                '';

                $('#courseplaneados').html(html);
                $('#PC_next_arrow').hide();
                $('#PC_prev_arrow').hide();
                $('#div_term_CPperiodo').empty();
                
                PC_array_period=[];
                PC_updateCourses();
            }
            
            
		},
		error:function(){
			 showNotification('Intentalo Nuevamente','Alerta');
		}
	});
   
}

function PC_searchPeriodIndex(p_period){
    if(PC_array_period!=null)
        for(var i=0; i<PC_array_period.length; i++)
            if(PC_array_period[i].period == p_period)
                return i;
    return -1;
}
function PC_addPeriod(str_period){
    str_period = str_period.trim();
    var index = PC_searchPeriodIndex(str_period);
    if(index==-1){
        PC_array_period.push(
            {
                period: str_period,
                schedule: _PCT_initialice(),
            }
        );
    }
}
function PC_updateCourses()
{     
    initscrollTop();
    
    if(PC_array_period==null || PC_array_period.length==0)
    {
        $('#PC_prev_arrow').hide();
        $('#PC_next_arrow').hide();
        for(var d=0; d<5; d++)
        {
            $('#div_header_day_'+_PCT_dias[d]).css('left',(15+d*17)+'%');
            $('#div_header_day_'+_PCT_dias[d]).width('17%');
            $('#div_header_day_'+_PCT_dias[d]).html(_PCT_dias[d]);
        }
        return;
    }
    var str_period = PC_array_period[PC_current_index].period;
    $('#div_term_CPperiodo').html(str_period);
    console.log('periodo actual='+str_period);
    for(var i=0; i<PC_max_courses; i++)
    {
        if($('#PC_hidden_'+i).val() == str_period)
        {
            $('#PC_div_'+i).show();
        }
        else{
            $('#PC_div_'+i).hide();
        }
    }

    // --- flechas de paginacion
    $('#PC_prev_arrow').show();
    $('#PC_next_arrow').show();
    if(PC_array_period.length==0 || PC_current_index==0)
        $('#PC_prev_arrow').hide();
    if(PC_array_period.length==0 || PC_current_index==PC_array_period.length-1)
        $('#PC_next_arrow').hide();
	
    // Se selecciona el horario del periodo.
    _PC_schedule = PC_array_period[PC_current_index].schedule;
    
    _PCT_buildTable(_PC_schedule, false);
    $('[data-toggle="tooltip"]').tooltip();
    
    writeSchedule(_PC_schedule,'_PC_schedule add / '+str_period);
}

function PC_showPrevius(){
     if(0<PC_current_index){
        PC_current_index--;
        PC_updateCourses();
    }
}

function PC_showNext(){
     if(PC_current_index<PC_array_period.length-1){
        PC_current_index++;
        PC_updateCourses();
    }
   
}

function PC_deleteCourse(crn,periodo,index){
    
     PC_id_periodo=periodo;
     PC_id_crn=crn;
     PC_id_card = index;
    
    navigator.notification.confirm(
        'Se eliminara el curso planeado',  // message
        onConfirm_PC_DELETE,              // callback to invoke with index of button pressed
        'Eliminar',            // title
        'Cancelar,Aceptar'          // buttonLabels
    );
}

 // process the confirmation dialog result
    function onConfirm_PC_DELETE(buttonIndex) {
        //alert('You selected button ' + buttonIndex);
         
        if(buttonIndex==2){
        delete_favorit_Course();
         }
        
    }

function delete_favorit_CoursePC(crn,periodo,index){
    
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");

    var websevicename = 'favoritos/'+usuario+'/'+periodo+'/'+crn+'/DE';    
    
    $.ajax({
     data: {websevicename: websevicename,username:usuario,password:password},
     url: url_webservice,
     dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
     jsonp: 'callback',
     contentType: "application/json; charset=utf-8",
     success:function(data){
         // do stuff with json (in this case an array)
         $('#PC_div_'+index).remove();
         update

         //showNotification('El curso se elimino de sus cursos Planeados','Curso Eliminado')  
     },
     error:function(){         
       showNotification('Ocurrio un error!','Opps!')
     }      
     });
}

function PC_toggleScheduleView(){
    divScheduleTable = ! divScheduleTable;
    PC_showScheduleView();
}

function PC_showScheduleView()
{
    initscrollTop();
    if(divScheduleTable){
        $('#courseplaneados').hide();
        $('#div_vista_de_tabla').show();
    }
    else{
        $('#courseplaneados').show();
        $('#div_vista_de_tabla').hide();
    }
}



app.plannedCoursesView = kendo.observable({
    onShow: function() {
        
        $('#courseplaneados').html('');
        $('#PC_next_arrow').hide();
        $('#PC_prev_arrow').hide();
        $('#div_term_CPperiodo').html('');
        //$('#tbody_courses_id').html('');
        $('#div_courseTable').html('');
        _PCT_putBars();
        PC_showScheduleView();
    
    },
    afterShow: function() {  PC_getDayActual(); }
});

// START_CUSTOM_CODE_plannedCoursesView
// END_CUSTOM_CODE_plannedCoursesView
