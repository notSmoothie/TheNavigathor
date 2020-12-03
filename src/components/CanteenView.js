import React from 'react';
import {WebView} from 'react-native-webview';

const CanteenView = (props) => {
      const runFirst =
      `  $(document).ready(function() {
            $("div").css( "display", "none" ); 
            $(".container").css("display", "block"); 
            $(".jedalne").css("display", "block"); 
            $(".col-md-4").css("display", "block");
            $(".`+props.canteenType+`").eq(`+props.order+`).css("display", "block"); 
            $("h2").css("display", "block");
            $(".`+props.canteenType+`").eq(`+props.order+`).children().css("display", "block"); 
            $(".`+props.canteenType+`").eq(`+props.order+`).children().children().css("display", "block");
            $(".`+props.canteenType+`").eq(`+props.order+`).children().children().children().css("display", "block");
            $(".`+props.canteenType+`").eq(`+props.order+`).children().children().children().children().css("display", "block");
            $(".`+props.canteenType+`").eq(`+props.order+`).children().children().children().children().children().css("display", "block");
            $(".`+props.canteenType+`").eq(`+props.order+`).children().children().children().children().children().children().css("display", "block");
            $("a").css("display", "none"); 
            $(".actualize-info").css("display", "none"); 
   
            if(`+props.lightMode+` == true) {
               $("h2").css("color", "rgb(0,0,0)");
               $("h2").css("border-color", "rgb(255,215,0)");
               $(".content").css("border-color", "rgb(255,215,0)");
               $(".`+props.canteenType+`").css("border-color", "rgb(255,215,0)");
               $(".`+props.canteenType+`").css("background-color", "rgb(255,255,255)");
               $(".header.col-xs-12").css("color", "rgb(0,0,0)");
               $(".has_popup").css("color", "rgb(0,0,0)");
               $(".announcement").css("background-color", "rgb(255,215,0)");
               $(".announcement").css("color", "rgb(0,0,0)");
               $(".timeline").css("border-color", "rgb(255,215,0)");
               $(".pos").css("background-color", "rgb(255,215,0)");
               $(".bg").css("background-color", "rgb(255,255,255)");///////////
               $(".start").css("color", "rgb(0,0,0)");
               $(".end").css("color", "rgb(0,0,0)");
               $(".closed").css("color", "rgb(0,0,0)");
               $(".page-row").css("background-color", "rgb(0,0,0)");
            
            } else {
               $("h2").css("color", "rgb(255,215,0)");
               $("h2").css("border-color", "rgb(255,215,0)");
               $(".content").css("border-color", "rgb(255,215,0)");
               $(".`+props.canteenType+`").css("border-color", "rgb(255,215,0)");
               $(".`+props.canteenType+`").css("background-color", "rgb(0,0,0)");
               $(".header.col-xs-12").css("color", "rgb(255,215,0)");
               $(".has_popup").css("color", "rgb(255,255,255)");
               $(".announcement").css("background-color", "rgb(255,215,0)");
               $(".announcement").css("color", "rgb(0,0,0)");
               $(".timeline").css("border-color", "rgb(255,215,0)");
               $(".pos").css("background-color", "rgb(255,215,0)");
               $(".bg").css("background-color", "rgb(255,255,255)");
               $(".start").css("color", "rgb(255,215,0)");
               $(".end").css("color", "rgb(255,215,0)");
               $(".closed").css("color", "rgb(255,215,0)");
               $(".page-row").css("background-color", "rgb(0,0,0)");
            }
         })
      `;
  return (
    <WebView
      style={{position:'relative', marginTop: -90}}
      source={{uri: 'http://jedalen.tuke.sk'}}
      onMessage={(event) => {}}
      injectedJavaScript={runFirst}
    />
  );
};

export default CanteenView;
