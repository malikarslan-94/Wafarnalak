import { Image, Text, TouchableOpacity, View } from "react-native";

import React from "react";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { scaleSize, widthPerc } from "../../mixin";

// Unused Class
const CategoryCard = ({
    props,
    lan,
    category, selectedCategoryId,
    women,
    white,
    location,
    allCategorySelection,
    item,
}) => {
    // console.log("item ", item);
    return (
        <View style={{
            flex: 1, justifyContent: "space-around",
            width: widthPerc(92.5),
            alignSelf: "flex-start",
            //  paddingVertical: scaleSize(10),
            borderRadius: selectedCategoryId == category.categoryid ? 6 : 0,
        }}>
            <TouchableOpacity onPress={() => allCategorySelection()}
                style={{
                    marginLeft: 0,
                    marginTop: 5,
                    marginBottom: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 2,
                    paddingHorizontal: 4,
                    backgroundColor: "#d8d8d8",
                    // selectedCategoryId == category.categoryid
                    //     ? "#0865b0"
                    //     : "#d8d8d8",
                    borderRadius: selectedCategoryId == category.categoryid ? 6 : 0,
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
                    <Image
                        source={{
                            uri:
                                selectedCategoryId == category.categoryid
                                    ? category.black_icon
                                    : category.black_icon,
                        }}
                        style={{
                            width: 25,
                            height: 25,
                            marginRight: 5,
                            tintColor: "black"
                            // selectedCategoryId == category.categoryid
                            //     ? "white"
                            //     : white
                            //         ? "white"
                            //         : "black",
                        }}
                        resizeMode="contain"
                    />
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
                                color: "black",
                                // ? "white"
                                // : selectedCategoryId == category.categoryid
                                //     ? "white"
                                //     : "black",
                                fontSize: lan === "en" ? 13 : 10,
                                fontFamily: lan == "en" ? "montserrat_medium" : "montserrat_arabic_regular",
                            }}
                        >
                            {lan == "en" ? category.categoryname : category.categoryname_ar}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>

        </View>
    );
};
export default CategoryCard;
