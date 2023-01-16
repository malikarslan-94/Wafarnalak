import * as Analytics from "expo-firebase-analytics";
import * as Permissions from "expo-permissions";
import * as Facebook from 'expo-facebook';
import { FACEBOOK_APP_CONFIG } from "../config/facebook"

import {
  AsyncStorage,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Linking,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  Body,
  Button,
  Container,
  Content,
  Icon,
  Input,
  Item,
  Text,
  Thumbnail,
  Title,
  Toast,
} from "native-base";
import { connect } from 'react-redux'
import Constants from 'expo-constants';
import { Ionicons } from "@expo/vector-icons";
import * as Updates from "expo-updates";
import * as Notifications from "expo-notifications";
import React from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { authActions } from "../redux/actions";
import getEnvVars from '../environment';
const { apiUrl } = getEnvVars();

let persianNumbers = [
  /۰/g,
  /۱/g,
  /۲/g,
  /۳/g,
  /۴/g,
  /۵/g,
  /۶/g,
  /۷/g,
  /۸/g,
  /۹/g,
];
let arabicNumbers = [
  /٠/g,
  /١/g,
  /٢/g,
  /٣/g,
  /٤/g,
  /٥/g,
  /٦/g,
  /٧/g,
  /٨/g,
  /٩/g,
];
// let arabicNumbers = [
//   /0/g,
//   /1/g,
//   /2/g,
//   /3/g,
//   /4/g,
//   /5/g,
//   /6/g,
//   /7/g,
//   /8/g,
//   /9/g
// ];

