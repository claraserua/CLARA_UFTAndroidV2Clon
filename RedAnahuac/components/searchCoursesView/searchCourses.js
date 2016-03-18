'use strict';

app.searchCoursesView = kendo.observable({
    onShow: function() {  initscrollTop(); 
    },
    afterShow: function() {
        $('#resultados_SC').empty();   initscrollTop(); 
    }
});
function ValidFoundCourses() {
    
    var titulo = $('#titulo').val();
    var instructor = $('#instructor').val();
    var periodo = $('#val_periodo').val();
    var campus = $('#val_campus').val();
    var carrera = $('#val_carrera').val();
    var atributos = $('#val_atributos').val();
    var dias = $('#val_dias').val();
    var hora = $('#horas').val();
    var minuto = $('#minutos').val();
    var time = $('#time').val();
    var desc_periodo = $('#desc_periodo').html();
    
    
    
    if(periodo==""){showNotification('El campo es necesario', 'Periodo'); return;}
    if(campus==""){showNotification('El campo es necesario', 'Campus'); return;}
    
    
     if (atributos.length == 0 && carrera.length == 0) { 
        showNotification('Ingresa una Materia o Atributo', 'Datos requeridos');
        return;
    }
    
    
    if(titulo==""){ titulo="null";}
    if(instructor==""){ instructor="null";}
    if(atributos==""){ atributos="null";}
    if(dias==""){ dias="null";}
    if(carrera==""){carrera ="null"}
    
     
     if(!checkConnection()){ showNotification('No hay Red disponible','Conexión'); return; }
    
    setCursosfound_SC(titulo,instructor,periodo,campus,atributos,dias,hora,minuto,time,desc_periodo,carrera);
    app.mobileApp.navigate('components/searchCoursesView/results.html');
}


function ValidaGetCarrera(){
    
    var periodo = $('#val_periodo').val();
    var campus = $('#val_campus').val();
    
    if(periodo == ""){
        showNotification('Seleccione un periodo','Campo necesario');
        return;
        }
    
    if(campus == ""){
         showNotification('Seleccione un campus','Campo necesario');
        return;
        }
    
    
    app.mobileApp.navigate('components/carreraView/view.html');
    
}


// START_CUSTOM_CODE_searchCoursesView
// END_CUSTOM_CODE_searchCoursesView
