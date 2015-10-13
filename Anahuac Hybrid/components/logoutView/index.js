'use strict';

app.logoutView = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_aboutView

function LogoutApp(){
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
})(app.aboutView);

// START_CUSTOM_CODE_aboutViewModel
// END_CUSTOM_CODE_aboutViewModel