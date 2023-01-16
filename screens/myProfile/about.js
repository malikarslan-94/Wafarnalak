import React, { useEffect, useState } from "react";
import {
  Platform,
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Linking,
  BackHandler,
} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Text,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import getEnvVars from '../../environment';
import CustomHeader from "../../components/CustomHeader/Index"
const { apiUrl } = getEnvVars();
const AboutScreen = ({ navigation }) => {


  // export default class AboutScreen extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     state = {
  //       clicked: "",
  //       about: {},
  //       lan: "en",
  //     };
  //   }

  const [about, setAbout] = useState()
  const [lan, setLan] = useState("en")

  useEffect(() => {
    // API call
    fetch(
      `${apiUrl}/about`,
      // "http://app.xn--mgbt1ckekl.com/api/cu/v.3/app/about",
      // "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/testApi/V1/about",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("aboutRj", responseJson);
        setAbout(responseJson)
        setLan(navigation.getParam("lan"))
        // setState({ about: responseJson, lan: navigation.getParam("lan") });
      })
      .catch((error) => { console.log("About API error", error) });

    BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButtonClick
    );
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    }
  }, [])



  // componentDidMount = () => {
  //   const { navigation } = props;

  //   // API call
  //   fetch(
  //     `${apiUrl}/about`,
  //     // "http://app.xn--mgbt1ckekl.com/api/cu/v.3/app/about",
  //     // "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/testApi/V1/about",
  //     {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       console.log("aboutRj", responseJson);
  //       setState({ about: responseJson, lan: navigation.getParam("lan") });
  //     })
  //     .catch((error) => { });

  //   BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     handleBackButtonClick
  //   );
  // };


  const handleBackButtonClick = () => {
    navigation.goBack();
    return true;
  };
  // componentWillUnmount = () => {
  //   BackHandler.removeEventListener(
  //     "hardwareBackPress",
  //     handleBackButtonClick
  //   );
  // };
  const showPrivacyPolicy = async (lan) => {
    if (lan === "en") {
      WebBrowser.openBrowserAsync(about.privacy_policy.en_url);
    } else {
      WebBrowser.openBrowserAsync(about.privacy_policy.ar_url);
    }
  };
  const showTermsAndCondition = (lan) => {
    if (lan === "en") {
      WebBrowser.openBrowserAsync(about.terms_conditions.en_url);
    } else {
      WebBrowser.openBrowserAsync(about.terms_conditions.ar_url);
    }
  };
  const showAboutUs = (lan) => {
    if (lan === "en") {
      WebBrowser.openBrowserAsync(about.about_us.en_url);
    } else {
      WebBrowser.openBrowserAsync(about.about_us.en_url);
    }
  };
  // const { navigation } = props;
  return (
    <View style={{ flex: 1 }}>
      <CustomHeader
        lan={lan}
        Title_en={"About Wafarnalak"}
        Title_ar={"عن"}
        navigation={navigation}
      />
      {/* <Header
        style={{
          marginTop: 0,
          backgroundColor: "white",
          height: 60,
          borderBottomColor: "#0866b0",
          borderBottomWidth: 1,
          justifyContent: "center",
        }}
      >
        <Left style={{ marginLeft: 10 }}>
          {lan === "en" ? (
            <Ionicons
              onPress={() => {
                navigation.goBack();
              }}
              name={"chevron-back-outline"}
              size={40}
              color={"#0866b0"}
            />
          ) : (
            <Ionicons
              onPress={() => {
                navigation.goBack();
              }}
              name={"chevron-forward-outline"}
              size={40}
              color={"#0866b0"}
            />
          )}
        </Left>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            position: Platform.OS === "android" ? "absolute" : "relative",
            alignSelf: "center",
          }}
        >
          <Title
            style={{
              fontFamily: lan == "en" ? "Montserrat_semiBold" : "montserrat_arabic_regular",
              color: "#0866b0",
              fontSize: lan === "en" ? 18 : 13,
            }}
          >
            {lan == "en" ? "About" : "عن"}
          </Title>

        </View>
        <Right />
      </Header> */}

      <View>
        <ImageBackground
          source={require("../../assets/background-images/Category-Background-Image.png")}
          resizeMode="cover"
          style={{
            width: Dimensions.get("screen").width - 30,
            alignSelf: "center",
            height: Dimensions.get("screen").height - 60,
          }}
        >
          <View style={{ marginTop: Dimensions.get("screen").height / 4 }}>
            <TouchableOpacity onPress={() => showPrivacyPolicy(lan)}>
              <View
                style={{
                  width: Dimensions.get("screen").width - 60,
                  backgroundColor: "white",
                  alignSelf: "center",

                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 15,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#4a4b4c", fontFamily: lan == "en" ? "" : "montserrat_arabic_regular", fontSize: lan === "en" ? 15 : 11, }}>
                    {lan == "en"
                      ? "Privacy Policy"
                      : "سياسة الخصوصية"}
                  </Text>
                  <Ionicons
                    name={
                      lan == "en"
                        ? "chevron-forward-outline"
                        : "chevron-back-outline"
                    }
                    size={25}
                    color={"#0866b0"}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <View
              style={{
                width: Dimensions.get("screen").width - 60,
                height: 1,
                backgroundColor: "lightgray",
                alignSelf: "center",
              }}
            ></View>
            <TouchableOpacity onPress={() => showTermsAndCondition(lan)}>
              <View
                style={{
                  width: Dimensions.get("screen").width - 60,
                  backgroundColor: "white",
                  alignSelf: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 15,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#4a4b4c", fontFamily: lan == "en" ? "" : "montserrat_arabic_regular", fontSize: lan === "en" ? 15 : 11 }}>
                    {lan == "en"
                      ? "Terms & Conditions"
                      : "الشروط والاحكام"}
                  </Text>
                  <Ionicons
                    name={
                      lan == "en"
                        ? "chevron-forward-outline"
                        : "chevron-back-outline"
                    }
                    size={25}
                    color={"#0866b0"}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <View
              style={{
                width: Dimensions.get("screen").width - 60,
                height: 1,
                backgroundColor: "lightgray",
                alignSelf: "center",
              }}
            ></View>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://وفرنالك.com");
              }}
            >
              <View
                style={{
                  width: Dimensions.get("screen").width - 60,
                  backgroundColor: "white",
                  alignSelf: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 15,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#4a4b4c", fontFamily: lan == "en" ? "" : "montserrat_arabic_regular", fontSize: lan === "en" ? 15 : 11, }}>
                    {lan == "en"
                      ? "Our Website"
                      : "موقعنا الإلكتروني"}
                  </Text>
                  <Ionicons
                    name={
                      lan == "en"
                        ? "chevron-forward-outline"
                        : "chevron-back-outline"
                    }
                    size={25}
                    color={"#0866b0"}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <View
              style={{
                width: Dimensions.get("screen").width - 60,
                height: 1,
                backgroundColor: "lightgray",
                alignSelf: "center",
              }}
            ></View>
            <TouchableOpacity
              onPress={() => {
                showAboutUs(lan);
              }}
            >
              <View
                style={{
                  width: Dimensions.get("screen").width - 60,
                  backgroundColor: "white",
                  alignSelf: "center",
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 15,
                    alignItems: "center",
                  }}
                >
                  <Text style={{
                    color: "#4a4b4c", fontFamily: lan == "en" ? "" : "montserrat_arabic_regular", fontSize: lan === "en" ? 15 : 11,
                  }}>
                    {lan == "en" ? "About Us" : "عنا"}
                  </Text>
                  <Ionicons
                    name={
                      lan == "en"
                        ? "chevron-forward-outline"
                        : "chevron-back-outline"
                    }
                    size={25}
                    color={"#0866b0"}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <View style={{ marginTop: 60 }}>
              <Text style={{
                alignSelf: "center", color: "#4a4b4c", fontFamily: lan == "en" ? "" : "montserrat_arabic_regular", fontSize: lan === "en" ? 15 : 11,
              }}>
                {lan == "en" ? "Follow Us on" : "تابعونا على"}
              </Text>


              <View style={{ alignSelf: "center", flexDirection: "row" }}>
                <View>
                  <Ionicons
                    onPress={() => {
                      Linking.openURL("https://www.facebook.com/wafarnalak/");
                    }}
                    name="logo-facebook"
                    size={35}
                    color="blue"
                  />
                </View>
                <View style={{ marginLeft: 20, marginRight: 20 }}>
                  <Ionicons
                    onPress={() => {
                      Linking.openURL("https://twitter.com/wafarnalak");
                    }}
                    name="logo-twitter"
                    size={35}
                    color="skyblue"
                  />
                </View>
                <View style={{ marginRight: 20 }}>
                  <Ionicons
                    onPress={() => {
                      Linking.openURL(
                        "https://www.instagram.com/wafarnalak/"
                      );
                    }}
                    name="logo-instagram"
                    size={35}
                    color="black"
                  />
                </View>
                <View>
                  <Ionicons
                    onPress={() => {
                      Linking.openURL(
                        "https://www.youtube.com/channel/UCIRIzrrUlFh47G8kCQXfCtw"
                      );
                    }}
                    name="logo-youtube"
                    size={35}
                    color="red"
                  />
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

export default AboutScreen
