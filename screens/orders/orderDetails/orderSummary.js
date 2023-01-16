import {
  Accordion,
  Body,
  Button,
  Container,
  Content,
  Footer,
  Header,
  Icon,
  Input,
  Item,
  Left,
  Right,
  Text,
  Thumbnail,
  Title,
  Toast,
} from "native-base";
import {
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

import CalendarPicker from "react-native-calendar-picker";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { scaleSize } from "../../../mixin";

export default class OrderSummarySecreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        showsVerticalScrollIndicator={true}
        style={{
          // maxHeight: scaleSize(390),
          paddingTop: scaleSize(10),
          paddingBottom: scaleSize(20),
        }}>
        {/* ,,,,,,,,,,,,,,, */}

        {/* ------------------ */}
        <View
          style={{
            width: Dimensions.get("screen").width - 30,
            height: 1,
            marginTop: 10,
            backgroundColor: "lightgray",
          }}
        ></View>
        <View
          style={{
            marginTop: 6,
            marginLeft: 10,
            marginRight: 10,
            alignSelf: "flex-start",
          }}
        >
          <View>
            <Text style={{
              color: "#0865b0", textAlign: "left", fontFamily: this.props.lan == "en" ? "" : "montserrat_arabic_regular", fontSize: this.props.lan === "en" ? 17 : 13,
            }}>
              {this.props.lan == "en" ? "Address:" : "العنوان"}
            </Text>
            <Text style={{ color: "#4a4b4c" }}>
              {this.props.orderDetail && this.props.orderDetail.customer_address
                ? this.props.orderDetail.customer_address
                : ""}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: Dimensions.get("screen").width - 30,
            height: 1,
            marginTop: 6,
            backgroundColor: "lightgray",
          }}
        ></View>
        <View
          style={{
            marginTop: 6,
            marginLeft: 10,
            marginRight: 10,
            alignSelf: "flex-start",
          }}
        >
          <View>
            <Text style={{
              color: "#0865b0", textAlign: "left", fontFamily: this.props.lan == "en" ? "" : "montserrat_arabic_regular", fontSize: this.props.lan === "en" ? 17 : 13,
            }}>
              {this.props.lan == "en" ? "Date & Time:" : "التاريخ و الوقت"}
            </Text>
            <Text style={{ color: "#4a4b4c" }}>
              {this.props.orderDetail &&
                this.props.orderDetail.desire_date_format
                || this.props.orderDetail.createddate}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: Dimensions.get("screen").width - 30,
            height: 1,
            marginTop: 25,
            backgroundColor: "lightgray",
          }}
        ></View>
        <View
          style={{
            marginTop: 6,
            marginLeft: 10,
            marginRight: 10,
            alignSelf: "flex-start",
          }}
        >
          <Text style={{ color: "#0865b0", textAlign: "left", fontFamily: this.props.lan == "en" ? "" : "montserrat_arabic_regular", fontSize: this.props.lan === "en" ? 17 : 13, }}>
            {this.props.lan == "en" ? "Services name" : "اسم الخدمات"}
          </Text>
          <Text
            style={{
              alignSelf: "flex-start",
              color: "#4a4b4c",
              fontSize: this.props.lan === "en" ? 12 : 10, fontFamily: this.props.lan == "en" ? "" : "montserrat_arabic_regular",
            }}
          >{this.props.orderDetail?.order_details[0]?.categoryname}
          </Text>
          <Text style={{ color: "#0865b0", textAlign: "left", fontFamily: this.props.lan == "en" ? "" : "montserrat_arabic_regular", fontSize: this.props.lan === "en" ? 17 : 13, }}>
            {this.props.lan == "en" ? "Job name" : "اسم الخدمات"}
          </Text>
          {/* <Text style={{ color: "#4a4b4c", textAlign: "left" }}>
              {this.props.orderDetail.ispackage
                ? this.props.lan == "en"
                  ? this.props.orderDetail.packagename
                  : this.props.orderDetail.packagename_ar
                : thsi.props.lan == "en"
                ? this.props.orderDetail.services[0].servicename
                : this.props.orderDetail.services[0].servicename_ar}
            </Text> */}
          {this.props.orderDetail.order_details.map((i) => {
            return (
              <View
                style={{
                  width: 350,
                  paddingVertical: 0,
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    width: 240,
                    paddingVertical: 2,
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "flex-start",
                      color: "#4a4b4c",
                      fontSize: this.props.lan === "en" ? 12 : 10, fontFamily: this.props.lan == "en" ? "" : "montserrat_arabic_regular",
                    }}
                  >

                    ({i.qty}X){" "}
                    {this.props.lan == "en" ? i.job_name : i.jobname_ar}
                  </Text>
                </View>
                <View
                  style={{
                    width: 70,
                    paddingVertical: 2,
                  }}
                >
                  <Text style={{ color: "#4a4b4c", fontSize: 12 }}>
                    SAR {i.price}
                  </Text>
                </View>
              </View>
            );
          })}

        </View>
        <View
          style={{
            width: Dimensions.get("screen").width - 30,
            height: 1,
            marginTop: 6,
            backgroundColor: "lightgray",
          }}
        ></View>
        <View
          style={{
            marginTop: 6,
            marginLeft: 10,
            marginRight: 10,
            alignSelf: "flex-start",
          }}
        >
          <View>
            <Text style={{ color: "#0865b0", textAlign: "left", fontFamily: this.props.lan == "en" ? "" : "montserrat_arabic_regular", fontSize: this.props.lan === "en" ? 17 : 13, }}>
              {this.props.lan == "en" ? "Payment Type:" : "طريقة الدفع"}
            </Text>
            <Text style={{ color: "#4a4b4c", textAlign: "left", fontFamily: this.props.lan == "en" ? "" : "montserrat_arabic_regular", fontSize: this.props.lan === "en" ? 17 : 13, }}>
              {this.props.lan == "en" ? "Cash" : "نقد"}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: Dimensions.get("screen").width - 30,
            height: 1,
            marginTop: 6,
            backgroundColor: "lightgray",
          }}
        ></View>
        <View
          style={{
            marginTop: 6,
            marginLeft: 10,
            marginRight: 10,
            alignSelf: "flex-start",
          }}
        >
          <View style={{ paddingBottom: scaleSize(10) }}>
            <Text style={{ color: "#0865b0", textAlign: "left", fontFamily: this.props.lan == "en" ? "" : "montserrat_arabic_regular", fontSize: this.props.lan === "en" ? 17 : 13, }}>
              {this.props.lan == "en" ? "Total Price:" : "السعر الكلي"}
            </Text>
            <Text style={{ color: "#4a4b4c", textAlign: "left" }}>
              {this.props.orderDetail && this.props.orderDetail.grand_total}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
