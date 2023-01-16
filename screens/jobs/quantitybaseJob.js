import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";
import { Ionicons } from "@expo/vector-icons";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { scaleSize } from "../../mixin";
import Spinner from "react-native-loading-spinner-overlay";


const QuantitybaseJob = ({
  thisJobcartData,
  calledFromCatgScreen,
  job,
  plus,
  minus,
  // handlejobValue,
  lan,
  index,
  toolTipVisible,
  cahngeToolTip,
  womens,
  tp,
  totObj,
  // jb,
  addCartLoader,
  resetData
}) => {
  // console.log("quantity base job ", job);
  // const [tp, setTp] = useState(0);

  const [jb, setJob] = useState(null);

  const [text0, setText0] = useState([])
  const [text1, setText1] = useState([])

  useEffect(() => {
    if (job?.jobname?.length > 39) {
      let text = job?.jobname.match(/.{1,26}/g);
      setText1(text[1]);
      setText0(text[0]);
    }
    else null
  }, [job])
  useEffect(() => {
    setJob(job)
  }, [])
  return (
    <View>
      {/* Extra Notes Tab */}
      {/* <View style={{ marginLeft: 15, marginRight: 15 }}>
        {job.note && job.note !== null && index == 0 ? (
          <View
            style={{ backgroundColor: "white", marginLeft: 1, marginRight: 1 }}
          >
            <Text
              style={{
                fontWeight: "bold",
                textAlign: "left",
                paddingHorizontal: widthPercentageToDP(2),
              }}
            >
              {lan == "en" ? "Notes:" : "ملاحظات:"}
            </Text>
            <Text
              style={{
                paddingHorizontal: widthPercentageToDP(2),
                fontSize: 12,
                textAlign: "left",
              }}
            >
              {lan == "en" ? job.note : job.note_ar}
            </Text>
          </View>
        ) : (
          <View></View>
        )}
      </View> */}
      <View
        style={{
          marginLeft: 10,
          marginRight: 20,
          backgroundColor: job.is_promoted == true ? "#9dbacd" : "white",
          borderTopColor: "#283a97",
          borderWidth: 1,
          borderTopWidth: index == 0 ? 1 : 0,
          borderColor: "#283a97",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginLeft: 8,
            marginRight: 6,
          }}
        >

          <View style={{ marginTop: 4 }}>
            {
              job?.jobname?.length > 36 && lan == "en" && job.jobid !== 127 ?
                <View>
                  <Text
                    style={{
                      color: "#0764af",
                      fontFamily: "Montserrat_semiBold",
                      fontSize: 12,
                      textAlign: "left",
                      width: Dimensions.get("screen").width - 140,
                    }}
                    numberOfLines={2}
                  >{text0}</Text>
                  <Text
                    style={{
                      color: "#0764af",
                      fontFamily: "Montserrat_semiBold",
                      fontSize: 12,
                      textAlign: "left",
                      width: Dimensions.get("screen").width - 140,
                    }}
                    numberOfLines={2}
                  >{text1}</Text>

                </View>
                :
                <Text
                  style={{
                    color: "#0764af",
                    fontFamily: lan == "en" ? "Montserrat_semiBold" : "montserrat_arabic_regular",
                    fontSize: lan === "en" ? 12 : 10,
                    textAlign: "left",
                    width: Dimensions.get("screen").width - 140,
                  }}
                  numberOfLines={2}
                >
                  {lan == "en" ? job.jobname : job.jobname_ar}
                </Text>
            }
            {/* <Text
              style={{
                color: womens ? "#f02fc2" : "#0764af",
                fontFamily: "Montserrat_semiBold",
                fontSize: 12,
                textAlign: "left",
                width: Dimensions.get("screen").width - 140,
              }}
              numberOfLines={2}
            >
              {lan == "en" ? job.jobname : job.jobname_ar}
            </Text> */}
          </View>
          <View style={{ marginTop: 6, marginRight: 26 }}>
            <View
              style={{ flexDirection: lan == "en" ? "row" : "row-reverse" }}
            >
              <Text
                style={{
                  fontSize: 10,
                  color: "#0764af",
                  fontWeight: "bold",
                }}
              >
                Total SAR{" "}
              </Text>
              <Text
                style={{
                  color: job.is_promoted == true ? "white" : "#ff9c00",
                  fontSize: 10,
                }}
              >
                {thisJobcartData?.total || 0}
                {/* {job?.t_price ? job?.t_price : 0} */}
                {/* {tp ? tp : 0}  */}
                {/* {totObj?.job?.jobid == job?.jobid && totObj ? totObj?.total : 0} */}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
            marginBottom: 15,
          }}
        >
          <View style={{ marginLeft: 12, marginTop: 12 }}>
            <View
              style={{
                backgroundColor: "#0764af",
                width: 90,
              }}
            >
              <View
                style={{
                  flexDirection: lan == "en" ? "row" : "row-reverse",
                  alignSelf: "center",
                  alignContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Text style={{ color: "white", fontSize: 12 }}>SAR </Text>
                {(job.jobid === 27 || job.jobid === 24) ?

                  <Text
                    style={{
                      color: "#ff9c00",
                      fontSize: 12,
                    }}
                  >
                    {/* {job?.items > 1 ? job?.t_price / job?.items : job?.price} */}
                    {thisJobcartData?.price || job?.price}
                  </Text>
                  :
                  <Text
                    style={{
                      color: "#ff9c00",
                      fontSize: 12,
                    }}
                  >
                    {thisJobcartData?.price || job?.price}
                    {/* {job?.items > 1 ? totObj?.price : job?.price} */}
                  </Text>
                }

                {/* <Text
                  style={{
                    color: "#ff9c00",
                    fontSize: 12,
                  }}
                >
                  {job.items > 1 && job.saleprice ? job.saleprice : job.price}
                </Text> */}
                <Text style={{
                  color: "white", fontSize: lan === "en" ? 12 : 10,
                  fontFamily: lan == "en" ? "montserrat_medium" : "montserrat_arabic_regular",
                }}>
                  {lan == "en" ? "/Unit" : "وحدة /"}
                </Text>
              </View>
            </View>
          </View>
          {job.is_promoted && job?.jobid !== 245 && job?.jobid !== 237 && job?.jobid !== 249 && job?.jobid !== 241 ? (
            <View
              style={{
                display: job?.jobserviceName == "Window Unit" || job?.jobserviceName == "Split Unit" || job?.jobserviceName == "Tower Unit" ? "none" : "flex",
                alignSelf: "flex-start",
                flex: 1,
                marginLeft: 10,
                marginTop: 8,
                marginBottom: 4,
              }}
            >

              <TouchableOpacity onPress={() => cahngeToolTip(index)}>
                <View>
                  {toolTipVisible == index && job.tips ? ( //i_notes
                    <View
                      style={{
                        backgroundColor: "white",
                        borderRadius: 6,
                        top: 7,
                        left: 10,
                        right: 10,
                        borderStyle: "solid",
                        position: "absolute",
                        borderWidth: 2,
                        marginLeft: 5,
                        borderColor: "#0764af",
                        alignSelf: "flex-start",
                        borderTopLeftRadius: 0,
                        zIndex: 2,
                      }}
                    >
                      <Text
                        style={{ textAlign: "center", fontSize: 7, padding: 2 }}
                      >
                        {lan == "en"
                          ? job.tips && job.tips //i_notes
                          : job.tips_ar && job.tips_ar}
                      </Text>
                    </View>
                  ) : (
                    <View></View>
                  )}
                  <View style={{ alignSelf: "flex-start" }}>
                    <Ionicons
                      name="ios-information-circle"
                      size={20}
                      color={"#0764af"}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View></View>
          )}
          <View style={{ marginRight: 15 }}>
            {job.id !== 285 &&
              job.id !== 286 &&
              job.id !== 288 &&
              job.id !== 289 ? (
              <View style={{ marginLeft: 0, marginBottom: 3 }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: lan === "en" ? 12 : 10,
                    color: "#4a4b4c",
                    fontFamily: lan == "en" ? "montserrat_medium" : "montserrat_arabic_regular",
                  }}
                >
                  {lan == "en" ? "Number of units" : "عدد الوحدات"}
                </Text>
              </View>
            ) : (
              <View></View>
            )}
            {/* <Spinner visible={addCartLoader} /> */}
            <View
              style={{
                backgroundColor: calledFromCatgScreen ? "#313131" : "#6ea8cd",
                flexDirection: "row",
                justifyContent: "space-between",
                width: scaleSize(100),
                height: scaleSize(30),
                borderRadius: 15,
                alignItems: "center",
                alignSelf: "flex-end",
                marginTop: 5,
              }}
            >
              <View
                style={{
                  width: scaleSize(30),
                  height: scaleSize(30),
                  borderRadius: 15,
                  backgroundColor: calledFromCatgScreen ? "#f7c232" : "#0764af",
                  alignSelf: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    minus(job);
                    setJob(job);
                  }}
                >
                  <View style={{ alignSelf: "center", marginTop: 0 }}>
                    <Ionicons name="ios-remove" size={30} color={"white"} style={{
                      marginTop: -1,
                    }} />
                  </View>
                </TouchableOpacity>
              </View>
              {/* <View> */}
              {/* <Text style={{ color: "white", fontSize: 13, paddingTop: 4 }}>
                  {job.items ? job.items : 0}
                </Text> */}


              {/* </View> */}
              <View style={{ justifyContent: "center" }}>
                <Text style={{ color: calledFromCatgScreen ? "white" : "black" }}>
                  {/* {job.items && job.offer_qty && job.items === 1 ?
                  job.items * job.offer_qty :
                  job.items && job.offer_qty && job.items ?
                    job.offer_qty + (job.items - 1) :
                    job.items ? job.items : 0} */}
                  {thisJobcartData?.qty || 0}
                </Text>
                {/* {job.jobid == 245 || job.jobid == 249 || job.jobid == 237 || job.jobid == 241 || job.jobid == 236 ?

                  <Text style={{ color: "white", fontSize: 13, paddingTop: 4 }}>
                    {job.items ? job.items * job.offer_qty : 0}
                  </Text> :
                  <Text style={{ color: "white", fontSize: 13, paddingTop: 4 }}>
                    {job.items ? job.items : 0}
                  </Text>} */}


              </View>
              <View
                style={{
                  width: scaleSize(30),
                  height: scaleSize(30),
                  borderRadius: 15,
                  backgroundColor: calledFromCatgScreen ? "#f7c232" : "#0764af",

                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    //parentCallback(newValue);
                    plus(job);
                    setJob(job);

                    // setTp(tp);
                  }}
                >
                  {/* <View style={{ alignSelf: "center", justifyContent: "center", alignItems: "center" }}> */}
                  <Ionicons name="ios-add" size={30} color={"white"} style={{
                    alignSelf: "center", marginTop: -1,
                    marginRight: -1
                  }} />
                  {/* </View> */}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default QuantitybaseJob;
