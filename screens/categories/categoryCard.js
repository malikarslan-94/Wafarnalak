import { Image, Text, TouchableOpacity, View } from "react-native";

import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { scaleSize } from "../../mixin";

// Unused Class
const CategoryCard = ({
  props,
  lan,
  category,
  categorySelection,
  selectedCategoryId,
  women,
  white,
  location,
  openVideoPopup,
  item,
  scrollValue,
  index,
  showAllCategory
}) => {
  // console.log("indexx ", index, scrollValue, selectedCategoryId, category.categoryid);
  return (
    <View style={{ flex: 1, paddingRight: 5 }}>
      <TouchableOpacity onPress={() => categorySelection({ ...category, index: item })}>
        <View
          style={{
            width: showAllCategory && category.categoryid == 1 ? scaleSize(175) : showAllCategory && index !== 5 && index !== 6 ? scaleSize(160) : null,
            marginLeft: 0,
            // marginTop: 10,
            marginBottom: 5,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 2,
            paddingHorizontal: 4,
            backgroundColor:
              selectedCategoryId == category.categoryid || index == scrollValue
                ? "#0865b0"
                : "transparent",
            borderRadius: selectedCategoryId == category.categoryid || index == scrollValue ? 6 : 0,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingLeft: 4,
              paddingRight: 4,
              paddingTop: 4,
              paddingBottom: 4,
            }}
          >
            {category?.categoryid == 22 ? <Image
              source={require("../../assets/ManPower-Rental-Black.png")}
              style={{
                width: 30,
                height: 30,
                marginRight: 5,
                tintColor:
                  selectedCategoryId == category.categoryid || index == scrollValue
                    ? "white"
                    : "black",
              }}
              resizeMode="contain"
            /> : <Image
              source={{
                uri:
                  selectedCategoryId == category.categoryid
                    ? category.black_icon
                    : category.black_icon,
              }}
              style={{
                width: category?.categoryid == 22 ? 30 : 25,
                height: category?.categoryid == 22 ? 30 : 25,
                marginRight: 5,
                tintColor:
                  selectedCategoryId == category?.categoryid || index == scrollValue
                    ? "white"
                    : "black",
              }}
              resizeMode="contain"
            />}
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  paddingLeft: 6,
                  color: white
                    ? "white"
                    : selectedCategoryId == category.categoryid || index == scrollValue
                      ? "white"
                      : "black",
                  fontSize: lan === "en" ? 13 : 10,
                  fontFamily: lan == "en" ? "montserrat_medium" : "montserrat_arabic_regular",
                }}
              >
                {lan == "en" ? category.categoryname : category.categoryname_ar}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openVideoPopup(item)} >
        <Image
          style={{
            alignSelf: "center",
            width: scaleSize(85),
            height: scaleSize(40),
            marginRight: 5,
            marginTop: 5,
          }}
          resizeMode="contain"
          source={
            lan == "en"
              ? require("../../assets/Services-Icons-min.png")
              : require("../../assets/Check-our-Video-Arabic-min.png")
          }
        />
      </TouchableOpacity>
    </View>
  );
};
export default CategoryCard;
