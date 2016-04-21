
var _PCT_dias=["Lu","Ma","Mi","Ju","Vi","Sa"];
var _PCT_error = '';



function _PCT_parseHour(str_hour, am_pm)
{
	var arr = str_hour.split(':');
	var val = parseInt(arr[0]);
	if (val<12 && am_pm=="pm")
		val+=12;
	val += parseInt(arr[1])/60.0;
	return val;
}

function _PCT_initialice()
{
	var _schedule = [];
	for(var i=0; i<_PCT_dias.length; i++)
		_schedule[_PCT_dias[i]]=[];
    return _schedule;
}

function _PCT_duplicateSchedule(p_schedule)
{
    var _schedule = _PCT_initialice();
	for(var d=0; d<_PCT_dias.length; d++)
    {
		var coursesXday = p_schedule[_PCT_dias[d]];
		for(var k=0; k<coursesXday.length; k++)
		{
            var course = coursesXday[k];
            _schedule[_PCT_dias[d]].push(course);
        }
    }
    return _schedule;
}

function _PCT_searchCourseColor(title, p_schedule)
{
    var max=-1;
	for(var d=0; d<_PCT_dias.length; d++)
    {
		var courses = p_schedule[_PCT_dias[d]];
        for(var i=0; i<courses.length; i++)
        {
            if(courses[i].item_json.plCRN == title)
                return courses[i].indexColor;
            max=Math.max(max, courses[i].indexColor);
        }
    }
    return max+1;
}

function _PCT_buildTitle(course)
{
    var arrHoras = course.plHCre.split(',<BR>');
    return course.plTitu+' | Instructores: '+course.plNomD.replace("*"," ")+' | Horario: '+arrHoras.join();
}

function _PCT_addCourse(str_horario, element, p_schedule)
{
    var color = _PCT_searchCourseColor(element.plCRN, p_schedule);
    //console.log(element.plCRN+', color='+color);
    
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
    

    var title = _PCT_buildTitle(element);
	for(var j=0; j<array_hours.length; j++)
	{
		var arr = array_hours[j].split(' ');
		var course = {
			beginHour: _PCT_parseHour(arr[1],arr[2]),
			endHour: _PCT_parseHour(arr[4],arr[5]),
			rows: 0,
            item_json: element,
            indexColor: color,
            title: title,
		};
		course.rows = course.endHour - course.beginHour;
		var arr_days = arr[0].split(',');
		for(var i=0;i<arr_days.length; i++)
		{
			var day=arr_days[i];
            var array_courses = p_schedule[day];
            if(array_courses != null)
                array_courses.push(course);
		}
	}
}

//  ____________________________________________________________________________________________________

function _PCT_countPreviusOverlaps(index, arrayCourses)
{
    var count=0;
    var course = arrayCourses[index];
    for(var i=0; i<index; i++)
    {
        var item = arrayCourses[i];
        if (course.beginHour < item.endHour && item.beginHour < course.endHour)
            count++;
    }
    return count;
}

function _PCT_countTotalOverlaps(course, arrayCourses)
{
    var count=0;
    for(var i=0; i<arrayCourses.length; i++)
    {
        var item = arrayCourses[i];
        if (course.beginHour < item.endHour && item.beginHour < course.endHour)
            count++;
    }
    return count;
}

function buildHour24(num)
{
    var hour = Math.floor(num);
    if(hour<10) hour='0'+hour;
    var minute = Math.round((num % 1)*60);
    if(minute<10) minute='0'+minute;
    
    return hour + ':' + minute;
}

