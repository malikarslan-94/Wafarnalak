import React, { useEffect, useState } from 'react'
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
    TouchableOpacity, Modal, TextInput, ActivityIndicator, AsyncStorage, ScrollView, KeyboardAvoidingView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Checkbox from 'expo-checkbox';
import { appFontScale, scaleSize, widthPerc } from "../mixin";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import {
    Accordion, Picker, Thumbnail
} from "native-base";
import { set, SlideOutRight } from 'react-native-reanimated';

const arabicNumbers = [
    /٠/g,
    /١/g,
    /٢/g,
    /٣/g,
    /٤/g,
    /٥/g,
    /٦/g,
    /٧/g,
    /٨/g,
    /٩/g,
];
export default function CategorySelection({ selectedCategoryId, navigate, getDataAgain }) {

    const [selection, setSelection] = useState(false)
    const [servicesCheck, setServicesCheck] = useState([])
    const [weekSelection, setWeekSelection] = useState(false)
    const [monthSelection, setMonthSelection] = useState(false)
    const [duration, setDuration] = useState(false)


    const [elecCounter, setElecCounter] = useState(0)
    const [plumbCounter, setPlumbCounter] = useState(0)
    const [masonCounter, setMasonCounter] = useState(0)
    const [indoorCounter, setIndoorCounter] = useState(0)
    const [helpCounter, setHelpCounter] = useState(0)
    const [user, setUser] = useState()

    const [durationCounter, setDurationCounter] = useState(0)
    const [infoModal, setInfoModal] = useState(false)
    const [lan, setLan] = useState("en")
    const [city, setCity] = useState("")
    const [company, setCompany] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [category, setCategory] = useState([])
    const [engagementType, setEngagementType] = useState("")
    const [workingDays, setWorkingDays] = useState([])
    const [services, setServices] = useState([])
    const [workingDaysCheck, setWorkingDaysCheck] = useState([])
    const [techCheck, setTechCheck] = useState([])
    const [electCheck, setElectCheck] = useState([])
    const [plumbingCheck, setPlumbingCheck] = useState([])
    const [carpentryCheck, setCarpentryCheck] = useState([])
    const [paintCheck, setPaintCheck] = useState([])
    const [homeCheck, setHomeCheck] = useState([])
    const [gardeningCheck, setGardeningCheck] = useState([])
    const [sanitizationCheck, setSanitizationCheck] = useState([])
    const [pestCheck, setPestCheck] = useState([])
    const [dutyIndex, setDutyIndex] = useState()
    const [engagementCheck, setEngagementCheck] = useState()
    const [dutyHours, setDutyHours] = useState("")
    const [foodCheck, setFoodCheck] = useState(false)
    const [accomodationCheck, setAccomodationCheck] = useState(false)
    const [transportCheck, setTransportCheck] = useState(false)
    const [fascility, setFascility] = useState([])
    const [newCategoryLoader, setNewCategoryLoader] = useState(false)
    const [successful, setSuccessful] = useState(false)
    const dutyHour = ["8 hours/day", "10 hours/day", "12 hours/day"]
    const categories = ["Electrician", "Plumber", "Indoor Cleaner", "Mason", "Helper"]
    const engagementData = ["Weekly", "Monthly"]
    const [emailError, setEmailError] = useState(false)
    const [phoneError, setPhoneError] = useState(false)
    const [companyError, setCompanyError] = useState(false)
    const [cityError, setCityError] = useState(false)
    const [categoryValue, setCategoryValue] = useState("Select Labour Type")


    useEffect(() => {
        getData()
    }, [])
    console.log("param url ");
    const getData = async () => {
        let lan = await AsyncStorage.getItem("lan");
        let user = await AsyncStorage.getItem("user");
        setLan(lan)
        setUser(user)
    }

    const handlePlaceRequest = () => {
        if (workingDays.length < 5) {
            alert("Please select atleast 5 working days")
        }
        else setInfoModal(true)
    }
    const handleSubmit = async () => {
        if (user) {
            if (city !== "" && company !== "" && email !== "" && phoneNumber !== "") {
                try {
                    setNewCategoryLoader(true)
                    axios
                        .post("http://app.xn--mgbt1ckekl.com/api/cu/v.3/app/request_quotes", {
                            cat_id: category,
                            services: services,
                            engagement_type: engagementType,
                            duration: durationCounter,
                            duty_hours: dutyHours,
                            working_days: workingDays,
                            company_provide: fascility,
                            city: city,
                            phone: phoneNumber,
                            company_name: company,
                            email: email
                        })
                        .then((response) => {
                            setNewCategoryLoader(false)
                            console.log("response", response)
                            setInfoModal(false)
                            if (response.status === 200) {
                                setSuccessful(true)
                                setTimeout(() => {
                                    setSuccessful(false)
                                }, 3000);
                                getDataAgain()

                            }
                            else {
                                alert("Something went wrong")
                                getDataAgain()
                            }
                        })
                }
                catch (e) {
                    console.log("catch error", e)
                }
            }
            else {
                alert("Please fill all the fields")
            }
        }
        else {
            setInfoModal(false)
            navigate()
            alert("Please Login first")
        }
    }
    // const handleSelectCategory = (item, index) => {
    //     setElecCounter()
    // }
    const handleWorkingDays = (item, index) => {

        const updateCheckList = [...workingDaysCheck]
        setWorkingDays([...workingDays, item]), workingDaysCheck[index] > 0 ? <>

            {updateCheckList[index] = 0, setWorkingDaysCheck(updateCheckList)}</>
            : <>{updateCheckList[index] = index + 1, setWorkingDaysCheck(updateCheckList)}</>
    }

    const handleCategory = (item, index) => {
        const updateCheckList = [...servicesCheck]
        setServices([...services, item]), servicesCheck[index] > 0 ? <>

            {updateCheckList[index] = 0, setServicesCheck(updateCheckList)}</>
            : <>{updateCheckList[index] = index + 1, setServicesCheck(updateCheckList)}</>
    }
    const handleEngagementType = (item, index) => {
        setEngagementType(item), setEngagementCheck(index)
    }
    const delteCategory = (cat) => {
        setCategory(category.filter(item => item !== cat))

        services
    }
    const plusCounter = (item) => {
        if (item === "Electrician")
            setElecCounter(elecCounter + 1)
        else if (item === "Plumber")
            setPlumbCounter(plumbCounter + 1)
        else if (item === "Indoor Cleaner")
            setIndoorCounter(indoorCounter + 1)
        else if (item === "Mason")
            setMasonCounter(masonCounter + 1)
        else (item === "Helper")
        setHelpCounter(helpCounter + 1)

    }
    const minusCounter = (item) => {
        if (item === "Electrician")
            if (elecCounter === 0) { setElecCounter(0) }
            else {
                setElecCounter(elecCounter - 1)
            }
        else if (item === "Plumber")
            if (plumbCounter === 0) { setPlumbCounter(0) }
            else {
                setPlumbCounter(plumbCounter - 1)
            }
        else if (item === "Indoor Cleaner")
            if (indoorCounter === 0) { setIndoorCounter(0) }
            else {
                setIndoorCounter(indoorCounter - 1)
            }
        else if (item === "Mason")
            if (masonCounter === 0) { setMasonCounter(0) }
            else {
                setMasonCounter(masonCounter - 1)
            }
        else (item === "Helper")
        if (helpCounter === 0) { setHelpCounter(0) }
        else {
            setHelpCounter(helpCounter - 1)
        }

    }

    const handleDutyHours = (item, index) => {
        setDutyHours(item), setDutyIndex(index)
    }

    const handleInputPhone = (phone) => {
        if (typeof phone === "string") {
            for (var i = 0; i < 10; i++) {
                phone = phone.replace(arabicNumbers[i], i);
            }
        }
        setPhoneNumber(phone.replace(/[^0-9]/g, ""))
    }
    const validate = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            console.log("Email is Not Correct");
            return false;
        }
        else {
            return true
        }
    }

    const cityErrorHandler = (value) => {
        if (value == "")
            setCityError(true)
        else setCityError(false)
    }
    const companyErrorHandler = (value) => {
        if (value == "")
            setCompanyError(true)
        else setCompanyError(false)
    }
    const emailErrorHandler = (value) => {
        if (email === "")
            setEmailError(true)
        else if (!validate(value)) {
            setEmailError(true)
        }
        else setEmailError(false)
    }
    const phoneErrorHandler = (value) => {
        if (value == "" || value.length < 10)
            setPhoneError(true)
        else setPhoneError(false)
    }

    return (
        <View>
            <View style={{ paddingHorizontal: scaleSize(10) }}>
                <Text>Please Select the below details</Text>
                <Text style={{
                    color: "#0764af", paddingVertical: scaleSize(10),
                    fontWeight: "bold"
                }}>What Type of Labour you need</Text>
                <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>

                    <View style={{
                        height: 34, borderColor: "gray", borderWidth: 2,
                        borderStyle: "solid", borderRadius: 5,
                        width: "100%"
                    }}>
                        <Picker
                            mode="dropdown"
                            placeholder="Select Labour Type"
                            style={{
                                height: 34,
                                width: Dimensions.get("screen").width - 65,
                                borderRadius: 0,
                                alignSelf: "center",
                                color: "#4a4b4c",
                                backgroundColor: "white",
                            }}
                            selectedValue={categoryValue}
                            onValueChange={(value) => {
                                setCategoryValue(value)
                                setCategory([...category, value])
                            }}
                        >
                            <Picker.Item
                                label={"Select Labour Type"}
                                value={""}
                                color="#c1c1c1"
                            />
                            <Picker.Item
                                label={"Electrician"}
                                value={"Electrician"}
                            />
                            <Picker.Item
                                label={"Plumber"}
                                value={"Plumber"}
                            />
                            <Picker.Item
                                label={"Indoor Cleaner"}
                                value={"Indoor Cleaner"}
                            />
                            <Picker.Item
                                label={"Mason"}
                                value={"Mason"}
                            />
                            <Picker.Item
                                label={"Helpers"}
                                value={"Helpers"}
                            />

                        </Picker>
                        {/* {categories.map((item) => {
                            return <Picker.Item
                                label={item}
                                value={item}
                            />
                        })} */}
                    </View>
                    <View style={{ flexDirection: "column", width: "100%", paddingTop: category.length ? scaleSize(15) : 0 }}>
                        <View style={styles.checkboxContainer}>
                            {category?.map((item, index) => {
                                return (
                                    <View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <TouchableOpacity style={{ ...styles.checkboxView, paddingVertical: 3 }}
                                                onPress={() => handleCategory(item, index)}
                                            >
                                                <Checkbox
                                                    color="#0764af"
                                                    value={servicesCheck[index] === index + 1 ? true : false}
                                                    style={{
                                                        height: 15, width: 15
                                                    }}
                                                />
                                                <Text style={styles.jobsText}>{item}</Text>
                                            </TouchableOpacity>
                                            <View style={{ flexDirection: "row" }}>
                                                <View style={{ ...styles.counter, marginRight: 10 }}>
                                                    <Ionicons
                                                        name="ios-remove"
                                                        size={20}
                                                        onPress={() => minusCounter(item)}>
                                                    </Ionicons>
                                                    <Text style={{ marginHorizontal: 10 }}>{item == "Electrician" ?
                                                        elecCounter : item == "Plumber" ? plumbCounter : item == "Mason" ?
                                                            masonCounter : item === "Helper" ? helpCounter : indoorCounter}</Text>
                                                    <Ionicons onPress={() => plusCounter(item)}
                                                        name="add"
                                                        size={20}>
                                                    </Ionicons>
                                                </View>
                                                <Ionicons
                                                    style={{ alignSelf: "center" }}
                                                    onPress={() => delteCategory(item)}
                                                    name="ios-close-circle-outline"
                                                    size={20}
                                                    color="red"
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.seperator}></View>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                </View>
                <View style={{
                    flexDirection: "column",
                    marginTop: scaleSize(10),
                    paddingBottom: scaleSize(15)
                }}>

                    <Text style={{
                        color: "#0764af", paddingVertical: scaleSize(5),
                        fontWeight: "bold"
                    }}>Engagement Type</Text>
                    {engagementData.map((item, index) => {

                        return <TouchableOpacity style={{ ...styles.checkboxView }}
                            onPress={() => handleEngagementType(item, index)}
                        >
                            <Checkbox
                                color="#0764af"
                                value={engagementCheck == index ? true : false}
                                style={{
                                    // alignSelf: "center",
                                    height: 15, width: 15,
                                    margin: 0,
                                    padding: 0
                                }}
                            />
                            <Text style={styles.jobsText}>{item}</Text>
                        </TouchableOpacity>
                    })}

                    <Text style={{
                        color: "#0764af", paddingVertical: scaleSize(5),
                        fontWeight: "bold"
                    }}>Duration</Text>
                    <View style={{ ...styles.checkboxView, justifyContent: "space-between" }}>
                        <TouchableOpacity style={{ ...styles.checkboxView, paddingVertical: 3, }}
                            onPress={() => {
                                setDuration(!duration)
                            }}
                        >
                            <Checkbox
                                color="#0764af"
                                value={duration}

                                style={{
                                    // alignSelf: "center",
                                    height: 15, width: 15,
                                }}
                            />
                            <Text style={styles.jobsText}>{engagementType === "Weekly" ?
                                "Weeks" : "Months"}</Text>
                        </TouchableOpacity>
                        <View style={styles.counter}>
                            <Ionicons
                                name="ios-remove"
                                size={20}
                                onPress={() => {
                                    durationCounter == 0 ?
                                        setDurationCounter(0) : setDurationCounter(durationCounter - 1)
                                }}>

                            </Ionicons>
                            <Text style={{ marginHorizontal: 10 }}>{durationCounter}</Text>
                            <Ionicons onPress={() => { setDurationCounter(durationCounter + 1) }}
                                name="add"
                                size={20}>
                            </Ionicons>
                        </View>
                    </View>

                    <Text style={{ color: "#0764af", paddingBottom: scaleSize(5), fontWeight: "bold" }}>Duty Hours</Text>

                    <View style={{ flexDirection: "row" }}>
                        {dutyHour.map((item, index) => {
                            return <TouchableOpacity style={{ ...styles.checkboxView, width: "33%", marginRight: 5 }}
                                onPress={() => { handleDutyHours(item, index) }}
                            >
                                <Checkbox
                                    color="#0764af"
                                    value={dutyIndex == index ? true : false}
                                    style={{
                                        height: 15, width: 15,
                                    }}
                                />
                                <Text style={{ ...styles.jobsText, marginHorizontal: 3 }}>{item}</Text>
                            </TouchableOpacity>
                        })}


                    </View>
                    <View style={{
                        flexDirection: "column", marginTop: scaleSize(5),
                    }}>
                        <Text style={{ color: "#0764af", fontWeight: "bold" }}>How Many Working Days</Text>
                        <Text style={{ fontSize: 12, marginVertical: scaleSize(5) }}>Select atleast 5 working days</Text>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: scaleSize(5) }}>
                            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((item, index) => {
                                return <View>
                                    <TouchableOpacity
                                        onPress={() => handleWorkingDays(item, index)}
                                        style={{ ...styles.daysCheckBox, backgroundColor: workingDaysCheck[index] === index + 1 ? "#6ea8cd" : "white" }}
                                    >
                                        <Text style={{
                                            alignSelf: "center", color: "#4a4b4c",
                                        }}>{item.charAt(0)}</Text></TouchableOpacity>
                                </View>
                            })

                            }

                        </View>
                    </View>
                    <Text style={{ color: "#0764af", paddingVertical: scaleSize(5), fontWeight: "bold" }}>
                        What Will Your Comapny Provide</Text>
                    <View style={styles.checkboxView}>

                        <TouchableOpacity style={{ flexDirection: "row" }}
                            onPress={() => { setFascility([...fascility, "food"]), setFoodCheck(!foodCheck) }}>
                            <Checkbox
                                color="#0764af"
                                value={foodCheck}
                                // onValueChange={() => { setFascility([...fascility, "food"]), setFoodCheck(!foodCheck) }}
                                style={{
                                    // alignSelf: "center",
                                    height: 15, width: 15,
                                }}
                            />
                            <Text style={styles.jobsText}>Food</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.checkboxView}>
                        <TouchableOpacity style={{ flexDirection: "row" }}
                            onPress={() => { setFascility([...fascility, "transport"]), setTransportCheck(!transportCheck) }}>
                            <Checkbox
                                color="#0764af"
                                value={transportCheck}
                                // onValueChange={() => { setFascility([...fascility, "transport"]), setTransportCheck(!transportCheck) }}
                                style={{
                                    // alignSelf: "center",
                                    height: 15, width: 15,
                                }}
                            />
                            <Text style={styles.jobsText}>Transport</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ ...styles.checkboxView }}>
                        <TouchableOpacity
                            onPress={() => { setFascility([...fascility, "accomodation"]), setAccomodationCheck(!accomodationCheck) }}
                            style={{ flexDirection: "row" }} >
                            <Checkbox
                                color="#0764af"
                                value={accomodationCheck}
                                // onValueChange={() => { setFascility([...fascility, "accomodation"]), setAccomodationCheck(!accomodationCheck) }}
                                style={{
                                    // alignSelf: "center",
                                    height: 15, width: 15,
                                }}
                            />
                            <Text style={styles.jobsText}>Accomodation</Text>
                        </TouchableOpacity>

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
                        borderRadius: 6,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => { handlePlaceRequest() }}
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
                        <Text style={{ color: "white", fontWeight: "bold" }}>Place Request</Text>

                    </TouchableOpacity>
                </LinearGradient>
            </View>
            <Modal
                animationType={'fade'}
                animationType="slide"
                transparent={true}
                visible={infoModal}
            >
                <View
                    style={{
                        marginTop: 130,
                        alignSelf: "center",
                        height: emailError || phoneError || companyError || cityError ? scaleSize(520) : scaleSize(480),
                        borderRadius: 20,
                        width: 330,
                        backgroundColor: "#1a66b0",
                        paddingHorizontal: scaleSize(20)
                    }}
                >
                    <View style={{ flex: 1, alignSelf: "center", marginTop: -34 }}>
                        <Thumbnail style={{ height: scaleSize(84), width: scaleSize(84) }} source={require("../assets/Icon2.png")} />
                    </View>
                    <View style={{ position: "absolute", right: 6, top: 8 }}>
                        <Ionicons
                            onPress={() => setInfoModal(false)}
                            name="ios-close-circle-outline"
                            size={30}
                            color="red"
                        />
                    </View>
                    <KeyboardAvoidingView behavior={"padding"}>

                        <ScrollView style={{ flexDirection: "column" }}>
                            <View >
                                <Text style={{ color: "white", marginVertical: scaleSize(5) }}>
                                    City Name                            </Text>
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
                                    <TextInput style={{ color: "gray", paddingVertical: 5, paddingHorizontal: 3 }}
                                        onChangeText={(value) => {


                                            setCity(value)
                                        }}
                                        placeholder="Enter City"
                                        onBlur={() => cityErrorHandler(city)}

                                    ></TextInput>
                                </View>
                                <Text style={{ color: "red", fontSize: 12, display: cityError ? "flex" : "none", width: "70%", alignSelf: "flex-start", paddingLeft: 3, margin: 0 }}>Please Enter correct city name</Text>

                            </View>
                            <View style={{ marginTop: scaleSize(0) }}>
                                <Text style={{ color: "white", marginBottom: scaleSize(5) }}>
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
                                    <TextInput style={{ color: "gray", paddingVertical: 5, paddingHorizontal: 3 }} onChangeText={(value) => {
                                        setCompany(value)
                                    }}
                                        placeholder="Enter company name"
                                        onBlur={() => companyErrorHandler(company)}
                                    >
                                    </TextInput>
                                </View>
                                <Text style={{ color: "red", fontSize: 12, display: companyError ? "flex" : "none", width: "70%", alignSelf: "flex-start", paddingLeft: 3, margin: 0 }}>Please Enter correct company name</Text>

                            </View>
                            <View style={{ marginTop: scaleSize(10) }}>
                                <Text style={{ color: "white", marginBottom: scaleSize(5) }}>
                                    Official Email Id                            </Text>
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
                                    <TextInput style={{ color: "gray", paddingVertical: 5, paddingHorizontal: 3 }} onChangeText={(value) => {
                                        setEmail(value)
                                    }}
                                        placeholder="Enter email"
                                        onBlur={() => emailErrorHandler(email)}
                                    ></TextInput>
                                </View>
                                <Text style={{ color: "red", fontSize: 12, display: emailError ? "flex" : "none", width: "70%", alignSelf: "flex-start", paddingLeft: 3, margin: 0 }}>Please Enter correct email</Text>

                            </View>

                            <View style={{ marginTop: scaleSize(10) }}>
                                <Text style={{ color: "white", marginBottom: scaleSize(5) }}>
                                    Mobile Number</Text>
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
                                    <TextInput style={{ color: "gray", paddingVertical: 5, paddingHorizontal: 3 }}
                                        keyboardType="phone-pad"
                                        returnKeyType="done"
                                        maxLength={10} //10
                                        onBlur={() => phoneErrorHandler(phoneNumber)}

                                        onChangeText={(phone) => {
                                            handleInputPhone(phone)
                                        }}
                                        placeholder="05XXXXXXXX"></TextInput>
                                </View>
                                <Text style={{ color: "red", fontSize: 12, display: phoneError ? "flex" : "none", width: "70%", alignSelf: "flex-start", paddingLeft: 3, margin: 0, }}>Please enter correct phone number</Text>

                            </View>


                        </ScrollView>
                        <View style={{ marginVertical: scaleSize(15) }}>
                            <Text style={{ color: "white", fontSize: appFontScale(13), fontWeight: "bold" }}>Notes</Text>
                            <Text style={{ color: "white", fontSize: appFontScale(13), marginTop: scaleSize(5) }}>Once you place request, our Business Development manager will connect with you within 24-48 hours</Text>

                        </View>
                        <View style={{
                            justifyContent: "center", alignItems: "center",
                            marginVertical: scaleSize(10)
                        }}>
                            <TouchableOpacity
                                onPress={() => handleSubmit()}
                                style={{
                                    backgroundColor: "#6ea8cd",
                                    borderWidth: 0,
                                    borderRadius: 15,
                                    width: 160,
                                    height: 40,
                                    borderColor: "transparent",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                {newCategoryLoader ?
                                    <ActivityIndicator
                                        size="large"
                                        color="white"
                                        style={{
                                            alignSelf: "center"
                                        }}
                                    /> :
                                    <Text style={{ color: "white", fontWeight: "bold" }}>Submit</Text>}

                            </TouchableOpacity>

                        </View>
                    </KeyboardAvoidingView>

                </View>
            </Modal>


            <Modal
                animationType={'fade'}
                animationType="slide"
                transparent={true}
                visible={successful}
            >
                <View
                    style={{
                        position: "relative",
                        marginTop: 150,
                        alignSelf: "center",
                        height: 140,
                        borderRadius: 20,
                        width: 300,
                        backgroundColor: "#1a66b0",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingHorizontal: scaleSize(20),
                    }}
                >

                    <View style={{ alignSelf: "center", position: "absolute", top: -25 }}>
                        <Thumbnail source={require("../assets/Icon2.png")} />
                    </View>
                    <View style={{ position: "absolute", right: 5, top: 4 }}>
                        <Ionicons
                            onPress={() => setSuccessful(false)}
                            name="ios-close-circle-outline"
                            size={30}
                            color="red"
                        />
                    </View>
                    <View style={{ flexDirection: "column", paddingTop: scaleSize(15) }}>
                        <Text style={{ color: "white", fontSize: 18, textAlign: "center", paddingBottom: scaleSize(10) }}>Congratulations!!!</Text>
                        <Text style={{ paddingHorizontal: 10, color: "white" }}>
                            Your request has been submitted. Our representative will contact you within 48 hours.
                        </Text>
                    </View>
                </View>
            </Modal>



        </View>)
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    counter: { flexDirection: "row", borderColor: "gray", borderWidth: 1, borderStyle: "solid", borderRadius: 5 },
    checkboxContainer: {
        flexDirection: "column",
        // marginBottom: 20,
        // alignItems: "center",

    },
    seperator: { backgroundColor: "black", height: 1, width: "95%", marginVertical: 12, alignSelf: "center" },

    label: {
        margin: 8,
    },
    checkboxView: {
        paddingVertical: scaleSize(10), flexDirection: "row"
    },


    daysCheckBox: {
        height: scaleSize(30), width: scaleSize(30),
        borderRadius: 1, justifyContent: "center", margin: 4
    },
    checkbox: {
        alignSelf: "center",
    },
    jobsText: {
        textAlign: "center", alignSelf: "center", marginHorizontal: 8, marginTop: -2

    }


});


