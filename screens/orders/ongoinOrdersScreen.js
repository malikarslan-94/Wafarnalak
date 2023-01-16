import React from "react";
import {
  View,
  Image,
  Platform,
  Dimensions,
  Modal,
  AsyncStorage,
  TouchableOpacity,
  Text
} from "react-native";
import {
  Container,
  Accordion,
  Toast,
  Title,
  Header,
  Content,
  Thumbnail,
  Button,
  Body,
  Input,
  Icon,
  Item,
  Left,
  Right,
  Footer,
} from "native-base";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import getEnvVars from "../../environment";
import { LinearGradient } from "expo-linear-gradient";
import Spinner from "react-native-loading-spinner-overlay";
import { NavigationEvents } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";
const { apiUrl } = getEnvVars();


export default class OngoingOrdersSecreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      onGoingOrders: [],
      lan: "en",
      user: null,
    };
  }
  componentDidMount = async () => {
    this.setState({ loading: true });
    let getuser = await AsyncStorage.getItem("user");
    let user;
    if (user !== null) {
      user = JSON.parse(getuser);
    }

    // console.log(user);

    const { navigation } = this.props;
    fetch(
      `${apiUrl}/orders`,
      //"http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/customer_in_progress_order_requests",
      {
        method: "GET", //POST
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ customerid: user.customerid }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          this.setState({
            onGoingOrders: responseJson.orders,
            loading: false,
            lan: navigation.getParam("lan"),
            user: user,
          });
        } else {
          this.setState({ loading: false });
        }
      })
      .catch((error) => {
        alert("catch error", error.message)
      })
    this.setState({ loading: false })
  };
  render() {
    // console.log(first)
    return (
      <View style={{ marginTop: 18 }}>
        <Spinner visible={this.state.loading} textContent={""} />
        {
          <NavigationEvents
            onDidFocus={() => {
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
          <View>
            {this.state.onGoingOrders &&
              this.state.onGoingOrders.map(
                function (order, index) {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() =>
                        this.props.navigation.navigate("OrderDetails", {
                          order: order,
                          isHistory: false,
                          lan: this.state.lan,
                          user: this.props.user,
                        })
                      }
                    >
                      <View>
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
                                fontSize: this.state.lan === "en" ? 14 : 10,
                                marginTop: 4,
                                textAlign: "left",
                                fontFamily: this.state.lan == "en" ? "" : "montserrat_arabic_regular",
                              }}
                            >
                              {this.state.lan == "en" ? "Order#" : "طلب#"}:{" "}
                              {order.order_id}
                            </Text>
                            <Text
                              style={{
                                color: "#4a4b4c",
                                fontSize: this.state.lan === "en" ? 12 : 10,
                                marginTop: 2,
                                textAlign: "left",
                                fontFamily: this.state.lan == "en" ? "" : "montserrat_arabic_regular",

                              }}
                            >
                              {this.state.lan == "en"
                                ? "Date:"
                                : "الطلبات السابقة"}
                              {order.desire_date_format} ,{" "}
                              {order.desire_time_format}
                            </Text>
                            <Text
                              style={{
                                color: "#4a4b4c",
                                fontSize: this.state.lan === "en" ? 12 : 10,
                                textAlign: "left",
                                fontFamily: this.state.lan == "en" ? "" : "montserrat_arabic_regular",

                              }}
                            >
                              {this.state.lan == "en" ? "Status:" : "الحالة:"}{" "}
                              {order.order_status == 1
                                ? this.state.lan == "en"
                                  ? "Request Sent"
                                  : "تم ارسال الطلب"
                                : order.order_status == 2
                                  ? this.state.lan == "en"
                                    ? "Professional Assigned"
                                    : "تم تعيين المهني"
                                  : order.order_status == 3
                                    ? this.state.lan == "en"
                                      ? "Cancelled"
                                      : "تم الحذف"
                                    : order.order_status == 4
                                      ? this.state.lan == "en"
                                        ? "Job Started"
                                        : "المهمة بدأت"
                                      : order.order_status == 5
                                        ? this.state.lan == "en"
                                          ? "Completed"
                                          : "تم إنجاز المهمة"
                                        : order?.order_status == 6 && order?.sp_id ? this.state.lan == "en"
                                          ? "Professional Assigned"
                                          : "تم تعيين المهني"
                                          : ""}
                            </Text>
                          </View>
                          <Right
                            style={{ position: "absolute", right: 26, flex: 1 }}
                          >
                            <Ionicons
                              name={
                                this.state.lan == "en"
                                  ? "chevron-forward-outline"
                                  : "chevron-back-outline"
                              }
                              size={24}
                              color={"#6ea8cd"}
                            />
                          </Right>
                        </View>
                        <View
                          style={{
                            width: Dimensions.get("screen").width,
                            height: 1,
                            backgroundColor: "lightgray",
                          }}
                        ></View>
                      </View>
                    </TouchableOpacity>
                  );
                }.bind(this)
              )}
          </View>
        </ScrollView>
      </View>
    );
  }
}
