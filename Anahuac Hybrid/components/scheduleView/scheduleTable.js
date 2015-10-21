var schedule;
var dias=["Lu","Ma","Mi","Ju","Vi"];

function SV_initialice()
{
	schedule = [];
	for(var i=0; i<dias.length; i++)
		schedule[dias[i]]=[];
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

	return eval("dia_" + fecha.getDay());
}
function SV_addCourse(fecha, hour_1, hour_2, data)
{
	var course = {
		beginHour: SV_parseHour24(hour_1),
		endHour: SV_parseHour24(hour_2),
		rows: 0,
		data: data,
	};
	course.rows = Math.round(2.0*(course.endHour - course.beginHour));
	var day = diaDeLaSemana_XX(fecha);
	schedule[day].push(course);
}

function SV_buildTable()
{
	var hours=[];
	for(var i=7.0; i<=22.0001; i+=0.5)
		hours.push(i)
	
	var html='';
	html+='<tr><td style="width:14%; ">Hora</td>';
	for(var i=0; i<dias.length; i++)
		html+='<td style="width:16%;">'+dias[i]+'</td>';
	html+='</td>';
	
	var string=['A','B','C','D','E'];
	for(var j=0; j<hours.length-1; j++)
    {
        var style = (j%2==0?'sty_line_1':'sty_line_2');
		html+='<tr class="'+style+'">';
        html+='<td>'+Math.floor(7+j/2)+':'+(j%2==0?'00':'30')+'</td>';
		for(var i=0; i<dias.length; i++)
            html+='<td class="'+style+'">&nbsp;</td>';
		html+='</tr>';
	}
	
	$('#tbody_sched_id').html(html);
	
	var tbody = document.getElementById("tbody_sched_id");
	for(var d=dias.length-1; d>=0; d--)
	{
		var coursesXday = schedule[dias[d]];
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
					content.className='sty_cell';
					content.innerHTML='<div>'+course.data+'</div>';
					content.rowSpan=course.rows;
					break;
				}
			}
		}
	}
}

