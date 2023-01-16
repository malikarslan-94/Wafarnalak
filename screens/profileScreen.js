import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Platform,
  Dimensions,
  Modal,
  Alert,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage,
  I18nManager,
  ScrollView,
} from "react-native";
import { connect } from 'react-redux'

import {
  Container,
  Accordion,
  Toast,
  Title,
  Header,
  Content,
  Thumbnail,
  Button,
  Text,
  Badge,
  Left,
  Right,
} from "native-base";
import * as StoreReview from "expo-store-review";
import { Ionicons } from "@expo/vector-icons";
import * as Updates from "expo-updates";
import * as Notifications from "expo-notifications";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationEvents } from "react-navigation";
import * as Analytics from "expo-firebase-analytics";
// import ReferalModal from "../components/Modal/Index"
import Footer from "../components/Footer/Index"
import { scaleSize, widthPerc } from "../mixin";
import { authActions } from "../redux/actions";
import CustomHeader from "../components/CustomHeader/Index"
// My Profile Screen


const profileScreen = ({ navigation }) => {

  // class ProfileSecreen extends React.Component {
  // constructor(props) {
  //   super(props);
  //   state = {
  //     isLogin: false,
  //     modalVisible: false,
  //     lan: "en",
  //     user: {},
  //     cartItem: 0,
  //     location: "",
  //     cartData: undefined,
  //     sessionId: undefined
  //   };
  // }
  const [isLogin, setIsLogin] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [lan, setLan] = useState("")
  const [user, setUser] = useState()
  const [cartItem, setCartItem] = useState(0)
  const [location, setLocation] = useState("")
  const [cartData, setCartData] = useState(undefined)
  const [sessionId, setSessionId] = useState(undefined)



  useEffect(() => {
    (async () => {
      let getJobs = await AsyncStorage.getItem("jobs");
      let user = await AsyncStorage.getItem("user");
      if (user !== null) {
        setCartItem(navigation.getParam("cartItem"))
        setCartData(JSON.parse(getJobs))
        setUser(JSON.parse(user))
        setIsLogin(true)
        setLan(navigation.getParam("lan"))
        setLocation(navigation.getParam("location"))
        sessionId(navigation.getParam("sessionId"))
      } else {
        sessionId(navigation.getParam("sessionId"))
        setCartData(JSON.parse(getJobs))
        setLan(navigation.getParam("lan"))
      }
    })()


  }, [])
  useEffect(() => {
    setLan(navigation.getParam("lan"))
  }, [navigation])



  // componentDidMount = async () => {
  //   const { navigation } = props;
  //   let getJobs = await AsyncStorage.getItem("jobs");

  //   let user = await AsyncStorage.getItem("user");
  //   if (user !== null) {
  //     setState({
  //       cartItem: navigation.getParam("cartItem"),
  //       cartData: JSON.parse(getJobs),
  //       user: JSON.parse(user),
  //       isLogin: true,
  //       lan: navigation.getParam("lan"),
  //       location: navigation.getParam("location"),
  //       sessionId: navigation.getParam("sessionId")
  //     });
  //   } else {

  //     setState({
  //       sessionId: navigation.getParam("sessionId"),
  //       lan: navigation.getParam("lan"),
  //       cartData: JSON.parse(getJobs),
  //     });
  //   }
  // };
  const useEffectRepeat = async () => {
    let getJobs = await AsyncStorage.getItem("jobs");
    let user = await AsyncStorage.getItem("user");
    if (user !== null) {
      setCartItem(navigation.getParam("cartItem"))
      setCartData(JSON.parse(getJobs))
      setUser(JSON.parse(user))
      setIsLogin(true)
      setLan(navigation.getParam("lan"))
      setLocation(navigation.getParam("location"))
      sessionId(navigation.getParam("sessionId"))
    } else {
      sessionId(navigation.getParam("sessionId"))
      setCartData(JSON.parse(getJobs))
      setLan(navigation.getParam("lan"))
    }

  }

  const logoutUser = async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("jobs");
    await AsyncStorage.removeItem("address");
    //onUserLogout()
    setIsLogin(false)
    setCartItem(0)
    setCartData(undefined)
    navigation.getParam("clearCart")(sessionId)
    // clearCart(sessionId);
  };
  const authenticateUser = () => {
    navigation.navigate("Login", { lan: lan });
  };
  const displayLanguageModal = () => {
    setModalVisible(true)
  };
  const hideModal = () => {
    setModalVisible(false)
  };
  const likeForense = () => {
    if (lan === "en") {
      Alert.alert(
        "Would you mind rating Wafarnalak?",
        "It wont take more than a minute and helps to promote our app. Thanks for your support!",
        [
          { text: "RATE IT NOW", onPress: () => StoreReview.requestReview() },
          {
            text: "REMIND ME LATER",

            style: "cancel",
          },
          {
            text: "NO, THANKS",

            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "هلا تفضلت بتقييم وفرنا لك ؟",
        "لن يستغرق الأمر اكثر من دقيقة والذي بدوره سيسهم في تحسين تطبيقنا، شكراً لدعمك",
        [
          {
            text: "ذكرني بوقت اخر",

            style: "cancel",
          },
          {
            text: "لا، شكراً",

            style: "cancel",
          },
          { text: "تقييم الآن", onPress: () => StoreReview.requestReview() },
        ],
        { cancelable: false }
      );
    }
  };
  const rateForense = () => {
    if (lan === "en") {
      Alert.alert(
        "Do you like using Wafarnalak?",
        "",
        [
          {
            text: "Ask me later",
          },
          {
            text: "Not Really",

            style: "cancel",
          },
          {
            text: "Yes!",
            onPress: () => likeForense(),
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "هل احببت استخدام وفرنا لك ؟",
        "",
        [
          {
            text: "ذكرني بوقت اخر",
          },
          {
            text: "ليس صحيحاً",

            style: "cancel",
          },
          {
            text: "نعم",
            onPress: () => likeForense(),
          },
        ],
        { cancelable: false }
      );
    }
  };
  const navigationSetup = async (option) => {
    if (option == 1) {
      navigation.navigate("LandingSecreen", { lan: lan });
    }
    if (option == 3) {
      // if (cartItem > 0) {
      //   if (
      //     location == "Riyadh" ||
      //     location == "Al-Kharj"
      //   ) {
      navigation.navigate("MyCart", {
        lan: lan,
        isPackage: false,
        manualy: false,
      });
      await Analytics.logEvent("Cart", {
        name: "Cart",
        isPackage: false,
        screen: "myProfileScreen",
        purpose: "checkout order from myProfile screen",
      });
      //   } else {
      //     Toast.show({
      //       text:
      //         lan == "en"
      //           ? "Sorry, currently we are not delivering services in your city, soon we will be with you"
      //           : "سلة الطلبات فارغة",
      //       position: "bottom",
      //     });
      //   }
      // } else {
      //   Toast.show({
      //     text:
      //       lan == "en" ? "Your cart is empty" : "سلة الطلبات فارغة",
      //     position: "bottom",
      //   });
      // }
    }
    if (option == 2) {
      navigation.navigate("MyOrders", {
        cartItem: cartItem,
        lan: lan,
      });
    }
  };

  const changetoEnglish = async () => {
    await AsyncStorage.setItem("lan", "en");
    I18nManager.isRTL = false;
    I18nManager.forceRTL(false);
    await Updates.reloadAsync();
    //updateLanguage(1);
  };
  const changetoArabic = async () => {
    await AsyncStorage.setItem("lan", "ar");
    I18nManager.isRTL = true;
    I18nManager.forceRTL(true);
    await Updates.reloadAsync();
    //updateLanguage(2);
  };

  return (
    // Profile Screen UI
    <View style={{
      flex: 1, opacity: modalVisible ? 0.6 : 1,
    }}>
      <CustomHeader
        lan={lan}
        Title_en={isLogin == true ? "My Profile" : "About"}
        Title_ar={isLogin == true ? "ملفي الشخصي" : "المزيد"}
        navigation={navigation}
      />
      {/* <View
        style={{
          width: "100%",
          borderBottomWidth: 2,
          borderBottomColor: "#0866b0",
          backgroundColor: "#ffffff",
          height: 60,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flex: 2,
            justifyContent: "center",
            alignItems: "center",
            position: Platform.OS === "android" ? "absolute" : "relative",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              fontFamily: lan == "en" ? "" : "montserrat_arabic_regular",
              color: "#0866b0",
              fontSize: lan == "en" ? 18 : 12,
            }}
          >
            {isLogin == true
              ? lan == "en"
                ? "My Profile"
                : "ملفي الشخصي"
              : lan == "en"
                ? "About"
                : "المزيد"}
          </Text>
        </View>
      </View> */}
      {
        <NavigationEvents
          onWillFocus={() => {
            useEffectRepeat()
          }}
        />
      }
      <View
        style={{
          width: Dimensions.get("screen").width,
          height: Dimensions.get("screen").height - 100,
        }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {/* <LinearGradient
              colors={["#0764af", "#6ea8cd"]}
              start={[0.9, 0.2]}
              end={[0.1, 0.1]}
              style={{
                width: Dimensions.get("screen").width,
                height: Dimensions.get("screen").height,
              }}
            > */}
          <ImageBackground
            source={require("../assets/Profile-Image-min.png")}
            style={{
              width: widthPerc(100),
              height: scaleSize(210),
              alignSelf: "center",
              marginTop: scaleSize(-30),
            }}
            resizeMode="contain"
          >
            {/* <View
                style={{
                  position: "absolute",
                  right: 10,
                  // top: Platform.OS === "ios" ? 10 : 22,
                }}
              > */}

            <ImageBackground
              source={require("../assets/Logo-min_profile.png")}
              style={{
                width: widthPerc(40), height: 30, position: "absolute", top: "45%", left: "30%"
              }}
            // resizeMode="contain"
            />


          </ImageBackground>

          {isLogin === true ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: "white", textAlign: "center", color: "#0865b0", fontSize: 18, fontFamily: "Montserrat_semiBold" }}>
                Welcome {user?.name}
              </Text>

              {/* ...........line................ */}
              <View style={{ height: scaleSize(2), backgroundColor: "#0865b0", width: widthPerc(90), marginVertical: scaleSize(15) }} />
            </View>
          ) : (
            <View></View>
          )
          }
          <View
            style={{
              // backgroundColor: "white",
              width: Dimensions.get("screen").width,
              marginTop: 10,

              // borderRadius: 12,
              alignSelf: "center",
              paddingHorizontal: scaleSize(20)
            }}
          >
            {isLogin === true ? (
              <TouchableOpacity
                style={{ marginVertical: scaleSize(3) }}
                onPress={() =>
                  navigation.navigate("ProfileUpdate", {
                    user: user,
                    lan: lan,
                    logoutUser: logoutUser
                  })
                }
              >
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      margin: 12,
                      // backgroundColor: "white",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={require("../assets/Profile-icon-min-profile.png")}
                        style={{ width: 30, height: 30 }}
                        resizeMode="contain"
                      />
                      <Text
                        style={{
                          paddingTop: 4,
                          marginLeft: 16,
                          fontSize: lan == "en" ? 14 : 11,
                          color: "#404040",
                          fontFamily: lan == "en" ? "" : "montserrat_arabic_regular",
                        }}
                      >
                        {lan == "en" ? "Profile" : "ملفي الشخصي"}
                      </Text>
                    </View>
                    <View style={{ paddingTop: 5 }}>
                      <Ionicons
                        name={
                          lan == "en"
                            ? "chevron-forward-outline"
                            : "chevron-back-outline"
                        }
                        size={24}
                        color={"#404040"}
                      />
                    </View>
                  </View>

                </View>
              </TouchableOpacity>
            ) : (
              <View></View>
            )}
            <TouchableOpacity onPress={displayLanguageModal}
              style={{ marginVertical: scaleSize(3) }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 12,
                  // backgroundColor: "white",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={require("../assets/Language-min-profile.png")}
                    style={{ width: 30, height: 30 }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      paddingTop: 4,
                      marginLeft: 16,
                      fontSize: lan == "en" ? 14 : 11,
                      color: "#404040",
                      fontFamily: lan == "en" ? "" : "montserrat_arabic_regular",

                    }}
                  >
                    {lan == "en"
                      ? "Change Language"
                      : "تغيير اللغة"}
                  </Text>
                </View>
                <View style={{ paddingTop: 5 }}>
                  <Ionicons
                    name={
                      lan == "en"
                        ? "chevron-forward-outline"
                        : "chevron-back-outline"
                    }
                    size={24}
                    color={"#404040"}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginVertical: scaleSize(3) }}
              onPress={() =>
                navigation.navigate("HelpScreen", {
                  lan: lan,
                })
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 12,
                  // backgroundColor: "white",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={require("../assets/Help-min-profile.png")}
                    style={{ width: 30, height: 30 }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      paddingTop: 4,
                      marginLeft: 20,
                      color: "#404040",
                      fontSize: lan == "en" ? 14 : 11,
                      fontFamily: lan == "en" ? "" : "montserrat_arabic_regular",

                    }}
                  >
                    {lan == "en" ? "Help" : "مساعدة"}
                  </Text>
                </View>
                <View style={{ paddingTop: 5 }}>
                  <Ionicons
                    name={
                      lan == "en"
                        ? "chevron-forward-outline"
                        : "chevron-back-outline"
                    }
                    size={24}
                    color={"#404040"}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginVertical: scaleSize(3) }}
              onPress={() =>
                navigation.navigate("AboutScreen", {
                  lan: lan,
                })
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 12,
                  // backgroundColor: "white",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={require("../assets/About-Wafarnalak-min.png")}
                    style={{ width: 30, height: 30 }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      paddingTop: 4,
                      marginLeft: 20,
                      color: "#404040",
                      fontSize: lan == "en" ? 14 : 11,
                      fontFamily: lan == "en" ? "" : "montserrat_arabic_regular",

                    }}
                  >
                    {lan == "en"
                      ? "About Wafarnalak"
                      : "عن وفرنا لك"}
                  </Text>
                </View>
                <View style={{ paddingTop: 5 }}>
                  <Ionicons
                    name={
                      lan == "en"
                        ? "chevron-forward-outline"
                        : "chevron-back-outline"
                    }
                    size={24}
                    color={"#404040"}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={rateForense}
              style={{ marginVertical: scaleSize(3) }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 12,
                  // backgroundColor: "white",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={require("../assets/Rate-min-profile.png")}
                    style={{ width: 30, height: 30 }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      paddingTop: 4,
                      marginLeft: 20,
                      fontSize: lan == "en" ? 14 : 11,
                      color: "#404040",
                      fontFamily: lan == "en" ? "" : "montserrat_arabic_regular",

                    }}
                  >
                    {lan == "en"
                      ? "Rate Wafarnalak"
                      : "قيٌم وفرنا لك"}
                  </Text>
                </View>
                <View style={{ paddingTop: 5 }}>
                  <Ionicons
                    name={
                      lan == "en"
                        ? "chevron-forward-outline"
                        : "chevron-back-outline"
                    }
                    size={24}
                    color={"#404040"}
                  />
                </View>
              </View>
            </TouchableOpacity>

            {isLogin === true ? (
              <View style={{ marginVertical: scaleSize(3) }}
              >

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("MyOrdersSecreen")
                  }
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("PointsScreen", {
                        lan: lan,
                      })
                    }
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        margin: 12,
                        // backgroundColor: "white",
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <Image
                          source={require("../assets/Points-min-profile.png")}
                          style={{ width: 30, height: 30 }}
                          resizeMode="contain"
                        />
                        <Text
                          style={{
                            paddingTop: 4,
                            marginLeft: 20,
                            color: "#404040",
                            fontSize: lan == "en" ? 14 : 11,
                            fontFamily: lan == "en" ? "" : "montserrat_arabic_regular",

                          }}
                        >
                          {lan == "en"
                            ? "Wafarnalak Points"
                            : "نقاط وفرنا لك"}
                        </Text>
                      </View>
                      <View style={{ paddingTop: 5 }}>
                        <Ionicons
                          name={
                            lan == "en"
                              ? "chevron-forward-outline"
                              : "chevron-back-outline"
                          }
                          size={24}
                          color={"#404040"}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </TouchableOpacity>

              </View>
            ) : (
              <View></View>
            )}

            {/* {isLogin === true ? (
                <TouchableOpacity
                  onPress={() =>
                   navigation.navigate("ReferralScreen", {
                      user: user,
                      lan: lan,
                    })
                  }
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      margin: 12,
                      // backgroundColor: "white",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={require("../assets/Referral-min-profile.png")}
                        style={{ width: 30, height: 30 }}
                        resizeMode="contain"
                      />
                      <Text
                        style={{
                          paddingTop: 4,
                          marginLeft: 20,
                          color: "#404040",
                          fontSize: lan == "en" ? 14 : 11,
                          fontFamily: lan == "en" ? "" : "montserrat_arabic_regular",

                        }}
                      >
                        {lan == "en"
                          ? "Wafarnalak Referral"
                          : "إحالة وفرنا لك (رمز الدعوة)"}
                      </Text>
                    </View>
                    <View style={{ paddingTop: 5 }}>
                      <Ionicons
                        name={
                          lan == "en"
                            ? "chevron-forward-outline"
                            : "chevron-back-outline"
                        }
                        size={24}
                        color={"#404040"}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              ) : (
                <View></View>
              )} */}
          </View>
          {isLogin === false ? (
            <TouchableOpacity onPress={authenticateUser}>
              <View
                style={{
                  backgroundColor: "#6ea8cd",
                  borderRadius: 12,
                  width: Dimensions.get("screen").width - 120,
                  alignSelf: "center",
                  marginTop: 15,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    margin: 12,
                    alignSelf: "center",
                    fontSize: lan == "en" ? 17 : 10,
                    fontFamily: lan == "en" ? "" : "montserrat_arabic_regular",

                  }}
                >
                  {lan == "en" ? "Sign In" : "دخول"}
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View></View>
          )}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View
              style={{
                marginTop: 220,
                height: 255,
                borderRadius: 20,
                width: 350,
                backgroundColor: "#0764af",
                alignSelf: "center",
              }}
            >
              <View
                style={{ flex: 1, alignSelf: "center", marginTop: -24 }}
              >
                <Thumbnail source={require("../assets/Icon2.png")} />
              </View>
              <View style={{ position: "absolute", right: 6, top: 10 }}>
                <Ionicons
                  onPress={hideModal}
                  name="ios-close-circle-outline"
                  size={35}
                  color="red"
                />
              </View>
              <View
                style={{
                  alignSelf: "center",
                  position: "absolute",
                  top: 50,
                }}
              >
                {lan === "en" ? (
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    Select Language
                  </Text>
                ) : (
                  <Text
                    style={{

                      fontFamily: "montserrat_arabic_regular",
                      color: "white",
                      fontSize: 17,
                    }}
                  >
                    اختار اللغة
                  </Text>
                )}
              </View>
              <View
                style={{
                  alignSelf: "center",
                  position: "absolute",
                  top: 100,
                }}
              >
                <Button
                  style={{
                    width: 250,
                    borderRadius: 12,
                    height: 40,
                    backgroundColor: "#4e9fd1",
                    top: 0,
                  }}
                  onPress={changetoEnglish}
                >
                  <View
                    style={{
                      flex: 1,
                      alignSelf: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "white" }}>English</Text>
                  </View>
                </Button>
                <Button
                  style={{
                    width: 250,
                    borderRadius: 12,
                    height: 40,
                    backgroundColor: "#4e9fd1",
                    top: 14,
                  }}
                  onPress={changetoArabic}
                >
                  <View
                    style={{
                      flex: 1,
                      alignSelf: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "montserrat_arabic_regular",

                        alignItems: "center",
                      }}
                    >
                      العربية
                    </Text>
                  </View>
                </Button>
              </View>
            </View>
          </Modal>
          {/* </LinearGradient> */}
        </ScrollView>
      </View>


      <Footer
        cartData={cartData}
        calledFromProfile={true}
        lan={lan}
        user={user}
        selectedServices={cartItem}
        navigationSetup={navigationSetup}
      />
    </View>
  );
}

export default profileScreen