function mapStateToProps(state) {
  return {
    userProfile: state.auth
  }
}
function mapDispatchToProps(dispatch) {
  return {
    onUserLogin: (user) => dispatch(authActions.user(user))
  }
}
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      otp: "",
      token: "N/A",
      loading: false,
      lan: "en",
      referralCode: "",
      user: {},
      referralModalVisible: false,
      otpid: "",
    };
  }
  componentDidMount = () => {
    this.registerForPushNotificationAsync();
    const { navigation } = this.props;
    //let lan = navigation.getParam("lan");
    console.log(lan);
    if (navigation.getParam("lan") == undefined) {
      var lan = "en";
    } else {
      var lan = navigation.getParam("lan");
    }
    this.setState({ lan: lan });
  };


  //    registerForPushNotificationsAsync = async () => {
  //     let newNotificationId;
  //     if (Constants.isDevice) {
  //         const { status: existingStatus } = await Notifications.getPermissionsAsync();
  //         let finalStatus = existingStatus;
  //         if (existingStatus !== 'granted') {
  //             const { status } = await Notifications.requestPermissionsAsync();
  //             finalStatus = status;
  //         }
  //         if (finalStatus !== 'granted') {
  //             alert('Failed to get push token for push notification!');
  //             return;
  //         }
  //         newNotificationId = (await Notifications.getExpoPushTokenAsync()).data;
  //         if (newNotificationId && userProfile?.notificationId !== newNotificationId) {
  //             await AuthServices.firebaseServices.updateUserProfile({ notificationId: newNotificationId }, userProfile.uid);
  //             let updatedProfile = { ...userProfile, notificationId: newNotificationId }
  //             dispatch(authActions.signIn(updatedProfile))
  //             await AuthServices.localStorage.setLocalUserProfile(updatedProfile)
  //         }
  //         console.log({ newNotificationId, oldID: userProfile?.notificationId });

  //     } else {
  //         alert('Must use physical device for Push Notifications');
  //     }

  //     if (Platform.OS === 'android') {
  //         Notifications.setNotificationChannelAsync('default', {
  //             name: 'default',
  //             importance: Notifications.AndroidImportance.MAX,
  //             vibrationPattern: [0, 250, 250, 250],
  //             lightColor: '#FF231F7C',
  //         });
  //     }

  //     return newNotificationId;
  // }






  registerForPushNotificationAsync = () => {
    console.log("registerForPushNotificationAsync--->")
    this.registerForPushNotificationsAsync();
    console.log("token->>>>>", this.state.token)
    return

  };
  registerForPushNotificationsAsync = async () => {
    let token;
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      // this.setState({token:"N/A"});
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    this.setState({ token });

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
      });
    }

  };

  // const { status: existingStatus } = await Permissions.getAsync(
  //   Permissions.NOTIFICATIONS
  // );

  // let finalStatus = existingStatus;


  // const { status: existingStatus } = await Notifications.getPermissionsAsync();
  // let finalStatus = existingStatus;

  // if (existingStatus !== "granted") {
  //   console.log("existingStatus !== granted")
  //   const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //   finalStatus = status;
  // }

  // if (existingStatus !== 'granted') {
  //   const { status } = await Notifications.requestPermissionsAsync();
  //   finalStatus = status;
  // }
  // if (finalStatus !== "granted") {
  //   console.log("finalStatus !== granted")
  //   return;
  // }

  // if (finalStatus !== 'granted') {
  //   alert('Failed to get push token for push notification!');
  //   return;
  // }

  // let token = (await Notifications.getExpoPushTokenAsync()).data;
  // console.log("token-------------------->>", token);
  // this.setState({ token: token })

  // let token = await Notifications.getExpoPushTokenAsync();
  // console.log("token-------------------->>", token.data);
  // this.setState({ token: token.data });

  // if (Platform.OS === 'android') {
  //   Notifications.setNotificationChannelAsync('default', {
  //     name: 'default',
  //     importance: Notifications.AndroidImportance.MAX,
  //     vibrationPattern: [0, 250, 250, 250],
  //     lightColor: '#FF231F7C',
  //   });
  // }



  // return token;

  // if (Device.isDevice) {
  //   const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  //   let finalStatus = existingStatus;
  //   if (existingStatus !== 'granted') {
  //     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //     finalStatus = status;
  //   }
  //   if (finalStatus !== 'granted') {
  //     alert('Failed to get push token for push notification!');
  //     return;
  //   }
  //   const expotoken = await Notifications.getExpoPushTokenAsync();
  //   console.log(expotoken);
  //   this.setState({ token: expotoken });
  // } else {
  //   alert('Must use physical device for Push Notifications');
  // }

  // if (Platform.OS === 'android') {
  //   Notifications.createChannelAndroidAsync('default', {
  //     name: 'default',
  //     sound: true,
  //     priority: 'max',
  //     vibrate: [0, 250, 250, 250],
  //   });
  // }


  // registerForPushNotificationsAsync = async () => {
  //   let token;
  //   if (Constants.isDevice) {
  //     const { status: existingStatus } = await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== 'granted') {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== 'granted') {
  //       alert('Failed to get push token for push notification!');
  //       return;
  //     }
  //     token = (await Notifications.getExpoPushTokenAsync()).data;
  //     console.log(token);
  //   } else {
  //     alert('Must use physical device for Push Notifications');
  //   }

  //   if (Platform.OS === 'android') {
  //     Notifications.setNotificationChannelAsync('default', {
  //       name: 'default',
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: '#FF231F7C',
  //     });
  //   }

  //   return token;
  // }



  verifyReferral = () => {
    if (this.state.referralCode !== "") {
      fetch(
        //"http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/verify_customer_login_otp",
        // "http://app.xn--mgbt1ckekl.com/api/cu/v.3/app/verify_otp",
        `${apiUrl}/verify_otp`,

        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            otpid: this.state.otpid,
            otpentered: this.state.referralCode,
          }),
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.error == false) {
            console.log("verify", responseJson);
            this.saveUserInformation(responseJson);
            // Toast.show({
            //   text: responseJson.message,
            //   position: "bottom",
            //   duration: 3000
            // });
          } else {
            Toast.show({
              text: responseJson.message,
              position: "bottom",
              duration: 3000,
            });
          }

          this.setState({ loading: false });
        })
        .catch((error) => { });
    } else {
      Toast.show({
        text:
          this.state.lan === "en"
            ? "Please enter referral code, if any?"
            : "يرجى ادخال رمز الدعوة، اذا موجود؟",
        position: "bottom",
      });
    }
  };
  saveUserInformation = async (user) => {
    console.log("save user info > ", user);
    await Analytics.setUserProperties({
      ["userId"]: user.customerid.toString(),
    });
    await Analytics.setUserProperty("email", user.email);
    await Analytics.setUserProperty("userMobile", user.mobile.toString());
    try {
      this.props.onUserLogin(user)
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (error) { }
    if (this.state.referralModalVisible == true) {
      this.setState({ referralModalVisible: false });
    }
    this.setState({
      loading: false,
      user: user,
      referralModalVisible: false
    });

    let userObj = this.props.navigation.getParam("user");
    console.log("Obj");
    console.log(user);
    if (this.props.navigation.getParam("goToHelp") == true) {
      this.props.navigation.navigate("Chat", {
        user,
        noGoBackLogin: true,
      });
      console.log("True");
    } else {
      this.props.navigation.goBack();
      console.log("False");
      console.log(this.props.goBack);
    }
  };
  hideReferralModal = () => {
    this.saveUserInformation(this.state.user);
  };

  // Login Function
  loginUser = async () => {
    this.setState({ loading: true })
    if (
      this.state.mobile !== "" &&
      this.state.mobile.charAt(0) == 0 &&
      this.state.mobile.charAt(1) == 5 &&
      this.state.mobile.length == 10 //10
    ) {
      await Analytics.logEvent("Login", {
        name: "Login",
        screen: "loginScreen",
        purpose: "loggin in",
        login_number: this.state.mobile.toString(),
      });
      await Facebook.initializeAsync(
        FACEBOOK_APP_CONFIG
      );
      const res = await Facebook.logEventAsync("login", {
        name: "Login",
        screen: "loginScreen",
        purpose: "loggin in",
        login_number: this.state.mobile.toString(),
      })
      console.log("Token------------------>", this.state.token)
      let sendToken = true;
      // ...................check not to send token if running on local server ......
      if (Constants.appOwnership === 'expo' || Constants.experienceUrl.includes('malikarslan-94')) {
        sendToken = false
      }
      fetch(
        //"http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/customer_login",
        // "http://app.xn--mgbt1ckekl.com/api/cu/v.3/app/login",
        `${apiUrl}/login`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile: this.state.mobile,
            customerdeviceid: sendToken ? this.state.token : '',
          }),
        }
      )
        // .then((response) => {
        //   //console.log("test", response.json());
        //   // console.log("token", this.state.token);
        //   response.json();
        // })
        .then((response) => response.json())

        .then((responseJson) => {
          if (responseJson.error === false) {
            console.log("json data==>", responseJson);

            this.setState({
              // fisttime: responseJson.firsttime,
              // user: responseJson,
              // referralModalVisible: responseJson.firsttime == 1 ? true : false,
              // referralModalVisible: true,
              // otpid: responseJson.otpid,
              loading: false,
            });
            this.saveUserInformation(responseJson);

          } else {
            Toast.show({
              text: "Login Error" + responseJson.message,
              position: "bottom",
            });
            this.setState({ loading: false });
          }
        })
        .catch((error) => {
          Toast.show({
            text: error.message,
            position: "bottom",
          });
          this.setState({ loading: false });
        });
    } else {
      Toast.show({
        text:
          this.state.lan === "en"
            ? "Please enter your valid mobile number!"
            : "يرجى إدخال رقم الجوال بشكل صحيح",
        position: "bottom",
      });
    }
  };
  openChat = () => {
    Linking.openURL("https://wa.me/+966577311430");
  };
  render() {
    return (
      <KeyboardAvoidingView
        behavior="position"
        style={{ flex: 1, backgroundColor: "#0866b0", opacity: this.state.referralModalVisible ? 0.6 : 1 }}
        keyboardVerticalOffset={4}
      >
        {/* <View style={{ backgroundColor: "#0866b0", flex: 1 }}> */}
        <Spinner visible={this.state.loading} textContent={""} />
        <View
          style={{
            alignSelf: "center",
            marginTop: 45,
            marginLeft: 7,
            marginRight: 7,
          }}
        >
          {this.state.lan == "en" ? (
            <Image
              style={{
                width: Dimensions.get("screen").width - 8,
                height: 278,
                alignSelf: "center",
              }}
              resizeMode="contain"
              source={require("../assets/login-screen-icons/comb-banner.png")}
            />
          ) : (
            <Image
              style={{
                width: Dimensions.get("screen").width - 8,
                height: 278,
                alignSelf: "center",
              }}
              resizeMode="contain"
              source={require("../assets/login-screen-icons/comb-banner-ar.png")}
            />
          )}

          <View
            style={{
              borderColor: "#9fc7db",
              backgroundColor: "#9fc7db",
              width: Dimensions.get("screen").width,
              height: 83,
            }}
          >
            {this.state.lan == "en" ? (
              <Image
                source={require("../assets/login-screen-icons/welcome-logo.png")}
                style={{ width: 190, height: 70, alignSelf: "center" }}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={require("../assets/login-screen-icons/Wellcome-Logo-min_ar.png")}
                style={{ width: 190, height: 70, alignSelf: "center" }}
                resizeMode="contain"
              />
            )}
          </View>
        </View>

        <View
          style={{
            marginTop: 50,
            width: Dimensions.get("screen").width - 40,
            height: 170,
            backgroundColor: "white",
          }}
        >
          <View style={{ flexDirection: "row", marginTop: 30 }}>
            <View style={{ marginTop: 15, marginLeft: 8 }}>
              <Image
                source={require("../assets/login-screen-icons/Mobile.png")}
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
              />
            </View>
            <Input
              style={{
                textAlign: this.state.lan == "en" ? "left" : "right",
                backgroundColor: this.state.referralModalVisible ? "transparent" : "white",
                paddingTop: 24,
              }}
              placeholder="05XXXXXXXX"
              placeholderTextColor="lightgray"
              keyboardType="phone-pad"
              returnKeyType="done"
              maxLength={10} //10
              onChangeText={(phone) => {
                // fixNumbers = phone => {
                if (typeof phone === "string") {
                  for (var i = 0; i < 10; i++) {
                    phone = phone.replace(arabicNumbers[i], i);
                  }
                }
                // return phone;
                this.setState({ mobile: phone.replace(/[^0-9]/g, "") });
                // };
              }}
            />
          </View>

          <View
            style={{
              marginLeft: 14,
              width: Dimensions.get("screen").width - 120,
              borderWidth: 0.5,
              borderColor: "#6ea8cd",
              backgroundColor: "#6ea8cd",
            }}
          ></View>

          {/* <View style={{ flexDirection: "row", marginTop: 15 }}>
              <View style={{ marginTop: 15, marginLeft: 8 }}>
                <Image
                  source={require("../assets/login-screen-icons/OTP.png")}
                  style={{ width: 30, height: 30 }}
                  resizeMode="contain"
                />
              </View>
              <Input
                style={{
                  textAlign: this.state.lan == "en" ? "left" : "right",
                  backgroundColor: "white",
                  paddingTop: 24
                }}
                placeholder={this.state.lan == "en" ? "Enter OTP" : "الكود"}
                placeholderTextColor="lightgray"
                keyboardType="phone-pad"
                returnKeyType="done"
                maxLength={4}
                onChangeText={otp => {
                  this.setState({ otp: otp.replace(/[^0-9]/g, "") });
                }}
              />
            </View> */}
          <View
            style={{
              marginLeft: 14,
              width: Dimensions.get("screen").width - 120,
              borderWidth: 0.5,
              borderColor: "#6ea8cd",
              backgroundColor: "#6ea8cd",
            }}
          ></View>
          {/* <View
              style={{ marginLeft: 14, flexDirection: "row", marginTop: 50 }}
            >
              <Text style={{ color: "lightgray", paddingTop: 6 }}>
                {this.state.lan == "en"
                  ? "Did'nt Received OTP?"
                  : "لم استلم الكود؟"}
              </Text>
              <TouchableOpacity onPress={this.openChat}>
                <Image
                  source={require("../assets/login-screen-icons/Call.png")}
                  style={{ width: 30, height: 30, marginLeft: 4 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View> */}
          <View
            style={{
              position: "absolute",
              right: -15,
              width: 46,
              top: -5,
              height: 245,
              backgroundColor: this.state.referralModalVisible ? "transparent" : "#0866b0",
              transform: [{ rotate: "6deg" }],
            }}
          ></View>
          <View>
            <Text
              style={{
                fontSize: this.state.lan == "en" ? 12 : 10,
                color: "lightgray",
                alignSelf: "center",
                marginTop: 12,
                fontFamily: this.state.lan == "en" ? "Montserrat_semiBold" : "montserrat_arabic_regular",
              }}
            >
              {this.state.lan == "en"
                ? "Please Enter Your Mobile Number Here"
                : "يرجى إدخال رقم جوالك"}
            </Text>
          </View>
          <TouchableWithoutFeedback onPress={this.loginUser}>
            <View style={{ position: "absolute", right: 0, bottom: 60 }}>
              {this.state.lan == "en" ? (
                <Image
                  source={require("../assets/login-screen-icons/Proceed-Button.png")}
                  style={{ width: 60, height: 60 }}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={require("../assets/login-screen-icons/Proceed-Icon-min_ar.png")}
                  style={{ width: 60, height: 60 }}
                  resizeMode="contain"
                />
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>

        {/* OTP Popup */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.referralModalVisible}
        >
          <View
            style={{
              marginTop: 150,
              alignSelf: "center",
              height: 235,
              borderRadius: 20,
              width: 330,
              backgroundColor: "#283a97",
            }}
          >
            <View style={{ flex: 1, alignSelf: "center", marginTop: -24 }}>
              <Thumbnail source={require("../assets/Icon2.png")} />
            </View>
            <View style={{ position: "absolute", right: 6, top: 8 }}>
              <Ionicons
                onPress={() => this.setState({ referralModalVisible: false })}
                name="ios-close-circle-outline"
                size={30}
                color="red"
              />
            </View>
            <View
              style={{ alignSelf: "center", position: "absolute", top: 70 }}
            >
              {this.state.lan === "en" ? (
                <Text
                  style={{
                    color: "white",
                    fontSize: 12,
                    alignSelf: "center",

                  }}
                >
                  Please enter the 4 digit OTP code.
                </Text>
              ) : (
                <Text
                  style={{
                    fontFamily: "montserrat_arabic_regular",
                    color: "white",
                    fontSize: this.state.lan == "en" ? 12 : 10,
                    alignSelf: "center",
                  }}
                >
                  أدخل الرمز 4 أرقام المرسل لجوالك
                </Text>
              )}

              <Input
                style={{
                  width: 160,
                  textAlign: "center",
                  height: 30,
                  backgroundColor: "white",
                  borderRadius: 2,
                  marginTop: 10,
                  alignSelf: "center",
                }}
                keyboardType="default"
                maxLength={4}
                returnKeyType="done"
                onChangeText={(ref) => {
                  if (typeof ref === "string") {
                    for (var i = 0; i < 10; i++) {
                      ref = ref.replace(arabicNumbers[i], i);
                    }
                  }
                  this.setState({ referralCode: ref });
                }}
                placeholderTextColor="#cdd0d4"
                // placeholder={this.state.lan === "en" ? "Code" : "رمز"}
                placeholder={this.state.lan === "en" ? "XXXX" : "XXXX"}
              />
              <Button
                onPress={this.verifyReferral}
                style={{
                  borderRadius: 15,
                  height: 32,
                  backgroundColor: "#6ea8cd",
                  top: 15,
                  alignSelf: "center",
                }}
              >
                <View>
                  {this.state.lan === "en" ? (
                    <Text style={{ color: "white", textAlign: "center" }}>
                      Login
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontFamily: "montserrat_arabic_regular",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      تسليم{" "}
                    </Text>
                  )}
                </View>
              </Button>
              {this.state.lan === "en" ? (
                <Text
                  style={{
                    fontSize: 10,
                    color: "white",
                    marginTop: 25,
                    flexWrap: "wrap",
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  {/* To proceed without a referral code, close the pop-up */}
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 10,
                    color: "white",
                    marginTop: 25,
                    flexWrap: "wrap",
                    flex: 1,
                    fontFamily: "montserrat_arabic_regular",
                    textAlign: "center",
                  }}
                >
                  {/* للإستمرار بدون رمز الدعوة، اغلق الشاشه المنبثقة */}
                </Text>
              )}
            </View>
          </View>
        </Modal>
        {/* </View> */}
      </KeyboardAvoidingView>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)