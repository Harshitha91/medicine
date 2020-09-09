import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

const headerHeight = 150;
const textHeight = 15;

export const MenuHeader = (props) => {
  const { fullName } = props;

  const { mainContainer, imageContainer, textContainer, textStyle } = styles;
  return (
    <View style={mainContainer}>
      <View style={imageContainer}>
        <Image
          style={{ flex: 1, height: undefined, width: undefined }}
          resizeMode={"cover"}
          source={require("images/sample-user.png")}
          // source={{ uri: imageP }}
        />
      </View>
      <View style={textContainer}>
        <Text numberOfLines={1} style={textStyle}>
          {fullName}
        </Text>
      </View>
      <View
        style={{
          height: 0.6,
          width: "100%",
          backgroundColor: "#B1B6BA", //'#bdc3c7'
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: headerHeight,
    // backgroundColor: 'gray',
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 1 / 1,
    overflow: "hidden",
    marginTop: 15,
    borderRadius: (headerHeight - 60) / 2,
    borderWidth: 3,
    borderColor: "#032DFF",
  },
  textContainer: {
    // flex: 1,
    height: textHeight,
    margin: 15,
  },
  textStyle: {
    fontSize: 14,
    fontWeight: "300",
  },
});
