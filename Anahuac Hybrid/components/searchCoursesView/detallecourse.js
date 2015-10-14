'use strict';

app.detailcourseView = kendo.observable({
    onShow: function() { },
    afterShow: function() {  }
});

// START_CUSTOM_CODE_perfilView


function getDetalleCurso(id,periodo){
    
    app.mobileApp.navigate('components/searchCoursesView/detallecourse.html');
    
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
   
    var websevicename = 'cursodt/'+usuario+'/'+periodo+'/'+id;
 
    var url = 'http://redanahuac.mx/mobile/webservice/curl.php';
    
    $.ajax({
     data: {websevicename: websevicename,username:usuario,password:password},
     url:url,
     dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
     jsonp: 'callback',
     contentType: "application/json; charset=utf-8",
     success:function(data){
         // do stuff with json (in this case an array)
      
         var html='';
         var periodo='';
         if(data.length!=0){
         $.each(data, function(index, element) {
            
            periodo = '<div class="normal-header-title">Periodo('+element.vsPeriodo+')</div><div class="small-header-title">Creditos:'+element.vsHorasCredito+'</div>';
            html +=
                '<div class="card">'+
                '<div class="card-content">'+
                '<div class="card-content-inner">'+
                '<div class="item-title">'+element.vsSubj+' '+element.vsCrn+' - '+element.vsTitulo+'</div>'+
                '<div>Instructor: '+element.vsNomDocente+' </div>'+
                '<div>Horario: '+element.vsHorarioFormato+' </div>'+
                '</div>'+
                '</div>'+
                '</div>'+
             
                '<div class="card">'+
                '<div class="card-header">Descripción Curso</div>'+
                '<div class="card-content">'+
                '<div class="card-content-inner">'+
                '<div>'+element.vsDetalle+'</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
             
             
             
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
         
        
         $('#div_course_periodo').html(periodo);
         $('#detallecurso').html(html);
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