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
var SC_busqueda = true;


function Cursos_search_back(){
    
     app.mobileApp.navigate('components/searchCoursesView/view.html');
}

function setCursosfound_SC(titulo,instructor,periodo,campus,atributos,dias,hora,minuto,time,desc_periodo){
    
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
    SC_busqueda = true;
    
    $('#resultados_SC').empty();
    
}

function RefreshCursosfound(){
    SC_busqueda=true;
    getCursosfound();
}


function getCursosfound(){
    
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
   
    //curso/00158012/201575/UAN/null/null/null/am/null/inte/null
    
    //curso/00158012/201560/UAN/Lu,Ma,Mi,Ju,Vi,Sa,Do/01/05/am/null/inte/ASEM,ALIN,AING,CADI,DERE,RIN2,RIN3,RIN5
    var websevicename = 'curso/'+usuario+'/'+SC_periodo+'/'+SC_campus+'/'+SC_dias+'/'+SC_hora+'/'+SC_minuto+'/'+SC_time+'/'+SC_instructor+'/'+SC_titulo+'/'+SC_atributos;
    
    if(SC_busqueda==false)
       return;
    
    $('.km-loader').show();
    var url = 'http://redanahuac.mx/mobile/webservice/curl.php';
    $('#resultados_SC').empty();
    $('#RC_csc').html('0');
    $('#r387periodo').html(SC_desc_periodo);
    $('#res-uni').html(SC_campus);
    
    $.ajax({
     data: {websevicename: websevicename,username:usuario,password:password},
     url:url,
     dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
     jsonp: 'callback',
     contentType: "application/json; charset=utf-8",
     complete:function(data){
         $('.km-loader').hide(); 
         //$("body").scrollTop(0);
     },
     success:function(data){
         // do stuff with json (in this case an array)
      $('#RC_csc').html(data.length);
      
      var html='';
         
      if(data.length!=0){
         $.each(data, function(index, element) {
            
            html +=
                '<li class="swipeout">'+
                '<div class="swipeout-content"><a class="item-link item-content" onclick="getDetalleCurso(\''+element.vsCrn+'\',\''+element.vsPeriodo+'\')">'+
                '<div class="item-inner">'+
                '<div class="item-title-row">'+
                '<div class="item-subtitle">'+element.vsSubj+' '+element.vsCrn+' - '+element.vsTitulo+'</div>'+
                '</div>'+
                '<div class="item-after">Instructor: '+element.vsNomDocente +'</div>'+
                '<div class="item-after">Horario: '+element.vsHorarioFormato +'</div>'+
                '</div></a></div>'+
                '</li>'+
                '';
             
        });
             }else{
                  html +=
                 '<div class="card">'+
                 '<div class="card-content">'+
                 '<div class="card-content-inner"><span class="item-orange-bold">NO SE ENCONTRARON CURSOS.</span></div>'+
                 '</div>'+
                 '</div>'+
                 '';
                 
             }
        
         $('#resultados_SC').html(html);
     },
     error:function(){
         
    navigator.notification.alert(
    'Opps!',  // message
    alertDismissed,         // callback
    'Inicie Sesion!',            // title
    'Aceptar'                  // buttonName
     );
     
         ExitApp();
     }      
     });
    
    
}



// END_CUSTOM_CODE_perfilView