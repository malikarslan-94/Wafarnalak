import React from "react";
import * as Analytics from "expo-firebase-analytics";
import { connect } from 'react-redux'
// import * as Location from "expo-location";
// import * as Permissions from "expo-location";
import * as Location from 'expo-location';

import Footer from "../components/Footer/Index"
import getEnvVars from '../environment';
const { apiUrl } = getEnvVars();
import {
  Accordion,
  Badge,
  Container,
  Left,
  Right,
  Text,
  Toast,
} from "native-base";
import {
  Animated,
  AsyncStorage,
  Dimensions,
  FlatList,
  I18nManager,
  Image,
  Linking,
  Platform,
  TouchableOpacity,
  View,
  Modal,
  StatusBar,
  Alert,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from "react-native";
import { NavigationEvents, SafeAreaView } from "react-navigation";
import * as Updates from "expo-updates";
import * as Notifications from "expo-notifications";
import CategoryCard from "./categories/categoryCard";
import AllCategoryCard from "./categories/allCategoryCard";
import { Ionicons } from "@expo/vector-icons";
import QuantitybaseJob from "./jobs/quantitybaseJob";
import SecuritybaseJobs from "./jobs/SecuritybaseJobs";
import HomeCinema from "./jobs/HomeCinema";
import FindPoup from "./Common/FindPopup";
import OrderPopup from "./Common/OrderPopup";
import SelectableJob from "./jobs/selectableJob";
import SelectableOfferJob from "./jobs/selectableOfferJob";

import DecoCategory from "./jobs/DecoCategory";
import Cleaning from "./jobs/Cleaning";
import SizebaseJob from "./jobs/sizebaseJob";
import { SliderBox } from "react-native-image-slider-box";
import VarientbaseJob from "./jobs/varientbaseJob";
import axios from "axios";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { scaleSize, widthPerc } from "../mixin";
import CategoryIndicator from "../components/CategoryIndicator";
import CategorySelection from "../components/CategorySelection";
import OfferBanner from "../components/OfferBanner/index";
Analytics.setUnavailabilityLogging(false);
Analytics.setDebugModeEnabled(false);

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_HEIGHT = Platform.OS == "android" ? 320 : 335;
const HEADER_HEIGHT = Platform.OS === "ios" ? 64 : 50;
const SCROLL_HEIGHT = IMAGE_HEIGHT - HEADER_HEIGHT;
let _scrollToIndex = -1;

const imageLoadingColor = "#E91E63"
const portion = Dimensions.get("screen").width / 4;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const dataObject = {
  "black_icon": "http://app.xn--mgbt1ckekl.com/assets/images/c85fe82e6fcdae7e-AC-Technician-min.png",
  "categoryid": 22,
  "categoryname": "Rentel Services",
  "categoryname_ar": "فني تكييف",
  "categoryseoname": "",
  "services": [
    {
      "jobs": [
        {

        }],
    },
  ]
}

// Main Class

function mapStateToProps(state) {
  return {
    user: state.auth
  }
}
function mapDispatchToProps(dispatch) {
  return {
    onUserLogin: (user) => dispatch(authActions.user(user))
  }
}
class LandingSecreen extends React.Component {
  nScroll = new Animated.Value(0);
  scroll = new Animated.Value(0);
  tabYButton = this.nScroll.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.7, 0],
  });
  imgScale = this.nScroll.interpolate({
    inputRange: [-25, 0],
    outputRange: [1.2, 1],
    extrapolateRight: "clamp",
  });
  tabY = this.nScroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
    outputRange: [0, 0, 1],
  });
  constructor(props) {
    super(props);
    this.cartTimeout = 0
    this.cartMinus = 0
    this.state = {
      cartData: undefined,
      isLoading: false,
      lan: "en",
      offersUrls: [],
      dataSource: [],
      deals: [],
      categories: [],
      isEnabled: false,
      isRefresh: false,
      setIsEnabled: true,
      services: [],
      selectedCategoryId: 0,
      products: [],
      selectedServices: [],
      cartDetails: [],
      freshCategories: [],
      isReversed: false,
      toolTipVisible: -1,
      scrollY: new Animated.Value(0),
      location: "",
      user: null,
      note: "",
      loading: true,
      visible: false,
      popup: false,
      videoPopup: false,
      findPoup: false,
      orderPopup: false,
      videoSelected: 0,
      totprice: 0,
      totObj: [],
      addCartLoader: false,
      offerTotalPrice: 0, response: false,
      manualSelection: false,
      offerBanner: null,
      bannerIndex: 0,
      filteredCategoryArray: [],
      showAllCategory: false,
      scrollValue: 0,
      showRentalService: false,
      calledFromCatgScreen: false,
      yLengthLimit: 0,
      offsetYValue: 0,
      startTime: 0,
      endTime: 0,
      cartLength: [],
      session_id: undefined,
      enBannersList: [],
      arBannersList: [],
      sessionId: undefined
    };
  }
  viewabilityConfig = {
    waitForInteraction: true,
    // At least one of the viewAreaCoveragePercentThreshold or itemVisiblePercentThreshold is required.
    viewAreaCoveragePercentThreshold: 100,
    // itemVisiblePercentThreshold: 30
  }
  onViewableItemsChanged = ({ viewableItems, changed }) => {
    if (viewableItems.length) {
      const scrollToIndex = viewableItems.pop()
      console.log("Changed in this iteration", changed.map(i => i.index));
      console.log("current Index", changed[0]?.index)
      if (scrollToIndex) {
        this.setState({ scrollValue: scrollToIndex.index })
        this._jobsList.scrollToIndex({ index: scrollToIndex.index })
      }
    }
  }

  checkUserLogin = async () => {
    this.setState({ isLogin: true })

  }

  checkOfferBannerIndex = async () => {
    let bannerIndexx = await AsyncStorage.getItem("bannerIndex");
    if (!bannerIndexx)
      await AsyncStorage.setItem("bannerIndex", "0");
    // let bannerIndexx = await AsyncStorage.getItem("bannerIndex");
    // console.log("indexxxx", bannerIndexx)

    if (bannerIndexx == 1) {
      await AsyncStorage.setItem("bannerIndex", "0");

      this.setState({ bannerIndex: 0 })
    }
    else {
      this.setState({ bannerIndex: 1 })
      await AsyncStorage.setItem("bannerIndex", "1");
    }
  }
  clearCart = (id) => {
    axios
      .get(
        `${apiUrl}/cart_clear/${id}`).then((response) => {
          if (response.status == 200) {
            this.setState({ cartData: [] })
          }
          else {
            console.log("Clear Cart Error")
          }
          console.log("cart empty", response)
        })
      .catch(e => alert(e.message))

  }
  componentDidMount = async () => {
    await AsyncStorage.removeItem("jobs");
    await AsyncStorage.getItem("offerBanner").then((value) => {
      this.setState({ offerBanner: value })
    });
    this.checkOfferBannerIndex();

    // const subscription = Notifications.addNotificationReceivedListener(notification => {
    //   alert("notification", notification)
    //   // console.log(notification);
    // });
    // this.notificationListner();
    // My Test
    let lan = await AsyncStorage.getItem("lan");
    let user = await AsyncStorage.getItem("user");
    // let getJobs = await AsyncStorage.getItem("jobs");
    // console.log("jobsssssssssssssss", JSON.parse(getJobs))
    let feedbackShow = await AsyncStorage.getItem("PopUp_Feedback");

    if (feedbackShow != null) {
      console.log("Please give the Feedbackk");
      //alert(feedbackShow);
      this.props.navigation.navigate("OrderDetails", {
        order: JSON.parse(feedbackShow),
        lan: lan !== null ? lan : "en",
        user: user,
        isHistory: true,
        isFeedback: true,
      });
    } else {
      console.log("No Feedback");
    }
    // await AsyncStorage.removeItem("jobs");
    this.setState({
      lan: lan !== null ? lan : "en",
      user: user !== null ? JSON.parse(user) : null,
      // cartData: getJobs,
      // cartData: JSON.parse(getJobs)
    });
    this.checkUserLocation();
    // this.getOffers();
    this.getCategories();

    // this.getbanner();
    this.registerForPushNotificationsAsync()

  };
  // componentWillUnmount = () => {
  //   clearTimeout(this.timeout);
  // };

  handleCallFromCategoryScreen = () => {
    this.setState({ calledFromCatgScreen: true })
  }
  closePopup = () => {
    this.setState({ priceModal: false })
  }
  // Banners API Fetch
  // getbanner = () => {
  //   // console.log("getbanner")
  //   this.setState({
  //     isLoading: true
  //   });
  //   let enBannersList = [];
  //   let arBannersList = [];
  //   axios
  //     .get(
  //       // "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wfportal/api/cu/v.3/app",
  //       `${apiUrl}`,
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       // alert("response")
  //       // console.log("Banners Response", response);
  //       let sessionId = (response?.data?.session_id);
  //       this.clearCart(sessionId);
  //       response?.data?.slideshows?.map((bn) => {
  //         enBannersList.push(bn.image);
  //         arBannersList.push(bn.image_ar);
  //       });
  //       // console.log("banners List", enBannersList, arBannersList);
  //       this.setState({
  //         enBannersList,
  //         arBannersList,
  //         bannersDetailList: response.data.slideshows,
  //         isLoading: false
  //       });
  //     }).catch((error) => {
  //       Toast.show({
  //         text: error.message,
  //         position: "bottom",
  //         duration: 2000,
  //       });
  //     }
  //     )
  // };

  checkUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    // let { status } = await Permissions.askAsync(Permissions.LOCATION);
    //  console.log("status ", status);
    if (status !== "granted") {
      Toast.show({
        text:
          this.state.lan == "en"
            ? "Please allow location permission"
            : "يرجى السماح لتحديد الموقع",
        position: "bottom",
      });
    } else {
      // console.log("else ");
      const mylocation = await Location.getCurrentPositionAsync({});
      // console.log("location ", mylocation);
      const geocode = await Location.reverseGeocodeAsync(mylocation?.coords);
      // console.log("city ", geocode[0].city);

      this.setState({ location: geocode[0]?.city });
    }
  };



  _renderHeader = (data, expanded) => {
    // let index = []
    // console.log("dataaaa in renderHeader", data)
    let index = data?.jobs?.findIndex((job) => job.items > 0);

    return (
      <View style={{
        flexDirection: "row",
        padding: 10,
        backgroundColor: "white",
        // backgroundColor: expanded ? "#d8d8d8" : "#F5F5F5",
        // marginBottom: 4,
        alignSelf: "center",
        width: Dimensions.get("screen").width,
        height: scaleSize(70),
        borderWidth: 0,
      }}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#F5F5F5",
            // backgroundColor: expanded ? "#d8d8d8" : "#F5F5F5",
            // marginBottom: 4,
            alignSelf: "center",
            width: Dimensions.get("screen").width - 30,
            height: scaleSize(65),
            borderWidth: 0,
          }}
        >
          <Left style={{ flexDirection: "row", paddingLeft: 12 }}>
            <Image
              source={{
                uri:
                  data.black_icon !== null
                    ? data.black_icon
                    : "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/image-placeholder.png?alt=media&token=10ced05a-f905-4951-9298-ff47e771f070",
              }}
              style={{
                width: scaleSize(45),
                height: scaleSize(45),
                marginTop: 4,
              }}
              resizeMode="contain"
            />
            <View style={{ marginTop: 4, paddingLeft: 15 }}>
              <Text
                style={{
                  fontSize: this.state.lan == "en" ? 13 : 10,
                  fontFamily: this.state.lan == "en" ? "" : "montserrat_arabic_semibold",
                  textAlign: "left",
                  marginLeft: 12,
                  width: Dimensions.get("screen").width - 30,
                  color: "#0865b0",
                }}
              >
                {this.state.lan == "en" ? data.servicename : data.servicename_ar}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: "#4a4b4c",
                    fontSize: this.state.lan == "en" ? 12 : 10,
                    marginLeft: 12,
                    marginRight: 10,
                    fontFamily: this.state.lan == "en" ? "montserrat_medium" : "montserrat_arabic_regular",

                  }}
                >
                  {this.state.lan == "en" ? "Total Services" : "مجموع الخدمات"}
                </Text>
                <View
                  style={{
                    backgroundColor: "#0865b0",
                    justifyContent: "center",
                    margin: 2,
                  }}
                >
                  <Text
                    style={{
                      padding: 2,
                      paddingLeft: 3,
                      paddingRight: 3,
                      color: "white",
                      fontSize: 7,
                      textAlign: "center",
                      fontFamily: this.state.lan == "en" ? "montserrat_medium" : "montserrat_arabic_regular",

                    }}
                  >
                    {data.jobs ? data.jobs.length : 0}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  textAlign: "left",
                  color: "#4a4b4c",
                  fontSize: this.state.lan == "en" ? 12 : 10,
                  marginLeft: 12,
                  fontFamily: this.state.lan == "en" ? "montserrat_medium" : "montserrat_arabic_regular",

                }}
              >
                {this.state.lan == "en" ? "24/7 Booking" : "حجز على مدار الساعة"}
              </Text>
            </View>
          </Left>
          {index > -1 ? (
            <Image
              source={require("../assets/Cart-Icon.png")}
              style={{
                width: 15,
                marginTop: 2,
                height: 15,
                position: "absolute",
                left: Dimensions.get("screen").width / 2,
              }}
            />
          ) : (
            <View></View>
          )}
          <Right>
            <View style={{ flexDirection: "row" }}>
              {data.is_promoted == true ? ( //data.is_promoted == true change jobs[0].promotions
                this.state.lan == "en" ? (
                  <Image
                    source={require("../assets/Promoted-min.png")}
                    style={{ width: 55, height: 35, marginRight: 40 }}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={require("../assets/Promoted-Arabic.png")}
                    style={{ width: 55, height: 35, marginRight: 40 }}
                    resizeMode="contain"
                  />
                )
              ) : (
                <View></View>
              )}

              {expanded ? (
                <Ionicons
                  style={{ fontSize: 24 }}
                  name="ios-chevron-down"
                  color="#0865b0"
                />
              ) : (
                <Ionicons
                  style={{ fontSize: 24 }}
                  name={
                    this.state.lan == "en"
                      ? "chevron-forward-outline"
                      : "chevron-back-outline"
                  }
                  color="#0865b0"
                />
              )}
            </View>
          </Right>
        </View>
      </View>
    );
  };
  minusMeters = (job) => {
    if (job.meter && job.meter >= 50) {
      job.meter = job.meter - 50;
      job.m_price = job.meter * job.price;
    } else {
      job.meter = 0;
      job.m_price = job.meter * job.price;
    }
    if (job.items) {
      job.t_price = job.items * job.m_price;
    } else {
      if (job.meter > 0) {
        job.items = 1;
        job.t_price = job.items * job.m_price;
      }
    }
    if (job.meter == 0) {
      job.items = 0;
      job.selected = false;
      this.addRemoveIntoSelectedServices(job, false);
    } else {
      job.selected = true;
      this.addRemoveIntoSelectedServices(job, true);
    }
  };
  plusMeters = (job) => {
    if (job.meter) {
      job.meter = job.meter + 50;
      job.m_price = job.meter * job.price;
    } else {
      job.meter = 50;
      job.m_price = job.meter * job.price;
    }
    if (job.items) {
      job.t_price = job.items * job.m_price;
    } else {
      job.items = 1;
      job.t_price = job.items * job.m_price;
    }
    job.selected = true;
    this.addRemoveIntoSelectedServices(job, true);
  };
  // ------------------------increase counter --------------------
  plusFloors = (job) => {
    if (job.items) {
      job.items++;
    } else {
      job.items = 1;
    }
    if (job.m_price) {
      job.t_price = job.items * job.m_price;
    } else {
      job.meter = 50;
      job.m_price = job.meter * job.price;
      job.t_price = job.items * job.m_price;
    }

    job.selected = true;
    this.addRemoveIntoSelectedServices(job, true);
  };
  // ---------------------Decrease item-----------------------
  minusFloors = (job) => {
    if (job.items && job.items >= 1) {
      job.items--;
      if (job.items == 0) {
        job.items = 0;
        job.t_price = 0;
        job.meter = 0;
        job.m_price = 0;
        job.selected = false;
      }
      if (job.m_price) {
        job.t_price = job.items * job.m_price;
      } else {
        job.meter = 50;
        job.m_price = job.meter * job.price;
        job.t_price = job.items * job.m_price;
      }
      this.addRemoveIntoSelectedServices(job, true);
    } else {
      job.items = 0;
      job.t_price = 0;
      job.meter = 0;
      job.m_price = 0;
      job.selected = false;
      this.addRemoveIntoSelectedServices(job, false);
    }
  };
  getDataAgain = () => {
    this.getCategories();
    this.getbanner();
  }
  cahngeToolTip = (tIndex) => {
    if (this.state.toolTipVisible == -1) {
      this.setState({ toolTipVisible: tIndex });
    } else {
      this.setState({ toolTipVisible: -1 });
    }
  };
  _renderManualSelection = () => {
    return (
      <View
        style={{
          width: Dimensions.get("screen").width,
          alignSelf: "center",
          paddingHorizontal: scaleSize(20),
          paddingVertical: scaleSize(15),
          backgroundColor: "#f1f1f1"
        }}
      >
        <View style={{ width: "100%" }}>

          <View style={{ marginTop: 10 }}>
            <CategorySelection
              lan={this.state.lan}
              navigate={this._navigate}
              getDataAgain={this.getDataAgain}
            />
          </View>
        </View>
      </View>
    )
  }
  _renderContent = (data) => {
    // console.log("contentdata---------->", data.note);
    // console.log("contentdata---------->", data);

    return (
      <View
        style={{
          width: Dimensions.get("screen").width,
          alignSelf: "center",
          // marginTop: -5,
          // padding: 20,
          // paddingBottom: scaleSize(15),
        }}
      >
        <View style={{ marginLeft: 10, marginRight: 20 }}>
          {data.note && data.note !== null ? (
            <View
              style={{ backgroundColor: "white", marginLeft: 1, marginRight: 1 }}
            >
              <Text
                style={{
                  textAlign: "left",
                  fontSize: this.state.lan == "en" ? 12 : 10,
                  fontFamily: this.state.lan == "en" ? "montserrat_medium" : "montserrat_arabic_regular",
                  // paddingHorizontal: widthPercentageToDP(2),
                }}
              >
                {this.state.lan == "en" ? "Notes:" : "ملاحظات:"}
              </Text>
              <Text
                style={{
                  // paddingHorizontal: widthPercentageToDP(2),
                  fontSize: this.state.lan == "en" ? 12 : 10,
                  textAlign: "left",
                  fontFamily: this.state.lan == "en" ? "montserrat_medium" : "montserrat_arabic_regular",
                }}
              >
                {this.state.lan == "en" ? data.note : data.note_ar}
              </Text>
            </View>
          ) : (
            <View></View>
          )}
        </View>
        {data.jobs &&
          data.jobs.map(
            function (job, index) {
              job.jobserviceName = data.servicename;
              job.jobserviceNameAr = data.servicename_ar;
              job.jobServiceIcon = data.black_icon;
              if (job.pricetypeid == 1) {
                return (
                  <QuantitybaseJob
                    calledFromCatgScreen={this.state.calledFromCatgScreen}
                    job={job}
                    cahngeToolTip={this.cahngeToolTip}
                    index={index}
                    toolTipVisible={this.state.toolTipVisible}
                    lan={this.state.lan}
                    key={index}
                    plus={this.plusQuantity}
                    minus={this.minusQuantity}
                    tp={this.state.totprice}
                    totObj={this.state.totObj}
                    thisJobcartData={this.state.cartData?.cart?.find(i => i.job.jobid == job.jobid && i.job.categoryid == job.categoryid)}
                    addCartLoader={this.state.addCartLoader}
                  // jb={this.state.jb}
                  // handlejobValue={this.handlejobValue}
                  // resetData={this.state.resetData}
                  />
                );
              }
              if (job.pricetypeid == 2) {
                return (
                  <SelectableJob
                    calledFromCatgScreen={this.state.calledFromCatgScreen}
                    lan={this.state.lan}
                    job={job}
                    index={index}
                    thisJobcartData={this.state.cartData?.cart?.find(i => i.job.jobid == job.jobid && i.job.categoryid == job.categoryid)}
                    key={index}
                    // thisJobcartData={this.state.cartData?.cart}
                    selectJob={this.selectJob}
                    toolTipVisible={this.state.toolTipVisible}
                    cahngeToolTip={this.cahngeToolTip}
                  />
                );
              }
              if (job.pricetypeid == 3) {
                return (
                  <SelectableOfferJob
                    calledFromCatgScreen={this.state.calledFromCatgScreen}
                    lan={this.state.lan}
                    job={job}
                    thisJobcartData={this.state.cartData?.cart?.find(i => i.job.jobid == job.jobid && i.job.categoryid == job.categoryid)}
                    index={index}
                    key={index}
                    selectJob={this.offerSelectJob}
                    toolTipVisible={this.state.toolTipVisible}
                    cahngeToolTip={this.cahngeToolTip}
                  />
                );
              }
              if (job.pricetype == 7) {
                return (
                  <DecoCategory
                    lan={this.state.lan}
                    job={job}
                    index={index}
                    key={index}
                    selectJob={this.selectJob}
                  />
                );
              }
              if (job.pricetype == 5) {
                return (
                  <VarientbaseJob
                    lan={this.state.lan}
                    job={job}
                    index={index}
                    key={index}
                    plusVarient={this.plusVarient}
                    minusVarient={this.minusVarient}
                    calculateVarient={this.calculateVarient}
                    calculateSubVariant={this.calculateSubVariant}
                    plus={this.plusQuantity}
                    minus={this.minusQuantity}
                  />
                );
              }
              if (job.pricetype == 6) {
                return (
                  <SizebaseJob
                    plusMeters={this.plusMeters}
                    minusMeters={this.minusMeters}
                    plusFloors={this.plusFloors}
                    index={index}
                    minusFloors={this.minusFloors}
                    lan={this.state.lan}
                    job={job}
                    key={index}
                  />
                );
              }
              if (job.pricetype == 8) {
                return (
                  <SecuritybaseJobs
                    job={job}
                    cahngeToolTip={this.cahngeToolTip}
                    index={index}
                    toolTipVisible={this.state.toolTipVisible}
                    lan={this.state.lan}
                    key={index}
                    plus={this.plusQuantity}
                    minus={this.minusQuantity}
                  />
                );
              }
              if (job.pricetype == 9) {
                return (
                  <Cleaning
                    lan={this.state.lan}
                    job={job}
                    index={index}
                    key={index}
                    selectJob={this.selectJob}
                  />
                );
              }
              // if (job.pricetype == 100) {
              //   return (
              //     <HomeCinema
              //       lan={this.state.lan}
              //       job={job}
              //       index={index}
              //       key={index}
              //       selectJob={this.selectJob}
              //     />
              //   );
              // }
            }.bind(this)
          )}
      </View>
    );
  };
  minusVarient = (varient, job) => {
    if (job.selected && job.selected == true) {
      let total = 0;
      varient.variants_attr.forEach((var_attr) => {
        var_attr.attr.forEach((attr) => {
          if (attr.selected && attr.t_price) {
            total = total + attr.t_price;
          }
        });
      });
      if (total > 0) {
        if (varient.items) varient.items--;
        else varient.items = 1;
        varient.t_price = varient.items * total;
        this.addRemoveIntoSelectedServices(job, true);
      }
    }
  };
  plusVarient = (varient, job) => {
    if (job.selected && job.selected == true) {
      let total = 0;
      varient.variants_attr.forEach((var_attr) => {
        var_attr.attr.forEach((attr) => {
          if (attr.selected && attr.t_price) {
            total = total + attr.t_price;
          }
        });
      });
      if (total > 0) {
        if (varient.items) varient.items++;
        else varient.items = 1;
        varient.t_price = varient.items * total;
        this.addRemoveIntoSelectedServices(job, true);
      }
    }
  };
  calculateSubVariant = (attr, varient, job) => {
    if (job.selected && job.selected == true) {
      varient.subvariants &&
        varient.subvariants.forEach((subvariant) => {
          subvariant.subvariants_attr &&
            subvariant.subvariants_attr.forEach((sub_atr) => {
              sub_atr.attr.forEach((in_attr) => {
                if (
                  in_attr.selected == true &&
                  in_attr.attr_id == attr.attr_id
                ) {
                  in_attr.selected = false;
                }
              });
            });
        });
      attr.selected = !attr.selected;
      if (attr.attr_type == 1) {
        attr.t_price =
          attr.selected && attr.selected == true ? attr.attr_price : 0;
      }

      varient.t_price = varient.items * attr.t_price ? attr.t_price : 0;
      let copySelectedJobs = this.state.selectedServices;
      this.setState({ selectedServices: copySelectedJobs });
    }
  };
  calculateVarient = (attr, varient, job) => {
    if (job.selected && job.selected == true) {
      varient.variants_attr.forEach((var_attr) => {
        var_attr.attr.forEach((inner_attr) => {
          if (
            inner_attr.selected == true &&
            inner_attr.attr_id == attr.attr_id
          ) {
            inner_attr.selected = false;
          }
        });
      });

      attr.selected = !attr.selected;
      if (attr.attr_type == 1) {
        attr.t_price =
          attr.selected && attr.selected == true ? attr.attr_price : 0;
      }
      if (attr.attr_price) {
        varient.t_price = varient.items * attr.t_price;
      }

      let copySelectedJobs = this.state.selectedServices;
      this.setState({ selectedServices: copySelectedJobs });
    }
  };
  minusQuantity = (job) => this.add_cart(job, 'MINUS')
  plusQuantity = (job) => this.add_cart(job, 'PLUS')
  selectJob = (job) => this.add_cart(job, 'SELECT')
  offerSelectJob = (job) => this.add_cart(job, 'OFFER_SELECT')



  add_cart = async (job, jobType) => {
    // console.log("job at add cart", job)
    let quantity = 0
    if (jobType === 'MINUS') {
      job.items--;
      quantity = job.items && job.offer_qty && job.items === 1 ?
        job.items * job.offer_qty :
        // job.items && job.offer_qty && job.items ?
        //   job?.offer_qty + (job.items - 1) :
        job.items ? job?.items : 0
    }
    else if (jobType === 'PLUS') {
      if (job.items) {
        job.items++;
      } else job.items = 1;
      quantity = job.items && job.offer_qty && job.items === 1 ?
        job.items * job.offer_qty :
        // job.items && job.offer_qty && job.items ?
        //   job.offer_qty + (job.items - 1) :
        job.items ? job.items : 0
    }
    else if (jobType === 'SELECT') {
      // quantity=
      const { cartData } = this.state;
      const isSelected = cartData?.cart?.find(i => i.job.jobid === job.jobid && i.job.categoryid === job.categoryid)
      quantity = isSelected ? 0 : 1
    }
    else if (jobType === 'OFFER_SELECT') {
      const { cartData } = this.state;
      const isSelected = cartData?.cart?.find(i => i.job.jobid === job.jobid && i.job.categoryid === job.categoryid)
      quantity = isSelected ? 0 : job?.offer_qty
    }
    if (jobType === 'PLUS') {
      clearTimeout(this.cartTimeout)
    }
    this.cartTimeout = setTimeout(() => {
      const qtyData = {
        job_id: job?.jobid,
        qty: quantity < 0 ? 0 : quantity

      }
      // console.log(qtyData);
      axios
        .post(`${apiUrl}/add_cart`, qtyData)
        .then((response) => {
          if (response.data.error) {
            alert(response.data.message)
            return
          }
          else {
            // console.log({ response_at_add: response.data });
            this.setState({ cartData: response.data })
            AsyncStorage.setItem("jobs", JSON.stringify(response.data));
          }

        })
        .catch(e => alert(e.message))
    }, 300)
  }
  promotionNavigation = () => {
    // axios
    //   .get("http://dev.xn--mgbt1ckekl.com/api/cu/v.3/app/promotions_list")
    //   .then((response) => { console.log("promotion List", response.data[0]) })

    // return
    // console.log("promotion job", this.state.bannerIndex, "===", this.state.bannersDetailList[this.state.bannerIndex]?.service?.jobs)
    // return
    this.props.navigation.navigate("Promotion", {
      lan: this.state.lan,
      job: this.state.bannersDetailList[this.state.bannerIndex]?.service?.jobs,
      service: this.state.bannersDetailList[this.state.bannerIndex]?.service,
      url: this.state.lan === "ar" ? this.state.bannersDetailList[this.state.bannerIndex]?.image_ar : this.state.bannersDetailList[this.state.bannerIndex]?.image
    })
  }

  openChat = () => {
    Linking.openURL("https://wa.me/+966593471675"); //966577311430 +966 57 843 4985 +966530576063
  };

  toggleSwitch = (value) => {
    this.setState({ isEnabled: !this.state.isEnabled });
  };
  categorySelection = async (category) => {
    if (this.state.showAllCategory) {
      this.setState({
        scrollValue: -2,
        showAllCategory: false,
        selectedCategoryId: category.categoryid,
        products: category.services,
      })
    }
    else {
      // console.log("category.categoryid", category.categoryid)
      // const filteredCategoryArray = this.state.categories.filter((value) => value.categoryid !== category.categoryid)
      this._accordion.setSelected(-1);
      this.setState({
        selectedCategoryId: category.categoryid,
        products: category.services,
        toolTipVisible: false,
        // filteredCategoryArray: filteredCategoryArray
      });
    }
  };
  getCartData = async (id) => {
    try {
      await AsyncStorage.removeItem("jobs");
      axios
        .get(`${apiUrl}/cart/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((response) => console.log("cart response", response));
    }
    catch (error) {
      console.log("Error", error)
    }
  }
  //   fetch(
  //     "http://app.xn--mgbt1ckekl.com/api/cu/v.3/app/cart",
  //     //"http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/customer_in_progress_order_requests",
  //     {
  //       method: "GET", //POST
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ session_id: id }),
  //     }
  //   )
  //     .then((response) => console.log("cart response", response))

  // }

  getCategories = () => {
    let enBannersList = [];
    let arBannersList = [];
    axios
      .get(`${apiUrl}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(async (response) => {
        response?.data?.slideshows?.map((bn) => {
          enBannersList.push(bn.image);
          arBannersList.push(bn.image_ar);
        });
        let sessionId = (response?.data?.session_id);
        // console.log("banners List", enBannersList, arBannersList);
        // console.log("category response", response?.data.session_id)
        let categories = response.data.categories;
        this.setState({
          enBannersList,
          arBannersList,
          bannersDetailList: response.data.slideshows,
          isLoading: false,
          categories: categories,
          freshCategories: categories,
          products: categories[0].services,
          selectedCategoryId: null,
          filteredCategoryArray: categories,
          sessionId: sessionId
        });
        this.clearCart(sessionId);
        this.handlePressAllFirstTime()
      }).catch((error) => {
        Toast.show({
          text: error.message,
          position: "bottom",
          duration: 2000,
        });
      }
      );

    this.setState({ loading: false });
  };


  clearJobs = async () => {

    let jobs = await AsyncStorage.getItem("jobs");
    let user = await AsyncStorage.getItem("user");
    if (jobs == null) {
      this.setState({
        cartData: [],
        user: user !== null ? JSON.parse(user) : null,
        // resetData: true
      });
      // this.getCategories();
    }
    else {
      this.setState({ cartData: jobs !== null ? JSON.parse(jobs) : [] });
    }
  };
  navigationSetup = async (option) => {
    if (option == 4) {
      this.props.navigation.navigate("ProfileSecreen", {
        cartItem: this.state.selectedServices.length,
        lan: this.state.lan,
        location: this.state.location,
        sessionId: this.state.sessionId,
        clearCart: this.clearCart
      });
    }
    if (option == 3) {
      // if (this.state.cartData !== undefined || this.state.cartData !== null) {
      // alert(
      //   "Dear Customer, To continue providing you with the best experience, we will be undergoing maintenance that may cause service interruption till 10th August 2021. We apologize for the inconvenience."
      // );

      this.props.navigation.navigate("MyCart", {
        lan: this.state.lan,
        isPackage: false,
        manualy: false,
      });
      await Analytics.logEvent("Cart", {
        name: "Cart",
        screen: "landingScreen",
        purpose: "checkout order from landing screen",
      });
      // } else {
      //   Toast.show({
      //     text:
      //       this.state.lan == "en" ? "Your cart is empty" : "سلة الطلبات فارغة",
      //     position: "bottom",
      //   });
      // }
    }
    if (option == 2) {
      this.props.navigation.navigate("MyOrders", {
        cartItem: this.state.selectedServices.length,
        lan: this.state.lan,
        location: this.state.location,
      });
    }
  };
  switchLanguage = async () => {
    let lan = await AsyncStorage.getItem("lan");
    let previousLan = lan !== null ? lan : "en";
    if (previousLan == "en") {
      this.changetoArabic();
    } else {
      this.changetoEnglish();
    }
  };
  registerForPushNotificationsAsync = async () => {
    try {
      Notifications.addNotificationResponseReceivedListener(this.handle_Notification);
    } catch (error) {
      this.setState({ errorMessage: 'Failed to get push token for push notification!\n' + error.message });
    }
  };

  offerBannerClose = () => {
    this.setState({ offerBanner: false })
  }
  changetoEnglish = async () => {
    await AsyncStorage.setItem("lan", "en");
    I18nManager.isRTL = false;
    I18nManager.forceRTL(false);
    await Updates.reloadAsync();
  };
  changetoArabic = async () => {
    await AsyncStorage.setItem("lan", "ar");
    I18nManager.isRTL = true;
    I18nManager.forceRTL(true);

    // this.props.navigation.replace("LandingSecreen");
    await Updates.reloadAsync();
    //this.updateLanguage(2);
  };
  openPromotionScreen = async (index) => {
    if (
      Platform.OS === "android" &&
      this.state.lan === "ar" &&
      this.state.isReversed === false
    ) {
      this.state.bannersDetailList.reverse();
      this.setState({ isReversed: true });
    }
    if (this.state.bannersDetailList[index].service.jobs !== false) {
      this.props.navigation.navigate("Promotion", {
        job: this.state.bannersDetailList[index].service.jobs,
        lan: this.state.lan,
        service: this.state.bannersDetailList[index].service,
        // url: this.state.dataSource[index].banner.url,
        url: this.state.lan === "ar" ? this.state.bannersDetailList[index].image_ar : this.state.bannersDetailList[index].image,
      });
      await Analytics.logEvent("PromotionalBanners", {
        name: "PromotionalBanners",
        screen: "landingScreen",
        purpose: "promotion banner clicked",
      });
    }
    if (
      this.state.dataSource[index].openCategory &&
      this.state.dataSource[index].openCategory == true
    ) {
      this.props.navigation.navigate("PromotionService", {
        serviceid: this.state.dataSource[index].categoryid,
        lan: this.state.lan,
      });
    }
  };

  handle_Notification = (response) => {
    console.log("notification", response.notification.request.content.data)

    if (response.notification.request.content.data.screenid) {
      const data = response.notification.request.content.data.screenid.split("-")
      const screen = data[0]
      const id = data[1]
      console.log("id", id, "screen", screen)
      if (screen === "price_review") {
        console.log("id", id, "screen", screen)

        this.props.navigation.navigate("OrderDetails", {
          lan: this.state.lan,
          // order: response.notification.request.content.data.screenid.match(/.{1,13}/g)[1],
          order: id,
          isHistory: false,
          isCalledFromNotification: true
        })
      }
      else if (screen === "promotion_id") {
        console.log("id", id, "screen", screen)
        this.handle_Notification_promotion(id)

      }
      else if (screen === "category_id") {
        this.handleCategory(id)
      }
      else {
        this.props.navigation.navigate("LandingScreen")
      }
    }
  }

  handle_Notification_promotion = (jobId) => {
    const urlObj = this.state.bannersDetailList.find(({ slideshow_id }) => slideshow_id == jobId)
    console.log("banner Obj", urlObj)
    axios.get(`${apiUrl}/job/${jobId}`)
      .then((response) => {
        this.props.navigation.navigate("Promotion", {
          job: response.data,
          lan: this.state.lan,
          url: this.state.lan === "ar" ? urlObj.image_ar : urlObj.image,
        })
      })
  }


  _navigate = () => {
    // alert("navigate")
    this.props.navigation.navigate("Login")
  }
  handleCategory = (id) => {
    // const categoryid = 1
    const renderData = this.state.categories.filter((value) => value.categoryid == id);
    console.log("-----a-a-a-", renderData[0])
    this.handleCallFromCategoryScreen()
    this.props.navigation.navigate("CategoryScreen", {
      renderContent: this._renderContent,
      renderData: renderData[0],
      lan: this.state.lan,
      user: this.state.user,
      selectedServices: this.state?.selectedServices,
      navigationSetup: this.navigationSetup
    })

  }
  handlePressAll = () => {
    this.setState({ selectedCategoryId: 1 })
    this.setState({ showAllCategory: !this.state.showAllCategory, scrollValue: 0 })
    const filteredCategoryArray = this.state.categories.filter((value) => value.categoryid !== 1)
    this.setState({ filteredCategoryArray: filteredCategoryArray })
  }
  handlePressAllFirstTime = () => {
    this.setState({ selectedCategoryId: 1 })
    this.setState({ showAllCategory: true })
    const filteredCategoryArray = this.state.categories.filter((value) => value.categoryid !== 1)
    this.setState({ filteredCategoryArray: filteredCategoryArray })
  }
  allCategorySelection = (item) => {
    if (item.categoryid == 22) {
      this._jobsList.scrollToIndex({ index: 9 })
      this.setState({ selectedCategoryId: 22, showRentalService: true })
    }
    else null
  }

  render() {
    // console.log("cartData===>", this.state.cartData)
    return (
      <Container style={{ marginTop: StatusBar.height }}>
        <StatusBar barStyle={Platform.OS == "ios" ? "dark-content" : "default"} />
        <View
          style={styles.innerContainer}
        >
          {/* Called when when diverted to landing screen from other screen */}
          {
            <NavigationEvents
              onWillFocus={() => {
                this.clearJobs();
                this.setState({ calledFromCatgScreen: false })
              }}
            />
          }
          {/* Header */}
          <View>
            <View style={styles.header} >
              <View style={styles.headerItem1} >
                <View style={styles.locContainer} >
                  <Text style={styles.locText} >
                    {this.state.location}
                  </Text>
                </View>
              </View>

              <View style={styles.headerItem2} >
                <TouchableOpacity onPress={this.openChat}>
                  <Image
                    source={require("../assets/Help-min.png")}
                    style={{ width: scaleSize(25), height: scaleSize(25) }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={this.switchLanguage}>
                <View style={styles.headerItem3} >
                  <Text style={[styles.langText, { fontFamily: this.state.lan == "en" ? "montserrat_arabic_regular" : "Montserrat_semiBold", }]} >
                    {this.state.lan == "en" ? "العربية" : "English"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* main body of the landing */}
          <View style={styles.headingContainer}>
            {this.state.lan == "en" ?
              <Text style={{ color: "#0764af", fontSize: 14, fontFamily: "montserrat_extraBold" }}>
                {this.state.user ? "Which service you need, " + this.state.user.name + "?" : "Which service you need?"}</Text>

              : <Text style={{ color: "#0764af", fontSize: 12, fontFamily: "montserrat_arabic_semibold" }}>
                {this.state.user ? "اي خدمة تريدها, " + this.state.user.name + "؟" : "اي خدمة تريدها؟"}</Text>
            }
          </View>
          <>
            {/* banner slider */}
            <View style={{ marginTop: 10, borderRadius: 20, marginBottom: scaleSize(20) }}>
              {this.state.enBannersList && (
                <SliderBox
                  // images={this.state.lan == "en" ? AcBanners : AcBanners_ar}
                  // images={this.state.offersUrls}
                  images={
                    this.state.lan == "en"
                      ? this.state.enBannersList
                      : this.state.arBannersList
                  }
                  sliderBoxHeight={153}
                  ImageComponentStyle={{
                    width: widthPerc(98)
                    // width: "100%",
                  }}
                  onCurrentImagePressed={(index) =>
                    this.openPromotionScreen(index)
                  }
                  dotColor="#ff8a29"
                  inactiveDotColor="#F5F5F5"
                  paginationBoxVerticalPadding={20}
                  autoplay
                  resizeMode={"contain"}
                  circleLoop={true}
                />
              )}
            </View>
            {/* categories list in row */}
            <Animated.View
              style={{
                zIndex: 1,
                transform: [{ translateY: this.tabY }],
                zIndex: 1,
                width: "100%",
                flexDirection: "row",
                backgroundColor: "white",
                width: Dimensions.get("screen").width - 30,
                alignSelf: "center",
                height: scaleSize(105),
              }}
            >
              <View style={{ flexDirection: "row" }}>
                {this.state.categories.length > 1 ?
                  <TouchableOpacity style={{
                    backgroundColor: this.state.showAllCategory ? "#0865b0" : "lightgray",
                    paddingHorizontal: 4, width: widthPerc(8), borderRadius: 5, height: scaleSize(40),
                    marginRight: 5,
                    justifyContent: "center"
                  }}
                    onPress={this.handlePressAll}>
                    <Text style={{
                      color: this.state.showAllCategory ? "white" : "black",
                      textAlign: "center", alignSelf: "center"
                    }}>All</Text>

                  </TouchableOpacity> : <></>}
                <View style={{
                  paddingleft: this.state.showAllCategory ? scaleSize(10) : 0,
                  width: Dimensions.get("screen").width - 65,
                }}>
                  <Animated.FlatList
                    ref={c => this._jobsList = c}
                    // initialScrollIndex={1}
                    horizontal={true}
                    inverted={this.state.lan == "en" ? false : true}
                    contentContainerStyle={{ flexDirection: this.state.lan == "en" ? "row" : "row-reverse" }}
                    showsHorizontalScrollIndicator={false}
                    data={this.state.categories}
                    renderItem={({ item, index }) => (
                      <CategoryCard
                        showAllCategory={this.state.showAllCategory}
                        index={index}
                        scrollValue={this.state.showRentalService ? -1 : this.state.scrollValue}
                        category={item}
                        lan={this.state.lan}
                        categorySelection={this.categorySelection}
                        selectedCategoryId={this.state.showAllCategory ? -1 : this.state.selectedCategoryId}
                        location={this.state.location}
                        openVideoPopup={(item) => {
                          this.setState({ videoSelected: item }, () =>
                            this.setState({ videoPopup: true })
                          );
                        }}
                        item={index}
                      />
                    )}
                    keyExtractor={(item) => item.categoryid}
                  />
                </View>
              </View>
            </Animated.View>
            {this.state.categories && <CategoryIndicator
              dataArray={this.state.categories}
              selectedCategoryId={this.state.selectedCategoryId} />
            }
          </>

          {/* jobs and services in column */}
          {this.state.showAllCategory ?
            this.state.selectedCategoryId == 22 ?
              this._renderManualSelection()
              :
              <FlatList
                viewabilityConfig={this.viewabilityConfig}
                onViewableItemsChanged={this.onViewableItemsChanged}
                data={this.state.categories}
                contentContainerStyle={{ paddingBottom: 300 }}
                renderItem={({ item, index }) => (
                  <View>
                    <View style={{
                      width: widthPerc(92.5), alignSelf: "center",
                      marginLeft: -10
                    }}>
                      <AllCategoryCard
                        category={item}
                        allCategorySelection={() => this.allCategorySelection(item)}
                        lan={this.state.lan}
                        selectedCategoryId={this.state.selectedCategoryId}
                        location={this.state.location}
                        item={index}
                      />
                    </View>
                    {item.categoryid == 22 ?
                      <></> :
                      <View>
                        <Accordion
                          style={{ borderWidth: 0 }}
                          ref={(c) => (this._accordion = c)}
                          dataArray={item.services}
                          renderHeader={this._renderHeader}
                          renderContent={this._renderContent}
                        />
                      </View>
                    }
                  </View>
                )}
                keyExtractor={(item, index) => index}
              /> :
            <ScrollView style={{ height: scaleSize(367), paddingTop: 5 }}>
              <Accordion
                contentContainerStyle={{ paddingBottom: this.state.lan == "en" ? 30 : 37 }}
                style={{ borderWidth: 0 }}
                ref={(c) => (this._accordion = c)}
                dataArray={this.state.products}
                renderHeader={this.state.selectedCategoryId == 22 ? this._renderManualSelection : this._renderHeader}
                renderContent={this.state.selectedCategoryId == 22 ? null : this._renderContent}
              />
            </ScrollView>
          }
          {!this.state.categories?.length > 0 && (
            <ActivityIndicator
              size="large"
              color={imageLoadingColor}
              style={{
                marginTop: scaleSize(40),
                position: "absolute",
                alignSelf: "center",
                top: 200
              }}
            />
          )}
        </View>
        <Footer
          cartData={this.state.cartData}
          calledFromLanding={true}
          lan={this.state.lan}
          user={this.state.user}
          selectedServices={this.state?.selectedServices}
          navigationSetup={this.navigationSetup}
        />
        {/* full screen banners */}
        {this.state.offerBanner && this.state.bannersDetailList && <OfferBanner
          bannerIndex={this.state.bannerIndex}
          promotionNavigation={this.promotionNavigation}
          lan={this.state.lan}
          offerBannerClose={this.offerBannerClose}
        />}
      </Container>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LandingSecreen)

const styles = StyleSheet.create({
  innerContainer: {
    backgroundColor: "white",
    paddingBottom: scaleSize(160),
  },
  header: {
    width: Dimensions.get("screen").width - 30,
    alignSelf: "center",
    borderTopWidth: 0,
    borderBottomWidth: 2,
    borderColor: "#0764af",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerItem1: {
    width: portion,
    height: scaleSize(50),
  },
  locContainer: {
    alignSelf: "flex-start",
    justifyContent: "center",
    flex: 2,
  },
  locText: {
    color: "#0764af",
    fontSize: 16,
    fontFamily: "Montserrat_semiBold",
  },
  headerItem2: {
    width: portion,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  headerItem3: {
    alignSelf: "flex-end",
    justifyContent: "center",
    flex: 2,
    width: portion,
  },
  langText: {
    color: "#0764af",
    fontSize: 14,
    textAlign: "right",
  },
  headingContainer: {
    width: widthPerc(90),
    alignSelf: "center",
    marginTop: 10,
    paddingHorizontal: 5,
    paddingBottom: 5
  },
})

