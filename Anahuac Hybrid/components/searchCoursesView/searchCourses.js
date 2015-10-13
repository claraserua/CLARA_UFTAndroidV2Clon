'use strict';

function ValidFoundCourses() {
    var titulo = $('#titulo').val();
    var instructor = $('#instructor').val();
    var periodo = $('#val_periodo').val();
    var campus = $('#val_campus').val();
    var atributos = $('#val_atributos').val();
    var dias = $('#val_dias').val();
    var hora = $('#horas').val();
    var minuto = $('#minutos').val();
    var time = $('#time').val();
    
    //alert(titulo.length);
    
    if (titulo.length == 0 && instructor.length == 0) { 
        showNotification('Ingresa Titulo o Instructor', 'Datos requeridos');
        return;
    }else {
        if (titulo.length == 0) {
            
            if (instructor.length < 4) {
                showNotification('El campo debe contener 4 caracteres minimo', 'Instructor');
                return;
            }
        }else {
            if (titulo.length <4) { showNotification('El campo debe contener 4 caracteres minimo', 'Titulo');  return;}
            
            if (instructor.length == 0) {
                if (titulo.length < 4) {
                    showNotification('El campo debe contener 4 caracteres minimo', 'Titulo');
                    return;
                }
            }else{if (instructor.length <4) { showNotification('El campo debe contener 4 caracteres minimo', 'Instructor');  return;}}
        }
    }
    
    
    if(periodo==""){showNotification('El campo es necesario', 'Periodo'); return;}
    if(campus==""){showNotification('El campo es necesario', 'Campus'); return;}
    
    if(titulo==""){ titulo="null";}
    if(instructor==""){ instructor="null";}
    if(atributos==""){ atributos="null";}
    if(dias==""){ dias="null";}
    
     app.mobileApp.navigate('components/searchCoursesView/results.html');
     getCursosfound(titulo,instructor,periodo,campus,atributos,dias,hora,minuto,time);
}

app.searchCoursesView = kendo.observable({
                                             onShow: function() {
                                             },
                                             afterShow: function() {
                                             }
                                         });
// START_CUSTOM_CODE_searchCoursesView
// END_CUSTOM_CODE_searchCoursesView
