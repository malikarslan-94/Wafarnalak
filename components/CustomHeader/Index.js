
import React, { useEffect, useState } from 'react'
import { Ionicons } from "@expo/vector-icons";
import { scaleSize, widthPerc } from "../../mixin";
import axios from "axios";

import {
    Header,
    Title,
    Left,
    Right,
} from "native-base";
import {
    Dimensions,
    View
} from "react-native";
export default function Index({ lan, navigation, Title_en, Title_ar, clearOrder }) {
    console.log("langg", Title_ar)
    return (
        <Header
            style={{
                marginTop: 0,
                backgroundColor: "white",
                height: 60,
                borderBottomColor: "#0866b0",
                borderBottomWidth: 1,
                justifyContent: "center",
            }}
        >
            <Left style={{ marginLeft: 10 }}>
                {lan === "en" ? (
                    <Ionicons
                        onPress={() => {
                            if (Title_en == "Order Summary") {
                                clearOrder()
                            }
                            navigation.goBack();
                        }}
                        name={"chevron-back-outline"}
                        size={30}
                        color={"#0866b0"}
                    />
                ) : (
                    <Ionicons
                        onPress={() => {
                            navigation.goBack();
                        }}
                        name={"chevron-forward-outline"}
                        size={30}
                        color={"#0866b0"}
                    />
                )}
            </Left>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    position: Platform.OS === "android" ? "absolute" : "relative",
                    alignSelf: "center",
                }}
            >
                {lan === "en" ? (
                    <Title
                        style={{
                            fontFamily: "Montserrat_semiBold",
                            color: "#0866b0",
                            fontSize: 18,
                        }}
                    >
                        {Title_en}
                    </Title>
                ) : (
                    <Title
                        style={{
                            fontFamily: "montserrat_arabic_regular",
                            textAlign: "left",
                            color: "#0866b0",
                            fontSize: 13,
                        }}
                    >
                        {Title_ar}
                    </Title>
                )}
            </View>
            <Right />
        </Header>
    )
}