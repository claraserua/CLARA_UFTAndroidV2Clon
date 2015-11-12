'use strict';

app.homeSplitView = kendo.observable({
    onShow: function() {  },
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
            $(document.documentElement).height(($(window).height())+'px');
            $('.km-footer').show();
        // LANDSCAPE:
        }else{
            $('.km-footer').hide();
            $(document.documentElement).height(($(window).height()-20)+'px');
        window.scrollTo(0,0);
        }
    }

}





// END_CUSTOM_CODE_homeView