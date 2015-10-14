'use strict';

app.gradeDetalleView = kendo.observable({
    onShow: function() { },
    afterShow: function() {  }
});

// START_CUSTOM_CODE_perfilView
function getDetalleGrade(crn,curso,profesor){
    
    app.mobileApp.navigate('components/gradesView/gradedetalle.html');
    
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
   
    var websevicename = 'componente/'+usuario;
 
    var url = 'http://redanahuac.mx/mobile/webservice/curl.php';
    
      var titulo = '<div class="normal-header-title">'+curso+'</div><div class="small-header-title">'+profesor+'</div>';
     $('#div_course_DG').html(titulo);
    $('#GRD_CALIF_COURSE').empty();
    
    $.ajax({
     data: {websevicename: websevicename,username:usuario,password:password},
     url:url,
     dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
     jsonp: 'callback',
     contentType: "application/json; charset=utf-8",
     success:function(data){
         // do stuff with json (in this case an array)
      
             var html =
                    '<tr>'+
                        '<td class="item-title">Criterio de Evaluación</td>'+
                        '<td class="item-title">%</td>'+
                        '<td class="item-title">Calificación</td>'+
                    '</tr>';
        
         if(data.length!=0){
         $.each(data, function(index, element) {
            
          
           if(element.cparCrnn == crn){ 
             html +=
                '<tr>'+
                  '<td>'+element.compDesc+' </td>'+
                  '<td>'+element.compPond+' </td>'+
                  '<td>'+element.stcrTipo+' </td>'+
                '</tr>'+  
                '';
               }
             
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
         
        
        
         $('#GRD_CALIF_COURSE').append(html);
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