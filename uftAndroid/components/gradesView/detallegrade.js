'use strict';

app.gradeDetalleView = kendo.observable({
    onShow: function() { $('#div_course_DG').html('&nbsp;'); },
    afterShow: function() { getDetalleGrade_gd(); }
});

var GD_CrnP = '';
var GD_CursoP = '';
var GD_ProfesorP = '';

var GD_PromParcial = '';
var GD_PromFinal = '';


function setDetalleGrade_gd(crn,curso,profesor,PromFinal,PromParcial){
    
    GD_CrnP = crn;
    GD_CursoP = curso;
    GD_ProfesorP = profesor;

    GD_PromParcial = PromParcial;
    GD_PromFinal = PromFinal;
    
    if("*" != GD_PromParcial)        
         if(GD_PromParcial.length == 1) 
             GD_PromParcial = "P/A"; 
    
    if("*" != GD_PromFinal) 
        if(GD_PromFinal.length == 1)
          GD_PromFinal = "P/A"; 
                           
                 
    
    $('#GRD_CALIF_COURSE').empty();
    app.mobileApp.navigate('components/gradesView/gradedetalle.html');
}


// START_CUSTOM_CODE_perfilView
function getDetalleGrade_gd(){
    
    
    $('#GRD_CALIF_COURSE').empty();
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
   
    var websevicename = 'componente/'+usuario;
 
    var titulo = '<div class="normal-header-title">'+GD_CursoP+'</div><div class="small-header-title">'+GD_ProfesorP+'</div>';
     
    $('#div_course_DG').html(titulo);
    
     if(!checkConnection()){ showNotification('No hay Red disponible','Conexión'); return; }
    
    $('.km-loader').show();
    
    $.ajax({
     data: {websevicename: websevicename,username:usuario,password:password},
     url: url_webservice,
     dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
     jsonp: 'callback',
     contentType: "application/json; charset=utf-8",
     complete:function(data){
         $('.km-loader').hide();   
     },
     success:function(data){
         // do stuff with json (in this case an array)
      
         var calificacion = '';
         
             var html =
                    '';
        
         if(data.length!=0){

                html +=
                    '<div class="card">'+
                      '<div class="card-content">'+
                      '<div class="card-content-inner">'+
                      '<table  width="100%">'+
                    '<tr>'+
                        '<td class="item-title" width="40%">Criterio de Evaluación</td>'+
                        '<td class="item-title" width="30%" style="text-align:center;">%</td>'+
                        '<td class="item-title" width="30%" style="text-align:center;">Calificación</td>'+
                    '</tr>';
             
         $.each(data, function(index, element) {
            
          
           if(element.cparCrnn == GD_CrnP){ 
               
               calificacion = element.compGrde;
               
               
               if(calificacion == "*")
                          calificacion = "";
               
               if(calificacion == "")
                         calificacion = "P/A";
               
             html +=
                '<tr>'+
                  '<td>'+element.compDesc+' </td>'+
                  '<td style="text-align:center;">'+element.compPond+' </td>'+
                  '<td style="text-align:center;">'+calificacion+' </td>'+
                '</tr>'+  
                '';   
               }
             
        });
             
             html +=
                    '</table>'+
                    '</div>'+
                    '</div>'+
                    '</div>';
             
             
             
             html +=
                   '<div class="card">'+
                     '<div class="card-content">'+
                       '<div class="card-content-inner" >'+
                        '<table width="100%">'+
                        '<tr>'+
                        '<td class="item-title" width="10%">&nbsp;</td>'+
                        '<td class="item-title" width="60%" style="text-align:right;">Promedio Parcial:</td>'+
                        '<td class="item-title" width="30%" style="text-align:center;">'+GD_PromParcial+'</td>'+
                        '</tr>'+
                        '<tr>'+
                        '<td class="item-title" width="10%">&nbsp;</td>'+
                        '<td class="item-title" width="60%" style="text-align:right;">Promedio Final:</td>'+
                        '<td class="item-title" width="30%" style="text-align:center;">'+GD_PromFinal+'</td>'+
                        '</tr>'+
                       
                       '</table>'+  
                     '</div>'+
                    '</div>'+
                   '</div>';
             
             
             
             
             html +=
                   '<div class="card">'+
                     '<div class="card-content">'+
                       '<div class="card-content-inner">'+
                       '<div>*P/A - POR ASIGNAR</div>'+
                       '<div>*P (PARCIAL) Y F (FINAL)</div>'+
                       '</div>'+
                    '</div>'+
                   '</div>';
             
             }else{
                  html +=
                 '<div class="card">'+
                 '<div class="card-content">'+
                 '<div class="card-content-inner"><span class="item-blue-bold">NO SE ENCONTRARON CURSOS.</span></div>'+
                 '</div>'+
                 '</div>'+
                 '';
                 
             }
         
        
         
         $('#GRD_CALIF_COURSE').append(html);
     },
     error:function(){
         
    showNotification('Intentalo Nuevamente','Alerta');
         
     }      
     });
    
    
}



// END_CUSTOM_CODE_perfilView