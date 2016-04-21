'use strict';

app.homeView = kendo.observable({
    onShow: function() { $('.km-loader').hide();  $('#home').height($( window ).height()-55); initscrollTop(); },
    afterShow: function() { landscape(); addBackButtonEvent();  }
});

// START_CUSTOM_CODE_homeView

function ViewList(){
    removeBackButtonEvent();
    $('.km-content:visible').data('kendoMobileScroller').enable();
     app.mobileApp.navigate('components/listHomeView/view.html');
}

function clickHandler(redirect) {
    $('.km-content:visible').data('kendoMobileScroller').enable();
    app.mobileApp.navigate('components/'+redirect+'/view.html');
}
function clickHandler_5(redirect) {
    $('.km-content:visible').data('kendoMobileScroller').enable();
    app.mobileApp.navigate('components/'+redirect);
}
function clickHandlerFromHome(redirect) {
    removeBackButtonEvent();
    $('.km-content:visible').data('kendoMobileScroller').enable();
    app.mobileApp.navigate('components/'+redirect+'/view.html');
}



function ExitApp(){
    removeBackButtonEvent();
    app.mobileApp.navigate('components/logoutView/view.html');
}


function detectTablet(){
    
    if (kendo.support.mobileOS.tablet) {
        
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



function landscape() {
   
        // PORTRAIT:
        if ($(window).height()>$(window).width()){
           /* initscrollTop();
            $('.km-content:visible').data('kendoMobileScroller').disable();
            $("#home").css("position", "fixed"); */ 
        // LANDSCAPE:
        }else{
           /* $('.km-content:visible').data('kendoMobileScroller').enable();
           $("#home").css("position", "relative");   */
             $('#home').height($( window ).height()+160);

        }
    

}

$(window).resize(function(){
    
   
    
    if ($(window).height()>$(window).width()){
        
         $('#home').height($( window ).height()-55);
        
        /*initscrollTop();
        $('.km-content:visible').data('kendoMobileScroller').disable();
        $("#home").css("position", "fixed"); */
        
        }else{
            
             $('#home').height($( window ).height()+160);
            
       /* $('.km-content:visible').data('kendoMobileScroller').enable();
        $("#home").css("position", "relative");*/
          
        }
    
});



// END_CUSTOM_CODE_homeView