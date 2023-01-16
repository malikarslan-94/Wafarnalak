import React from "react";
import * as Analytics from "expo-firebase-analytics";
import { connect } from 'react-redux'
import * as Location from "expo-location";
// import ReferalModal from "../components/Modal/Index"
import * as Permissions from "expo-permissions";
import Footer from "../components/Footer/Index"

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
  ToastAndroid,
  ScrollView,
  StyleSheet,
} from "react-native";
import { NavigationEvents, SafeAreaView } from "react-navigation";
import * as Updates from "expo-updates";
import * as Notifications from "expo-notifications";
import AllVideos from "./Common/AllVideos";
import VideoPlayerPopup from "./Common/VideoPlayerPopup";
import CategoryCard from "./categories/categoryCard";
import AllCategoryCard from "./categories/allCategoryCard"
import Constants from "expo-constants";
import Deals from "./deals/deals";
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
import Spinner from "react-native-loading-spinner-overlay";
import VarientbaseJob from "./jobs/varientbaseJob";
import axios from "axios";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { scaleSize, widthPerc } from "../mixin";
import CategoryIndicator from "../components/CategoryIndicator";
import CategorySelection from "../components/CategorySelection";
import Popup from "../components/Popup/popup";
import OfferBanner from "../components/OfferBanner/index";
Analytics.setUnavailabilityLogging(false);
Analytics.setDebugModeEnabled(false);

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_HEIGHT = Platform.OS == "android" ? 320 : 335;
const HEADER_HEIGHT = Platform.OS === "ios" ? 64 : 50;
const SCROLL_HEIGHT = IMAGE_HEIGHT - HEADER_HEIGHT;


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

