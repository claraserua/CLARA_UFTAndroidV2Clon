'use strict';

var dias=["Lu","Ma","Mi","Ju","Vi"];
var _PC_error = '';

function _PC_parseHour(str_hour, am_pm)
{
	var arr = str_hour.split(':');
	var val = parseInt(arr[0]);
	if (val<12 && am_pm=="pm")
		val+=12;
	val += parseInt(arr[1])/60.0;
	return val;
}

function _PC_initialice()
{
	var _schedule = [];
	for(var i=0; i<dias.length; i++)
		_schedule[dias[i]]=[];
    return _schedule;
}

function duplicateSchedule(p_schedule)
{
    var _schedule = _PC_initialice();
	for(var d=0; d<dias.length; d++)
    {
		var coursesXday = p_schedule[dias[d]];
		for(var k=0; k<coursesXday.length; k++)
		{
            var course = coursesXday[k];
            _schedule[dias[d]].push(course);
        }
    }
    return _schedule;
}

function lookingOverlap(course, array_courses)
{
	for(var i=0; i<array_courses.length; i++)
    {
        var item = array_courses[i];
        if (course.beginHour < item.endHour && item.beginHour < course.endHour)
        {
            // regresa el indice del curso con el que se traslapa.
            return i;
        }
    }
    return -1;
}

function _PC_searchCourseColor(title, p_schedule)
{
    var max=-1;
	for(var d=0; d<dias.length; d++)
    {
		var courses = p_schedule[dias[d]];
        for(var i=0; i<courses.length; i++)
        {
            if(courses[i].item_json.plCRN == title)
                return courses[i].indexColor;
            max=Math.max(max, courses[i].indexColor);
        }
    }
    return max+1;
}

function _PC_addCourse(str_horario, element, p_schedule)
{
    var color = _PC_searchCourseColor(element.plCRN, p_schedule);
	var html='';
    
	var splited_hours = str_horario.split(',<BR>');
    var array_hours=[];
    // obtencion de horas NO duplicadas.
    for(var j=0; j<splited_hours.length; j++){
        var push_hour=true;
        for(var i=0; i<array_hours.length; i++)
            if(array_hours[i]==splited_hours[j]){
                push_hour=false;
                break;
            }
        if(push_hour){
            array_hours.push(splited_hours[j]);
        }
    }
    
	for(var j=0; j<array_hours.length; j++)
	{
		html+='j='+j+'<br/>';
		var arr = array_hours[j].split(' ');
		var course = {
			beginHour: _PC_parseHour(arr[1],arr[2]),
			endHour: _PC_parseHour(arr[4],arr[5]),
			rows: 0,
            item_json: element,
            indexColor: color,
            id_course: element.plCRN,
		};
		course.rows = Math.round(2.0*(course.endHour - course.beginHour));
		var arr_days = arr[0].split(',');
		for(var i=0;i<arr_days.length; i++)
		{
			var day=arr_days[i];
            var array_courses = p_schedule[day];
            array_courses.push(course);
		}
	}
}
//     for Search Courses / "results" and "detail"
function _PC_addCourse_forSetFavorit(str_horario, element, checkOverlap, p_schedule)
{
    var new_schedule = duplicateSchedule(p_schedule);
	var html='';
	var array_hours = str_horario.split(',<BR>');
	for(var j=0; j<array_hours.length; j++)
	{
		html+='j='+j+'<br/>';
		var arr = array_hours[j].split(' ');
		var course = {
			beginHour: _PC_parseHour(arr[1],arr[2]),
			endHour: _PC_parseHour(arr[4],arr[5]),
			rows: 0,
			item_json: element,
            id_course: element.vsCrn,
			};
		course.rows = Math.round(2.0*(course.endHour - course.beginHour));
		var arr_days = arr[0].split(',');
		for(var i=0;i<arr_days.length; i++)
		{
			var day=arr_days[i];
            var array_courses = new_schedule[day];
            if(array_courses==null){
                //console.log('No hay cursos en el dia con clave:'+day);
                return;
            }
            if(checkOverlap)
            {
                var index = lookingOverlap(course, array_courses);
                // Si encontro traslape en el curso... manda una alerta.
                if (0 <= index)
                {
                    var item=array_courses[index].item_json;
                    var item_courseName;
                    var item_horario;
                    if(item.plTitu != null){
                        item_courseName = item.plTitu;
                        item_horario = item.plHCre;
                    }
                    else{
                        item_courseName = item.vsTitulo;
                        item_horario = item.vsHorarioFormato;
                    }
                    
                    _PC_error = 
                        "No es posible agregar el curso\n" +
                        course.item_json.vsTitulo + "\n" +
                        "( " + course.item_json.vsHorarioFormato + " )\n" +
                        "porque se traslapa con el curso \n" +
                        item_courseName + "\n" +
                        "( " + item_horario + " )"
                        ;
                    
                    return null;
                }
                else{
        			array_courses.push(course);
                }
            }
            else{
                array_courses.push(course);
            }
		}
	}
    return new_schedule;
}
/**/
function _PC_deleteCourse_forSetFavorit(item_json, p_schedule)
{
	for(var d=0; d<dias.length; d++)
    {
		var courses = p_schedule[dias[d]];
        for(var i=0; i<courses.length; i++)
        {
            if(courses[i].id_course == item_json.vsCrn)
            {
                delete courses[i];
                courses.splice(i,1);
                i--;
            }
        }
    }
}
//*/
function _PC_buildTable(p_schedule, onlySimpleTable)
{
    initscrollTop();
	var hours=[];
	for(var i=7; i<=23; i++)
        for(var j=0; j<2; j++)
    		hours.push(i+j/2.0);
	
    // --- cabacera del horario (dias) ---
	var html='';
	html+='<tr class="sty_sched_header"><td style="width:14%; ">Hora</td>';
	for(var i=0; i<dias.length; i++)
		html+='<td style="width:16%; ">'+ST_numDia[i]+'</td>';
	html+='</td>';
	// --- construccion de todas las celdas de la tabla, incluyendo la columna de horas ---
	for(var j=0; j<hours.length-1; j++)
    {
        var style = (j%2==0?'sty_line_1':'sty_line_2');
		html+='<tr class="'+style+'">';
        html+='<td class="sty_cell_hour">'+Math.floor(7+j/2)+':'+(j%2==0?'00':'30')+'</td>';
		for(var i=0; i<dias.length; i++)
            html+='<td class="'+style+'">&nbsp;</td>';
		html+='</tr>';
	}
	$('#tbody_courses_id').html(html);
	
    if(onlySimpleTable)
        return;
    
    // --- combinado de celdas para cada curso ---
	var tbody = document.getElementById("tbody_courses_id");
	for(var d=dias.length-1; d>=0; d--)
	{
		var coursesXday = p_schedule[dias[d]];
		for(var k=0; k<coursesXday.length; k++)
		{
			var course = coursesXday[k];
			// Se busca la hora
			for(var h=0; h<hours.length; h++)
			{
				if(hours[h] == course.beginHour)
				{
					for(var y=h+2; y<=h+course.rows; y++)
                    {
						tbody.rows[y].deleteCell(d+1);
					}
                    
                    var tooltip =
                        '<div>'+
                        '  <a data-toggle="tooltip" class="red-tooltip" '+
                        '  title="'+course.item_json.plCRN+' - '+course.item_json.plTitu+' | Instructores: '+course.item_json.plNomD.replace("*"," ")+' | Horario: '+course.item_json.plHCre+'">'+course.item_json.plCRN+'</a></div>';
                    
					var content=tbody.rows[h+1].cells[1+d];
					content.tag=course;
					content.className='sty_cell_'+(course.indexColor%15); // de 0 a 14 
					content.innerHTML=tooltip;
					content.rowSpan=course.rows;
					break;
				}
			}
		}
	}
}

