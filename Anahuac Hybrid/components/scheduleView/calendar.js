'use strict';

app.calendarView = kendo.observable({
    onShow: function() {  },
    afterShow: function() { 
    
        
       $('#dp3').datepicker({
           "setDate": new Date(),
           language: 'es',
           todayHighlight: true,
           orientation: "bottom left",
       }).on('changeDate', function(e){
           
           //var date = new Date();
           var date = $("#dp3").datepicker("getDate");
           
           
           console.log(date);
           //formatted = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours + ":" + date.getMinutes() + ":" + date.getSeconds();
           
       });
        
        
        /*
       $('.datepicker-days').on('click', 'td.day', function (e) {
           alert('cambio');
           
           e.preventDefault();
       
           return false;
       });*/
    
    
    }
});