import React from "react";
import {
  View,
  Image,
  Platform,
  Dimensions,
  Modal,
  ImageBackground,
  TouchableOpacity,
  TextInput
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
  Text,
  Item,
  Left,
  Right,
  Footer
} from "native-base";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import { LinearGradient } from "expo-linear-gradient";
import getEnvVars from "../../../environment";
import Dash from "react-native-dash";
import { scaleSize } from "../../../mixin";
import axios from "axios";
const { apiUrl } = getEnvVars()

export default class OrderStatusSecreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderDetail: {
        status: 1,
      },
      priceModal: false

    };
  }

  // setModalVisible = () => {
  //   // this.setState({ modalVisible: true });
  //   this.setState({ modalVisible: true });
  // };

  putYesResponse = () => {

    try {

      axios
        .post(
          `${apiUrl}/price_approve`,
          {
            status: 'Y',
            order_id: this.props.orderDetail.order_id
          })
        .then((responseJson) => {
          if (responseJson.config.data.error === "false") {
            console.log("putYesResponse", responseJson);
            this.setState({ priceModal: false })
          }
          else {
            console.log("putYesResponse", responseJson);
            this.setState({ priceModal: false })
            console.log("Error", responseJson)
          }
        });
    } catch (error) {
      console.log("catch putYesResponse");
      this.setState({ priceModal: false })
      console.log("error:", error);
    }
  };


  // .then((response) => {
  //   if (response.error === "false") {
  //     console.log("putYesResponse", response);
  //     this.setState({ priceModal: false })
  //   }


  putNoResponse = () => {
    this.setState({ priceModal: false })

    try {
      axios
        .post(
          `${apiUrl}/price_approve`,
          {
            status: 'N',
            order_id: this.props.orderDetail.order_id
          })
        .then((response) => {
          if (response.data.error === "false") {
            console.log("putYesResponse", response);
            this.setState({ priceModal: false })
          }
          else {
            console.log("Error", response)
          }
        });
    } catch (error) {
      console.log("error:", error);
    }
  };

  // OpenPriceModal = () => {
  //   this.setState({ priceModal: true })
  // }
  render() {
    return (
      <>
        <View
          style={{ width: 40, marginTop: 40, marginLeft: 15, marginBottom: 20, flexDirection: "column", }}
        >
          <View>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor:
                    this.props.orderDetail?.order_status >= 1 &&
                      this.props.orderDetail?.order_status !== 6
                      ? "#283a97"
                      : "#283a97",
                  borderColor: "#283a97",
                  borderWidth: 1
                }}
              >
                {this.props.orderDetail &&
                  this.props.orderDetail?.order_status >= 1 &&
                  this.props.orderDetail?.order_status !== 6 ? (
                  <Image
                    source={require("../../../assets/order-status-icons/thumbnail_Tick-Pressed.png")}
                    style={{
                      width: 30,
                      height: 30,
                      alignSelf: "center",
                      marginTop: 4
                    }}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={require("../../../assets/order-status-icons/thumbnail_Tick-Pressed.png")}
                    style={{
                      width: 30,
                      height: 30,
                      alignSelf: "center",
                      marginTop: 4
                    }}
                    resizeMode="contain"
                  />
                )}
              </View>
              <View
                style={{ marginLeft: 10, width: Dimensions.get("screen").width }}
              >
                {this.props.lan === "en" ? (
                  <Text
                    style={{ color: "#283a97", fontSize: 13, fontWeight: "bold" }}
                  >
                    Order Submitted
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontFamily: "montserrat_arabic_regular",
                      textAlign: "left",
                      color: "#283a97",
                      fontSize: 13
                    }}
                  >
                    تم تسليم الطلب
                  </Text>
                )}
                {this.props.lan === "en" ? (
                  <Text style={{ fontSize: 11, color: "#4a4b4c" }}>
                    Your request is being processed.
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontFamily: "montserrat_arabic_regular",
                      textAlign: "left",
                      fontSize: 11,
                      color: "#4a4b4c"
                    }}
                  >
                    جاري تنفيذ طلبك
                  </Text>
                )}
              </View>
            </View>


            <Dash
              dashGap={
                this.props.orderDetail &&
                  this.props.orderDetail.order_status >= 2 && this.props.orderDetail.sp_id ? 0
                  : 1
              }
              dashColor="#283a97"
              style={{
                width: 1,
                height: 40,
                flexDirection: "column",
                alignSelf: "center"
              }}
            />
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor:
                    this.props.orderDetail &&
                      this.props.orderDetail.order_status >= 2 && this.props.orderDetail.sp_id ? "#283a97"
                      : "white",
                  borderColor: "#283a97",
                  borderWidth: 1
                }}
              >
                {this.props.orderDetail &&
                  this.props.orderDetail.order_status >= 2 && this.props.orderDetail.sp_id ? (
                  <Image
                    source={require("../../../assets/order-status-icons/thumbnail_Tick-Pressed.png")}
                    style={{
                      width: 30,
                      height: 30,
                      alignSelf: "center",
                      marginTop: 4
                    }}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={require("../../../assets/order-status-icons/Professional-Assigned.png")}
                    style={{
                      width: 26,
                      height: 30,
                      alignSelf: "center",
                      marginTop: 4
                    }}
                    resizeMode="contain"
                  />
                )}
              </View>
              <View
                style={{ marginLeft: 10, width: Dimensions.get("screen").width }}
              >
                {this.props.lan === "en" ? (
                  <Text
                    style={{ color: "#283a97", fontSize: 13, fontWeight: "bold" }}
                  >
                    Professional Assigned
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontFamily: "montserrat_arabic_regular",
                      textAlign: "left",
                      color: "#283a97",
                      fontSize: 13
                    }}
                  >
                    تم تعيين المهني
                  </Text>
                )}
                {this.props.lan === "en" ? (
                  <Text style={{ fontSize: 11, color: "#4a4b4c" }}>
                    We found an expert for this job.
                  </Text>
                ) : (
                  <Text
                    style={{
                      textAlign: "left",
                      fontSize: 11,
                      color: "#4a4b4c",
                      fontFamily: "montserrat_arabic_regular",
                    }}
                  >
                    لقد حصلنا على خبير لهذا العمل
                  </Text>
                )}
              </View>
            </View>
            <Dash
              dashGap={
                this.props.orderDetail.sp_price_status === "cus_approved" || this.props.orderDetail.sp_price_status === "manager_pending"
                  ? 0
                  : 1
              }
              dashColor="#283a97"
              style={{
                width: 1,
                height: 40,
                flexDirection: "column",
                alignSelf: "center"
              }}
            />

            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: this.props.orderDetail?.sp_price_status === "cus_approved" || this.props.orderDetail?.sp_price_status === "manager_pending"
                    ? "#283a97"
                    : "white",
                  borderColor: "#283a97",
                  borderWidth: 1
                }}
              >
                {this.props.orderDetail?.sp_price_status === "cus_approved" || this.props.orderDetail?.sp_price_status === "manager_pending" ? (

                  <Image
                    source={require("../../../assets/order-status-icons/thumbnail_Tick-Pressed.png")}
                    style={{
                      width: 30,
                      height: 30,
                      alignSelf: "center",
                      marginTop: 4
                    }}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={require("../../../assets/TentativePrice.png")}
                    style={{
                      width: 26,
                      height: 30,
                      alignSelf: "center",
                      marginTop: 4
                    }}
                    resizeMode="contain"
                  />
                )}
              </View>
              <View
                style={{ marginLeft: 10, width: Dimensions.get("screen").width }}
              >
                {this.props.lan === "en" ? (
                  <Text
                    style={{ color: "#283a97", fontSize: 13, fontWeight: "bold" }}
                  >
                    Tentative Price Confirmation
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontFamily: "montserrat_arabic_regular",
                      textAlign: "left",
                      color: "#283a97",
                      fontSize: 13
                    }}
                  >
                    تأكيد السعر المبدئي</Text>
                )}
                {this.props.lan === "en" ? (
                  <Text style={{ fontSize: 11, color: "#4a4b4c" }}>
                    Thanks for approving the tentative prices.
                  </Text>
                ) : (
                  <Text
                    style={{
                      textAlign: "left",
                      fontSize: 11,
                      color: "#4a4b4c",
                      fontFamily: "montserrat_arabic_regular",
                    }}
                  >
                    شكرا للموافقة على الأسعار المؤقتة</Text>
                )}

              </View>
            </View>


            <Dash
              dashGap={
                this.props.orderDetail &&
                  this.props.orderDetail?.order_status >= 2 &&
                  this.props.orderDetail?.order_status !== 6
                  ? 0
                  : 1
              }
              dashColor="#283a97"
              style={{
                width: 1,
                height: 40,
                flexDirection: "column",
                alignSelf: "center"
              }}
            />
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor:
                    this.props.orderDetail?.order_status >= 4 &&
                      this.props.orderDetail?.order_status !== 6
                      ? "#283a97"
                      : "white",
                  borderColor: "#283a97",
                  borderWidth: 1
                }}
              >
                {this.props.orderDetail &&
                  this.props.orderDetail.order_status >= 4 &&
                  this.props.orderDetail.order_status !== 6 ? (
                  <Image
                    source={require("../../../assets/order-status-icons/thumbnail_Tick-Pressed.png")}
                    style={{
                      width: 30,
                      height: 30,
                      alignSelf: "center",
                      marginTop: 4
                    }}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={require("../../../assets/order-status-icons/Job-Started.png")}
                    style={{
                      width: 30,
                      height: 30,
                      alignSelf: "center",
                      marginTop: 4
                    }}
                    resizeMode="contain"
                  />
                )}
              </View>
              <View
                style={{ marginLeft: 10, width: Dimensions.get("screen").width }}
              >
                {this.props.lan === "en" ? (
                  <Text
                    style={{ color: "#283a97", fontSize: 13, fontWeight: "bold" }}
                  >
                    Job Started
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontFamily: "montserrat_arabic_regular",
                      textAlign: "left",
                      color: "#283a97",
                      fontSize: 13
                    }}
                  >
                    المهمة بدأت
                  </Text>
                )}
                {this.props.lan === "en" ? (
                  <Text style={{ fontSize: 11, color: "#4a4b4c" }}>
                    Your work has been started by technician.
                  </Text>
                ) : (
                  <Text
                    style={{
                      textAlign: "left",
                      fontSize: 11,
                      color: "#4a4b4c",
                      fontFamily: "montserrat_arabic_regular",
                    }}
                  >
                    شكراً للموافقة لى السعر
                  </Text>
                )}
              </View>
            </View>
            <Dash
              dashGap={
                this.props.orderDetail &&
                  this.props.orderDetail.order_status >= 4 &&
                  this.props.orderDetail.order_status !== 6
                  ? 0
                  : 1
              }
              dashColor="#283a97"
              style={{
                width: 1,
                height: 40,
                flexDirection: "column",
                alignSelf: "center"
              }}
            />
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor:
                    this.props.orderDetail?.order_status >= 5 &&
                      this.props.orderDetail?.order_status !== 6
                      ? "#283a97"
                      : "white",
                  borderColor: "#283a97",
                  borderWidth: 1
                }}
              >
                {this.props.orderDetail &&
                  this.props.orderDetail?.order_status >= 5 &&
                  this.props.orderDetail?.order_status !== 6 ? (
                  <Image
                    source={require("../../../assets/order-status-icons/thumbnail_Tick-Pressed.png")}
                    style={{
                      width: 30,
                      height: 30,
                      alignSelf: "center",
                      marginTop: 4
                    }}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={require("../../../assets/order-status-icons/Job-Finished.png")}
                    style={{
                      width: 30,
                      height: 30,
                      alignSelf: "center",
                      marginTop: 4
                    }}
                    resizeMode="contain"
                  />
                )}
              </View>
              <View
                style={{ marginLeft: 10, width: Dimensions.get("screen").width }}
              >
                {this.props.lan === "en" ? (
                  <Text
                    style={{ color: "#283a97", fontSize: 13, fontWeight: "bold" }}
                  >
                    Job Finished
                  </Text>
                ) : (
                  <Text
                    style={{
                      textAlign: "left",
                      color: "#283a97",
                      fontSize: 13,
                      fontFamily: "montserrat_arabic_regular",
                    }}
                  >
                    تم الإنتهاء من العمل
                  </Text>
                )}
                {this.props.lan === "en" ? (
                  <Text style={{ fontSize: 11, color: "#4a4b4c" }}>
                    Thank you for using Wafarnalak.
                  </Text>
                ) : (
                  <Text
                    style={{
                      textAlign: "left",
                      fontSize: 11,
                      color: "#4a4b4c",
                      fontFamily: "montserrat_arabic_regular",
                    }}
                  >
                    شكراً لإستخدامكم وفرنا لك
                  </Text>
                )}
              </View>
            </View>
          </View>

        </View>
        {this.props.orderDetail.sp_price_status === "cus_pending" ?
          <View style={{ width: "100%" }}>
            <LinearGradient
              colors={["#0764af", "#6ea8cd"]}
              start={[0.9, 0.2]}
              end={[0.1, 0.1]}
              style={{
                borderWidth: 0,
                borderRadius: 6,
                width: 200,
                height: 40,
                borderColor: "transparent",
                alignSelf: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={() => this.setState({ priceModal: true })}>
                <Text style={{ alignSelf: "center", justifyContent: "center", color: "lightgray" }}>
                  {this.props.lan === "en" ? "Check Supplier Rates" : "تحقق من أسعار الموردين"}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View> : <View></View>}

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.priceModal}
          onRequestClose={() => { this.putNoResponse }}

        >
          <View
            style={{
              marginTop: 160,
              alignSelf: "center",
              minHeight: scaleSize(310),
              borderRadius: 20,
              width: scaleSize(370),
              backgroundColor: "#0865b0",

            }}
          >
            <Text style={{ color: "black" }}>{this.state.priceModal}</Text>
            <View style={{ alignSelf: "center", marginTop: scaleSize(-60) }}>
              <Thumbnail style={{ height: scaleSize(90), width: scaleSize(90) }} source={require("../../../assets/Icon2.png")} />
            </View>
            <View style={{ position: "absolute", right: 6, top: 5 }}>
              <Ionicons
                onPress={() => this.putNoResponse}
                name="ios-close-circle-outline"
                size={25}
                color="red"
              />
            </View>
            <View style={{ paddingHorizontal: scaleSize(20), flex: 1, paddingVertical: scaleSize(10) }}>
              <View>
                <Text style={{ alignSelf: "center", color: "white", fontWeight: "bold" }}>{this.props.lan === "en" ? "Rates Requested for Approval" : "الأسعار المطلوبة للموافقة عليها"}</Text>
                <View style={{ paddingVertical: scaleSize(5) }}>
                  <View style={{ marginTop: 10, flexDirection: "row" }}>
                    <Text style={{ width: "45%", color: "white" }}>{this.props.lan === "en" ? "Material Price : " : "سعر المادة :"}</Text>
                    <Text style={{ marginHorizontal: 5, flex: 1, flexWrap: 'wrap', color: "white" }}>{this.props.orderDetail?.sp_entered_material_price + this.props.orderDetail.wf_material_commission}</Text>
                  </View>
                  <View style={{ marginTop: 10, flexDirection: "row" }}>
                    <Text style={{ width: "45%", color: "white" }}>{this.props.lan === "en" ? "Service Price : " : "تكاليف الخدمة :"}</Text>
                    <Text style={{ marginHorizontal: 5, flex: 1, flexWrap: 'wrap', color: "white" }}>{this.props.orderDetail.sp_entered_price}</Text>
                  </View>

                  <View style={{ marginTop: 10, flexDirection: "row" }}>
                    <Text style={{ width: "45%", color: "white" }}>{this.props.lan === "en" ? "Material Details : " : "تفاصيل المواد:"}</Text>
                    <Text style={{ marginHorizontal: 5, flex: 1, flexWrap: 'wrap', color: "white" }}>{this.props.orderDetail.materialcost_details}</Text>
                  </View>

                </View>
              </View>
              <View style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                position: "absolute",
                bottom: scaleSize(20),
                width: scaleSize(348),
                paddingHorizontal: scaleSize(20)
              }}>
                <TouchableOpacity onPress={this.putYesResponse}
                  style={{
                    backgroundColor: "#6ea8cd",
                    borderWidth: 0,
                    borderRadius: 15,
                    width: scaleSize(120),
                    borderColor: "transparent",
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: scaleSize(5)
                  }}>
                  <Text style={{ color: "lightgray", fontWeight: "bold" }}>{this.props.lan === "en" ? "Yes" : "نعم"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.putNoResponse} style={{
                  backgroundColor: "#6ea8cd",
                  borderWidth: 0,
                  borderRadius: 15,
                  width: scaleSize(120),
                  borderColor: "transparent",
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: scaleSize(5)
                }}>
                  <Text style={{ color: "lightgray", fontWeight: "bold" }}>{this.props.lan === "en" ? "No" : "لا"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  }
}
