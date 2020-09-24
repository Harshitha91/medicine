import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Text,
  Dimensions,
} from "react-native";
import { Agenda } from "react-native-calendars";
import { pushComplainTypeScreen } from "../navigation";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import { Navigation } from "react-native-navigation";
import { PropertyListItem } from "../components/PropertyListItem";
import CallButton from "components/ui/CallButton";
import { CheckBox } from "react-native-elements";
import { moderateScale } from "util/sizes";
import withPreventDoubleClick from "../components/PreventDoubleClick";
import moment from "moment";
import { setState, getScheduleCalandar, updateTakenStatus } from "actions";
const window = Dimensions.get("window");
const { height, width } = window;

const Fab = withPreventDoubleClick(CallButton);
const PropertyListItems = withPreventDoubleClick(PropertyListItem);

export default class Home extends React.Component {
  static defaultProps = {
    refreshing: false,
    sessionObject: {},
    data: [],
    loading: false,
  };
  state = {
    filterString: "",
    selectedDate: "",
  };
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  static get options() {
    return {
      topBar: {
        leftButtons: [
          {
            id: "menuBtn",
            icon: require("images/baseline_menu.png"),
            color: "black",
          },
        ],
      },
    };
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === "menuBtn") {
      Navigation.mergeOptions(this.props.componentId, {
        sideMenu: {
          left: {
            visible: true,
          },
        },
      });
    }
  }

  componentDidMount() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    today = yyyy + "-" + mm + "-" + dd;

    this.setState({ selectedDate: today });

    this.props.getScheduleCalandar(today);
  }

  handleRefresh(props) {
    const { setState, getProperties } = props;
    setState({ refreshing: true });
    getProperties();
    this.handleSearchInputChange("");
  }

  renderEmptyDate = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 100,
        }}
      >
        <Text
          style={{
            flex: 1,
            position: "absolute",
            fontSize: 25,
            color: "#636c72",
            fontWeight: "400",
            top: height / 2 - 150,
            textAlign: "center",
          }}
        >
          No Data {"\n"}Available
        </Text>
      </View>
    );
  };

  onClickCheckBox = (item, status) => {
    this.props.updateTakenStatus({
      frequency_id: item.id,
      status,
      date: this.state.selectedDate,
    });
  };

  renderItem = (item) => {
    return (
      <TouchableOpacity
        onPress={() => {}}
        style={[
          styles.item,
          { height: 110, backgroundColor: "#fff", flexDirection: "column" },
        ]}
      >
        {/* <View style={{ flexDirection: "row" }}> */}
        <Text
          style={{
            fontWeight: "700",
            fontSize: 20,
            color: "#121212",
            paddingBottom: 2,
          }}
        >
          {item.time}
        </Text>

        {/* <View style={{ marginLeft: 15 }}> */}
        <Text
          style={{
            fontWeight: "600",
            fontSize: 15,
            color: "#393939",
            paddingBottom: 2,
          }}
        >
          {item.name}
        </Text>
        {/* </View> */}
        {/* </View> */}
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            left
            containerStyle={{
              backgroundColor: "transparent",
              borderWidth: 0,
              // marginTop: 30,
            }}
            title="Took"
            textStyle={{ color: "#4c852b" }}
            checked={item.status === "completed"}
            uncheckedColor={"#4c852b"}
            checkedColor={"#4c852b"}
            onPress={() => this.onClickCheckBox(item, "completed")}
          />
          <CheckBox
            right
            containerStyle={{
              backgroundColor: "transparent",
              borderWidth: 0,
              // marginTop: 30,
              // marginRight: 100,
            }}
            textStyle={{ color: "#9e2217" }}
            title="Missed"
            checked={item.status === "missed"}
            uncheckedColor={"#9e2217"}
            checkedColor={"#9e2217"}
            onPress={() => this.onClickCheckBox(item, "missed")}
          />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { refreshing, properties, loaderProperty, data } = this.props;
    console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII ", data);

    let formatedCurrentDate = moment(new Date()).format("YYYY-MM-DD");

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FFFFFF",
        }}
      >
        <View style={{ flex: 1, height: "100%", marginTop: 10 }}>
          {false ? (
            <ActivityIndicator
              animating={true}
              style={true && { height: 80 }}
              size="large"
              color="#00adf5"
            />
          ) : (
            <Agenda
              displayLoadingIndicator={false}
              dayLoading={false}
              // items={{
              //   "2020-08-15": [{ name: "item 1 - any js object" }],
              //   "2020-08-16": [{ name: "item 2 - any js object", height: 80 }],
              //   "2020-09-02": [
              //     { name: "Panadol", time: "9 PM" },
              //     { name: "Zitracine", time: "10 PM" },
              //   ],
              // }}
              onDayPress={(day) => {
                console.log("++++++++++++++++++++++++++++++++", day);
                this.setState({ selectedDate: day.dateString });
                this.props.getScheduleCalandar(day.dateString);
              }}
              onDayChange={(day) => {
                this.setState({ selectedDate: day.dateString });
                this.props.getScheduleCalandar(day.dateString);
              }}
              items={data}
              selected={formatedCurrentDate}
              renderItem={this.renderItem}
              renderEmptyData={this.renderEmptyDate}
              // rowHasChanged={(r1, r2) => {
              //   return r1.text !== r2.text;
              // }}
              onRefresh={() => console.log("refreshing...")}
              refreshing={false}
              // theme={{
              //   "stylesheet.calendar.header": {
              //     monthText: { marginTop: 3, fontWeight: "200" },
              //   },
              // }}
            />
          )}
        </View>
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Badge
            status="success"
            containerStyle={{ paddingLeft: 10, marginBottom: 10 }}
          />
          <Badge
            status="error"
            containerStyle={{ paddingLeft: 10, marginBottom: 10 }}
          />
          <Badge
            status="warning"
            containerStyle={{ paddingLeft: 10, marginBottom: 10 }}
          />
        </View> */}
      </View>
    );
  }

  addProperty = () => {
    Navigation.push("CenterStack", {
      component: {
        name: "AddMedicine",
        options: {
          topBar: {
            visible: true,
            height: moderateScale(60),
            topMargin: 15,
            borderHeight: 0,
            elevation: 0,
            title: {
              alignment: "center",
              text: "Add Medicine",
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
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    sessionObject: state.app.sessionObject,
    refreshing: state.app.refreshing,
    loaderProperty: state.app.loaderProperty,
    data: state.home.data,
    loading: state.home.loading,
  };
};
export const HomeContainer = connect(mapStateToProps, {
  setState,
  getScheduleCalandar,
  updateTakenStatus,
})(Home);

let styles;
if (Platform.OS === "android") {
  styles = StyleSheet.create({
    search: {
      borderRadius: 40,
      elevation: 2,
      marginLeft: "4.5%",
      marginRight: "4.5%",
      marginTop: 20,
      height: 42,
    },
    item: {
      backgroundColor: "green",
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginLeft: 10,
      marginTop: 20,
    },
  });
} else if (Platform.OS === "ios") {
  styles = StyleSheet.create({
    search: {
      backgroundColor: "#FFFFFF",
      marginLeft: "2%",
      marginRight: "2%",
    },
    searchInput: {
      shadowOffset: { width: 3, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      backgroundColor: "#FFFFFF",
      borderRadius: 40,
      marginTop: -8,
      height: 42,
    },
  });
}

//#00adf5
