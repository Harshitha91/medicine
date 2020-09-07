import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Text,
} from "react-native";
import { Agenda } from "react-native-calendars";
import { pushComplainTypeScreen } from "../navigation";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import { setState } from "actions";
import { Navigation } from "react-native-navigation";
import { PropertyListItem } from "../components/PropertyListItem";
import PlusButton from "components/ui/Fab";
import { Badge } from "react-native-elements";
import { moderateScale } from "util/sizes";
import withPreventDoubleClick from "../components/PreventDoubleClick";
import moment from "moment";

const Fab = withPreventDoubleClick(PlusButton);
const PropertyListItems = withPreventDoubleClick(PropertyListItem);

export default class Home extends React.Component {
  static defaultProps = {
    refreshing: false,
    sessionObject: {},
    properties: [],
    loaderProperty: true,
  };
  state = {
    filterString: "",
  };
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  handleRefresh(props) {
    const { setState, getProperties } = props;
    setState({ refreshing: true });
    getProperties();
    this.handleSearchInputChange("");
  }

  renderEmptyDate() {
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
  }

  render() {
    const { refreshing, properties, loaderProperty } = this.props;

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
              color="#032DFF"
            />
          ) : (
            <Agenda
              displayLoadingIndicator={false}
              dayLoading={false}
              items={{
                "2020-08-15": [{ name: "item 1 - any js object" }],
                "2020-08-16": [{ name: "item 2 - any js object", height: 80 }],
                "2020-09-02": [
                  { name: "Panadol", time: "9 PM" },
                  { name: "Zitracine", time: "10 PM" },
                ],
              }}
              selected={formatedCurrentDate}
              renderItem={(item, firstItemInDay) => {
                return (
                  <TouchableOpacity
                    onPress={() => {}}
                    style={[
                      styles.item,
                      { height: 80, backgroundColor: "green" },
                    ]}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontWeight: "700",
                          fontSize: 20,
                          color: "white",
                          paddingBottom: 2,
                        }}
                      >
                        {item.time}
                      </Text>

                      <View style={{ marginLeft: 15 }}>
                        <Text
                          style={{
                            fontWeight: "600",
                            fontSize: 15,
                            color: "white",
                            paddingBottom: 2,
                          }}
                        >
                          fsdfsdfsdf
                        </Text>
                        {/* <Text
                          style={{
                            fontWeight: "600",
                            fontSize: 12,
                            color: "white",
                            paddingBottom: 2,
                          }}
                        >
                          'fdgdfgdfgg'
                        </Text>
                        <Text
                          style={{
                            fontWeight: "400",
                            fontSize: 12,
                            color: "white",
                          }}
                        >
                          'fgdfgdfgfdgfdg'
                        </Text> */}
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
              // renderEmptyData={() => {
              //   return <View />;
              // }}
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

        <Fab onPress={this.addProperty} />
      </View>
    );
  }

  addProperty = () => {
    Navigation.push(this.props.componentId, {
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
  };
};
export const HomeContainer = connect(mapStateToProps, {
  setState,
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
