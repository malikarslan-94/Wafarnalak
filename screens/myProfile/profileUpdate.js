import React from "react";
import {
  View,
  ImageBackground,
  AsyncStorage,
  Platform,
  Dimensions,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Toast,
  Picker,
  Item,
  Input,
  Button,
  Left,
  Right,
  Text,
  Footer,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";
import { LinearGradient } from "expo-linear-gradient";
import { scaleSize } from "../../mixin";

export default class ProfileUpdateScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: "Male",
      name: "",
      email: "",
      mobile: "",
      customerid: "",
      user: {},
      lan: "en",
      loading: false,
    };
  }
  onValueChange(value) {
    this.setState({
      gender: value,
    });
  }
  componentDidMount = () => {
    const { navigation } = this.props;
    let user = navigation.getParam("user");
    let lan = navigation.getParam("lan");

    if (navigation.getParam("user")) {
      this.setState({
        lan: lan,
        user: user,
        customerid: user.customerid,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        gender:
          user.gender == 1
            ? "male"
            : user.gender == 0
              ? "female"
              : "Select Gender",
      });
    }
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  };
  Logout = () => {
    const { navigation } = this.props;
    let logoutUser = navigation.getParam("logoutUser");
    logoutUser();
    this.props.navigation.goBack();

  }
  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  };
  componentWillUnmount = () => {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  };
  updateUserObj = async (responseJson) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(responseJson));
    } catch (error) { }
    this.setState({ loading: false });
    this.props.navigation.navigate("Profile", { user: responseJson });
    //this.setState({ user: responseJson, customerid: responseJson.customerid, name: responseJson.name, email: responseJson.email, mobile: responseJson.mobile, gender: responseJson.gender === 1 ? 'male' : 'female' });
  };

  // Update Profile Button Functions
  updateProfile = () => {
    this.setState({ loading: true });
    fetch(
      "https://demo.xn--mgbt1ckekl.com//api/cu/v.3/app/update_customer_profile",
      //"http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/update_customer_profile",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // customerid: this.state.customerid,
          name: this.state.name,
          mobile: this.state.mobile,
          email: this.state.email,
          gender: this.state.gender === "male" ? 1 : 0,
        }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          console.log(responseJson, "TTx");
          this.updateUserObj(responseJson);
        } else {
          Toast.show({
            text: responseJson.message,
            position: "bottom",
          });
          this.setState({ loading: false });
        }
      })
      .catch((error) => { });
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
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
            {this.state.lan === "en" ? (
              <Ionicons
                onPress={() => {
                  this.props.navigation.goBack();
                }}
                name={"chevron-back-outline"}
                size={40}
                color={"#0866b0"}
              />
            ) : (
              <Ionicons
                onPress={() => {
                  this.props.navigation.goBack();
                }}
                name={"chevron-forward-outline"}
                size={40}
                color={"#0866b0"}
              />
            )}
          </Left>
          <View
            style={{
              flex: 3,
              justifyContent: "center",
              alignItems: "center",
              position: Platform.OS === "android" ? "absolute" : "relative",
              alignSelf: "center",
            }}
          >
            {this.state.lan === "en" ? (
              <Title style={{ color: "#0866b0", fontSize: 18 }}>
                Update Profile
              </Title>
            ) : (
              <Title
                style={{
                  fontFamily: "montserrat_arabic_regular",
                  textAlign: "left",
                  color: "#0866b0",
                  fontSize: 13,
                }}
              >
                ?????????? ?????????? ????????????
              </Title>
            )}
          </View>
          <Right />
        </Header>
        <View style={{ backgroundColor: "white" }}>
          <Spinner visible={this.state.loading} textContent={""} />
          <ImageBackground
            source={require("../../assets/background-images/Category-Background-Image.png")}
            resizeMode="cover"
            style={{
              width: Dimensions.get("screen").width - 30,
              height: Dimensions.get("screen").height - 140,
              alignSelf: "center",
            }}
          >
            <View style={{
              alignSelf: "center", paddingBottom: scaleSize(80),
            }}>
              <View
                style={{
                  marginTop: 50,
                  marginLeft: 24,
                  marginRight: 24,
                  borderWidth: 0,
                }}
              >
                {this.state.lan === "en" ? (
                  <Text style={{ color: "#0866b0" }}>Full Name</Text>
                ) : (
                  <Text
                    style={{
                      fontFamily: "montserrat_arabic_regular",
                      textAlign: "left",
                      color: "#0866b0",
                      fontSize: this.state.lan === "en" ? 13 : 12
                    }}
                  >
                    ?????????? ????????????
                  </Text>
                )}

                <Item regular>
                  <Input
                    onChangeText={(name) => {
                      this.setState({ name: name });
                    }}
                    value={this.state.name}
                    style={{
                      height: 34,
                      color: "#4a4b4c",
                      backgroundColor: "white",
                      textAlign: this.state.lan === "en" ? "left" : "right",
                    }}
                  />
                </Item>
              </View>
              <View
                style={{
                  marginTop: 20,
                  marginLeft: 24,
                  marginRight: 24,
                  borderWidth: 0,
                }}
              >
                {this.state.lan === "en" ? (
                  <Text style={{ color: "#0866b0" }}>Email Address</Text>
                ) : (
                  <Text
                    style={{
                      fontFamily: "montserrat_arabic_regular",
                      textAlign: "left",
                      color: "#0866b0",
                      fontSize: this.state.lan === "en" ? 13 : 12
                    }}
                  >
                    ?????????? ???????????? ????????????????????
                  </Text>
                )}

                <Item regular>
                  <Input
                    placeholder="Email"
                    placeholderTextColor={"#4a4b4c"}
                    style={{
                      height: 34,
                      color: "#4a4b4c",
                      backgroundColor: "white",
                      textAlign: this.state.lan === "en" ? "left" : "right",
                    }}
                    value={this.state.email}
                    onChangeText={(email) => {
                      this.setState({ email: email });
                    }}
                  />
                </Item>
              </View>
              <View
                style={{
                  marginTop: 20,
                  marginLeft: 24,
                  marginRight: 24,
                  borderWidth: 0,
                }}
              >
                {this.state.lan === "en" ? (
                  <Text style={{ color: "#0866b0" }}>Choose Gender</Text>
                ) : (
                  <Text
                    style={{
                      fontFamily: this.state.lan === "en" ? "" : "montserrat_arabic_regular",
                      textAlign: "left",
                      color: "0866b0",
                      fontSize: this.state.lan === "en" ? 13 : 12
                    }}
                  >
                    ?????? ??????????
                  </Text>
                )}

                <Item regular>
                  <Picker
                    mode="dropdown"
                    iosHeader={
                      this.state.lan === "en" ? "Choose Gender" : "?????? ??????????"
                    }
                    style={{
                      height: 34,
                      width: Dimensions.get("screen").width - 51,
                      borderRadius: 0,
                      color: "#4a4b4c",
                      backgroundColor: "white",

                    }}
                    selectedValue={this.state.gender}
                    onValueChange={this.onValueChange.bind(this)}
                  >
                    <Picker.Item
                      label={this.state.lan === "en" ? "Female" : "??????????"}
                      value="female"
                    />
                    <Picker.Item
                      label={this.state.lan === "en" ? "Male" : "??????????"}
                      value="male"
                    />
                  </Picker>
                </Item>
              </View>
              <View
                style={{
                  marginTop: 20,
                  marginLeft: 24,
                  marginRight: 24,
                  borderWidth: 0,
                }}
              >
                <Text style={{ textAlign: "left", color: "#0866b0" }}>
                  05XXXXXXXX
                </Text>
                <Item regular>
                  <Input
                    placeholder="05XXXXXXXX"
                    placeholderTextColor={"#4a4b4c"}
                    style={{
                      height: 34,
                      backgroundColor: "white",
                      marginBottom: 1,
                      color: "#4a4b4c",
                      textAlign: this.state.lan === "en" ? "left" : "right",
                    }}
                    value={this.state.mobile}
                    onChangeText={(mobile) => {
                      this.setState({ mobile: mobile });
                    }}
                  />
                </Item>
              </View>
            </View>
            <View
              style={{
                height: scaleSize(140),
                marginTop: scaleSize(60),
                // position: "absolute",
                // bottom: 5,
                alignSelf: "center",
                justifyContent: "space-between"
              }}
            >

              <TouchableOpacity
                onPress={() => this.Logout()}
              >
                <View
                  style={{
                    backgroundColor: "#0764af",
                    borderRadius: 12,
                    width: Dimensions.get("screen").width - 120,
                    alignSelf: "center",
                    marginTop: 2,
                  }}
                >
                  <LinearGradient
                    colors={["#0764af", "#6ea8cd"]}
                    start={[0.9, 0.2]}
                    end={[0.1, 0.1]}
                    style={{ borderRadius: 12 }}
                  >
                    <Text
                      style={{ color: "white", margin: 16, alignSelf: "center" }}
                    >
                      {this.state.lan == "en" ? "Log out" : "????????"}

                    </Text>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.updateProfile}>
                <View
                  style={{
                    backgroundColor: "#0764af",
                    borderRadius: 12,
                    width: Dimensions.get("screen").width - 120,
                    alignSelf: "center",
                    marginTop: 2,
                  }}
                >
                  <LinearGradient
                    colors={["#0764af", "#6ea8cd"]}
                    start={[0.9, 0.2]}
                    end={[0.1, 0.1]}
                    style={{ borderRadius: 12 }}
                  >
                    <Text
                      style={{ color: "white", margin: 16, alignSelf: "center" }}
                    >
                      {this.state.lan == "en" ? "Update" : "??????????"}
                    </Text>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>



      </View>
    );
  }
}
