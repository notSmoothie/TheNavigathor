import React from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';

const CanteenView = (props) => {
  const runFirst =
    `  $(document).ready(function(){
          $("div").css( "display", "none" ); 
          $(".container").css("display", "block"); 
          $(".jedalne").css("display", "block"); 
          $(".col-md-4").css("display", "block");
          $(".` +
    props.canteenType +
    `").eq(` +
    props.order +
    `).css("display", "block"); 
          $("h2").css("display", "block");
          $(".` +
    props.canteenType +
    `").eq(` +
    props.order +
    `).children().css("display", "block"); 
          $(".` +
    props.canteenType +
    `").eq(` +
    props.order +
    `).children().children().css("display", "block");
          $(".` +
    props.canteenType +
    `").eq(` +
    props.order +
    `).children().children().children().css("display", "block");
          $(".` +
    props.canteenType +
    `").eq(` +
    props.order +
    `).children().children().children().children().css("display", "block");
          $(".` +
    props.canteenType +
    `").eq(` +
    props.order +
    `).children().children().children().children().children().css("display", "block");
          $(".` +
    props.canteenType +
    `").eq(` +
    props.order +
    `).children().children().children().children().children().children().css("display", "block");
          $("a").css("display", "none"); 
          $(".actualize-info").css("display", "none"); 
       })
    `;
  return (
    <WebView
      style={{position:'relative', marginTop: -90}}
      source={{uri: 'http://jedalen.tuke.sk'}}
      startInLoadingState={true}
      renderLoading={() => <></>}
      onMessage={(event) => {}}
      injectedJavaScript={runFirst}
    />
  );
};

export default CanteenView;
