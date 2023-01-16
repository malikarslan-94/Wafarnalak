import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View, Dimensions, FlatList, ScrollView, AsyncStorage } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import Footer from "../components/Footer/Index"

import { scaleHeight, scaleSize, widthPerc } from '../mixin';


const CategoryScreen = ({ navigation, renderContent }) => {


    const [dataArray, setDataArray] = useState([])
    const [job, setJob] = useState()
    const [lan, setLan] = useState("en")
    const [user, setUser] = useState()
    const [calledFrom, setCalledFrom] = useState("categoryScreen")
    const [category, setCategory] = useState()
    const [selectedJobId, setSelectedJobId] = useState(0)
    useEffect(() => {
        (async () => {

            let lang = await AsyncStorage.getItem("lan");
            setLan(lang != null ? lang : "en")
            console.log("daaaaaaata", navigation.getParam("renderData"))
            setUser(navigation.getParam("user"))
            setCategory(navigation.getParam("renderData"))
            setDataArray(navigation.getParam("renderData").services);
            setJob(navigation.getParam("renderData").services[0])
        })()

    }, [])

    console.log("custom accordian data", navigation.getParam("renderData"))
    return (
        <View style={{
            height: Dimensions.get("screen").height,
            width: Dimensions.get("screen").width,
            backgroundColor: "#f1f1f1"
        }}>
            <View style={{
                width: Dimensions.get("screen").width, height: scaleHeight(200), alignSelf: "center", backgroundColor: "#4ba06d"
            }}>
                <Image
                    style={{
                        height: scaleSize(60),
                        width: 60,
                        alignSelf: "center",
                        tintColor: "white",
                        marginTop: 10
                    }}
                    source={{ uri: category?.black_icon }}
                />
            </View>

            <View style={{ height: scaleSize(70), zIndex: 99, }}>
                <View style={{
                    top: -50,
                    height: scaleSize(120),
                    width: Dimensions.get("screen").width - 30,
                    borderRadius: 10,
                    alignSelf: "center",
                    padding: 15,
                    backgroundColor: "#FAF9F6",
                    position: "absolute",
                    shadowColor: "black",
                    shadowOffset: {
                        width: 0,
                        height: 3,
                    },
                    shadowOpacity: 0.27,
                    shadowRadius: 4.65,

                    elevation: 6,
                }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>{lan == "en" ? category?.categoryname : category.categoryname_ar}</Text>
                    <Text style={{}}>This is an estimated price for the job, the actual price will be shared by the professional.</Text>


                </View>
            </View>
            <View style={{
                flexDirection: "column", width: Dimensions.get("screen").width - 30,
                alignSelf: "center",
            }}>
                {dataArray && <FlatList
                    data={dataArray}

                    horizontal={true}
                    renderItem={({ item, index }) => (
                        <View style={{ justifyContent: "center", marginVertical: scaleSize(15) }}>
                            <TouchableOpacity onPress={() => {
                                setSelectedJobId(index)
                                setJob(item)
                                // setDataArray(item)
                                console.log("selected item", item)
                            }}
                            >
                                <Text
                                    style={{
                                        backgroundColor: selectedJobId == index ? "#f7c232" : "white",
                                        paddingVertical: 3,
                                        borderRadius: 30,
                                        paddingHorizontal: scaleSize(7),
                                        // height: 25,
                                        fontSize: lan == "en" ? 13 : 10,
                                        fontFamily: lan == "en" ? "" : "montserrat_arabic_semibold",
                                        textAlign: "center",
                                        // width: scaleSize(120),
                                        color: "#0865b0",
                                        marginRight: 5,
                                        borderStyle: "solid",
                                        borderColor: "gray",
                                        borderWidth: 1,
                                    }}
                                >
                                    {lan == "en" ? item.servicename : item.servicename_ar}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                />}
                <ScrollView style={{ height: Dimensions.get("screen").height - 420 }}>
                    {dataArray && job ? navigation.getParam("renderContent")(job, calledFrom) : null}

                </ScrollView>
                <View
                    style={{ position: "absolute", bottom: -60, width: Dimensions.get("screen").width - 30 }}>
                    <Footer
                        lan={lan}
                        user={user}
                        selectedServices={navigation?.getParam("selectedServices")}
                        navigationSetup={navigation.getParam("navigationSetup")}
                    />
                </View>

            </View>


        </View>
    )
}

export default CategoryScreen