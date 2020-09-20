import React from "react";
import {
  View,
  StyleSheet,
  Platform,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import { setState, getScheduleList } from "actions";
import { SearchBar } from "react-native-elements";
import { Navigation } from "react-native-navigation";
import { DEFAULT_NUMBER_OF_ROWS } from "constant";
import Tabs from "components/ui/Tabs";
import { moderateScale, verticalScale } from "util/sizes";
import DropdownAlert from "react-native-dropdownalert";
import debounce from "lodash/debounce";
import { ScheduleListItem } from "screens/components/ScheduleListItem";
import PlusButton from "components/ui/Fab";
const Fab = withPreventDoubleClick(PlusButton);
import _ from "lodash";

export default class ScheduleHistory extends React.Component {
  static defaultProps = {
    isFetching: false,
    selectedTabIndex: 0,
    sessionObject: {},
    scheduleList: [],
    refreshing: true,
    loaderComplain: true,
    isFetchingMoreComplains: false,
    complainFilterString: "",
  };

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

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  componentDidMount() {}

  componentDidAppear() {
    console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK");
    this.props.getScheduleList();
  }

  renderFooter = () => {
    return this.props.isFetchingMoreComplains ? (
      <ActivityIndicator
        animating={true}
        style={true && { height: 80 }}
        size="large"
        color="#032DFF"
      />
    ) : null;
  };

  render() {
    let data = [
      {
        id: "3423434",
        date: "2020-09-09",
        time: "9 PM",
        name: "Panadol",
        count: 2,
        isTaken: false,
      },
      {
        id: "3423435",
        date: "2020-09-09",
        time: "10 PM",
        name: "Zitrocin",
        count: 1,
        isTaken: true,
      },
    ];
    const { toastMessage } = this.props;

    return (
      <View style={styles.containerStyle}>
        <View style={styles.wrapper}>
          <FlatList
            contentContainerStyle={{ paddingBottom: 12 }}
            data={this.props.scheduleList}
            extraData={this.state}
            keyExtractor={(item) => item.complainsId}
            renderItem={({ item }) => (
              <ScheduleListItem
                data={item}
                toastMessage={toastMessage}
                onPress={() => this.onItemClick(item)}
                name={"cccc"}
              />
            )}
            refreshing={false}
            // onRefresh={this.handleRefresh}
            // onEndReached={this.handleLoadMore}
            // onEndReachedThreshold={0.5}
            ListFooterComponent={this.renderFooter}
          />
        </View>
        <DropdownAlert ref={(ref) => (this.dropdown = ref)} showCancel={true} />
        <Fab onPress={this.createSchedule} />
      </View>
    );
  }

  createSchedule = () => {
    Navigation.push("CenterStack", {
      component: {
        name: "CreateSchedule",
        options: {
          topBar: {
            visible: true,
            height: moderateScale(60),
            topMargin: 15,
            borderHeight: 0,
            elevation: 0,
            title: {
              alignment: "center",
              text: "Create Schedule",
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
    toastMessage: state.app.toastMessage,
    refreshing: state.app.refreshing,
    scheduleList: state.schedule.list,
  };
};
export const ScheduleHistoryContainer = connect(mapStateToProps, {
  setState,
  getScheduleList,
})(ScheduleHistory);

let styles;
if (Platform.OS === "android") {
  styles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      marginTop: 10,
      backgroundColor: "#FFFFFF",
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    search: {
      borderRadius: 40,
      elevation: 2,
      marginLeft: "4.5%",
      marginRight: "4.5%",
      marginTop: 10,
      height: 42,
    },
    userImg: {
      marginTop: verticalScale(100),
      width: moderateScale(235),
      height: verticalScale(119),
      marginBottom: verticalScale(50),
      flex: 1,
    },
    baseText: {
      fontSize: 20,
      marginBottom: verticalScale(10),
      marginTop: verticalScale(20),
      color: "black",
      textAlign: "center",
    },
    titleText: {
      fontSize: 15,
      color: "black",
      textAlign: "center",
    },
    logoArea: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "30%",
    },
    logo: {
      marginTop: verticalScale(17),
      width: moderateScale(190),
      height: verticalScale(60),
    },
    labelArea: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    contentContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexGrow: 1,
    },
  });
} else if (Platform.OS === "ios") {
  styles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      marginTop: 10,
      backgroundColor: "#FFFFFF",
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
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
