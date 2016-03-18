var schedule;
var _7_dias=["Lu","Ma","Mi","Ju","Vi","Sa","Do"];
var _6_dias=["Lu","Ma","Mi","Ju","Vi","Sa"];
var ST_numDia=['_','_','_','_','_'];

function SV_initialice()
{
	schedule = [];
	for(var i=0; i<_7_dias.length; i++)
		schedule[_7_dias[i]]=[];
}

function SV_parseHour24(str_hour){
	var arr = str_hour.split(':');
	var val = parseInt(arr[0]);
	val += parseInt(arr[1])/60.0;
	return val;
}

function diaDeLaSemana_XX(date_yyyymmdd){
	var arr = date_yyyymmdd.split("-");
	var fecha = new Date(arr[0],-1+parseInt(arr[1]),arr[2], 0,0,0,0);

	var dia_0 = "Do";
	var dia_1 = "Lu";
	var dia_2 = "Ma";
	var dia_3 = "Mi";
	var dia_4 = "Ju";
	var dia_5 = "Vi";
	var dia_6 = "Sa";
	var dia_7 = "do";

	return eval("dia_" + fecha.getDay());
}

function SV_searchCourseColor(title)
{
    var max=-1;
	for(var d=0; d<_7_dias.length; d++)
    {
		var courses = schedule[_7_dias[d]];
        for(var i=0; i<courses.length; i++)
        {
            if(courses[i].item_json.title == title)
                return courses[i].indexColor;
            max=Math.max(max, courses[i].indexColor);
        }
    }
    return max+1;
}

function SV_addCourse(fecha, hour_1, hour_2, tooltip, item_json)
{
    var color=SV_searchCourseColor(item_json.title);
	var course = {
		beginHour: SV_parseHour24(hour_1),
		endHour: SV_parseHour24(hour_2),
		rows: 0,
		tooltip: tooltip,
        item_json: item_json,
        indexColor: color,
	};
	course.rows = Math.round(2.0*(course.endHour - course.beginHour));
	var day = diaDeLaSemana_XX(fecha);
	schedule[day].push(course);
}

function SV_buildTable(curseCounter)
{
    initscrollTop();
	var hours=[];
	for(var i=7.0; i<=22.0001; i+=0.5)
		hours.push(i)
	
	var html='';
	html+='<tr class="sty_sched_header"><td style="width:10%; ">Hora</td>';
	for(var i=0; i<_6_dias.length; i++)
		html+='<td style="width:15%; ">'+ST_numDia[i]+'</td>';
	html+='</td>';
	
	var string=['A','B','C','D','E'];
	for(var j=0; j<hours.length-1; j++)
    {
        var style = (j%2==0?'sty_line_1':'sty_line_2');
		html+='<tr class="'+style+'">';
        html+='<td class="sty_cell_hour">'+Math.floor(7+j/2)+':'+(j%2==0?'00':'30')+'</td>';
		for(var i=0; i<_6_dias.length; i++)
            html+='<td class="'+style+'">&nbsp;</td>';
            //html+='<td></td>';
		html+='</tr>';
	}
	
	$('#tbody_sched_id').html(html);
	if(curseCounter==0)
        return;
	var tbody = document.getElementById("tbody_sched_id");
	for(var d=_6_dias.length-1; d>=0; d--)
	{
		var coursesXday = schedule[_6_dias[d]];
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
                        //if(d+1<tbody.rows[y].cells.length)
						   tbody.rows[y].deleteCell(d+1);
					}
                   
					var content=tbody.rows[h+1].cells[1+d];
					content.tag=course;
					content.className='sty_cell_'+(course.indexColor%15); // de 0 a 14 
					content.innerHTML=course.tooltip;
					content.rowSpan=course.rows;
					break;
				}
			}
		}
	}
}

function format_YYYY_MM_DD(date)
{
    var dd = date.getDate();
    var mm = date.getMonth()+1; //January is 0!
    var yyyy = date.getFullYear();
    
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    return yyyy+'-'+mm+'-'+dd;
}

function numeracionXSemana(day, yyyy_mm_dd){
    var diaSemana = diaDeLaSemana_XX(yyyy_mm_dd);
    var diasHastaLunes=0;
    switch(diaSemana){
        case 'Lu': diasHastaLunes=0; break;
        case 'Ma': diasHastaLunes=1; break;
        case 'Mi': diasHastaLunes=2; break;
        case 'Ju': diasHastaLunes=3; break;
        case 'Vi': diasHastaLunes=4; break;
        case 'Sa': diasHastaLunes=5; break;
        case 'Do': diasHastaLunes=6; break;
    }
    // Recorremos desde el lunes hasta el viernes
    ST_numDia=[];
    for(var i=0; i<_6_dias.length; i++)
    {
        var numDia = new Date(day);
        numDia.setDate(day.getDate()-diasHastaLunes+i);
        ST_numDia.push(_6_dias[i]+' '+numDia.getDate());
    }
}

function getMonday(day){
    var yyyy_mm_dd = format_YYYY_MM_DD(day);
    var diaSemana = diaDeLaSemana_XX(yyyy_mm_dd);
    var diasHastaLunes=0;
    switch(diaSemana){
        case 'Lu': diasHastaLunes=0; break;
        case 'Ma': diasHastaLunes=1; break;
        case 'Mi': diasHastaLunes=2; break;
        case 'Ju': diasHastaLunes=3; break;
        case 'Vi': diasHastaLunes=4; break;
        case 'Sa': diasHastaLunes=5; break;
        case 'Do': diasHastaLunes=6; break;
    }
    // Recorremos desde el lunes hasta el viernes
    var monday = new Date(day);
    monday.setDate(day.getDate()-diasHastaLunes);
    return monday;
}

function getFriday(day){
    var yyyy_mm_dd = format_YYYY_MM_DD(day);
    var diaSemana = diaDeLaSemana_XX(yyyy_mm_dd);
    var diasHastaLunes=0;
    switch(diaSemana){
        case 'Lu': diasHastaLunes=0; break;
        case 'Ma': diasHastaLunes=1; break;
        case 'Mi': diasHastaLunes=2; break;
        case 'Ju': diasHastaLunes=3; break;
        case 'Vi': diasHastaLunes=4; break;
        case 'Sa': diasHastaLunes=5; break;
        case 'Do': diasHastaLunes=6; break;
    }
    // Recorremos desde el lunes hasta el viernes
    var friday = new Date(day);
    friday.setDate(day.getDate() - diasHastaLunes + 4);
    return friday;
}

function getSunday(day){
    var yyyy_mm_dd = format_YYYY_MM_DD(day);
    var diaSemana = diaDeLaSemana_XX(yyyy_mm_dd);
    var diasHastaLunes=0;
    switch(diaSemana){
        case 'Lu': diasHastaLunes=0; break;
        case 'Ma': diasHastaLunes=1; break;
        case 'Mi': diasHastaLunes=2; break;
        case 'Ju': diasHastaLunes=3; break;
        case 'Vi': diasHastaLunes=4; break;
        case 'Sa': diasHastaLunes=5; break;
        case 'Do': diasHastaLunes=6; break;
    }
    // Recorremos desde el lunes hasta el viernes
    var sunday = new Date(day);
    sunday.setDate(day.getDate() - diasHastaLunes + 6);
    return sunday;
}