var __height=13;
function _PCT_buildTable(p_schedule)
{
    writeSchedule(p_schedule, 'cursos planeados');
    var html='';
    var __left=15;
    
    for(var d=0; d<_PCT_dias.length; d++)
    {
        var coursesXday = p_schedule[_PCT_dias[d]];
        
        // ________________ cuenta traslapes previos.
        var maxOverlaps=0;
        var coursesOverlaps=[];
        if (0 < coursesXday.length)
        {
            for(var c=0; c<coursesXday.length; c++)
            {
                coursesOverlaps[c] = {
                    totalOverlaps: _PCT_countTotalOverlaps(coursesXday[c], coursesXday) - 1,
                    previusOverlaps: _PCT_countPreviusOverlaps(c, coursesXday),
                };
                maxOverlaps = Math.max(maxOverlaps, coursesOverlaps[c].totalOverlaps);
            }
        }
        // ________________
        html += ' <div style="position: absolute; left: '+__left+'%; width: '+(17*(maxOverlaps+1))+'%; top: 0pt; height: 200pt;">  ';
        //console.log('('+_PCT_dias[d]+'), width='+(17*(maxOverlaps+1)));
        if(0<coursesXday.length)
        {
            for(var c=0; c<coursesXday.length; c++)
            {
                var course=coursesXday[c];
                var courseOverlap=coursesOverlaps[c];
                var top = 2*__height*(course.beginHour-7.00);
                var width = Math.round(100.0 / (courseOverlap.totalOverlaps+1.0));
                var height = 2*__height*course.rows;
                var left = width * courseOverlap.previusOverlaps;
                html +=
                    '<div class="sty_cell_'+course.indexColor+'" style="position: absolute; left: '+left+'%; top: '+top+'pt; width: '+width+'%; height: '+height+'pt; '+
                    'border: white solid 0px; border-top-width: 2px; text-align: center;" '+
                    'data-toggle="tooltip" title="'+course.title+'"> '+
                
                    '<div style="font-size:10pt;">'+course.item_json.plCrse+'</div>'+
                    //'<div style="font-size:6pt;">'+course.item_json.plTitu+'</div>'+
                    '<div style="font-size:8pt;">' + _PCT_dias[d] + ' ' + buildHour24(course.beginHour) + ' - ' + buildHour24(course.endHour) + '</div><br/>'+
                    '</div>';
                
                
                /*        
                var tooltip =
                            '<div>'+
                            '  <a data-toggle="tooltip" class="red-tooltip" '+
                            '  title="'+course.title+' - '+course.description+' | Instructores: '+html_instructors+' | Horario: '+course.startTime.substring(0,5)+' - '+course.endTime.substring(0,5)+' | Lugar: '+course.location+'">'+course.title+'<br/>'+salon+'   </a></div>'; // <br/><img src="resources/img/plus.png"/>
                */
                /*
                console.log(''+course.item_json.plCrse+', '+course.beginHour+', overlaps='+courseOverlap.totalOverlaps+
                    ', previus='+courseOverlap.previusOverlaps+', left='+left+'%, width='+width+'%, rows='+course.rows);
                //*/
            }
        }
        
        
        $('#div_separador_'+_PCT_dias[d]).css('left',__left+'%');
        $('#div_separador_'+_PCT_dias[d]).height((__height*32)+'pt');
        
        $('#div_header_day_'+_PCT_dias[d]).css('left',__left+'%');
        $('#div_header_day_'+_PCT_dias[d]).width(''+(17*(maxOverlaps+1))+'%');
        $('#div_header_day_'+_PCT_dias[d]).html(_PCT_dias[d]);
        
        // La siguiente columna se desplazara 17% veces segun cuantas columnas se generen (1 traslape genera 2 columnas, etc).
        __left += 17 * (1 + maxOverlaps);
        
        html += ' </div>';
    }
    //console.log('__left='+__left+'%');
    $('#div_bars_id').width(''+__left+'%');
    
    $('#div_courseTable').html(html);
    $('#div_courseTable').css('top',__height+'pt');
}

function _PCT_putBars(){
	var html='';
    
    html+='<div style="position: absolute; top: 0; left: 0; width: 100%; height: '+__height+'pt; background-color:#1e5799; "></div>';
	for(var i=0; i<31; i++)
	{
		html+='<div class="sty_line__'+(i%2)+'" style="top: '+((i+1)*__height)+'pt;"></div><br/>';
	}
    $('#div_bars_id').html(html);
    
    html='';
    for(var i=0; i<31; i++)
	{
        var hour=7+Math.floor(i/2);
        if(hour<10) hour='&nbsp;&nbsp;'+hour;
        var minute=(i%2==0)?'00':'30';
		html+='<div class="sty_line__'+(i%2)+'" style="top: '+((i+1)*__height)+'pt; height: '+__height+'pt; text-align: center; color:#666666; font-size:8pt;">'+hour+':'+minute+'</div>';
	}
    $('#div_hours_id').html(html);
}

