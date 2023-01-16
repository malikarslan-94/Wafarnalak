import React, { useEffect, useState } from 'react'
import { Ionicons } from "@expo/vector-icons";
import { scaleSize, widthPerc } from "../../mixin";
import axios from "axios";

import {
    Badge,
    Text,
    Toast,
} from "native-base";
import {
    Dimensions,
    Image,
    TouchableOpacity,
    View
} from "react-native";
export default function Index({ lan, selectedServices, navigationSetup, user, calledFromLanding, calledFromProfile, cartData }) {

    // const [cartData, setCartData] = useState();

    // useEffect(() => {
    //     fetch(
    //         "http://app.xn--mgbt1ckekl.com/api/cu/v.3/app/cart",
    //         //"http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/customer_in_progress_order_requests",
    //         {
    //             method: "POST", //POST
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ session_id: user?.session_id }),
    //         }
    //     )
    //         .then((response) => console.log("cart response", response))
    // }, [selectedServices.length])

    // useEffect(() => {
    //     axios.get(`https://demo.xn--mgbt1ckekl.com//api/cu/v.3/app/cart/${user?.session_id}`)
    //         .then((response) => {
    //             setCartData(response)
    //             console.log("cart data", response.data.cart, user?.session_id)
    //         })
    // }, [selectedServices.length])
    // console.log("user data for session", user)


    // let uniqueServices = []
    // if (selectedServices) {
    //     selectedServices?.map(job => {
    //         let isNew = !uniqueServices.find(i => i.jobid === job.jobid);
    //         if (isNew) {
    //             uniqueServices.push(job)
    //         }
    //     })
    // }
    let totalItemsInCart = cartData?.cart?.reduce(
        (previousValue, currentValue) => {
            return parseInt(previousValue) + parseInt(currentValue.qty)
        },
        0
    )
    console.log("totalItemsInCart", totalItemsInCart)


    // console.log({ totalItemsInCart });
    // let uniqueServices = []
    // if (selectedServices) {
    //     selectedServices?.map(job => {
    //         let isNew = !uniqueServices.find(i => i.jobid === job.jobid);
    //         if (isNew) {
    //             uniqueServices.push(job)
    //         }
    //     })
    // }



    // let totalItemsInCart = uniqueServices?.reduce(
    //     (previousValue, currentValue) => {
    //         return previousValue + currentValue.items
    //     },
    //     0
    // )
    // console.log({ totalItemsInCart });
    return (
        <View
            style={{
                width: widthPerc(100),
                position: "absolute",
                bottom: 0,
                alignSelf: "center",
                backgroundColor: "white",

            }}
        >
            <View
                style={{
                    paddingVertical: scaleSize(6),
                    flexDirection: "row",
                    flex: 1,
                    alignSelf: "center",
                    justifyContent: "space-between",
                    marginHorizontal: scaleSize(12),
                    width: Dimensions.get("screen").width - 30,
                }}
            >
                <TouchableOpacity onPress={calledFromLanding ? null : () => navigationSetup(1)}>

                    <View>
                        <View style={{ alignSelf: "center" }}>
                            <Ionicons name="md-apps" size={28} color={calledFromLanding ? "#0865b0" : "#ccc"} />
                        </View>
                        <Text
                            style={{ textAlign: "center", fontSize: lan === "en" ? 12 : 11, color: calledFromLanding ? "#0865b0" : "#ccc", fontFamily: lan === "en" ? "montserrat_medium" : "montserrat_arabic_regular", }}
                        >
                            {lan === "en" ? "Categories" : "فئات الخدمات"}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigationSetup(2)}>
                    <View>
                        <View style={{ alignSelf: "center" }}>
                            <Image
                                resizeMode="contain"
                                source={require("../../assets/myOrder.png")}
                                style={{ height: 29, width: 30 }}
                            />
                        </View>
                        <Text
                            style={{ textAlign: "center", fontSize: lan === "en" ? 12 : 11, color: "#ccc", fontFamily: lan === "en" ? "montserrat_medium" : "montserrat_arabic_regular", }}
                        >
                            {lan === "en" ? "My Orders" : "طلباتي"}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={totalItemsInCart > 0 ? () => navigationSetup(3) : () => {
                    Toast.show({
                        text:
                            lan == "en" ? "Your cart is empty" : "سلة الطلبات فارغة",
                        position: "bottom",
                    })
                }}>
                    <View>
                        <View style={{ alignSelf: "center", flexDirection: "row" }}>
                            <Ionicons name="md-cart" size={28} color={"#ccc"} />
                            {totalItemsInCart ? (
                                <Badge
                                    danger
                                    style={{ width: 20, height: 20, borderRadius: 10 }}
                                >
                                    <View
                                        style={{
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            top: 0,
                                            position: "absolute",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: lan === "en" ? 12 : 11,
                                                justifyContent: "center",
                                            }}
                                        >
                                            {/* {cartData?.data?.cart?.length} */}
                                            {totalItemsInCart}
                                        </Text>
                                    </View>
                                </Badge>
                            ) : (
                                <View></View>
                            )}
                        </View>
                        <Text
                            style={{ textAlign: "center", fontSize: lan === "en" ? 12 : 11, color: "#ccc", fontFamily: lan === "en" ? "montserrat_medium" : "montserrat_arabic_regular", }}
                        >
                            {lan == "en" ? "My Cart" : "سلة الطلب خاصتي"}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigationSetup(4)}>
                    <View>
                        <View style={{ alignSelf: "center" }}>
                            <View style={{ flexDirection: "row" }}>
                                <Ionicons
                                    name={
                                        user !== null
                                            ? "ios-person"
                                            : "ios-information-circle"
                                    }
                                    size={28}
                                    color={calledFromProfile ? "#0865b0" : "#ccc"}
                                />
                                {(user && user.name == "") ||
                                    (user && user.name == null) ||
                                    (user && user.email == "") ||
                                    (user && user.email == null) ? (
                                    <View
                                        style={{
                                            width: 4,
                                            height: 4,
                                            borderRadius: 2,
                                            backgroundColor: "red",
                                        }}
                                    ></View>
                                ) : (
                                    <View></View>
                                )}
                            </View>
                        </View>
                        <Text
                            style={{ textAlign: "center", fontSize: lan === "en" ? 12 : 11, color: calledFromProfile ? "#0865b0" : "#ccc", fontFamily: lan === "en" ? "montserrat_medium" : "montserrat_arabic_regular", }}
                        >
                            {user !== null
                                ? lan == "en"
                                    ? "My Profile"
                                    : "ملفي الشخصي"
                                : lan == "en"
                                    ? "About"
                                    : "المزيد"}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
