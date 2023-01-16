import { Thumbnail } from 'native-base'
import React from 'react'
import { Text, View } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { scaleSize } from '../../mixin';

const popup = ({ closePopup, message }) => {
    return (

        <View
            style={{
                position: "absolute",
                marginTop: 30,
                alignSelf: "center",
                height: 130,
                borderRadius: 20,
                width: 350,
                backgroundColor: "#6ea8cd",

            }}
        >
            <View style={{ alignSelf: "center", marginTop: -24 }}>
                <Thumbnail source={require("../../assets/Icon2.png")} />
            </View>
            <View style={{ position: "absolute", right: 6, top: 8 }}>
                <Ionicons
                    onPress={() => closePopup()}
                    name="ios-close-circle-outline"
                    size={30}
                    color="red"
                />
            </View>

            <View style={{ padding: scaleSize(10) }}>
                <Text style={{ color: "#FF9966", fontSize: 17, fontWeight: "bold", marginVertical: 5, textAlign: "center" }}>Alert !</Text>
                <Text style={{ color: "lightgray", textAlign: "center" }}>{message}</Text>
            </View>
        </View>

    )
}

export default popup