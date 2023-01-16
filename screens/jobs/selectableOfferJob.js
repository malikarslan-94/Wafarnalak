import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const selectableOfferJob = ({
  job,
  selectJob,
  lan,
  index,
  isBanner,
  toolTipVisible,
  cahngeToolTip,
  thisJobcartData
}) => {

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

  // console.log("slectable offer base job")
  return (
    <View>
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
          marginLeft: isBanner ? 0 : 10,
          marginRight: isBanner ? 0 : 20,
          backgroundColor: job.is_promoted == true || job.pricetypeid == 3 ? "#9dbacd" : "white",
          borderWidth: 1,
          borderTopWidth: index == 0 ? 1 : 0,
          borderColor: "#283a97",
          borderTopWidth: 1,
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

          <View
            style={{
              marginTop: 4,
            }}
          >

            {/* <Text>{job?.jobid}</Text> */}
            {
              job?.jobname?.length > 36 && lan == "en" ?
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

                  {
                    isBanner ?
                      lan == "en" ? job.promotions.tilte : job.promotions.title_ar
                      : lan == "en" ? job.jobname : job.jobname_ar

                  }
                  {/* {lan == "en" ? job.jobname : job.jobname_ar} */}
                </Text>
            }

            {/* <Text
              style={{
                color: "#0764af",
                fontFamily: "Montserrat_semiBold",
                fontSize: 12,
                textAlign: "left",
                width: Dimensions.get("screen").width - 140,
              }}
              numberOfLines={2}
            >
              {lan == "en" ? job.jobname : job.jobname_ar}{" "}
            </Text> */}
          </View>
          <View
            style={{
              marginRight: 26,
              marginTop: 8,

              marginLeft: 8,
            }}
          >
            <View
              style={{ flexDirection: lan == "en" ? "row" : "row-reverse" }}
            >
              <Text
                style={{ fontSize: 10, color: "#0764af", fontWeight: "bold" }}
              >
                Total SAR{" "}
              </Text>
              <Text style={{ color: "white", fontSize: 10, paddingLeft: 4 }}>
                {thisJobcartData?.total || 0}
                {/* {job.t_price ? job.t_price : 0}{" "} */}
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
            <View>
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
                    // flex: 1,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 12,
                    }}
                  >
                    SAR{" "}
                  </Text>
                  <Text
                    style={{
                      color: "#ff9c00",
                      fontSize: 12,
                    }}
                  >
                    {job.price}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: lan === "en" ? 12 : 10,
                      fontFamily: lan == "en" ? "montserrat_medium" : "montserrat_arabic_regular",

                    }}
                  >
                    {lan == "en" ? "/Unit" : "زيارة/"}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* {job.is_promoted ? (
            <View
              style={{
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
          )} */}
          <View style={{ marginRight: lan == "en" ? 20 : 37 }}>
            {/* 30 */}
            <Text
              style={{
                // textAlign: "center",
                fontSize: lan === "en" ? 12 : 10,
                color: "#4a4b4c",
                marginBottom: 3,
                fontFamily: lan == "en" ? "montserrat_medium" : "montserrat_arabic_regular",

                //marginLeft: 50,
              }}
            >
              {lan == "en" ? "Book Offer" : "إحجز موعد"}
            </Text>
            <TouchableOpacity
              onPress={() => selectJob(job)}
              hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
            >
              <View style={{ alignSelf: "center" }}>
                <Ionicons
                  name={
                    thisJobcartData
                      ? "ios-checkmark-circle"
                      : "ios-checkmark-circle-outline"
                  }
                  size={26}
                  color={"#0764af"}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </View>
  );
};
export default selectableOfferJob;

