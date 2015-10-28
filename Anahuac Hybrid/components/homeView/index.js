'use strict';

app.homeView = kendo.observable({
    onShow: function() { $('.km-loader').hide(); detectIpad(); },
    afterShow: function() {  }
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


function detectIpad(){
    
    if (kendo.support.mobileOS.ios && kendo.support.mobileOS.tablet) {
        
        if (window.matchMedia("(-webkit-device-pixel-ratio: 2)").matches) {
         /* retina display */
        $("#home_icon_sc").attr( { src:"resources/img/icons/BusquedaCursos144x144@2x.png", width:"72px",height:"72px" } );
        $("#home_icon_cp").attr( { src:"resources/img/icons/Cursosinteres144x144@2x.png", width:"72px",height:"72px" } );
        $("#home_icon_ci").attr( { src:"resources/img/icons/CitaInscripcion144x144@2x.png", width:"72px",height:"72px" } );
        $("#home_icon_hor").attr( { src:"resources/img/icons/Horario144x144@2x.png", width:"72px",height:"72px" } );    
        $("#home_icon_per").attr( { src:"resources/img/icons/Perfil144x144@2x.png", width:"72px",height:"72px" } );
        $("#home_icon_sa").attr( { src:"resources/img/icons/SituacionAcademica144x144@2x.png", width:"72px",height:"72px" } );
        $("#home_icon_cal").attr( { src:"resources/img/icons/Calif_Parciales144x144@2x.png", width:"72px",height:"72px" } );
        $("#home_icon_ha").attr( { src:"resources/img/icons/HistoriaAcademica144x144@2x.png", width:"72px",height:"72px" } );
        $("#home_icon_ec").attr( { src:"resources/img/icons/EstadoCuenta144x144@2x.png", width:"72px",height:"72px" } );
        $("#home_icon_ce").attr( { src:"resources/img/icons/CreditoEducativo144x144@2x.png", width:"72px",height:"72px" } );
        $("#home_icon_af").attr( { src:"resources/img/icons/ApoyoFinanciero144x144@2x.png", width:"72px",height:"72px" } );
        $("#home_icon_ret").attr( { src:"resources/img/icons/Retencion144x144@2x.png", width:"72px",height:"72px" } );
        $("#home_icon_not").attr( { src:"resources/img/icons/Noticias144x144@2x.png", width:"72px",height:"72px" } );
        $("#home_icon_eve").attr( { src:"resources/img/icons/Eventos144x144@2x.png", width:"72px",height:"72px" } );
        $("#home_icon_opi").attr( { src:"resources/img/icons/TuOpinion144x144@2x.png", width:"72px",height:"72px" } );
            
            }else{
                
        $("#home_icon_sc").attr("src","resources/img/icons/BusquedaCursos72x72.png");
        $("#home_icon_cp").attr("src","resources/img/icons/Cursosinteres72x72.png");
        $("#home_icon_ci").attr("src","resources/img/icons/CitaInscripcion72x72.png");
        $("#home_icon_hor").attr("src","resources/img/icons/Horario72x72.png");
        $("#home_icon_per").attr("src","resources/img/icons/Perfil72x72.png");
        $("#home_icon_sa").attr("src","resources/img/icons/SituacionAcademica72x72.png");
        $("#home_icon_cal").attr("src","resources/img/icons/Calif_Parciales72x72.png");
        $("#home_icon_ha").attr("src","resources/img/icons/HistoriaAcademica72x72.png");
        $("#home_icon_ec").attr("src","resources/img/icons/EstadoCuenta72x72.png");
        $("#home_icon_ce").attr("src","resources/img/icons/CreditoEducativo72x72.png");
        $("#home_icon_af").attr("src","resources/img/icons/ApoyoFinanciero72x72.png");
        $("#home_icon_ret").attr("src","resources/img/icons/Retencion72x72.png");
        $("#home_icon_not").attr("src","resources/img/icons/Noticias72x72.png");
        $("#home_icon_eve").attr("src","resources/img/icons/Eventos72x72.png");
        $("#home_icon_opi").attr("src"," resources/img/icons/TuOpinion72x72.png");
           }
    }
    
}



function showLoading() {
   
    if (kendo.support.mobileOS.ios && kendo.support.mobileOS.tablet) {
        // PORTRAIT:
        if ($(window).height()>$(window).width()){
            //$(document.documentElement).height(($(window).height())+'px');
            //$('.km-footer').show();
        // LANDSCAPE:
        }else{
           // $('.km-footer').hide();
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