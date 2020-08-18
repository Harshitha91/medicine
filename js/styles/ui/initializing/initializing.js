import { StyleSheet, Dimensions, Platform } from "react-native";
import { moderateScale, verticalScale } from "../../../util/sizes";

const styles = StyleSheet.create({
  firstContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    flex: 0,
    // justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    height: '100%',
    flexDirection: 'column'
  },
  logoArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    marginTop: verticalScale(50),
    width: moderateScale(210),
    height: verticalScale(50),
  },

  textArea: {
    // alignItems: "center",
    justifyContent: "center",
    marginTop: moderateScale(30),
    height: Platform.OS === 'android' ? '28%' : '45%'
  },

  button: {
    height: 48,
    width: '80%',
    backgroundColor: '#ff2020',
    shadowColor: 'rgba(0, 0, 0, 0.77)',
    shadowOffset: {
      width: 0,
      height: 1.3
    },
    shadowRadius: 6.7,
    shadowOpacity: 1,
    borderRadius: 24,
  },
  buttonSection: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20%',
    marginBottom: '20%'
  }
});

export default styles;