'use strict';

app.resultsView = kendo.observable({
    onShow: function() { },
    afterShow: function() { getCursosfound(); }
});

// START_CUSTOM_CODE_perfilView


var SC_titulo ='';
var SC_instructor ='';
var SC_periodo ='';
var SC_campus ='';
var SC_atributos ='';
var SC_dias ='';
var SC_hora ='';
var SC_minuto ='';
var SC_time ='';
var SC_desc_periodo ='';
var SC_carrera ='';
var SC_busqueda = true;


function Cursos_search_back(){
    
     app.mobileApp.navigate('components/searchCoursesView/view.html');
}

function setCursosfound_SC(titulo,instructor,periodo,campus,atributos,dias,hora,minuto,time,desc_periodo,carrera){
    
    SC_titulo = titulo;
    SC_instructor = instructor;
    SC_periodo = periodo;
    SC_campus = campus;
    SC_atributos = atributos;
    SC_dias = dias;
    SC_hora = hora;
    SC_minuto = minuto;
    SC_time = time;
    SC_desc_periodo = desc_periodo;
    SC_carrera = carrera;
    SC_busqueda = true;
    
    $('#resultados_SC').empty();
    
}

function RefreshCursosfound(){
    SC_busqueda=true;
    getCursosfound();
}


function getCursosfound()
{
    initscrollTop();
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
   
    SC_titulo = encodeURIComponent(SC_titulo);
    SC_instructor = encodeURIComponent(SC_instructor);
    
    var websevicename = 'curso/'+usuario+'/'+SC_periodo+'/'+SC_campus+'/'+SC_dias+'/'+SC_hora+'/'+SC_minuto+'/'+SC_time+'/'+SC_instructor+'/'+SC_titulo+'/'+SC_atributos+'/'+SC_carrera;
    //console.log('>>websevicename = '+websevicename);
    if(SC_busqueda==false)
       return;
    
    if(!checkConnection()){ showNotification('No hay Red disponible','Conexión'); return; }
    
    
    $('.km-loader').show();
    $('#resultados_SC').empty();
    $('#RC_csc').html('0');
    $('#r387periodo').html(SC_desc_periodo);
    $('#res-uni').html(SC_campus);
    
    /*
    $.ajax({
		data: {websevicename: 'planeados/'+usuario, username:usuario, password:password},
		url: url_webservice,
		dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
		jsonp: 'callback',
		contentType: "application/json; charset=utf-8",
        complete:function(data){
         	$('.km-loader').hide();
        },
		success:function(data)
		{
            
            //if (data.length != 0)
            {
                // Se construyen los horarios de todos los periodos.
                PC_array_period=[];
    			$.each(data, function(index, element)
    			{
                    PC_addPeriod(element.plTerD);
                    // primero se obtiene el horario del periodo.
                    _PC_schedule = PC_array_period[ PC_searchPeriodIndex(element.plTerD) ].schedule;
                    // se agrega el curso al periodo.
                    _PC_addCourse(element.plHCre, element, _PC_schedule);
    			});
                // Aqui se busca el horario del periodo seleccionado.
                _PC_schedule=null;
                for(var i=0; i<PC_array_period.length; i++)
                    if(PC_array_period[i].period == SC_desc_periodo){
                        _PC_schedule = PC_array_period[i].schedule;
                        break;
                    }
                // Si no se encontro un horario, se inicializa uno
                if(_PC_schedule==null)
                    _PC_schedule = _PC_initialice();
                */
                
                // _____________________________________ CURSOS ENCONTRADOS _____________________________________
                $.ajax({
                    data: {websevicename: websevicename,username:usuario,password:password},
                    url: url_webservice,
                    dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
                    jsonp: 'callback',
                    contentType: "application/json; charset=utf-8",
                    complete:function(data){
                        $('.km-loader').hide(); 
                        //$("body").scrollTop(0);
                    },
                    success:function(data){
                        if(data==null){
                            $('#resultados_SC').html('<div>Error consultado datos, vuelva a intentarlo.</div>');
                        }
                        else{
                            // do stuff with json (in this case an array)
                            $('#RC_csc').html(data.length);

                            var html='<div class="list-block media-list"><ul>';
                            var stylefavorit = '';
                            var iconfavorit = '';

                            if(data.length!=0)
                            {
                                $.each(data, function(index, element)
                                {
                                    //console.log(''+element.vsCrn+'_'+element.vsSubj+element.vsCrse+'_'+element.vsTitulo+', ' + element.vsEsFavo);
                                    if(element.vsEsFavo=="S"){
                                        stylefavorit = 'style="color:#F7881C !important;"';
                                        iconfavorit = '<img src="resources/img/favorit.png"/> ';
                                    }else{
                                        stylefavorit = '';
                                        iconfavorit = '';
                                    }

                                    html +=
                                        '<li class="swipeout">'+
                                        '<div class="swipeout-content"><a class="item-link item-content" onclick="getDetalleCurso(\''+element.vsCrn+'\',\''+element.vsPeriodo+'\')">'+
                                        '<div class="item-inner">'+
                                        '<div class="item-title-row">'+
                                        '<div class="item-subtitle"><span '+stylefavorit+' id="cvs-'+element.vsCrn+'">'+element.vsCrn+' '+element.vsSubj+element.vsCrse+' '+element.vsTitulo+'</span></div>'+
                                        '</div>'+    
                                        '<div class="item-after">Instructor: '+element.vsNomDocente +'</div>'+
                                        '<div class="item-after">Horario: '+element.vsHorarioFormato +'<span id="if-'+element.vsCrn+'" style="float:right;">'+iconfavorit+'<span></div>'+
                                        '</div></a></div>'+
                                        '</li>'+
                                        '';

                                });
                              
                                html += '</ul></div>';
                            }else{
                                html =
                                     '<div class="card">'+
                                     '<div class="card-content">'+
                                     '<div class="card-content-inner"><span class="item-orange-bold">NO SE ENCONTRARON CURSOS.</span></div>'+
                                     '</div>'+
                                     '</div>'+
                                     '';
                                     
                            }
                            $('#resultados_SC').html(html);
                        }
                    },
                    error:function()
                    {
                        showNotification('Intentalo Nuevamente','Alerta');
                    }
                }); // FIN AJAX
    
    /*
            }
        }
    });// FIN AJAX
    //*/
}



// END_CUSTOM_CODE_perfilView
