import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Button,
  Text,
  View,
  Platform,
} from "react-native";
import { moderateScale, normalize } from "util/sizes";
import Icon from "react-native-vector-icons/MaterialIcons";

export const ComplainTypeListItem = ({
  data,
  keyIndex,
  removeTime,
  onPress,
  isPropertyUpdate,
}) => {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <TouchableOpacity
        key={keyIndex}
        style={styles.listItem}
        onPress={() => onPress(data)}
      >
        <Text style={styles.listItemText}>{data.time}</Text>
        {isPropertyUpdate && !data.hasComplain && (
          <View style={styles.btnArea}>
            {Platform.OS === "android" && (
              <Icon
                name="clear"
                size={25}
                color="#00adf5"
                onPress={() => removeTime(keyIndex)}
                style={styles.clearBtn}
              />
            )}
          </View>
        )}
        {!isPropertyUpdate && (
          <View style={styles.btnArea}>
            <Icon
              name="clear"
              size={25}
              color="#00adf5"
              onPress={() => removeTime(keyIndex)}
              style={
                Platform.OS === "android"
                  ? styles.clearBtn
                  : { paddingBottom: 1 }
              }
            />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem:
    Platform.OS === "android"
      ? {
          // flex: 1,
          // flexDirection: 'row',
          // alignItems:'center',
          // backgroundColor: '#fdfdfd',
          // height: moderateScale(30),
          // paddingLeft: moderateScale(12),
          // paddingRight: moderateScale(10),
          // paddingTop: moderateScale(20),
          // paddingBottom: moderateScale(10),
          // marginBottom: moderateScale(2),
          // borderRadius : moderateScale(10),
          // width: '96%',
          // left: '2%',
          // right: '2%',
          // zIndex: 0,
          // top: '20%',
          // elevation: 1

          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#fdfdfd",
          height: moderateScale(40),
          paddingLeft: moderateScale(12),
          paddingRight: moderateScale(10),
          paddingTop: moderateScale(20),
          paddingBottom: moderateScale(10),
          marginBottom: moderateScale(2),
          borderRadius: moderateScale(10),
          elevation: 1,
        }
      : {
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#fdfdfd", //fdfdfd
          height: moderateScale(40),
          width: moderateScale(10),
          paddingLeft: moderateScale(12),
          paddingRight: moderateScale(10),
          paddingTop: moderateScale(20),
          paddingBottom: moderateScale(10),
          marginBottom: moderateScale(12),
          marginLeft: moderateScale(12),
          marginRight: moderateScale(12),
          borderRadius: moderateScale(10),
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
        },
  listItemText: {
    fontSize: normalize(14) + 2,
    color: "#000000",
    paddingBottom:
      Platform.OS === "android" ? moderateScale(6) : moderateScale(25),
  },
  btnArea:
    Platform.OS === "android"
      ? {
          flex: 1,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }
      : {
          flex: 1,
          flexDirection: "row",
          alignItems: "flex-end",
          paddingBottom: moderateScale(10),
          justifyContent: "flex-end",
          height: moderateScale(29),
        },
  badgeStyle: {
    width: moderateScale(25),
    height: moderateScale(25),
  },
  badgeContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
    right: -4,
  },
});
