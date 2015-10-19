'use strict';

app.homeView = kendo.observable({
    onShow: function() { $('.km-loader').hide(); },
    afterShow: function() { showLoading(); }
});

// START_CUSTOM_CODE_homeView

function ViewList(){
     app.mobileApp.navigate('components/listHomeView/view.html');
}


function clickHandler(redirect) { 
    app.mobileApp.navigate('components/'+redirect+'/view.html');
}


function ExitApp(){
     app.mobileApp.navigate('components/logoutView/view.html');
}

function showLoading() {
   
    if (kendo.support.mobileOS.ios && kendo.support.mobileOS.tablet) {
        // PORTRAIT:
        if ($(window).height()>$(window).width()){
            //$(document.documentElement).height(($(window).height())+'px');
            $('.km-footer').show();
        // LANDSCAPE:
        }else{
            $('.km-footer').hide();
            //$(document.documentElement).height(($(window).height()-20)+'px');
        //window.scrollTo(0,0);
        }
    }

}

$(window).resize(function(){
// BUG iOS7 - Safari - iPAD2
    var access =  window.localStorage.getItem("access");
    if(access=="FALSE")
        return;
if (kendo.support.mobileOS.ios && kendo.support.mobileOS.tablet) {
        // PORTRAIT:
        if ($(window).height()>$(window).width()){
           //app.mobileApp.navigate('components/homeView/view.html');
        // LANDSCAPE:
        }else{
           //app.mobileApp.navigate('components/homeSplitView/view.html');
        }
    }
});



// END_CUSTOM_CODE_homeView