'use strict';
var arrayatributos = new Array();
app.attributesView = kendo.observable({
    onShow: function() { getAtributos(); arrayatributos = new Array();  },
    afterShow: function() {  }
});

// START_CUSTOM_CODE_perfilView


function getAtributos(){
   
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
    var websevicename = 'atributo/'+usuario;
    
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
         $.each(data, function(index, element) { 
           
         // alert(element.crseCrnn);
          html += '<li> <input type="checkbox" name="itemsatributos" id="'+element.attrCode+'" class="km-checkbox" value="'+element.attrCode+'" onclick="setAtributo(this.id)"/>'+element.attrDesc+'</li>';
      
        });
         $('#load-content').remove();
         $('#atributos').html(html);
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

function sendAtributos(){
    var cadenaatributos = "";
     if(arrayatributos.length>0){
  	cadenaatributos = arrayatributos.join(",");
      }else{ cadenaatributos="null" }
    
    $('#val_atributos').val(cadenaatributos);
    app.mobileApp.navigate('components/searchCoursesView/view.html');
    
}

function setAtributo(id){
    
       if($("#"+id).is(':checked')) { arrayatributos.push(id); }else{ 
           
           var index = arrayatributos.indexOf(id);
           if (index > -1) {
            arrayatributos.splice(index, 1);
           }
       }

}

// END_CUSTOM_CODE_perfilView