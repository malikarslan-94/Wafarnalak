import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, AsyncStorage } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import getEnvVars from '../../environment';
import { scaleSize, widthPerc } from "../../mixin"
import { Toast } from 'native-base';
import axios from "axios";
const { apiUrl } = getEnvVars()



const Index = ({ ref_Id, isLogin }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [referalCode, setReferalCode] = useState("")


    useEffect(async () => {
        console.log("ref_Id", ref_Id, "isLogin", isLogin)
        if (isLogin)
            if (!ref_Id && isLogin) {
                setModalVisible(true)
            }
            else {
                if (!ref_Id) {
                    setModalVisible(true)
                }
            }

    }, [ref_Id, isLogin])

    const handleCloseModal = () => {
        axios
            .post(

                `${apiUrl}/referralcode`,
                {
                    referralcode: -1,
                }
            )
            .then((response) => response.data)
            .then((responseJson) => {
                console.log("after response", responseJson)
                if (responseJson.error == false) {
                    console.log("verify", responseJson);
                    Toast.show({
                        text: responseJson.message,
                        position: "bottom",
                        duration: 3000
                    });

                } else {
                    Toast.show({
                        text: "You have not sumbitted the Referral Code",
                        position: "bottom",
                        duration: 3000,
                    });
                }

                //   this.setState({ loading: false });
            })
            .catch((error) => {
                Toast.show({
                    text: error.message,
                    position: "bottom",
                    duration: 3000,
                });
            }
            );

        setModalVisible(false)

    }


    const sendReferal = () => {
        console.log("sendReferal", referalCode)
        axios
            .post(
                `${apiUrl}/referralcode`,
                {
                    referralcode: referalCode,
                }
            )
            .then((response) => response.data)
            .then((responseJson) => {
                console.log("after response", responseJson)
                if (responseJson.error == false) {
                    Toast.show({
                        text: responseJson.message,
                        position: "bottom",
                        duration: 3000
                    });
                    setModalVisible(false)

                } else {
                    Toast.show({
                        text: responseJson.message + " Or Incorrect Code",
                        position: "bottom",
                        duration: 3000,
                    });
                }

                //   this.setState({ loading: false });
            })
            .catch((error) => {
                Toast.show({
                    text: error.message,
                    position: "bottom",
                    duration: 3000,
                });
                setModalVisible(false)

            });
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>

                    <View style={styles.modalView}>
                        <View style={{ position: "absolute", right: 6, top: 8 }}>
                            <Ionicons
                                onPress={() => handleCloseModal()}
                                name="ios-close-circle-outline"
                                size={25}
                                color="red"
                            />
                        </View>
                        <Text style={styles.modalText}>Enter Referal Code</Text>
                        <View style={{ width: widthPerc(40) }}>
                            <TextInput
                                style={{ borderStyle: "solid", borderColor: "lightgray", borderWidth: 1, borderRadius: 5, paddingHorizontal: 9 }}
                                placeholder="Referal Code"
                                value={referalCode}
                                onChangeText={(input) => {
                                    setReferalCode(input)
                                }}
                            />
                        </View>
                        <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => sendReferal()}>
                            <Text style={styles.textStyle}>Submit</Text>
                        </Pressable>

                    </View>
                </View>
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        marginTop: scaleSize(15),
        backgroundColor: '#A9A9A9',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default Index;
// const sendReferal = () => {
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
//     myHeaders.append("Cookie", "PHPSESSID=hnem22vprmo5p9v5bj48p9t5dm");

//     var urlencoded = new URLSearchParams();
//     urlencoded.append("referralcode", "CLHCE");
//     var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: urlencoded,
//         redirect: 'follow'
//     };
//     console.log("sendReferal", referalCode)
//     fetch(
//         "http://app.xn--mgbt1ckekl.com/api/cu/v.3/app/referralcode",
//         requestOptions
//     )
//         .then((response) => response.json())
//         .then((responseJson) => {
//             console.log("after response", responseJson)
//             if (responseJson.error == false) {
//                 console.log("verify", responseJson);
//                 Toast.show({
//                     text: responseJson.message,
//                     position: "bottom",
//                     duration: 3000
//                 });
//             } else {
//                 Toast.show({
//                     text: responseJson.message,
//                     position: "bottom",
//                     duration: 3000,
//                 });
//             }

//             //   this.setState({ loading: false });
//         })
//         .catch((error) => {
//             Toast.show({
//                 text: error.message,
//                 position: "bottom",
//                 duration: 3000,
//             });
//         });
//     setModalVisible(false)
// }