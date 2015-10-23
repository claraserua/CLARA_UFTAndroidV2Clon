'use strict';

app.detailcourseView = kendo.observable({
    onShow: function() { },
    afterShow: function() { getDetalleCurso_DCD(); }
});

// START_CUSTOM_CODE_perfilView

var crn_DC = '';
var periodo_DC = '';

function Cursos_back(){
    
    SC_busqueda = false;
    
    app.mobileApp.navigate('components/searchCoursesView/results.html');
}


function getDetalleCurso(id,periodo){
     crn_DC = id;
     periodo_DC = periodo;
     app.mobileApp.navigate('components/searchCoursesView/detallecourse.html');
    
    }


function getDetalleCurso_DCD(){
    
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
   
    var websevicename = 'cursodt/'+usuario+'/'+periodo_DC+'/'+crn_DC;
    
    if(!checkConnection()){ showNotification('No network connection','Network'); return; }
    
    var url = 'http://redanahuac.mx/mobile/webservice/curl.php';
     $('.km-loader').show();
    $.ajax({
     data: {websevicename: websevicename,username:usuario,password:password},
     url:url,
     dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
     jsonp: 'callback',
     contentType: "application/json; charset=utf-8",
     complete:function(data){
         $('.km-loader').hide();
     },
     success:function(data){
         // do stuff with json (in this case an array)
      
         var html='';
         var title_course ='';
         
         var idvalperiodo = '';
         var idvalcrn = '';
         var detalle= '';
         var prerequisitos = '';
         var favorito = 'N';
         var iconfavorit = '';
         
     
         $.each(data, function(index, element) {
            
            idvalperiodo = element.vsPeriodo;
            idvalcrn = element.vsCrn;
             
             if(element.vsDetalle==null){detalle = '';}else{detalle=element.vsDetalle; }
             if(element.vsPrerequisito==null){prerequisitos= 'Ninguno';}else{prerequisitos=element.vsPrerequisito;}
             if(element.vsEsFavo =='N'){favorito='N'; iconfavorit = '';}else{favorito='S'; iconfavorit = '<img src="resources/img/favorit.png"/> ';}
             
             
            title_course = '<div class="normal-header-title">'+element.vsCrn+' '+element.vsSubj+element.vsCrse+' '+element.vsTitulo+'</div><div class="small-header-title">('+element.vsPeriodo+')<span>'+iconfavorit+'<span></div>';
            
            html +=
                '<div class="card">'+
                '<div class="card-content">'+
                '<div class="card-content-inner">'+
                '<div class="item-title">Instructor: '+element.vsNomDocente+'</div>'+
                '<div>Horario: '+element.vsHorarioFormato+' </div>'+
                '<div>Créditos: '+element.vsHorasCredito +' </div>'+
                '</div>'+
                '</div>'+
                '</div>'+
             
                '<div class="card">'+
                '<div class="card-header">Descripción Curso</div>'+
                '<div class="card-content">'+
                '<div class="card-content-inner">'+
                '<div>'+detalle+'</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                
                
                  '<div class="card">'+
                '<div class="card-header">Pre-requisitos</div>'+
                '<div class="card-content">'+
                '<div class="card-content-inner">'+
                '<div>'+prerequisitos+'</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
             
             
             
                '';
             
        });
             
          
        
         $('#DC_PERIODO').val(idvalperiodo);
         $('#DC_CRN').val(idvalcrn);
         
         
         $('#title_course_DC').html(title_course);
         $('#detallecurso').html(html);
         
         if(favorito=='N'){
               $("#SC_btn_set").attr("onClick","set_favorit_Course()");
             $( "#icon-cd" ).removeClass( "km-icon km-trash" ).addClass( "km-icon km-toprated" );
             $( "#txt-favorit" ).html('Agregar a cursos planeados');
             
         }else{
            
             $("#SC_btn_set").attr("onClick","delete_favorit_Course()");
              $( "#icon-cd" ).removeClass( "km-icon km-toprated" ).addClass( "km-icon km-trash" );
              $( "#txt-favorit" ).html('Eliminar de cursos planeados');
         }
         
        
         
         
     },
     error:function(){
          showNotification('Intentalo Nuevamente','Alerta');
         
   /* navigator.notification.alert(
    'Opps!',  // message
    alertDismissed,         // callback
    'Inicie Sesion!',            // title
    'Aceptar'                  // buttonName
     );
     
         ExitApp();*/
     }      
     });
    
    
}

function PC_addCourse_DC(){
  navigator.notification.confirm(
        'Se agregara este curso a su lista',  // message
        onConfirm_ADD_PC,              // callback to invoke with index of button pressed
        'Agregar Curso',            // title
        'Cancelar,Aceptar'          // buttonLabels
    );
}

 // process the confirmation dialog result
    function onConfirm_ADD_PC(buttonIndex) {
        //alert('You selected button ' + buttonIndex);
        
        var crn =  $('#DC_CRN').val();
        var periodo = $('#DC_PERIODO').val();
        
        
        if(buttonIndex==2){
        set_favorit_Course(crn,periodo);
         }
        
    }


function delete_favorit_Course(){

    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    
    var crn =  $('#DC_CRN').val();
    var periodo = $('#DC_PERIODO').val();
   
    var websevicename = 'favoritos/'+usuario+'/'+periodo+'/'+crn+'/DE';
 
    var url = 'http://redanahuac.mx/mobile/webservice/curl.php';
    
    $.ajax({
     data: {websevicename: websevicename,username:usuario,password:password},
     url:url,
     dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
     jsonp: 'callback',
     contentType: "application/json; charset=utf-8",
     success:function(data){
        
         $("#SC_btn_set").attr("onClick","set_favorit_Course()");
         $( "#icon-cd" ).removeClass( "km-icon km-trash" ).addClass( "km-icon km-toprated" );
         $( "#txt-favorit" ).html('Agregar a cursos planeados');
         
         $("#cvs-"+crn).css("color", "");
         $( "#if-"+crn ).html( "" );
         
             
         //showNotification('El curso se agrego a sus cursos Planeados','Curso Agregado')
         
     },
     error:function(){
         
       showNotification('Ocurrio un error!','Opps!')
     }      
     });

}

function set_favorit_Course(){
    
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    
    var crn =  $('#DC_CRN').val();
    var periodo = $('#DC_PERIODO').val();
   
    var websevicename = 'favoritos/'+usuario+'/'+periodo+'/'+crn+'/IN';
 
    var url = 'http://redanahuac.mx/mobile/webservice/curl.php';
    
    $.ajax({
     data: {websevicename: websevicename,username:usuario,password:password},
     url:url,
     dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
     jsonp: 'callback',
     contentType: "application/json; charset=utf-8",
     success:function(data){
        
         $("#SC_btn_set").attr("onClick","delete_favorit_Course()");
         $( "#icon-cd" ).removeClass( "km-icon km-toprated" ).addClass( "km-icon km-trash" );
         $( "#txt-favorit" ).html('Eliminar de cursos planeados');
         
         
         $("#cvs-"+crn).css("color", "#F7881C");
         $( "#if-"+crn ).html( '<img src="resources/img/favorit.png"/>' );
         
         
         
         //showNotification('El curso se agrego a sus cursos Planeados','Curso Agregado')
         
     },
     error:function(){
         
       showNotification('Ocurrio un error!','Opps!')
     }      
     });
    
    
}
    


// END_CUSTOM_CODE_perfilView