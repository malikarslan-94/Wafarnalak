import React from "react";
import {
  View,
  Image,
  Platform,
  Dimensions,
  Modal,
  ImageBackground,
  TouchableOpacity,
  Button,
  Text
} from "react-native";
import Signature from "react-native-signature-canvas";
import {
  Container,
  Accordion,
  Toast,
  Title,
  Header,
  Content,
  Thumbnail,
  // Button,
  Body,
  Input,
  Icon,
  Item,
  Left,
  Right,
  Footer,
} from "native-base";
import { StatusBar } from "expo-status-bar";
import getEnvVars from "../../environment";
import { Ionicons } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import { LinearGradient } from "expo-linear-gradient";
import Spinner from "react-native-loading-spinner-overlay";
import { NavigationEvents } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";
const { apiUrl } = getEnvVars()

export default class HistoryOrdersSecreen extends React.Component {
  constructor(props) {
    super(props);
    this.callRef = React.createRef();

    this.state = {
      historyOrders: [],
      loading: false,
    };
  }
  componentDidMount = () => {
    // alert("Loaded");
    this.setState({ loading: true });
    fetch(
      //orders_history

      `${apiUrl}/orders_history`,
      // "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/customer_completed_order_requests",
      // {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ customerid: this.props.user.customerid }),
      // }
      {
        method: "GET", //POST
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log("history", responseJson);
        //if (responseJson.error === false) {
        this.setState({
          historyOrders: responseJson.orders, //.Orders
          loading: false,
        });
        // } else {
        //   this.setState({ loading: false });
        // }
      })
      .catch((error) => { });
  };

  handleClear = () => {
    this.callRef.current.clearSignature();
  };

  handleConfirm = () => {
    console.log("end");
    this.callRef.current.readSignature();
  };
  render() {
    return (
      <View style={{ marginTop: 18 }}>
        {/* <View style={{ height: 250 }}>
          <Signature
            ref={this.callRef}
            // handle when you click save button
            onOK={(img) => console.log(img)}
            onEmpty={() => console.log("empty")}
            // description text for signature
            descriptionText="Sign"
            // clear button text
            clearText="Clear"
            // save button text
            confirmText="Save"
            // String, webview style for overwrite default style, all style: https://github.com/YanYuanFE/react-native-signature-canvas/blob/master/h5/css/signature-pad.css
            webStyle={`.m-signature-pad--footer
    .button {
      background-color: red;
      color: #FFF;
    }`}
            autoClear={true}
            imageType={"image/svg+xml"}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Button title="Clear" onPress={this.handleClear} />
            <Button title="Confirm" onPress={this.handleConfirm} />
          </View>
        </View> */}

        <Spinner visible={this.state.loading} textContent={""} />
        {
          <NavigationEvents
            onWillFocus={() => {
              this.componentDidMount();
            }}
          />
        }
        <View
          style={{
            width: Dimensions.get("screen").width,
            height: 1,
            backgroundColor: "lightgray",
          }}
        ></View>
        <ScrollView
          style={{
            // backgroundColor: "black",
            height: Dimensions.get("screen").height - 280,
          }}
        >
          {this.state.historyOrders &&
            this.state.historyOrders.map(
              function (order, index) {
                return (
                  <View key={index}>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("OrderDetails", {
                          order: order,
                          isHistory: true,
                          lan: this.props.lan,
                          user: this.props.user,
                        })
                      }
                    >
                      <View
                        style={{
                          marginTop: 2,
                          flexDirection: "row",
                          height: 75,
                          width: Dimensions.get("screen").width,
                          backgroundColor: "#F5F5F5",
                        }}
                      >
                        <Left
                          style={{ position: "absolute", flex: 1, left: 6 }}
                        >
                          <Image
                            source={require("../../assets/Job-Icon-min.png")}
                            style={{
                              width: 55,
                              height: 55,
                              borderRadius: 10,
                            }}
                            resizeMode="contain"
                          />
                        </Left>
                        <View
                          style={{
                            marginLeft: 75,
                            marginRight: 35,
                            marginTop: 10,
                          }}
                        >
                          <Text
                            style={{
                              color: "#283a97",

                              // color: "#4a4b4c",
                              fontSize: this.props.lan === "en" ? 14 : 10,
                              textAlign: "left",
                              fontFamily: this.props.lan == "en" ? "" : "montserrat_arabic_regular",
                            }}
                          >
                            {this.props.lan == "en" ? "Order#" : "??????#"}:{" "}
                            {order.order_id}
                          </Text>
                          <Text
                            style={{
                              color: "#4a4b4c",
                              fontSize: this.props.lan === "en" ? 12 : 10,
                              marginTop: 2,
                              textAlign: "left",
                              fontFamily: this.props.lan == "en" ? "" : "montserrat_arabic_regular",
                            }}
                          >
                            {this.props.lan == "en"
                              ? "Date: "
                              : "?????????????? ??????????????"}
                            {order.desire_date_format} ,{" "}
                            {order.desire_time_format}
                            {/* appointmentdate */}
                          </Text>
                          <Text
                            style={{
                              color: "#4a4b4c",
                              fontSize: this.props.lan === "en" ? 12 : 10,
                              textAlign: "left",
                              fontFamily: this.props.lan == "en" ? "" : "montserrat_arabic_regular",

                            }}
                          >
                            {this.props.lan == "en" ? "Status:" : "????????????:"}{" "}
                            {order.order_status == 1
                              ? this.props.lan == "en"
                                ? "Request Sent"
                                : "???? ?????????? ??????????"
                              : order.order_status == 2
                                ? this.props.lan == "en"
                                  ? "Professional Assigned"
                                  : "???? ?????????? ????????????"
                                : order.order_status == 3
                                  ? this.props.lan == "en"
                                    ? "Cancelled"
                                    : "???? ??????????"
                                  : order.order_status == 4
                                    ? this.props.lan == "en"
                                      ? "Job Started"
                                      : "???????????? ????????"
                                    : order.order_status == 5
                                      ? this.props.lan == "en"
                                        ? "Completed"
                                        : "???? ?????????? ????????????"
                                      : order.order_status == 6
                                        ? this.props.lan == "en"
                                          ? "Rescheduled"
                                          : "?????????? ??????????"
                                        : ""}
                          </Text>
                        </View>
                        <Right
                          style={{ position: "absolute", right: 26, flex: 1 }}
                        >
                          <Ionicons
                            name={
                              this.props.lan == "en"
                                ? "chevron-forward-outline"
                                : "chevron-back-outline"
                            }
                            size={24}
                            color={"#6ea8cd"}
                          />
                        </Right>
                      </View>
                    </TouchableOpacity>
                    <View
                      style={{
                        width: Dimensions.get("screen").width,
                        height: 1,
                        backgroundColor: "lightgray",
                      }}
                    ></View>
                  </View>
                );
              }.bind(this)
            )}
        </ScrollView>
      </View>
    );
  }
}
