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
        
       $('.datepicker-days').on('click', 'td.day', function (e) {
        e.preventDefault();
       alert($('#date-daily').val());
        return false;
    });
    
    
    }
});