'use strict';

var home = false;


app.homeView = kendo.observable({
    onShow: function() { $('.km-loader').hide(); home = true; },
    afterShow: function() { landscape();  }
});

// START_CUSTOM_CODE_homeView

function ViewList(){
    home = false;
    $('.km-content:visible').data('kendoMobileScroller').enable();
     app.mobileApp.navigate('components/listHomeView/view.html');
}


function clickHandler(redirect) { 
    home = false;
    $('.km-content:visible').data('kendoMobileScroller').enable();
    app.mobileApp.navigate('components/'+redirect+'/view.html');
}
function clickHandler_5(redirect) { 
    home = false;
    $('.km-content:visible').data('kendoMobileScroller').enable();
    app.mobileApp.navigate('components/'+redirect);
}


function ExitApp(){
     home = false;
     app.mobileApp.navigate('components/logoutView/view.html');
}


function detectTablet(){
    
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



function landscape() {
   
        // PORTRAIT:
        if ($(window).height()>$(window).width()){
            initscrollTop();
            $('.km-content:visible').data('kendoMobileScroller').disable();
            $("#home").css("position", "fixed");  
        // LANDSCAPE:
        }else{
           $('.km-content:visible').data('kendoMobileScroller').enable();
           $("#home").css("position", "relative");   

        }
    

}

$(window).resize(function(){
    
  if(home==true){
  
    if ($(window).height()>$(window).width()){
        
        initscrollTop();
        $('.km-content:visible').data('kendoMobileScroller').disable();
        $("#home").css("position", "fixed"); 
        
        }else{
        $('.km-content:visible').data('kendoMobileScroller').enable();
        $("#home").css("position", "relative");
          
        }
      }
        
    
});



// END_CUSTOM_CODE_homeView