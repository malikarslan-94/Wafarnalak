import React, { useEffect, useState } from 'react'
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { scaleSize, widthPerc } from "../mixin";
import {
    Accordion, Picker
} from "native-base";


export default function CategorySelection({ selectedCategoryId, navigate }) {

    const [selection, setSelection] = useState(false)
    const [lan, setLan] = useState("en")

    useEffect(() => {
        getlang()
    }, [])
    const getlang = async () => {
        let lan = await AsyncStorage.getItem("lan");
        setLan(lan)
    }
    return (
        <View style={{ backgroundColor: "#1a66b0", height: "100%" }}>
            <View style={{ paddingHorizontal: scaleSize(15), paddingTop: scaleSize(30) }}>
                <View style={{
                    width: "100%", justifyContent: "center", marginBottom: 10, padding: 10,
                }}>
                    <Text
                        style={{
                            fontFamily: lan == "en" ? "" : "montserrat_arabic_regular", fontWeight: "bold",
                            color: "white",
                            textAlign: "left",
                            fontWeight: "bold",
                            marginBottom: scaleSize(10),
                            fontSize: lan == "en" ? 18 : 14,

                        }}
                    >
                        {lan == "en" ? "ORDER DETAILS" : "تفاصيل الطلب"}
                    </Text>
                    <View
                        style={{
                            flexDirection: "column",
                            justifyContent: "space-between",
                            marginRight: 20,
                        }}
                    >
                        <View style={{ flexDirection: "row" }}>
                            <View
                                style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 50,
                                    borderWidth: 1,
                                    borderColor: "#0764af",
                                }}
                            >
                                <Image
                                    source={{
                                        uri: "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/image-placeholder.png?alt=media&token=10ced05a-f905-4951-9298-ff47e771f070",
                                    }}
                                    style={{

                                        width: 20,
                                        height: 20,
                                        borderRadius: 50,
                                        padding: 5,
                                        alignSelf: "center",
                                        marginTop: 5,
                                    }}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text
                                style={{
                                    fontFamily: lan == "en" ? "Montserrat_semiBold" : "montserrat_arabic_regular", paddingTop: 4,
                                    paddingLeft: 6,
                                    color: "white",

                                    fontSize: lan == "en" ? 14 : 10,
                                }}
                            >
                                {lan == "en"
                                    ? "Job Name" : "Arabic Name"}
                            </Text>
                        </View>




                        <View style={{ flexDirection: "column" }}>
                            <Text
                                style={{
                                    fontFamily: lan == "en" ? "Montserrat_semiBold" : "montserrat_arabic_regular", paddingTop: 4,
                                    paddingLeft: 6,
                                    color: "white",

                                    fontSize: lan == "en" ? 12 : 10,
                                }}
                            >
                                {lan == "en"
                                    ? "Job Name" : "Arabic Name"}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: lan == "en" ? "Montserrat_semiBold" : "montserrat_arabic_regular", paddingTop: 4,
                                    paddingLeft: 6, color: "white",

                                    fontSize: lan == "en" ? 12 : 10,
                                }}
                            >
                                {lan == "en"
                                    ? "Job Name" : "Arabic Name"}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: lan == "en" ? "Montserrat_semiBold" : "montserrat_arabic_regular", paddingTop: 4,
                                    paddingLeft: 6,
                                    color: "white",

                                    fontSize: lan == "en" ? 12 : 10,
                                }}
                            >
                                {lan == "en"
                                    ? "Job Name" : "Arabic Name"}
                            </Text>
                        </View>

                    </View>

                    <View style={{ backgroundColor: "white", width: "100%", height: 1, marginVertical: scaleSize(15) }}></View>
                    <View
                        style={{
                            alignSelf: "center",
                            borderColor: "lightgray",
                            borderWidth: 1,
                            backgroundColor: "white",
                            borderRadius: 6,
                            // height: scaleSize(40),
                            width: "100%",
                            // width: Dimensions.get("screen").width - 60,
                        }}
                    >
                        <Text style={{ color: "lightgray", paddingVertical: 10, paddingHorizontal: 3 }}>
                            "Riyadh"                    </Text>
                    </View>
                    <View style={{ backgroundColor: "white", width: "100%", height: 1, marginVertical: scaleSize(15) }}></View>
                    <View style={{ flexDirection: "column" }}>
                        <Text style={{ color: "white" }}>WORKING DAYS</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: scaleSize(5) }}>
                            {["M", "T", "W", "T", "F", "S", "S"].map((item) => {
                                return <View>
                                    <TouchableOpacity style={styles.daysCheckBox}><Text style={{
                                        alignSelf: "center", color: "#4a4b4c",
                                    }}>{item}</Text></TouchableOpacity>
                                </View>
                            })

                            }

                        </View>

                    </View>




                    <View style={{ flexDirection: "column" }}>

                        <View>
                            <Text style={{ color: "white", marginVertical: scaleSize(5) }}>
                                Company Name
                            </Text>
                            <View
                                style={{
                                    alignSelf: "center",
                                    borderColor: "lightgray",
                                    borderWidth: 1,
                                    backgroundColor: "white",
                                    borderRadius: 6,
                                    // height: scaleSize(40),
                                    width: "100%",
                                    // width: Dimensions.get("screen").width - 60,
                                }}
                            >
                                <TextInput style={{ color: "lightgray", paddingVertical: 5, paddingHorizontal: 3 }}>
                                    "Riyadh"                    </TextInput>
                            </View>
                        </View>
                        <View>
                            <Text style={{ color: "white", marginVertical: scaleSize(5) }}>
                                Company Name
                            </Text>
                            <View
                                style={{
                                    alignSelf: "center",
                                    borderColor: "lightgray",
                                    borderWidth: 1,
                                    backgroundColor: "white",
                                    borderRadius: 6,
                                    // height: scaleSize(40),
                                    width: "100%",
                                    // width: Dimensions.get("screen").width - 60,
                                }}
                            >
                                <TextInput style={{ color: "lightgray", paddingVertical: 5, paddingHorizontal: 3 }}>
                                    "Riyadh"                    </TextInput>
                            </View>
                        </View>
                        <View>
                            <Text style={{ color: "white", marginVertical: scaleSize(5) }}>
                                Company Name
                            </Text>
                            <View
                                style={{
                                    alignSelf: "center",
                                    borderColor: "lightgray",
                                    borderWidth: 1,
                                    backgroundColor: "white",
                                    borderRadius: 6,
                                    // height: scaleSize(40),
                                    width: "100%",
                                    // width: Dimensions.get("screen").width - 60,
                                }}
                            >
                                <TextInput style={{ color: "lightgray", paddingVertical: 5, paddingHorizontal: 3 }}>
                                    "Riyadh"                    </TextInput>
                            </View>
                        </View>

                        <View>
                            <Text style={{ color: "white", marginVertical: scaleSize(5) }}>
                                Company Name
                            </Text>
                            <View
                                style={{
                                    alignSelf: "center",
                                    borderColor: "lightgray",
                                    borderWidth: 1,
                                    backgroundColor: "white",
                                    borderRadius: 6,
                                    // height: scaleSize(40),
                                    width: "100%",
                                    // width: Dimensions.get("screen").width - 60,
                                }}
                            >
                                <TextInput style={{ color: "lightgray", paddingVertical: 5, paddingHorizontal: 3 }}>
                                    "Riyadh"                    </TextInput>
                            </View>
                        </View>


                    </View>

                </View>

            </View>
            <View style={{
                justifyContent: "center", alignItems: "center",
                marginVertical: scaleSize(10)
            }}>
                <LinearGradient
                    colors={["#0764af", "#6ea8cd"]}
                    start={[0.9, 0.2]}
                    end={[0.1, 0.1]}
                    style={{
                        borderWidth: 0,
                        borderRadius: 6,
                        width: 160,
                        height: 40,
                        borderColor: "transparent",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigate()}
                        style={{ alignSelf: "center", }}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>Submit</Text>

                    </TouchableOpacity>
                </LinearGradient>
            </View>




        </View>)
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    daysCheckBox: {
        height: scaleSize(30), width: scaleSize(30),
        backgroundColor: "white", borderRadius: 1, justifyContent: "center", margin: 4
    },
    checkboxContainer: {
        flexDirection: "row",
        // marginBottom: 20,
        alignItems: "center",

    },
    seperator: { backgroundColor: "black", height: 1, width: "95%", marginVertical: 12, alignSelf: "center" },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
    checkboxView: {
        paddingVertical: scaleSize(10), flexDirection: "row"
    }
});