import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import Style from "styles";
import Text from "components/ui/Text";
import { moderateScale, normalize } from "util/sizes";
import Icon from "react-native-vector-icons/MaterialIcons";
import Badge from "components/ui/Badge";
import { CachedImage } from "react-native-cached-image";
import { localTime } from "../../helpers/datetimeHelper";
import { imageBucket } from "../../../config";
import withPreventDoubleClick from "../components/PreventDoubleClick";
const theme = Style.get();

export const DoctorListItem = (props) => {
  const { data, onPress } = props;

  return (
    <TouchableOpacity
      key={data.id}
      style={styles.listItem}
      onPress={() => onPress(data)}
    >
      <View style={{ flexDirection: "column" }}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 80 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "stretch",
                paddingLeft: moderateScale(10),
                paddingTop: 5,
              }}
            >
              <View style={{ top: moderateScale(0) }}>
                <Text
                  type="bold"
                  numberOfLines={2}
                  style={{
                    color: "rgb(67,67,67)",
                    fontSize: 20,
                    marginRight: 10,
                  }}
                >
                  {data.firs_name + " " + data.last_name}
                </Text>
                {/* <Text style={{ marginTop: moderateScale(2), color: "#bcbcbc" }}>
                  Preferred Name:{" "}
                  <Text style={{ color: "#000" }}>{data.preferred_name}</Text>
                </Text> */}
              </View>
            </View>
          </View>
          {/* <Badge
            value={"Count:" + data.available_count}
            status="primary"
            containerStyle={{ position: "absolute", top: 30, right: 4 }}
          /> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

generateCid = (cid) => {
  var hash = 0;
  var i = 0;

  if (cid.length == 0) {
    return hash;
  }
  for (i; i < cid.length; i++) {
    char = cid.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
};

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: theme.componentBackground.listItem,
    paddingTop: moderateScale(2),
    paddingBottom: moderateScale(25),
    paddingRight: moderateScale(10),
    borderRadius: moderateScale(5),
    marginBottom: 15,
    width: "91%",
    left: "4%",
    top: "6%",
    right: "2%",
    zIndex: 2,
  },
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    flexGrow: moderateScale(0.02),
    alignItems: "center",
    justifyContent: "center",
  },
  linkIcon: {
    justifyContent: "center",
    padding: moderateScale(3),
  },
  listItemText: {
    fontSize: normalize(theme.text.titleSize),
    color: theme.text.textColor,
  },
});
