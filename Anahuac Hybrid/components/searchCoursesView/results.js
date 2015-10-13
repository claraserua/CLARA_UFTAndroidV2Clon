'use strict';

app.resultsView = kendo.observable({
    onShow: function() { },
    afterShow: function() {  }
});

// START_CUSTOM_CODE_perfilView


function getCursosfound(titulo,instructor,periodo,campus,atributos,dias,hora,minuto,time){
    
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
   
    $('#resultados').empty();
 
    //curso/00158012/201575/UAN/null/null/null/am/null/inte/null
    
    //curso/00158012/201560/UAN/Lu,Ma,Mi,Ju,Vi,Sa,Do/01/05/am/null/inte/ASEM,ALIN,AING,CADI,DERE,RIN2,RIN3,RIN5
    var websevicename = 'curso/'+usuario+'/'+periodo+'/'+campus+'/'+dias+'/'+hora+'/'+minuto+'/'+time+'/'+instructor+'/'+titulo+'/'+atributos;
    
 
    var url = 'http://redanahuac.mx/mobile/webservice/curl.php';
    
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
         if(data.length!=0){
         $.each(data, function(index, element) {
            
         
            html +=
                '<li class="swipeout">'+
                '<div class="swipeout-content"><a class="item-link item-content" onclick="getDetalleCurso(\''+element.vsCrn+'\',\''+element.vsPeriodo+'\')">'+
                '<div class="item-inner">'+
                '<div class="item-title-row">'+
                '<div class="item-subtitle">'+element.vsSubj+' '+element.vsCrn+' - '+element.vsTitulo+'</div>'+
                '<div class="item-after"></div>'+
                '</div>'+
                '<div class="item-title">Instructor: '+element.vsNomDocente +'</div>'+
                '<div class="item-title">Horario: '+element.vsHorarioFormato +'</div>'+
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
        
         $('#resultados').html(html);
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

function setAtributo(name){
    
    //$('#desc_atributo').html(name);
    //app.mobileApp.navigate('components/searchCoursesView/view.html');
    
}

// END_CUSTOM_CODE_perfilView