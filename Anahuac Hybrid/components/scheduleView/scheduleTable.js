var schedule;
var dias=["Lu","Ma","Mi","Ju","Vi"];
var ST_numDia=['_','_','_','_','_'];

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
		html+='<td style="width:16%;">'+ST_numDia[i]+'</td>';
	html+='</td>';
	
	var string=['A','B','C','D','E'];
	for(var j=0; j<hours.length-1; j++)
    {
        var style = (j%2==0?'sty_line_1':'sty_line_2');
		html+='<tr class="'+style+'">';
        html+='<td>'+Math.floor(7+j/2)+':'+(j%2==0?'00':'30')+'</td>';
		for(var i=0; i<dias.length; i++)
            html+='<td class="'+style+'"><div>. </div></td>';
            //html+='<td></td>';
		html+='</tr>';
	}
	
	$('#tbody_sched_id').html(html);
	
    console.log("-----------------------------");
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
                    {
                        //if(d+1<tbody.rows[y].cells.length)
						   tbody.rows[y].deleteCell(d+1);
					}
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
    for(var i=0; i<5; i++)
    {
        
        var numDia = new Date(day);
        numDia.setDate(day.getDate()-diasHastaLunes+i);
        ST_numDia.push(dias[i]+'-'+numDia.getDate());
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
    friday.setDate(day.getDate()-(diasHastaLunes-4));
    return friday;
}

