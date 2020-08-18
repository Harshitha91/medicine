// @flow
import { PixelRatio, Dimensions, Platform } from "react-native";

const devicesDensity = PixelRatio.get();
const fontScale = PixelRatio.getFontScale();

export const normalize = (size) => {
  if (Platform.OS === 'android') {
    
    //TODO: Uncomment this correct normalize method.
    // if (fontScale) {
    //   return size * fontScale;
    // } else {
      if (devicesDensity === 1) {
        return size * 1.25;
      } else if (devicesDensity >= 2) {
        return size * 1.1;
      } else if (devicesDensity > 1 && devicesDensity < 2) {
        return size * 1;
      } else {
        return Number(size * devicesDensity);
      }
    // }

  } else if (Platform.OS === 'ios') {

    if (devicesDensity === 2) {
      return size * 1;
    } else if (devicesDensity === 3) {
      return size * 0.9;
    } else {
      return Number(size * devicesDensity);
    }

  }
};

export const normalizeImage = (size) => {
  return PixelRatio.getPixelSizeForLayoutSize(size);
};

const { width, height } = Dimensions.get("window");
//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 400;
const guidelineBaseHeight = 700;

const scale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale };
