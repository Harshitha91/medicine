import { StyleSheet, Dimensions, Platform } from "react-native";
import Style from "styles";
import { moderateScale, normalize, verticalScale } from "util/sizes";
const theme = Style.get();

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "column"
  },
  overlay: {
    backgroundColor: "#00000080",
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"    
  },
  body: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 10,
    elevation: 5,
    flexDirection: "column"
  },
  header: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: moderateScale(18),
    borderBottomWidth: 1,
    borderBottomColor: theme.border.inputBorderColor
  },
  headerText: {
    fontSize: normalize(theme.text.xBigTitleSize),
    color: '#000000'
  },
  containerStyle: Platform.OS === 'android' ? {
    maxHeight: verticalScale(500),
    padding: moderateScale(16),
    width: '100%',   
  } : {
    maxHeight: verticalScale(250),
    padding: moderateScale(16),
  },
  componentArea: {
    width: "100%"
  },
  btnAreaFromEnd: {
    paddingTop: moderateScale(12),
    paddingBottom: moderateScale(12),
    flexDirection: "row",
    justifyContent: Platform.OS === 'android' ? "center" : "flex-end"
  },
  btnAreaFromStart: {
    paddingTop: moderateScale(12),
    paddingBottom: moderateScale(12),
    flexDirection: "row",
    justifyContent: "center"
  },
  btn: Platform.OS === 'android' ? {
    paddingTop: moderateScale(20),
    paddingBottom: moderateScale(20),
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(20),
    margin: moderateScale(10)
  } : {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(18),
    paddingTop: moderateScale(5),
    paddingBottom: moderateScale(0),
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(20),
  }
});

export default styles;
