import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { connect } from "react-redux";
import { setState } from "actions";
import { MenuHeader } from "../components/MenuHeader";
import { Navigation } from "react-native-navigation";
import DropdownAlert from "react-native-dropdownalert";
import { moderateScale, verticalScale } from "util/sizes";
import Text from "components/ui/Text";
import withPreventDoubleClick from "screens/components/PreventDoubleClick";

export default class Slider extends React.Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  renderHeader = () => <MenuHeader fullName={"Thiraj Hassen"} />;

  renderListItem = (item) => {
    let imagePath =
      item.key === "Doctor"
        ? require("images/doctor.png")
        : item.key === "Lab"
        ? require("images/lab.png")
        : require("images/careGiver.png");
    return (
      <TouchableOpacity onPress={() => this.onTapMenuCell(item)}>
        <View style={styles.mainContainer}>
          <Image
            style={styles.imageStyle}
            resizeMode={"cover"}
            source={imagePath}
          />
          <Text numberOfLines={1} style={styles.textStyle}>
            {item.key}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  onTapMenuCell = (item) => {
    console.log("111111111111111111111111111111111111111111111111", item);
    // this.props.navigation.closeDrawer();
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          visible: false,
        },
      },
    });
    switch (item.key) {
      case "Lab":
        this.navigate("LabAppointmentsList", "Lab Appointments");
        break;
      case "Doctor":
        this.navigate("DoctorAppointmentsList", "Doctor Appointments");
        break;
      case "Care Giver":
        this.navigate("CareGiverList", "Care Giver List");
        break;
      default:
        break;
    }
  };

  navigate = (screen, title) => {
    console.log(
      "11111111111111111111111111111111111111111111111122",
      screen,
      title
    );

    Navigation.push("CenterStack", {
      component: {
        name: screen,
        options: {
          topBar: {
            visible: true,
            height: moderateScale(60),
            topMargin: 15,
            borderHeight: 0.5,
            elevation: 0,
            title: {
              alignment: "center",
              text: title,
              fontSize: 25,
              fontFamily: "Ubuntu-Bold",
            },
            backButton: {
              showTitle: false,
            },
            background: {
              color: "#FFFFFF",
            },
          },
        },
      },
    });
    console.log("3333333333333333333333333333333333333333333333333");
  };

  render() {
    const { refreshing, properties, toastMessage } = this.props;

    return (
      <View style={styles.containerStyle}>
        <View style={{ height: "100%" }}>
          <FlatList
            ListHeaderComponent={this.renderHeader}
            // ItemSeparatorComponent={this.renderSeparator}
            data={[
              { id: 0, key: "Lab" },
              { id: 2, key: "Doctor" },
              { id: 3, key: "Care Giver" },
            ]}
            renderItem={({ item }) => this.renderListItem(item)}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    sessionObject: state.app.sessionObject,
    toastMessage: state.app.toastMessage,
  };
};
export const SliderContainer = connect(mapStateToProps, {
  setState,
})(Slider);

const styles = StyleSheet.create({
  containerFirst: {
    flex: 1,
  },
  containerStyle: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  baseText: {
    fontSize: 20,
    marginBottom: verticalScale(10),
    marginTop: verticalScale(5),
    color: "black",
    textAlign: "center",
  },
  titleText: {
    fontSize: 15,
    color: "black",
    textAlign: "center",
  },
  userImg: {
    marginTop: verticalScale(100),
    width: moderateScale(260),
    height: verticalScale(150),
    marginBottom: verticalScale(50),
    flex: 1,
  },
  mainContainer: {
    // flex: 1,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  imageStyle: {
    // flex: 1,
    height: 45 * 0.6,
    width: 45 * 0.6,
    // overflow: 'hidden',
    // aspectRatio:1,
    margin: 15,
  },
  textStyle: {
    flex: 1,
    fontWeight: "400",
    color: "#343145",
    fontSize: 14,
  },
});