/*
function _PC_buildTable(curseCounter, p_schedule)
{
	var hours=[];
	for(var i=7.0; i<=22.0001; i+=0.5)
		hours.push(i)
	
	var html='';
	html+='<tr><td style="width:14%; ">Hora</td>';
	for(var i=0; i<dias.length; i++)
		html+='<td style="width:16%;">'+dias[i]+'</td>';
	html+='</td>';
	
	for(var j=0; j<hours.length-1; j++)
    {
        var style = (j%2==0?'sty_line_1':'sty_line_2');
		html+='<tr class="'+style+'">';
        html+='<td>'+Math.floor(7+j/2)+':'+(j%2==0?'00':'30')+'</td>';
		for(var i=0; i<dias.length; i++)
            html+='<td class="'+style+'">&nbsp;</td>';
		html+='</tr>';
	}
	
	$('#tbody_courses_id').html(html);
	
	var tbody = document.getElementById("tbody_courses_id");
	for(var d=dias.length-1; d>=0; d--)
	{
		var coursesXday = p_schedule[dias[d]];
		for(var k=0; k<coursesXday.length; k++)
		{
			var course = coursesXday[k];
			// Se busca la hora
			for(var h=0; h<hours.length; h++)
			{
				if(hours[h] == course.beginHour)
				{
					for(var y=h+2; y<=h+course.rows; y++)
						tbody.rows[y].deleteCell(d+1);
					var content=tbody.rows[h+1].cells[1+d];
					content.tag=course;
					content.className='sty_cell_0';
                        //'<div class="card-header"><span>'+element.plCRN+' '+element.plSubj+element.plCrse+' '+element.plTitu+'</span><a onclick="delete_favorit_CoursePC(\''+element.plCRN+'\',\''+element.plTerm+'\','+index+');"><span class="km-icon km-trash" style="float:right;"></span></a></div>'+
					content.innerHTML='<div>'+course.data.plCRN+' '+course.data.plCrse+'</div>';
					content.rowSpan=course.rows;
					break;
				}
			}
		}
	}
}
//*/

function decimalToHour(num)
{
    var hour = Math.trunc(num);
    var minute = ((num % 1)*60).toFixed();
    return (hour<10 ? '0' : '') + hour + ':' + ((minute<10 ? '0' : '') + minute);
}
function writeSchedule(p_schedule, title)
{
    /*
    console.log('____________ '+title+' ____________');
    if(p_schedule == null)
        console.log('(schedule=null)');
    else
    	for(var d=0; d<dias.length; d++)
        {
    		var coursesXday = p_schedule[dias[d]];
            var str='';
    		for(var k=0; k<coursesXday.length; k++)
    		{
                var course = coursesXday[k];
                if(k>0) str += ',  ';
                
                //var curso = course.item_json.plCrse;             // desde cursos planeados
                var curso = course.item_json.plCRN;             // desde cursos planeados
                if(curso==null) curso = course.item_json.vsCrse; // desde cursos (result)
                if(curso==null) curso = course.item_json.vsCrse; // desde detalle de curso
                str += ''+curso+',[' + decimalToHour(course.beginHour) + '-' + decimalToHour(course.endHour) + ']';
            }
            console.log(''+dias[d]+'-> '+str);
        }
    //*/
}