{/* {category === "Electrician" ?
                                <View>
                                    <TouchableOpacity style={{ flexDirection: "row" }}
                                    // onPress={() => handlePressElectrition(item, index)}
                                    >

                                        <Checkbox
                                            // value={electCheck[index] === index + 1 ? true : false}
                                            style={{
                                                height: 15, width: 15
                                            }}
                                        />
                                        <Text style={styles.jobsText}>Electrition</Text>

                                    </TouchableOpacity>
                                    <View style={styles.seperator}></View>
                                </View>

                                : category === "Plumber" ?
                                    <View>
                                        <TouchableOpacity style={{ flexDirection: "row" }}
                                        // onPress={() => handlePressPlumbing(item, index)}
                                        >

                                            <Checkbox
                                                // value={plumbingCheck[index] === index + 1 ? true : false}
                                                style={{
                                                    height: 15, width: 15
                                                }}
                                            />
                                            <Text style={styles.jobsText}>Plumber</Text>

                                        </TouchableOpacity>
                                        <View style={styles.seperator}></View>
                                    </View>
                                    : category === "Indoor Cleaner" ? <View>
                                        <TouchableOpacity style={{ flexDirection: "row" }}
                                        // onPress={() => handlePressCarpentry(item, index)}
                                        >

                                            <Checkbox
                                                // value={carpentryCheck[index] === index + 1 ? true : false}
                                                style={{
                                                    height: 15, width: 15
                                                }}
                                            />
                                            <Text style={styles.jobsText}>Indoor Cleaner</Text>

                                        </TouchableOpacity>
                                        <View style={styles.seperator}></View>
                                    </View>

                                        : category === "Mason" ? <View>
                                            <TouchableOpacity style={{ flexDirection: "row" }}
                                            // onPress={() => handlePressHome(item, index)}
                                            >

                                                <Checkbox
                                                    // value={homeCheck[index] === index + 1 ? true : false}
                                                    style={{
                                                        height: 15, width: 15
                                                    }}
                                                />
                                                <Text style={styles.jobsText}>Mason</Text>

                                            </TouchableOpacity>
                                            <View style={styles.seperator}></View>
                                        </View>

                                            : category === "Helper" ? <View>
                                                <TouchableOpacity style={{ flexDirection: "row" }}
                                                // onPress={() => handlePressPaint(item, index)}
                                                >

                                                    <Checkbox
                                                        // value={paintCheck[index] === index + 1 ? true : false}
                                                        style={{
                                                            height: 15, width: 15
                                                        }}
                                                    />
                                                    <Text style={styles.jobsText}>Helper</Text>

                                                </TouchableOpacity>
                                                <View style={styles.seperator}></View>
                                            </View>
                                                : <></>

                            } */}
                               // const jobs = {
    //     "Ac_Technician": ["Window Unit", "Split Unit", "Cassette Unit", "Tower Unit", "Central AC", "Desert Cooler", "AC Technician Visit",],
    //     "Electrician": ["Chandeliers and Other", "Spotlights", "Lightbulbs", "Fluorescent Lights", "Switches and Outlets", "Fans", "Distribution Panels", "Wiring", "Voltage Converstions", "Electrician Visit"],
    //     "Plumbing": ["Water Heater", "Sinks", "Mixers", "Showers", "Faucets", "Leaks", "Drains", "Bathhubs", "Toilets", "Water Pumps", "Water Tanks", "Plumber Visit"],
    //     "Carpentry": ["Furniture", "Beds", "Tables", "Cabinets", "Curtains", "Doors", "Hanging Items", "Carpenter Visit"],
    //     "Paint": ["Apartment", "Villa-less than 500 sq.m", "Villa-more than 500 sq.m", "Office Building", "Resturent/Hotel", "Shop", "Paint Visit"],
    //     "Home_Applainces": ["Window Unit", "Split Unit", "Mason", "Jobs", "Other jobs"],
    //     "Gardening_Services": ["Window Unit", "Split Unit", "Mason", "Jobs", "Other jobs"],
    //     "Sanitization": ["Window Unit", "Split Unit", "Mason", "Jobs", "Other jobs"],
    //     "Pest_Control": ["Window Unit", "Split Unit", "Mason", "Jobs", "Other jobs"]
    // }

    // const handlePressTechnician = (item, index) => {
    //     const updateCheckList = [...techCheck]
    //     setServices([...services, item]), techCheck[index] > 0 ? <>

    //         {updateCheckList[index] = 0, setTechCheck(updateCheckList)}</>
    //         : <>{updateCheckList[index] = index + 1, setTechCheck(updateCheckList)}</>
    // }
    // const handlePressElectrition = (item, index) => {
    //     const updateCheckList = [...electCheck]
    //     setServices([...services, item]), electCheck[index] > 0 ? <>

    //         {updateCheckList[index] = 0, setElectCheck(updateCheckList)}</>
    //         : <>{updateCheckList[index] = index + 1, setElectCheck(updateCheckList)}</>
    // }
    // const handlePressPlumbing = (item, index) => {
    //     const updateCheckList = [...plumbingCheck]
    //     setServices([...services, item]), plumbingCheck[index] > 0 ? <>

    //         {updateCheckList[index] = 0, setPlumbingCheck(updateCheckList)}</>
    //         : <>{updateCheckList[index] = index + 1, setPlumbingCheck(updateCheckList)}</>
    // }
    // const handlePressCarpentry = (item, index) => {
    //     const updateCheckList = [...carpentryCheck]
    //     setServices([...services, item]), carpentryCheck[index] > 0 ? <>

    //         {updateCheckList[index] = 0, setCarpentryCheck(updateCheckList)}</>
    //         : <>{updateCheckList[index] = index + 1, setCarpentryCheck(updateCheckList)}</>
    // }
    // const handlePressGardening = (item, index) => {
    //     const updateCheckList = [...gardeningCheck]
    //     setServices([...services, item]), gardeningCheck[index] > 0 ? <>

    //         {updateCheckList[index] = 0, setGardeningCheck(updateCheckList)}</>
    //         : <>{updateCheckList[index] = index + 1, setGardeningCheck(updateCheckList)}</>
    // }
    // const handlePressHome = (item, index) => {
    //     const updateCheckList = [...homeCheck]
    //     setServices([...services, item]), homeCheck[index] > 0 ? <>

    //         {updateCheckList[index] = 0, setHomeCheck(updateCheckList)}</>
    //         : <>{updateCheckList[index] = index + 1, setHomeCheck(updateCheckList)}</>
    // }
    // const handlePressPaint = (item, index) => {
    //     const updateCheckList = [...paintCheck]
    //     setServices([...services, item]), paintCheck[index] > 0 ? <>

    //         {updateCheckList[index] = 0, setPaintCheck(updateCheckList)}</>
    //         : <>{updateCheckList[index] = index + 1, setPaintCheck(updateCheckList)}</>
    // }
    // const handlePressPest = (item, index) => {
    //     const updateCheckList = [...pestCheck]
    //     setServices([...services, item]), pestCheck[index] > 0 ? <>

    //         {updateCheckList[index] = 0, setPestCheck(updateCheckList)}</>
    //         : <>{updateCheckList[index] = index + 1, setPestCheck(updateCheckList)}</>
    // }