const AcOffersDataEng = [
  {
    job: {
      cartnotes:
        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work" +
        "- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
      cartnotes_ar:
        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. " +
        " ↵السعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
      carttype: 1,
      i_notes: "2 or more = SAR  84 / Unit",
      i_notes_ar: "( لعدد وحدتين او أكثر، السعر 84 ريال للوحدة (مكيف",
      id: 230,
      is_promoted: true,
      jobServiceIcon:
        "https://i.ibb.co/WPLQwM1/Window-AC-Refill-Cleaning-Banner-Eng-min.png",
      jobserviceName: "Window Unit",
      jobserviceNameAr: "مكيف ويندو (شباك)  ",
      name: "Freon Refill + Cleaning",
      name_ar: "تعبئة فريون + تنظيف",
      price: 120,
      pricelimit: 49,
      pricetype: 1,
      serviceid: 29,
      t_price: 0,
      saleprice: 84,

      productseoname:
        "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FWindow-min.png?alt=media&token=6338733b-3d6f-43dc-a744-cb60b1d74448",
    },
    webbanner:
      "https://i.ibb.co/WPLQwM1/Window-AC-Refill-Cleaning-Banner-Eng-min.png",
    banner: {
      url: "https://i.ibb.co/WPLQwM1/Window-AC-Refill-Cleaning-Banner-Eng-min.png",
    },
    //--htttps://i.ibb.co/WPLQwM1/Window-AC-Refill-Cleaning-Banner-Eng-min.png
  },
  {
    job: {
      cartnotes:
        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work" +
        "- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
      cartnotes_ar:
        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. " +
        " ↵السعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
      carttype: 1,
      jobServiceIcon: "https://i.ibb.co/y4GL1HY/AC-installation-2.png",
      jobserviceName: "Window Unit",
      jobserviceNameAr: "مكيف ويندو (شباك)  ",
      id: 60,
      serviceid: 29,
      pricelimit: 49,
      name: "Installation",
      name_ar: "تركيب",
      price: 99,
      pricetype: 1,
      is_promoted: true,
      saleprice: 75,
      t_price: 0,
      i_notes: "2 or more = SAR 75 / Unit",
      i_notes_ar: "تنظيف مكيفين ويندو او اكثر بـ75 ريال للمكيف الواحد",

      productseoname:
        "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FWindow-min.png?alt=media&token=6338733b-3d6f-43dc-a744-cb60b1d74448",
    },
    webbanner: "https://i.ibb.co/y4GL1HY/AC-installation-2.png",
    banner: {
      url: "https://i.ibb.co/y4GL1HY/AC-installation-2.png",
    },

    //htttps://i.ibb.co/XZngvwL/Window-ac-installation-english.png
  },

  // {
  //   job: {
  //     cartnotes:
  //       "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work" +
  //       "- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
  //     cartnotes_ar:
  //       "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. " +
  //       " ↵السعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
  //     carttype: 1,
  //     i_notes: "2 or more = SAR  199 / Unit",
  //     i_notes_ar: "(لعدد وحدتين او أكثر، السعر 199 ريال للوحدة (مكيف",
  //     id: 223,
  //     is_promoted: true,
  //     jobServiceIcon: "https://i.ibb.co/3yz3LHy/Ac-app-banner-2.png",
  //     jobserviceName: "Split Unit",
  //     jobserviceNameAr: "مكيف اسبليت",
  //     name: "Deep Cleanng + Gas Top up", //Freon Refill + Cleaning
  //     name_ar: "تعبئة فريون + تنظيف",
  //     price: 229, //150
  //     pricelimit: 49,
  //     pricetype: 1,
  //     serviceid: 29,
  //     saleprice: 199, //105
  //     t_price: 0,

  //     productseoname:
  //       "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FSplit-min.png?alt=media&token=1a0943d3-ae9a-4422-b82c-d3d1862910de",
  //   },
  //   webbanner: "https://i.ibb.co/3yz3LHy/Ac-app-banner-2.png",
  //   banner: {
  //     url: "https://i.ibb.co/0hKJ02H/Ac-app-banner-2-Text-Change.png",
  //   },
  //   //??

  //   // htttps://i.ibb.co/L6XdvKV/Split-Ac-30-Per-Off-Eng-min.png
  // },
  {
    job: {
      cartnotes:
        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work" +
        "- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
      cartnotes_ar:
        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. " +
        " ↵السعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
      carttype: 1,
      jobServiceIcon:
        "https://i.ibb.co/DVx43S1/AC-installation-1.pnghttps://i.ibb.co/ys57G29/Split-Installation-eng.png",
      jobserviceName: "Split Unit",
      jobserviceNameAr: "مكيف اسبليت",
      id: 65,
      serviceid: 29,
      pricelimit: 49,
      name: "Installation",
      name_ar: "تركيب",
      price: 200, //200
      pricetype: 1,
      is_promoted: true,
      t_price: 0,
      saleprice: 150, //150
      i_notes: "Get 2 or more units installed in SAR 150 each",
      i_notes_ar: "تركيب وحدتين أو اكثر بـ 150 ريال  لكل وحدة",

      productseoname: "https://i.ibb.co/ys57G29/Split-Installation-eng.png",
    },
    webbanner: "https://i.ibb.co/ys57G29/Split-Installation-eng.png",
    banner: {
      url: "https://i.ibb.co/ys57G29/Split-Installation-eng.png",
    },

    //htttps://i.ibb.co/17MmDg0/Split-ac-installation-eng.png
  },

  {
    job: {
      cartnotes:
        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work" +
        "- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
      cartnotes_ar:
        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. " +
        " ↵السعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
      carttype: 1,
      jobServiceIcon: "https://i.ibb.co/PWSc9QP/Ac-app-banner.png",
      jobserviceName: "Split Unit",
      jobserviceNameAr: "مكيف اسبليت",
      id: 70,
      serviceid: 29,
      pricelimit: 49,
      name: "Cleaning (Indoor)",
      name_ar: "التنظيف (داخلي)",
      price: 89, //200
      pricetype: 1,
      is_promoted: true,
      t_price: 0,
      saleprice: 80, //150
      i_notes: "Get 2 or more units cleaned in SAR 80 each",
      i_notes_ar: "تركيب وحدتين أو اكثر بـ 150 ريال  لكل وحدة",

      productseoname: "https://i.ibb.co/PWSc9QP/Ac-app-banner.png",
    },
    webbanner: "https://i.ibb.co/PWSc9QP/Ac-app-banner.png",
    banner: {
      url: "https://i.ibb.co/PWSc9QP/Ac-app-banner.png",
    },

    //htttps://i.ibb.co/17MmDg0/Split-ac-installation-eng.png
  },

  {
    job: {
      cartnotes:
        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work" +
        "- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
      cartnotes_ar:
        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. " +
        " ↵السعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
      carttype: 1,
      i_notes: "2 or more = SAR 168 / Unit",
      i_notes_ar: "(لعدد وحدتين او أكثر، السعر 168 ريال للوحدة (مكيف",
      id: 228,
      is_promoted: true,
      jobServiceIcon: "https://i.ibb.co/pKhLVCz/Feron-refil-Cleaning-eng.png",
      // name: "Tower Unit",
      // name_ar: "مكيف تاور (برج/نقال)",
      name: "Freon Refill + Cleaning",
      name_ar: "تعبئة فريون + تنظيف",
      jobserviceName: "Tower Unit",
      jobserviceNameAr: "مكيف تاور (برج/نقال)",
      price: 240,
      pricelimit: 49,
      pricetype: 1,
      serviceid: 29,
      saleprice: 168,
      t_price: 0,
      productseoname:
        "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FTower-Unit-min.png?alt=media&token=57032c5d-3e16-4476-ac59-ddb5ba4a7973",
    },
    webbanner: "https://i.ibb.co/pKhLVCz/Feron-refil-Cleaning-eng.png",
    banner: {
      url: "https://i.ibb.co/pKhLVCz/Feron-refil-Cleaning-eng.png",
    },
    // htttps://i.ibb.co/pKhLVCz/Feron-refil-Cleaning-eng.png
  },
];
const AcOffersData_ar = [
  {
    job: {
      cartnotes:
        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work" +
        "- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
      cartnotes_ar:
        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. " +
        " ↵السعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
      carttype: 1,
      i_notes: "2 or more = SAR  84 / Unit",
      i_notes_ar: "( لعدد وحدتين او أكثر، السعر 84 ريال للوحدة (مكيف",
      id: 230,
      is_promoted: true,
      jobServiceIcon:
        "https://i.ibb.co/LdrtWXw/Window-AC-Refill-Cleaning-Banner-Ar-min.png",
      jobserviceName: "Window Unit",
      jobserviceNameAr: "مكيف ويندو (شباك)  ",
      name: "Freon Refill + Cleaning",
      name_ar: "تعبئة فريون + تنظيف",
      price: 120,
      pricelimit: 49,
      pricetype: 1,
      serviceid: 29,
      t_price: 0,
      saleprice: 84,

      productseoname:
        "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FWindow-min.png?alt=media&token=6338733b-3d6f-43dc-a744-cb60b1d74448",
    },
    webbanner:
      "https://i.ibb.co/LdrtWXw/Window-AC-Refill-Cleaning-Banner-Ar-min.png",
    banner: {
      url: "https://i.ibb.co/LdrtWXw/Window-AC-Refill-Cleaning-Banner-Ar-min.png",
    },

    // htttps://i.ibb.co/sPqjBGJ/Tower-AC-banner-arabic.png
  },
  {
    job: {
      cartnotes:
        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work" +
        "- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
      cartnotes_ar:
        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. " +
        " ↵السعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
      carttype: 1,
      jobServiceIcon: "https://i.ibb.co/f4Lrt9j/AC-installation-Arabic-06.png",
      jobserviceName: "Window Unit",
      jobserviceNameAr: "مكيف ويندو (شباك)  ",
      id: 60,
      serviceid: 29,
      pricelimit: 49,
      name: "Installation",
      name_ar: "تركيب",
      price: 99,
      pricetype: 1,
      is_promoted: true,
      saleprice: 75,
      t_price: 0,
      i_notes: "2 or more = SAR 75 / Unit",
      i_notes_ar: "تنظيف مكيفين ويندو او اكثر بـ75 ريال للمكيف الواحد",

      productseoname:
        "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FWindow-min.png?alt=media&token=6338733b-3d6f-43dc-a744-cb60b1d74448",
    },
    webbanner: "https://i.ibb.co/f4Lrt9j/AC-installation-Arabic-06.png",
    banner: {
      url: "https://i.ibb.co/f4Lrt9j/AC-installation-Arabic-06.png",
    },
    // htttps://i.ibb.co/1KYhYkD/Window-ac-installation-arabic.png
  },

  // {
  //   job: {
  //     cartnotes:
  //       "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work" +
  //       "- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
  //     cartnotes_ar:
  //       "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. " +
  //       " ↵السعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
  //     carttype: 1,
  //     i_notes: "2 or more = SAR  105 / Unit",
  //     i_notes_ar: "(لعدد وحدتين او أكثر، السعر 105 ريال للوحدة (مكيف",
  //     id: 223,
  //     is_promoted: true,
  //     jobServiceIcon: "https://i.ibb.co/Bn2v8h2/Ac-app-banner-Arabic-2.png",
  //     jobserviceName: "Split Unit",
  //     jobserviceNameAr: "مكيف اسبليت",
  //     name: "Freon Refill + Cleaning",
  //     name_ar: "تعبئة فريون + تنظيف",
  //     price: 229,
  //     pricelimit: 49,
  //     pricetype: 1,
  //     serviceid: 29,
  //     saleprice: 199,
  //     t_price: 0,

  //     productseoname:
  //       "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FSplit-min.png?alt=media&token=1a0943d3-ae9a-4422-b82c-d3d1862910de",
  //   },
  //   webbanner: "https://i.ibb.co/Bn2v8h2/Ac-app-banner-Arabic-2.png",
  //   banner: {
  //     url: "https://i.ibb.co/Vp9QFWw/Ac-app-banner-Arabic-Text-Change.png",
  //   },
  // },
  {
    job: {
      cartnotes:
        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work" +
        "- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
      cartnotes_ar:
        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. " +
        " ↵السعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
      carttype: 1,
      jobServiceIcon: "https://i.ibb.co/0G5ZH7C/AC-installation-Arabic-01.png",
      jobserviceName: "Split Unit",
      jobserviceNameAr: "مكيف اسبليت",
      id: 65,
      serviceid: 29,
      pricelimit: 49,
      name: "Installation",
      name_ar: "تركيب",
      price: 200, //Change > 249
      pricetype: 1,
      is_promoted: true,
      t_price: 0,
      saleprice: 150,
      i_notes: "2 or more = SAR 150 / Unit",
      i_notes_ar: "تركيب وحدتين أو اكثر بـ 150 ريال  لكل وحدة",

      productseoname: "https://i.ibb.co/0G5ZH7C/AC-installation-Arabic-01.png",
    },
    webbanner: "https://i.ibb.co/YchN3YR/Split-ac-Installation-arabic-1.png",
    banner: {
      url: "https://i.ibb.co/qWdmQMQ/banner-images-01.png",
    },
  }, //htttps://i.ibb.co/FqG5xSc/split-ac-installation-arabic.pn
  {
    job: {
      cartnotes:
        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work" +
        "- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
      cartnotes_ar:
        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. " +
        " ↵السعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
      carttype: 1,
      i_notes: "2 or more = SAR 80 / Unit",
      i_notes_ar: "تنظيف وحدتين أو أكثر ب 80 ريال لكل وحدة",
      id: 228,
      is_promoted: true,
      jobServiceIcon: "https://i.ibb.co/5xn6Dm4/Ac-app-banner-Arabic.png",
      // name: "Tower Unit",
      // name_ar: "مكيف تاور (برج/نقال)",
      name: "Cleaning (Indoor)",
      name_ar: "التنظيف (داخلي)",
      jobserviceName: "Split Unit",
      jobserviceNameAr: "مكيف تاور (برج/نقال)",
      price: 89,
      pricelimit: 49,
      pricetype: 1,
      serviceid: 29,
      saleprice: 80,
      t_price: 0,
      productseoname: "https://i.ibb.co/5xn6Dm4/Ac-app-banner-Arabic.png",
    },
    webbanner: "https://i.ibb.co/5xn6Dm4/Ac-app-banner-Arabic.png",
    banner: {
      url: "https://i.ibb.co/5xn6Dm4/Ac-app-banner-Arabic.png",
    },
  },
  {
    job: {
      cartnotes:
        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work" +
        "- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
      cartnotes_ar:
        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. " +
        " ↵السعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
      carttype: 1,
      i_notes: "2 or more = SAR 168 / Unit",
      i_notes_ar: "(لعدد وحدتين او أكثر، السعر 168 ريال للوحدة (مكيف",
      id: 228,
      is_promoted: true,
      jobServiceIcon:
        "https://i.ibb.co/BrV4mZQ/Feron-refil-Cleaning-arabic.png",
      // name: "Tower Unit",
      // name_ar: "مكيف تاور (برج/نقال)",
      name: "Freon Refill + Cleaning",
      name_ar: "تعبئة فريون + تنظيف",
      jobserviceName: "Tower Unit",
      jobserviceNameAr: "مكيف تاور (برج/نقال)",
      price: 240,
      pricelimit: 49,
      pricetype: 1,
      serviceid: 29,
      saleprice: 168,
      t_price: 0,
      productseoname:
        "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FTower-Unit-min.png?alt=media&token=57032c5d-3e16-4476-ac59-ddb5ba4a7973",
    },
    webbanner: "https://i.ibb.co/BrV4mZQ/Feron-refil-Cleaning-arabic.png",
    banner: {
      url: "https://i.ibb.co/BrV4mZQ/Feron-refil-Cleaning-arabic.png",
    },
  },
];

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
    this.state = {
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
      scrollValue: -1,
      showRentalService: false,
      calledFromCatgScreen: false,
      yLengthLimit: 0,
      offsetYValue: 0

    };
  }

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    const scrollToIndex = viewableItems.pop()
    console.log("scrollToIndex", scrollToIndex);
    console.log("Visible items are", viewableItems.map(i => i.index));
    console.log("Changed in this iteration", changed.map(i => i.index));
    if (scrollToIndex) {
      this.setState({ scrollValue: scrollToIndex.index })
      this._jobsList.scrollToIndex({ index: scrollToIndex.index })
    }
  }
  findPriceOrder = (orders) => {
    const found = orders.find(element => element.sp_price_status === "cus_pending");
    if (found.sp_price_status === "cus_pending") {
      this.setState({ priceModal: true })
      setTimeout(() => {
        this.setState({ priceModal: false })
      }, 3000);
      // Toast.show({
      //   text:
      //     this.state.lan == "en" ? "Alert ! Supplier has sent request for rates approvel,kindly visit the orders and review the rates" : "لا توجد طلبات جديدة", // No New Order  responseJson.message
      //   buttonText: "",
      //   position: "top",
      // });
    }
    console.log("found", found.sp_price_status)
    // console.log("orders", orders.find(element => element.sp_price_status.orderid == 10104))
    // this.setState({ newOrders: found })


  }
  checkSupplierPricePending = async () => {
    fetch(
      "http://app.xn--mgbt1ckekl.com/api/cu/v.3/app/orders",
      //"http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/customer_in_progress_order_requests",
      {
        method: "GET", //POST
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ customerid: user.customerid }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("orderResponse")
        if (responseJson) {

          this.findPriceOrder(responseJson?.orders)

        } else {

          console.log("Error in ordeer fetching")
        }
      })
      .catch((error) => { console.log("Error in order fetching") });
  };

  checkUserLogin = async () => {
    this.setState({ isLogin: true })

  }

  checkOfferBannerIndex = async () => {
    let bannerIndexx = await AsyncStorage.getItem("bannerIndex");
    if (!bannerIndexx)
      await AsyncStorage.setItem("bannerIndex", "0");
    // let bannerIndexx = await AsyncStorage.getItem("bannerIndex");
    console.log("indexxxx", bannerIndexx)

    if (bannerIndexx == 1) {
      await AsyncStorage.setItem("bannerIndex", "0");

      this.setState({ bannerIndex: 0 })
    }
    else {
      this.setState({ bannerIndex: 1 })
      await AsyncStorage.setItem("bannerIndex", "1");
    }
  }

  componentDidMount = async () => {

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
    let feedbackShow = await AsyncStorage.getItem("PopUp_Feedback");
    // axios
    //   .get(
    //     "http://app.xn--mgbt1ckekl.com/api/cu/v.3/app/cart_clear").then((response) => { console.log("cart empty") })
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
    await AsyncStorage.removeItem("jobs");
    this.setState({
      lan: lan !== null ? lan : "en",
      user: user !== null ? JSON.parse(user) : null,
    });
    this.checkUserLocation();
    this.getOffers();
    this.getCategories();
    this.getbanner();
    this.registerForPushNotificationsAsync()

  };

  handleCallFromCategoryScreen = () => {
    this.setState({ calledFromCatgScreen: true })
  }
  closePopup = () => {
    this.setState({ priceModal: false })
  }
  // Banners API Fetch
  getbanner = () => {
    // console.log("getbanner")
    this.setState({
      isLoading: true
    });
    let enBannersList = [];
    let arBannersList = [];
    axios
      .get(
        // "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wfportal/api/cu/v.3/app",
        "http://app.xn--mgbt1ckekl.com/api/cu/v.3/app",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // alert("response")
        // console.log("Banners Response", response.data.slideshows);
        response.data.slideshows.map((bn) => {
          enBannersList.push(bn.image);
          arBannersList.push(bn.image_ar);
        });
        // console.log("banners List", enBannersList, arBannersList);
        this.setState({
          enBannersList,
          arBannersList,
          bannersDetailList: response.data.slideshows,
          isLoading: false
        });
      });
  };

  checkUserLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
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
      const geocode = await Location.reverseGeocodeAsync(mylocation.coords);
      // console.log("city ", geocode[0].city);

      this.setState({ location: geocode[0].city });
    }
  };
  CaregoryHeader = () => {

    return (<Text>header</Text>)
  }
  handleExtraSpace = (index) => {
    console.log("yLength===>", index)
    // this.setState({ showExtraLength: true })
    if (index == 0 && this.state.offsetYValue == 0)
      this.setState({ yLengthLimit: 1500 })
    else if (index == 1)
      this.setState({ yLengthLimit: 1500 })
    else if (index == 1)
      this.setState({ yLengthLimit: 500 })
    else if (index == 2)
      this.setState({ yLengthLimit: 320 })
    else if (index == 3)
      this.setState({ yLengthLimit: 800 })
    else if (index == 4)
      this.setState({ yLengthLimit: 350 })
    else this.setState({ yLengthLimit: 1500 })


  }
  handleRemoveExtraSpace = () => {
    // this.setState({ showExtraLength: false })
    this.setState({ yLengthLimit: 0 })

  }
  _renderHeader = (data, expanded) => {
    let index = data.jobs.findIndex((job) => job.selected == true);
    return (
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          backgroundColor: this.state.selectedCategoryId == data.categoryid ? "#d8d8d8" : "#F5F5F5",
          // backgroundColor: expanded ? "#d8d8d8" : "#F5F5F5",
          marginBottom: 4,
          alignSelf: "center",

          width: Dimensions.get("screen").width - 30,
          height: scaleSize(70),
          borderWidth: 0,
        }}
      >
        <Left style={{ flexDirection: "row" }}>
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
          <View style={{ marginTop: 4 }}>
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
          paddingBottom: scaleSize(15),
        }}
      >
        <View style={{ marginLeft: 15, marginRight: 15 }}>
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
                    addCartLoader={this.state.addCartLoader}
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
                    key={index}
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
  add_cart = (job, tp) => {
    // console.log("jobbbb", tp)
    if (job.items) {
      job.items++;
    } else job.items = 1;

    axios
      .post("http://app.xn--mgbt1ckekl.com/api/cu/v.3/app/add_cart", {
        job_id: job.jobid,
        qty: job.items && job.offer_qty && job.items === 1 ?
          job.items * job.offer_qty :
          job.items && job.offer_qty && job.items ?
            job.offer_qty + (job.items - 1) :
            job.items ? job.items : 0
        // qty: job.jobid == 245 || job.jobid == 249 || job.jobid == 237 || job.jobid == 241 || job.jobid == 236 ? job.items * job.offer_qty : job.items,
      })
      .then((response) => {
        console.log("plus response", response);
        if (response.data.error) {
          alert(response.data.message)
          return
        }
        else {
          var rs = response.data.cart.filter((f) => f.job?.jobid == job?.jobid);
          let catID = response.data.cart[0].categories.categoryid
          // console.log("plus job response", rs);
          // job.t_price = response.data.cart[0].category_total;
          // setTimeout(() => (job.t_price = rs[0].total), 500);
          job.t_price = rs[0].total;
          // console.log("plus total", rs[0].total);
          // console.log("plus total obj", rs[0]);
          this.setState({ totprice: rs[0].total });
          this.setState({ totObj: rs[0] });
          tp = this.state.totprice;
          // setTimeout(() => this.state.totprice, 2000);
          // console.log(this.state.totprice, "xux");

          // console.log(job.t_price, "yty");

          job.selected = true;
          // this.handleCategory(catID)
          this.addRemoveIntoSelectedServices(job, true)
          // console.log("thej", job);
          // setTimeout(() => this.addRemoveIntoSelectedServices(job, true), 2000);
        }
        //tp = rs[0].total;
        // console.log(job.t_price, "xtx");
        // console.log(tp, "xtx");
      })
      .catch((e) => console.log("Err", e));

    //tp = tot;

  }
  // Plus sign function (Add value to Cart)
  plusQuantity = (job, tp) => {
    this.setState({ addCartLoader: true })

    setTimeout(() => this.add_cart(job, tp), 200);
  };
  clearVariantsAndSubVariants = (job) => {
    if (job.variants) {
      job.variants.forEach((variant) => {
        if (variant.items > 0) {
          variant.items = 0;
        }
        variant.variants_attr.forEach((var_atr) => {
          var_atr.attr.forEach((atr) => {
            if (atr.selected && atr.selected == true) {
              atr.selected = false;
            }
          });
        });
        if (variant.subvariants) {
          variant.subvariants.forEach((sub_variant) => {
            sub_variant.subvariants_attr &&
              sub_variant.subvariants_attr.forEach((sub_var_atr) => {
                sub_var_atr.attr.forEach((atr) => {
                  if (atr.selected && atr.selected == true) {
                    atr.selected = false;
                  }
                });
              });
          });
        }
      });
    }
  };

  promotionNavigation = () => {
    this.props.navigation.navigate("Promotion", {
      lan: this.state.lan,
      job: this.state.bannersDetailList[this.state.bannerIndex]?.service?.jobs,
      service: this.state.bannersDetailList[this.state.bannerIndex]?.service,
      url: this.state.lan === "ar" ? this.state.bannersDetailList[this.state.bannerIndex]?.image_ar : this.state.bannersDetailList[this.state.bannerIndex]?.image
    })
  }
  // Minus btn function (remove item from cart)
  minusQuantity = (job) => {
    // console.log("minusQuantity", job)
    if (job.items && job.items >= 1) {
      job.items--;
      axios
        .post("http://app.xn--mgbt1ckekl.com/api/cu/v.3/app/add_cart", {
          job_id: job.jobid,
          qty: job.items && job.offer_qty && job.items === 1 ?
            job.items * job.offer_qty :
            job.items && job.offer_qty && job.items ?
              job.offer_qty + (job.items - 1) :
              job.items ? job.items : 0
          // qty: job.jobid == 245 || job.jobid == 249 || job.jobid == 237 || job.jobid == 241 || job.jobid == 236 ? job.items * job.offer_qty : job.items
          // qty: job.items,
        })
        .then((response) => {
          let catID = response?.data?.cart[0]?.categories?.categoryid

          // console.log("minusQuantity res", response.data.cart);
          var rs = response.data.cart.filter((f) => f.job.jobid == job.jobid);
          // console.log("minusQuantity res", rs);

          // job.t_price = rs[0].total;
          // job.t_price = response.data.cart[0].category_total;
          job.t_price = rs[0].total;
          this.setState({ totprice: rs[0].total });
          this.setState({ totObj: rs[0] });
          // this.handleCategory(catID)

        })
        .catch((e) => console.log("Err", e));

      if (job.items == 0) {
        axios
          .post("http://app.xn--mgbt1ckekl.com/api/cu/v.3/app/add_cart", {
            job_id: job.jobid,
            qty: 0,
          })
          .then((response) => {
            console.log("irest0", response.data.cart);
          })
          .catch((e) => console.log("Err", e));
        job.items = 0;
        job.t_price = 0;
        job.selected = false;
        this.clearVariantsAndSubVariants(job);
      }
      //this.addRemoveIntoSelectedServices(job, true);
      setTimeout(() => this.addRemoveIntoSelectedServices(job, true), 1000);
    } else {
      job.items = 0;
      job.t_price = 0;
      job.selected = false;
      this.addRemoveIntoSelectedServices(job, false);
    }
  };
  // get backup from live app

  offerSelectJob = (job) => {
    job.selected = !job.selected;
    job.items = 1;
    var testtotal = job.offer_qty * job.price;
    axios
      .post("http://app.xn--mgbt1ckekl.com/api/cu/v.3/app/add_cart", {
        job_id: job.jobid,
        qty: job.selected == true ? job.offer_qty : 1,
      })
      .then((response) => {
        let catID = response?.data?.cart[0]?.categories?.categoryid
        var rs = response?.data?.cart?.filter((f) => f.job.jobid == job.jobid);
        testtotal: rs[0]?.total
        // this.setState({ offerTotalPrice: rs[0]?.total })
        // console.log("testtotal", testtotal);
        // this.handleCategory(catID)

      })
      .catch((e) => console.log("Err", e));

    if (job.selected) job.t_price = testtotal
    else job.t_price = 0;

    if (job.selected) this.addRemoveIntoSelectedServices(job, true);
    else this.addRemoveIntoSelectedServices(job, false);
  };

  selectJob = (job) => {
    // console.log("job---->", job)
    job.selected = !job.selected;
    job.items = 1;
    let testtotal = 0;

    axios
      .post("http://app.xn--mgbt1ckekl.com/api/cu/v.3/app/add_cart", {
        job_id: job.jobid,
        // qty: job.selected == true ? job.offer_qty : 1,
        qty: job.items,

      })
      .then((response) => {


        console.log("add cart response", response)
        if (response.data.cart.length < 1) {
          alert("something went wrong")
          this.addRemoveIntoSelectedServices(job, false)
          return
        }
        else {
          let catID = response.data.cart[0].categories.categoryid
          var rs = response.data.cart.filter((f) => f.job.jobid == job.jobid);
          // console.log("selectabe- response---->", rs);
          testtotal = rs[0].total;
          // this.handleCategory(catID)

        }

        // console.log("testtotal", testtotal);
      })
      .catch((e) => console.log("Err", e));

    // Add it if need price from backend
    // setTimeout(() => {
    //   job.t_price = testtotal;
    //   console.log("job.tprice", job.t_price);
    //   if (job.selected) this.addRemoveIntoSelectedServices(job, true);
    //   else this.addRemoveIntoSelectedServices(job, false);
    // }, 1000);
    // console.log("testtotal", testtotal)

    if (job.selected) job.t_price = job.saleprice ? job.saleprice : job.price;
    else job.t_price = 0;

    if (job.selected) this.addRemoveIntoSelectedServices(job, true);
    else this.addRemoveIntoSelectedServices(job, false);
  };
  addRemoveIntoSelectedServices = async (job, add) => {
    let catIndex = this.state.categories.findIndex(
      (cat) => cat.categoryid == this.state.selectedCategoryId
    );
    // let cartIndex = this.state.cartDetails
    //   ? this.state.cartDetails.findIndex(
    //       cartService =>
    //         cartService.serviceId ==
    //         this.state.categories[this.state.selectedCategoryId].id
    //     )
    //   : -1;
    // if (cartIndex !== -1) {
    //   this.state.cartDetails[cartIndex].jobs.push(job);
    // } else {
    //   let array = this.state.cartDetails;
    //   let data = {
    //     serviceId: this.state.categories[index].id,
    //     serviceName: this.state.categories[index].name,
    //     serviceIcon: this.state.categories[index].seo_name,
    //     jobs: [job]
    //   };
    //   array.push(data);
    //   this.setState({ cartDetails: data });
    // }
    job.serviceId = this.state.categories[catIndex].categoryid;

    let allServices =
      this.state.selectedServices && this.state.selectedServices.length > 0
        ? this.state.selectedServices
        : ([] = []);
    //Change Here
    // console.log("asss", allServices);
    let index =
      allServices && allServices.length > 0
        ? allServices.findIndex((service) => service.serviceid === job.jobid)
        : -1;

    if (add === false && job.items > 0) {
      allServices.splice(index, 1);
      this.setState({ selectedServices: allServices });
    }
    if (add === true) {
      if (job.items < 1) {
        allServices.splice(index, 1);

        this.setState({
          selectedServices: allServices,
        });
      } else {
        if (index > -1) {
          allServices[index] = job;
          //console.log("Goes to ifeee");
        } else {
          //console.log("Goes to elseee");
          allServices.push(job);
        }
        this.setState({
          selectedServices: allServices,
        });
      }
      await AsyncStorage.setItem("jobs", JSON.stringify(allServices));
      this.setState({ addCartLoader: false })
      //console.log("allservice", allServices);
    }
  };
  openChat = () => {
    Linking.openURL("https://wa.me/+966593471675"); //966577311430 +966 57 843 4985 +966530576063
  };
  getOffers = () => {
    axios
      .get(
        "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/get_banners",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // console.log("get offers success");
        let responseJson = response.data;

        let ban = ([] = []);
        let urls = ([] = []);
        ban =
          this.state.lan === "en"
            ? responseJson.banners.enbanners
            : responseJson.banners.arbanners;
        ban.forEach((ban) => {
          let actualUrl =
            "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/" +
            ban.banner.url;
          urls.push(actualUrl);
        });
        // console.log(" data source ", ban);
        if (this.state.lan == "en") {
          //banner change
          this.setState({ dataSource: AcOffersDataEng, offersUrls: urls });
          // this.state.bannersDetailList &&
          //   this.setState({
          //     dataSource: this.state.bannersDetailList,
          //     offersUrls: urls,
          //   });
        } else {
          this.setState({ dataSource: AcOffersData_ar, offersUrls: urls });
        }
      })
      .catch(async (error) => {
        // console.log("error in get offers", error);
        await Analytics.logEvent("getOffersError", {
          getOffersError: error.toString(),
        });
      });
  };
  toggleSwitch = (value) => {
    this.setState({ isEnabled: !this.state.isEnabled });
  };
  categorySelection = async (category) => {
    if (this.state.showAllCategory) {
      this.setState({
        scrollValue: null,
        showAllCategory: false,
        selectedCategoryId: category.categoryid,
        products: category.services,
      })
    }
    else {
      console.log("category.categoryid", category.categoryid)
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
  // categorySelection = async (category) => {
  //   this._jobsList.scrollToIndex({ animated: true, index: category.index + '' })
  //   this.setState({
  //     selectedCategoryId: category.categoryid,
  //     products: category.services,
  //     toolTipVisible: false,
  //   });
  // };
  getCategories = () => {

    axios
      .get("http://app.xn--mgbt1ckekl.com/api/cu/v.3/app", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(async (response) => {

        // console.log("category response", response)
        let categories = response.data.categories;
        // let newArray = [...categories, dataObject]

        this.setState({
          categories: categories,
          // categories: newArray,
          // deals: responseJson.offers,
          freshCategories: categories,
          products: categories[0].services,
          selectedCategoryId: null,
          filteredCategoryArray: categories
        });
        this.handlePressAllFirstTime()
        // () => {
        //   setTimeout(() => {
        //     this.setState({ loading: false });
        //   }, 650);
        // };
      });

    this.setState({ loading: false });
  };

  clearJobs = async () => {
    let jobs = await AsyncStorage.getItem("jobs");
    let user = await AsyncStorage.getItem("user");
    if (jobs == null) {
      this.setState({
        selectedServices: [],
        user: user !== null ? JSON.parse(user) : null,
      });
      this.getCategories();
    }
    let allJobs = JSON.parse(jobs);

    if (allJobs?.length > 0) {
      this.state.categories.forEach((category) => {
        category.products.forEach((product) => {
          product.jobs.forEach((job) => {
            let index = allJobs.findIndex(
              (j) =>
                j.id == job.id && j.selected == true && job.selected == true
            );
            if (index == -1) {
              job.selected = false;
              job.items = 0;
              job.t_price = 0;
            }
          });
        });
      });
    }
    this.setState({ selectedServices: jobs !== null ? JSON.parse(jobs) : [] });
  };
  navigationSetup = async (option) => {
    if (option == 4) {
      this.props.navigation.navigate("ProfileSecreen", {
        cartItem: this.state.selectedServices.length,
        lan: this.state.lan,
        location: this.state.location,


      });
    }
    if (option == 3) {
      if (this.state.selectedServices.length > 0) {
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
      } else {
        Toast.show({
          text:
            this.state.lan == "en" ? "Your cart is empty" : "سلة الطلبات فارغة",
          position: "bottom",
        });
      }
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
    // this.props.navigation.replace("LandingSecreen");
    // setTimeout(() => {
    //   Updates.reload();
    // }, 1000);
    await Updates.reloadAsync();
    //this.updateLanguage(1);
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
    // console.log("index", index);
    // console.log("banner Detail", this.state.bannersDetailList);
    // console.log(" promotion screen ", this.state.bannersDetailList[index]);
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
  consoleNotificationFirebase = async (notification) => {
    if (notification.request.content.data) {
      await Analytics.logEvent("notificationRecieved", {
        notificationRecieved:
          "notification valid" + this.state.user?.name.toString(),
      })
        .then((response) => {
          console.log("success firebase analytics  ", response);
        })
        .catch((error) => {
          console.log("ERRor firebase analytics  ", error);
        });
    } else {
      await Analytics.logEvent("notificationRecieved", {
        notificationRecieved:
          "notification Not valid" + this.state.user?.name.toString(),
      })
        .then((response) => {
          console.log("success firebase analytics  ", response);
        })
        .catch((error) => {
          console.log("ERRor firebase analytics  ", error);
        });
      await Analytics.logEvent("notificationRecieved_error", {
        notificationRecieved_error:
          "notification Not valid" + this.state.user?.name.toString(),
      })
        .then((response) => {
          console.log("success firebase analytics  ", response);
        })
        .catch((error) => {
          console.log("ERRor firebase analytics  ", error);
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
    axios.get(`http://app.xn--mgbt1ckekl.com/api/cu/v.3/app/job/${jobId}`)
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
    this.setState({ showAllCategory: !this.state.showAllCategory })
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
  handleScrollListener = (value) => {
    if (this.state.showAllCategory) {
      if (value < 530 + this.state.yLengthLimit) {
        this.setState({ scrollValue: 0 })
        this._jobsList.scrollToIndex({ index: 0 })
      }
      else if (value > 530 + this.state.yLengthLimit && value < 1450 + this.state.yLengthLimit) {
        this.setState({ scrollValue: 1 })
        this._jobsList.scrollToIndex({ index: 1 })
      }
      else if (value > 1450 + this.state.yLengthLimit && value < 2250 + this.state.yLengthLimit) {
        this.setState({ scrollValue: 2 })
        this._jobsList.scrollToIndex({ index: 2 })
      }
      else if (value > 2250 + this.state.yLengthLimit && value < 2850 + this.state.yLengthLimit) {
        this.setState({ scrollValue: 3 })
        this._jobsList.scrollToIndex({ index: 3 })
      }
      else if (value > 2850 + this.state.yLengthLimit && value < 3500 + this.state.yLengthLimit) {
        this.setState({ scrollValue: 4 })
        this._jobsList.scrollToIndex({ index: 4 })
      }
      else if (value > 3500 + this.state.yLengthLimit && value < 3800 + this.state.yLengthLimit) {
        this.setState({ scrollValue: 5 })
        this._jobsList.scrollToIndex({ index: 5 })
      }
      else if (value > 3800 + this.state.yLengthLimit && value < 4200 + this.state.yLengthLimit) {
        this.setState({ scrollValue: 6 })
        this._jobsList.scrollToIndex({ index: 6 })
      }
      else if (value > 4200 + this.state.yLengthLimit && value < 4350 + this.state.yLengthLimit) {
        this.setState({ scrollValue: 7 })
        this._jobsList.scrollToIndex({ index: 7 })
      }
      else if (value > 4350 + this.state.yLengthLimit && value < 4520 + this.state.yLengthLimit) {
        this.setState({ scrollValue: 8 })
        this._jobsList.scrollToIndex({ index: 8 })
      }
      else if (this.state.categories.length > 9 && value > 4520 + this.state.yLengthLimit) {
        this.setState({ scrollValue: 9 })
        this._jobsList.scrollToIndex({ index: 9 })
      }
    }
  }

  render() {
    // console.log("product", this.state.products?.length)
    return (
      <Container style={{ marginTop: StatusBar.height }}>
        <StatusBar barStyle={Platform.OS == "ios" ? "dark-content" : "default"} />
        {/* <AllVideos
          visible={this.state.popup}
          lan={this.state.lan}
          selectedItem={0}
          openVideoPlayer={(index) => {
            this.setState({
              videoSelected: index,
              popup: false,
              videoPopup: true,
            });
          }}
          setPopupfalse={() => {
            this.setState({ popup: false });
          }}
        />
        <VideoPlayerPopup
          visible={this.state.videoPopup}
          lan={this.state.lan}
          selectedItem={this.state.videoSelected}
          setPopupfalse={() => {
            this.setState({ videoPopup: false });
          }}
        /> */}
        <View
          style={styles.innerContainer}
        >
          {
            <NavigationEvents
              onWillFocus={() => {
                this.clearJobs();
                this.setState({ calledFromCatgScreen: false })
              }}
            />
          }

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

          <View style={styles.headingContainer}>
            {this.state.lan == "en" ?
              <Text style={{ color: "#0764af", fontSize: 14, fontFamily: "montserrat_extraBold" }}>
                {this.state.user ? "Which service you need, " + this.state.user.name + "?" : "Which service you need?"}</Text>

              : <Text style={{ color: "#0764af", fontSize: 12, fontFamily: "montserrat_arabic_semibold" }}>
                {this.state.user ? "اي خدمة تريدها, " + this.state.user.name + "؟" : "اي خدمة تريدها؟"}</Text>
            }
          </View>

          {/* <ScrollView
            // ref={(s) => (this._anScrollView = s)}
            // scrollEventThrottle={16}
            stickyHeaderIndices={[2]}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews
          // onScroll={Animated.event(
          //   [{ nativeEvent: { contentOffset: { y: this.nScroll } } }],
          //   {
          //     useNativeDriver: true,
          //     listener: (e) => {
          //       this.setState({ offsetYValue: e.nativeEvent.contentOffset.y })
          //       this.handleScrollListener(e.nativeEvent.contentOffset.y)
          //     }
          //   }
          // )}
          // style={{ zIndex: 0 }}
          >

            <View style={{ marginTop: 10, marginBottom: 12, minHeight: scaleSize(80) }}> */}
          <>
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
            <View
              style={{
                width: Dimensions.get("screen").width - 30,
                alignSelf: "center",
              }}
            >
              <FlatList
                data={this.state.deals}
                horizontal={true}
                renderItem={({ item }) => (
                  <Deals
                    deal={item}
                    navigation={this.props.navigation}
                    lan={this.state.lan}
                  />
                )}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
              />
            </View>
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
                  paddingleft: this.state.showAllCategory ? scaleSize(10) : 0, width: Dimensions.get("screen").width - 65,
                }}>
                  <Animated.FlatList
                    ref={c => this._jobsList = c}
                    initialScrollIndex={0}
                    horizontal={true}
                    // contentContainerStyle={{ backgroundColor: "green", paddingLeft: 80 }}
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
                    keyExtractor={(item) => item.id}
                  />
                </View>
              </View>
            </Animated.View>
            {this.state.categories && <CategoryIndicator
              dataArray={this.state.categories}
              selectedCategoryId={this.state.selectedCategoryId} />
            }
          </>
          {this.state.showAllCategory ?

            this.state.selectedCategoryId == 22 ?
              this._renderManualSelection()
              :
              <FlatList
                // stickyHeaderIndices={[1]}
                // ListHeaderComponent={() => {
                //   return <>
                //     <View style={{ marginTop: 10, borderRadius: 20, marginBottom: scaleSize(20) }}>
                //       {this.state.enBannersList && (
                //         <SliderBox
                //           // images={this.state.lan == "en" ? AcBanners : AcBanners_ar}
                //           // images={this.state.offersUrls}
                //           images={
                //             this.state.lan == "en"
                //               ? this.state.enBannersList
                //               : this.state.arBannersList
                //           }
                //           sliderBoxHeight={153}
                //           ImageComponentStyle={{
                //             width: widthPerc(98)
                //             // width: "100%",
                //           }}
                //           onCurrentImagePressed={(index) =>
                //             this.openPromotionScreen(index)
                //           }
                //           dotColor="#ff8a29"
                //           inactiveDotColor="#F5F5F5"
                //           paginationBoxVerticalPadding={20}
                //           autoplay
                //           resizeMode={"contain"}
                //           circleLoop={true}
                //         />
                //       )}
                //     </View>
                //     <View
                //       style={{
                //         width: Dimensions.get("screen").width - 30,
                //         alignSelf: "center",
                //       }}
                //     >
                //       <FlatList
                //         data={this.state.deals}
                //         horizontal={true}
                //         renderItem={({ item }) => (
                //           <Deals
                //             deal={item}
                //             navigation={this.props.navigation}
                //             lan={this.state.lan}
                //           />
                //         )}
                //         keyExtractor={(item) => item.id}
                //         showsHorizontalScrollIndicator={false}
                //       />
                //     </View>
                //     <Animated.View
                //       style={{
                //         zIndex: 1,
                //         transform: [{ translateY: this.tabY }],
                //         zIndex: 1,
                //         width: "100%",
                //         flexDirection: "row",
                //         backgroundColor: "white",
                //         width: Dimensions.get("screen").width - 30,
                //         alignSelf: "center",
                //         height: scaleSize(105),
                //       }}
                //     >
                //       <View style={{ flexDirection: "row" }}>
                //         {this.state.categories.length > 1 ?
                //           <TouchableOpacity style={{
                //             backgroundColor: this.state.showAllCategory ? "#0865b0" : "lightgray",
                //             paddingHorizontal: 4, width: widthPerc(8), borderRadius: 5, height: scaleSize(40),
                //             marginRight: 5,
                //             justifyContent: "center"
                //           }}
                //             onPress={this.handlePressAll}>
                //             <Text style={{
                //               color: this.state.showAllCategory ? "white" : "black",
                //               textAlign: "center", alignSelf: "center"
                //             }}>All</Text>

                //           </TouchableOpacity> : <></>}
                //         <View style={{
                //           paddingleft: this.state.showAllCategory ? scaleSize(10) : 0, width: Dimensions.get("screen").width - 65,
                //         }}>
                //           <Animated.FlatList
                //             ref={c => this._jobsList = c}
                //             initialScrollIndex={0}
                //             horizontal={true}
                //             // contentContainerStyle={{ backgroundColor: "green", paddingLeft: 80 }}
                //             showsHorizontalScrollIndicator={false}
                //             data={this.state.categories}
                //             renderItem={({ item, index }) => (
                //               <CategoryCard
                //                 showAllCategory={this.state.showAllCategory}
                //                 index={index}
                //                 scrollValue={this.state.showRentalService ? -1 : this.state.scrollValue}
                //                 category={item}
                //                 lan={this.state.lan}
                //                 categorySelection={this.categorySelection}
                //                 selectedCategoryId={this.state.showAllCategory ? -1 : this.state.selectedCategoryId}
                //                 location={this.state.location}
                //                 openVideoPopup={(item) => {
                //                   this.setState({ videoSelected: item }, () =>
                //                     this.setState({ videoPopup: true })
                //                   );
                //                 }}
                //                 item={index}
                //               />
                //             )}
                //             keyExtractor={(item) => item.id}
                //           />
                //         </View>
                //       </View>
                //     </Animated.View>
                //     {this.state.categories && <CategoryIndicator
                //       dataArray={this.state.categories}
                //       selectedCategoryId={this.state.selectedCategoryId} />
                //     }
                //   </>
                // }}
                onViewableItemsChanged={this.onViewableItemsChanged}
                // scrollEventThrottle={16}
                // ListHeaderComponent={this.CaregoryHeader}
                // ref={c => this._jobsList = c}
                // initialScrollIndex={0}
                data={this.state.categories}
                // getItemLayout={(data, index) => (
                //   { length: 50, offset: 50 * index, index }
                // )}
                renderItem={({ item, index }) => (
                  <View>
                    <View style={{ width: widthPerc(92.5), alignSelf: "center" }}>
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
                      <View
                      >
                        <Accordion
                          style={{ borderWidth: 0 }}
                          ref={(c) => (this._accordion = c)}
                          dataArray={item.services}
                          onAccordionOpen={() => this.handleExtraSpace(index)}
                          onAccordionClose={() => this.handleRemoveExtraSpace(index)}
                          renderHeader={this._renderHeader}
                          renderContent={this._renderContent}
                        />
                      </View>
                    }
                  </View>
                )}
                keyExtractor={(item, index) => index}
              /> : <>
              <Accordion
                style={{ borderWidth: 0 }}
                ref={(c) => (this._accordion = c)}
                dataArray={this.state.products}
                renderHeader={this.state.selectedCategoryId == 22 ? this._renderManualSelection : this._renderHeader}
                renderContent={this.state.selectedCategoryId == 22 ? null : this._renderContent}
              />
            </>}

          {!this.state.categories?.length > 0 && (
            <ActivityIndicator
              size="large"
              color={imageLoadingColor}
              style={{
                marginTop: scaleSize(40),
                position: "absolute",
                alignSelf: "center"
              }}
            />
          )}
          {/* </View>
          </ScrollView> */}
        </View>
        <Footer
          calledFromLanding={true}
          lan={this.state.lan}
          user={this.state.user}
          selectedServices={this.state?.selectedServices}
          navigationSetup={this.navigationSetup}
        />
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
    marginBottom: scaleSize(155),
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
  headingContainer: { width: widthPerc(90), alignSelf: "center", marginTop: 10, paddingHorizontal: 5, paddingBottom: 5 },
})
