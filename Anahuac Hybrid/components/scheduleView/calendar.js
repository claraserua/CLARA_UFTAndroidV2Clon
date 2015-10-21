'use strict';

app.calendarView = kendo.observable({
    onShow: function() {  },
    afterShow: function() { 
    
        
       $('#dp3').datepicker({
           "setDate": new Date(),
           language: 'es',
           todayHighlight: true,
           orientation: "bottom left",
                     }); 
        
          $('#date-daily').change(function () {
       
              alert('prueba');
          // buildScheduleOptionsCalendar($('#date-daily').val());
         });
    
    
    }
});