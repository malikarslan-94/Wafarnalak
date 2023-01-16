import { AppLoading, SplashScreen } from "expo";
import {
  AsyncStorage,
  Dimensions,
  I18nManager,
  Image,
  Platform,
  StyleSheet
} from "react-native";
import * as Updates from "expo-updates";

import * as Font from 'expo-font';
import * as Notifications from "expo-notifications";
import React, { useState } from "react";

import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import { Root } from "native-base";
// import * as firebase from "firebase";
console.disableYellowBox = true;

// Wafarnalak Splash Screen
export default class Splash extends React.Component {
  constructor() {
    super();
    this.state = {
      isSplashReady: false,
      isAppReady: false,
      lan: AsyncStorage.getItem("lan"),
      isUpdateAvailable: false
    };
    this.checkLangugae();
  }

  _cacheResourcesAsync = async () => {
    await Asset.loadAsync([
      require("../assets/icon.png"),
      require("../assets/Profile-Image.png"),
      require("../assets/Help-min.png"),
      require("../assets/Job-Icon-min.png")
    ])
    await Font.loadAsync({
      montserrat_extraBold: require("../assets/Fonts/English/Montserrat-ExtraBold.otf"),
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      montserrat_medium: require("../assets/Fonts/English/Montserrat-Medium.otf"),
      Montserrat_semiBold: require("../assets/Fonts/English/Montserrat_semiBold.otf"),
      montserrat_arabic_regular: require("../assets/Fonts/Arabic/ArbFONTS-Montserrat-Arabic-Regular.ttf")
    });

    // loadApp = () => {
    this.setState({ isAppReady: true });
    // };
    setTimeout(
      function () {
        this.loadApp();
      },
      Platform.OS === "android" ? 1800 : 2500
    );
  };
  componentDidMount = async () => {
    this._cacheResourcesAsync()
    Updates.checkForUpdateAsync().then(update => {
      if (update.isAvailable) {
        this.setState({ isUpdateAvailable: true });
        updateDownload = () => {
          Updates.reloadAsync();
        };
        setTimeout(function () {
          this.updateDownload();
        }, 5000);
      }
    });
    Notifications.setBadgeNumberAsync(0);
  };
  checkLangugae = async () => {
    let lan = await AsyncStorage.getItem("lan");
    console.log("lan in check functionr ", lan);
    this.setState({ lan: lan !== null ? lan : "en" });
    if (lan) {
      if (lan !== "en") {
        I18nManager.isRTL = true;
        I18nManager.forceRTL(true);
      } else {
        I18nManager.isRTL = false;
        I18nManager.forceRTL(false);
      }
    }
    if (lan !== null && lan !== "") {
      return lan;
    } else {
      return "en";
    }
  };
  renderSplash = async () => { };
  render() {
    // if (!this.state.isSplashReady) {
    //   return (
    //     <AppLoading
    //       startAsync={this._cacheSplashResourcesAsync}
    //       onFinish={() => this.setState({ isSplashReady: true })}

    //     />
    //   );
    // }
    if (this.state.isUpdateAvailable === true) {
      return (
        <Image
          style={{
            height: Dimensions.get("window").height,
            width: Dimensions.get("window").width
          }}
          // Updating Source Image
          source={require("../assets/updating.gif")}
          resizeMode="contain"
        />
      );
    }
    if (!this.state.isAppReady && !this.state.isUpdateAvailable) {
      if ("en" == this.state.lan) {
        console.log("checking language ", this.state.lan);
        return (
          <Image
            style={{
              height: Dimensions.get("window").height,
              width: Dimensions.get("window").width
            }}
            // Source Image Splash
            source={
              this.state.lan == "en"
                ? require("../assets/splash1.gif")
                : require("../assets/splash-ar1.gif")
            }
            resizeMode="contain"
            onLoadStart={this._cacheResourcesAsync}
          />
        );
      } else {
        return (
          <Image
            style={{
              height: Dimensions.get("window").height,
              width: Dimensions.get("window").width
            }}
            source={require("../assets/splash-ar1.gif")}
            resizeMode="contain"
            onLoadStart={this._cacheResourcesAsync}
          />
        );
      }
    }

    return this.props.navigation.navigate("LandingSecreen");
  }
}
