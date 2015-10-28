'use strict';

app.logoutView = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_aboutView

function LogoutApp(){
 
     VHA_Refresh = true;
     SAcademica_Refresh = true;
     Events_Refresh = true;
     CPGrades_Refresh = true;
     HFinancial_Refresh = true;
     PSCitaIns_Refresh = true;
     News_Refresh = true;
     BPerfil_Refresh = true;
     VRetention_Refresh = true;
     SPCuenta_Refresh = true;
     SPMovimientos_Refresh = true;
     SPNOVencidos_Refresh = true;
     SPVencidos_Refresh = true;
     RCEducativo_Refresh = true;
     variabProgramName = true;
     H_calendar = false;
    
     $('#val_periodo').val('');
     $('#desc_periodo').html('*Periodo');
     $('#val_campus').val('');
     $('#desc_campus').html('*Campus');
     $('#val_carrera').val('');
     $('#desc_carrera').html('Materia');
     $('#val_atributos').val('');
     $('#txt-atributos').html('');
     $('#val_dias').val('');
     $('#txt-days').html('');
     $('#titulo').val('');
     $('#instructor').val('');
    
    
     window.localStorage.setItem("access","FALSE");
     app.mobileApp.navigate('components/authenticationView/view.html');
    
 
}


function CancelLogout(){
     app.mobileApp.navigate('components/homeView/view.html');
    
}

// END_CUSTOM_CODE_aboutView
(function(parent) {
    var logoutViewModel = kendo.observable({
        openLink: function(url) {
            window.open(url, '_system');
            if (window.event) {
                window.event.preventDefault && window.event.preventDefault();
                window.event.returnValue = false;
            }
        }
    });

    parent.set('logoutViewModel', logoutViewModel);
})(app.logoutView);

// START_CUSTOM_CODE_aboutViewModel
// END_CUSTOM_CODE_aboutViewModel