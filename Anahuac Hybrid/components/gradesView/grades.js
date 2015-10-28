'use strict';

app.gradesView = kendo.observable({
    onShow: function() { if(CPGrades_Refresh == true){ $( "#califparciales" ).empty(); }  },
    afterShow: function() { getCalificacionesP(); }
});

// START_CUSTOM_CODE_gradesViewView
var CPGrades_Refresh = true;

function Refresh_CalifParc(){
      CPGrades_Refresh = true;
      getCalificacionesP();
}


function getCalificacionesP()
{
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    var websevicename = 'parcial/'+usuario;
    
    if(CPGrades_Refresh==false)
        return;
    
    if(!checkConnection()){ showNotification('No hay Red disponible','Conexión'); return; }
    
    var url = 'http://redanahuac.mx/mobile/webservice/curl.php';
    
    $( "#califparciales" ).empty();
    $("#califparciales").show();
    $("#califparcialesMsg").hide();
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
        CPGrades_Refresh=false;
        var titleCourse = '';
        var profesor = '';
        $.each(data, function(index, element){
            //alert('element.crseSubj='+element.crseSubj);
            if(element.crseSubj=="HOLD" || element.crseSubj=="OTRO" ||
            	(element.vsCrseTitl=="" && element.crseSubj!="HOLD" && element.crseSubj!="SINP"))
            {
                $("#califparciales").hide();
                $("#califparcialesMsg").show();
            }
            else{

                titleCourse = element.crseCrnn+' '+element.crseSubj+' '+element.crseCrse+' '+element.crseTitl;
                profesor = element.nameFacu;
                //$('#nivel1').html(element.crseTitl);
                //<li><a class="km-listview-link" data-role="listview-link">'+element.crseTitl+'</a></li>   
                var link = '<li><a class="km-listview-link" data-role="listview-link" onclick="setDetalleGrade_gd(\''+element.crseCrnn+'\',\''+titleCourse+'\',\''+profesor+'\',\''+element.stcrGrde+'\',\''+element.stcrMidd+'\')">'+element.crseTitl+'</a></li>';

                $( "#califparciales" ).append( link );
            }
          
        });
     },
     error:function(){
          showNotification('Intentalo Nuevamente','Alerta');
     }      
  });
}


// END_CUSTOM_CODE_gradesViewView

(function(parent) {
    var gradesViewModel = kendo.observable({
        openLink: function(url) {
            window.open(url, '_system');
            if (window.event) {
                window.event.preventDefault && window.event.preventDefault();
                window.event.returnValue = false;
            }
        }
    });

    parent.set('gradesViewModel', gradesViewModel);
})(app.gradesView);

// START_CUSTOM_CODE_aboutViewModel
// END_CUSTOM_CODE_aboutViewModel