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

const SelectableJob = ({
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
  // console.log("selectable job", thisJobcartData, "=======>", job);

  return (
    <View>
      {/* Extra notes tab */}
      {/* <View style={{ marginLeft: 15, marginRight: 15 }}>
        {job.note && job.note !== null && index == 0 ? (
          <View
            style={{ backgroundColor: "white", marginLeft: 1, marginRight: 1 }}
          >
            <Text style={{ fontWeight: "bold", textAlign: "left" }}>
              {lan == "en" ? "Notes:" : "ملاحظات:"}
            </Text>
            <Text style={{ textAlign: "left", fontSize: 12 }}>
              {lan == "en"
                ? job.note
                : job.jobid == 299 || job.jobid == 300
                  ? "1-" +
                  " سيقوم الفني بزيارتك للسماح لك باختيار شركة الطلاء واللون" +
                  "\n" +
                  "2-" +
                  " لكل غرفة تختارها ستحصل على طلاء للحمام او المطبخ مجاناً" +
                  "\n" +
                  "3-" +
                  " كل الأسعار قابلة للتخفيض"
                  : job.note_ar}
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
          // marginLeft: isBanner ? 0 : 15,
          // marginRight: isBanner ? 0 : 15,
          backgroundColor: job.is_promoted == true ? "#9dbacd" : "white",

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

            {
              job?.jobname?.length > 36 && lan == "en" && job.jobid !== 65 && job.jobid !== 71 && job.jobid !== 157 ?
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
                      :
                      lan == "en" ? job.jobname : job.jobname_ar

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

              {
                isBanner ?
                  lan == "en" ? job.promotions.tilte : job.promotions.title_ar
                  :
                  lan == "en" ? job.jobname : job.jobname_ar

              }
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
              <Text style={{ color: "#ff9c00", fontSize: 10, paddingLeft: 4 }}>
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
                    {lan == "en" ? "/Visit" : "زيارة/"}
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
              {lan == "en" ? "Book Appointment" : "إحجز موعد"}
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
        {/* {job.is_promoted == false || (job.jobserviceName === "Electrician Visit" || job.jobserviceName === "AC Technician Visit" || isBanner) && ( */}
        <View style={{ marginLeft: 15, marginRight: 15, marginBottom: 5 }}>
          <View
            style={{
              backgroundColor: job.jobserviceName === "Electrician Visit" || job.jobserviceName === "AC Technician Visit" || job.jobserviceName === "Central AC" || isBanner ? "transparent" : "white",
              marginLeft: 1,
              marginRight: 1,
            }}
          >
            {/* <Text style={{ fontWeight: "bold", textAlign: "left" }}>
                {lan == "en" ? "Notes:" : "ملاحظات:"}
              </Text> */}
            {/* fontSize : 9 */}
            <Text style={{
              textAlign: "justify", fontSize: lan === "en" ? 12 : 10,
              fontFamily: lan == "en" ? "montserrat_medium" : "montserrat_arabic_regular",
            }}>


              {lan == "en"

                ? "Visit charge is SAR 50 if the service is not availed. Actual service price will be provided by the technician after inspection."
                : "رسوم الزيارة 50 ريال في حال عدم توافر الخدمة، سيتم توفير سعر الخدمة الرئيسية بعد التحقيق"}
              {/* ? "This is only visit charge, our technician will quote the service price after survey."
                : "هذه ليست سوى رسوم زيارة ، سيقوم الفني لدينا بتحديد سعر الخدمة بعد فحص المشكلة."} */}
            </Text>
          </View>
        </View>
        {/* )} */}
      </View>
    </View>
  );
};
export default SelectableJob;

// import React from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   TouchableWithoutFeedback
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// const { width, height } = Dimensions.get("screen");
// const SPACING = (height / width) * 8;
// const AVATAR_SIZE = (height / width) * 34;
// const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
// const SelectableJob = ({ job, selectJob, lan, index }) => {
//   console.log("selectable job ", job);
//   return (
//     <TouchableOpacity>
//       <View
//         style={{ paddingVertical: SPACING / 2, paddingHorizontal: SPACING }}
//       >
//         {job.note && job.note !== null && index == 0 ? (
//           <View>
//             <Text style={{ fontWeight: "bol", textAlign: "left" }}>
//               {lan == "en" ? "Notes:" : "ملاحظات:"}
//             </Text>
//             <Text style={{ textAlign: "left", fontSize: 12 }}>
//               {lan == "en"
//                 ? job.note
//                 : job.id == 299 || job.id == 300
//                 ? "1-" +
//                   " سيقوم الفني بزيارتك للسماح لك باختيار شركة الطلاء واللون" +
//                   "\n" +
//                   "2-" +
//                   " لكل غرفة تختارها ستحصل على طلاء للحمام او المطبخ مجاناً" +
//                   "\n" +
//                   "3-" +
//                   " كل الأسعار قابلة للتخفيض"
//                 : job.note_ar}
//             </Text>
//           </View>
//         ) : (
//           <View></View>
//         )}
//         <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
//           <Text
//             style={{
//               color: "#0764af",
//               fontFamily: "Montserrat_semiBold",
//               fontSize: SPACING / 2,
//               textAlign: "left"
//             }}
//             numberOfLines={2}
//           >
//             {lan == "en" ? job.name : " ترتيب زيارة"}{" "}
//           </Text>
//           <View style={{ flexDirection: lan == "en" ? "row" : "row-reverse" }}>
//             <Text
//               style={{
//                 fontSize: SPACING / 2,
//                 color: "#0764af",
//                 fontWeight: "bold"
//               }}
//             >
//               Total SAR{" "}
//             </Text>
//             <Text
//               style={{
//                 color: "#ff9c00",
//                 fontSize: SPACING / 2,
//                 paddingLeft: 4
//               }}
//             >
//               {job.t_price ? job.t_price : 0}{" "}
//             </Text>
//           </View>
//         </View>

//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             marginTop: SPACING,
//             width: "100%"
//           }}
//         >
//           <View
//             style={{
//               backgroundColor: "#0764af",
//               paddingHorizontal: SPACING / 4,
//               flexDirection: lan == "en" ? "row" : "row-reverse",
//               paddingVertical: SPACING / 8
//             }}
//           >
//             <Text
//               style={{
//                 textAlign: "center",
//                 fontSize: SPACING / 1.5,
//                 color: "white",
//                 fontWeight: "600"
//               }}
//             >
//               {"SAR "}
//             </Text>
//             <Text
//               style={{
//                 textAlign: "center",
//                 fontSize: SPACING / 1.5,
//                 color: "#d89801",
//                 fontWeight: "600"
//               }}
//             >
//               {job.price}
//             </Text>
//             <Text
//               style={{
//                 color: "white",
//                 fontSize: SPACING / 1.5
//               }}
//             >
//               {lan == "en" ? "/Visit" : "زيارة/"}
//             </Text>
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };
// export default SelectableJob;
