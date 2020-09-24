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
const theme = Style.get();

export const DoctorAppointmentsListItem = (props) => {
  const { data, onPress, name } = props;
  const tag = data.complainType;
  let badgeType;
  let badgeText;
  let badgeColor;
  let listColor = "";
  if (name == "All" && data.status == "pending") {
    listColor = "Pending";
  }
  switch (data.status) {
    case "completed":
      badgeType = "success";
      badgeText = "COMPLETED";
      badgeColor = "#69C31D";
      break;
    case "pending":
      badgeType = "success";
      badgeText = "PENDING";
      badgeColor = "#FFA726";
      break;
    case "inProgress":
      badgeType = "success";
      badgeText = "IN PROGRESS";
      badgeColor = "#FACF10";
      break;
    case "reOpen":
      badgeType = "success";
      badgeText = "RE OPEN";
      badgeColor = "#20C7EF";
      break;
    case "onHold":
      badgeType = "success";
      badgeText = "ON HOLD";
      badgeColor = "#D57350";
      break;
  }
  let SeveritybadgeType;
  let SeveritybadgeText;
  let SeveritybadgeColor;
  switch (data.severity) {
    case 1:
      SeveritybadgeType = "success";
      SeveritybadgeText = "Low";
      SeveritybadgeColor = "#A0D000";
      break;
    case 2:
      SeveritybadgeType = "success";
      SeveritybadgeText = "Medium";
      SeveritybadgeColor = "#FFC014";
      break;
    case 3:
      SeveritybadgeType = "success";
      SeveritybadgeText = "High";
      SeveritybadgeColor = "#F64A4A";
      break;
  }

  return (
    <TouchableOpacity
      key={data.id}
      style={styles.listItem}
      onPress={() => onPress(data)}
    >
      <View>
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
                    {data.doctor.firs_name + " " + data.doctor.last_name}
                  </Text>
                  <Text
                    style={{ marginTop: moderateScale(5), color: "#bcbcbc" }}
                  >
                    Date:{" "}
                    <Text style={{ color: "#000" }}>
                      {data.channeling_date}
                    </Text>
                  </Text>
                  <Text
                    style={{ marginTop: moderateScale(2), color: "#bcbcbc" }}
                  >
                    Channeling Center:{" "}
                    <Text style={{ color: "#000" }}>
                      {data.channeling_center.name}
                    </Text>
                  </Text>
                  <Text
                    style={{ marginTop: moderateScale(2), color: "#00adf5" }}
                  >
                    {data.special_comment}
                  </Text>
                  <View
                    style={{
                      alignItems: "flex-start",
                      marginTop: 4,
                      paddingLeft: 10,
                      marginBottom: 2,
                    }}
                  >
                    <Badge
                      status={data.status === "pending" ? "warning" : "success"}
                      containerStyle={{ marginTop: 5 }}
                      value={data.status}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
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
    elevation: 1,
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
