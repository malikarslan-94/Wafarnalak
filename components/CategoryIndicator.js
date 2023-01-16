import React, { useEffect, useState } from 'react'
import {
    Text,
    View,
} from "react-native";
import { scaleSize, widthPerc } from "../mixin";


export default function CategoryIndicator({ dataArray, selectedCategoryId }) {

    const [array, setArray] = useState([1])

    useEffect(() => {
        setArray(dataArray)
    }, [dataArray])

    return (
        <View style={{ height: scaleSize(10), width: widthPerc(100), justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
            <View style={{ height: scaleSize(10), width: widthPerc(40), justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                {
                    array?.map((item, index) => {
                        return <View key={index}
                            style={{
                                backgroundColor: item?.categoryid === selectedCategoryId ? "red" : "white",
                                opacity: 0.5,
                                height: scaleSize(10),
                                width: scaleSize(10),
                                borderRadius: 50,
                                borderColor: item?.categoryid === selectedCategoryId ? "red" : "gray",
                                borderWidth: 1,
                                borderStyle: "solid"
                            }}>

                        </View>
                    })


                }
            </View>
        </View>)
}
