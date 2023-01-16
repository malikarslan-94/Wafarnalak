import { Thumbnail } from 'native-base'
import React from 'react'
import { Image, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { scaleSize, widthPerc } from '../../mixin';

const index = ({ offerBannerClose, lan, promotionNavigation, bannerIndex }) => {
    return (

        <View style={{
            alignSelf: "center", position: "absolute", zIndex: 3, height: Dimensions.get("window").height,
            width: Dimensions.get("window").width, backgroundColor: "transparent", justifyContent: "center"
        }}>
            <TouchableOpacity onPress={() => {
                promotionNavigation()
            }}
                style={{
                    alignSelf: "center",
                    marginTop: scaleSize(20),
                    height: Dimensions.get("window").height - 130,
                    width: Dimensions.get("window").width - 40,
                }}>
                {bannerIndex == 0 ? <Image

                    style={{
                        alignSelf: "center",
                        height: Dimensions.get("window").height - 130,
                        width: Dimensions.get("window").width - 40
                    }}
                    source={lan == "en" ? require("../../assets/AcBanners/Window-Ac-Cleaning-Eng.png") : require("../../assets/AcBanners/Window-Ac-Cleaning-Arabic-80.png")}
                    resizeMode="contain"
                /> : <Image
                    style={{
                        alignSelf: "center",
                        height: Dimensions.get("window").height - 130,
                        width: Dimensions.get("window").width - 40
                    }}
                    source={lan == "en" ? require("../../assets/AcBanners/Split-Cleaning-Eng-Pop-Up.png") : require("../../assets/AcBanners/Split_Ac_new.png")}
                    resizeMode="contain"
                />}
            </TouchableOpacity>
            <TouchableOpacity style={{
                backgroundColor: "#1a66b0", width: widthPerc(85),
                alignSelf: "center", borderRadius: 10, paddingVertical: scaleSize(13),
                marginTop: scaleSize(20)
            }}
                onPress={() => {
                    promotionNavigation()
                }}
            >
                <Text style={{ textAlign: "center", color: "white", }}>AVAIL OFFER</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                justifyContent: "center",
                right: scaleSize(50),
                position: "absolute",
                top: scaleSize(60),
                zIndex: 999,
                height: scaleSize(55),
                width: scaleSize(55),
            }}
                onPress={() => { offerBannerClose() }}>
                <Image
                    style={{
                        height: scaleSize(25),
                        width: scaleSize(25),
                        alignSelf: "center"
                    }}
                    source={lan == "en" ? require("../../assets/AcBanners/Cross-Window-Banner.png") : require("../../assets/AcBanners/Cross-Split-Banner.png")}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
    )
}

export default index