'use strict';

var PC_array_period=[]; // arreglo de periodos
var PC_current_index=0; // indice del periodo
var PC_max_courses=0;
var PC_id_periodo=0;
var PC_id_crn=0;
var PC_id_card = 0;

function CoursesPlaned()
{
	var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
	var websevicename = 'planeados/'+usuario;
    
    $('#courseplaneados').empty();
    $('#PC_next_arrow').hide();
    $('#PC_prev_arrow').hide();
    $('#div_term_CPperiodo').empty();
    
    if(!checkConnection()){ showNotification('No hay Red disponible','Conexión'); return; }
    
    
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
            PC_max_courses = data.length;             
            PC_current_index = 0;

            $('#load-content').remove();
            if(data.length != 0)
            {
                $('#table_overlap_id').hide();
                //ST_initialice();
                PC_array_period=[];
    			$.each(data, function(index, element)
    			{
                    
                    html +=
                     '<div class="card" id="PC_div_'+index+'">'+
                     '<div class="card-header"><span>'+element.plCRN+' '+element.plSubj+element.plCrse+' '+element.plTitu+'</span><a onclick="delete_favorit_CoursePC(\''+element.plCRN+'\',\''+element.plTerm+'\','+index+');"><span class="km-icon km-trash" style="float:right;"></span></a></div>'+
                     '<div class="card-content">'+
                     '<div class="card-content-inner"><div><span class="item-orange-bold">Instructor:</span><span class="item-after"> '+element.plNomD+'</span></div><div><span class="item-orange-bold">Horario:</span><span class="item-after"> '+element.plHCre+'</span></div></div>'+
                     '</div>'+
                     '<input type="hidden" id="PC_hidden_'+index+'" value="'+element.plTerD.trim()+'"> </div>'+
                     '';
                    PC_addPeriod(element.plTerD);
                  
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
                '<div class="card-content-inner"><span class="item-orange-bold">NO CUENTA CON CURSOS PLANEADOS.</span></div>'+
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
            }
			       
		
          
		},
		error:function(){
			 showNotification('Intentalo Nuevamente','Alerta');
		}
	});
   
}

function PC_searchCouseIndex(str_period){
    if(PC_array_period!=null)
        for(var i=0; i<PC_array_period.length; i++)
            if(PC_array_period[i]==str_period)
                return i;
    return -1;
}
function PC_addPeriod(str_period){
    str_period = str_period.trim();
    var index = PC_searchCouseIndex(str_period);
    if(index==-1){
        PC_array_period.push(str_period);
    }
    else{
       
    }
    
}
function PC_updateCourses()
{     
    initscrollTop();
    
    $('#div_term_CPperiodo').html(PC_array_period[PC_current_index]);
    var str_period = PC_array_period[PC_current_index];
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
  
   
    
    $('#PC_prev_arrow').show();
    $('#PC_next_arrow').show();
    if(PC_current_index==0)
        $('#PC_prev_arrow').hide();
    if(PC_current_index==PC_array_period.length-1)
        $('#PC_next_arrow').hide();
	
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
    var url = 'http://redanahuac.mx/mobile/webservice/curl.php';
    
    $.ajax({
     data: {websevicename: websevicename,username:usuario,password:password},
     url:url,
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


app.plannedCoursesView = kendo.observable({
    onShow: function() {        
        
        $('#courseplaneados').html(''); 
        $('#PC_next_arrow').hide();
        $('#PC_prev_arrow').hide();
        $('#div_term_CPperiodo').html('');
        
    
    },
    afterShow: function() {  CoursesPlaned(); }
});

// START_CUSTOM_CODE_plannedCoursesView
// END_CUSTOM_CODE_plannedCoursesView
