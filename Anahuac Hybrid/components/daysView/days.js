'use strict';
var arraydays = new Array();
app.daysView = kendo.observable({
    onShow: function() {  arraydays = new Array(); },
    afterShow: function() {  }
});

// START_CUSTOM_CODE_perfilView


function sendDays(){
    var cadenadays = "";
     if(arraydays.length>0){
  	cadenadays = arraydays.join(",");
      }else{ cadenadays="null" }
    
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