'use strict';
var arraydays = new Array();
app.daysView = kendo.observable({
    onShow: function() {  arraydays = new Array();  
            $("input:checkbox[name='itemsdays']").each(function(){
            $(this).attr('checked', false);
        });
                       },
    afterShow: function() {  
    
        
    
    }
});

// START_CUSTOM_CODE_perfilView


function sendDays(){
    var cadenadays = "";
     if(arraydays.length>0){
  	cadenadays = arraydays.join(",");
         $('#txt-days').html(": "+cadenadays);
      }else{ cadenadays="null"; $('#txt-days').html(""); }
    
    $('#val_dias').val(cadenadays);
    app.mobileApp.navigate('components/searchCoursesView/view.html');
}

function setDay(id){
    
       if($("#"+id).is(':checked')) { arraydays.push(id); }else{ 
           var index = arraydays.indexOf(id);
           if (index > -1) {
            arraydays.splice(index, 1);
           }
       }

}

// END_CUSTOM_CODE_perfilView