'use strict';

app.calendarView = kendo.observable({
    onShow: function() {  },
    afterShow: function() { 
    
        $('.km-content:visible').data('kendoMobileScroller').enable();
        
       var curDate = new Date();
       $('#dp3').datepicker({
           "setDate": new Date(),
           language: 'es',
           todayHighlight: true,
           orientation: "bottom left",
       }).on('changeDate', function(e){
           
           curDate = e.date;
           
           var mes = parseInt(curDate.getMonth())+1;
           var dia = parseInt(curDate.getDate())+1;
           var year = curDate.getFullYear();
           
           
           var date = year+'-'+mes+'-'+dia;
          
           H_calendar=true;
           getdayCalendar(date);
           clickHandler_2('scheduleView');
                
                });
            }
        
        });
    
   