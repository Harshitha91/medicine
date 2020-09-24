import React from "react";
import {
  View,
  StyleSheet,
  Platform,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import { setState, getMedicineList } from "actions";
import { SearchBar } from "react-native-elements";
import { Navigation } from "react-native-navigation";
import { DEFAULT_NUMBER_OF_ROWS } from "constant";
import Tabs from "components/ui/Tabs";
import { moderateScale, verticalScale } from "util/sizes";
import DropdownAlert from "react-native-dropdownalert";
import debounce from "lodash/debounce";
import PlusButton from "components/ui/Fab";
import withPreventDoubleClick from "screens/components/PreventDoubleClick";
const Fab = withPreventDoubleClick(PlusButton);
import { MedicineListItem } from "screens/components/MedicineListItem";
import _ from "lodash";

export default class MedicineList extends React.Component {
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
        rightButtons: [
          {
            id: "filterBtn",
            icon: require("images/orderMedicine.png"),
            color: "black",
          },
        ],
      },
    };
  }

  static defaultProps = {
    isFetching: false,
    selectedTabIndex: 0,
    sessionObject: {},
    medicines: [],
    refreshing: true,
    loaderComplain: true,
    isFetchingMoreComplains: false,
    complainFilterString: "",
  };

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    // this.dbounceItemClick = debounce(this.handleItemClick, 200);
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === "filterBtn") {
      Navigation.push("CenterStack", {
        component: {
          name: "OrderMedicine",
          options: {
            topBar: {
              visible: true,
              height: moderateScale(60),
              topMargin: 15,
              borderHeight: 0.5,
              elevation: 0,
              title: {
                alignment: "center",
                text: "Order Medicine",
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
    } else if (buttonId === "menuBtn") {
      Navigation.mergeOptions(this.props.componentId, {
        sideMenu: {
          left: {
            visible: true,
          },
        },
      });
    }
  }

  componentDidAppear() {
    this.props.getMedicineList();
  }

  renderFooter = () => {
    return this.props.isFetchingMoreComplains ? (
      <ActivityIndicator
        animating={true}
        style={true && { height: 80 }}
        size="large"
        color="#00adf5"
      />
    ) : null;
  };

  render() {
    let data = [
      {
        id: "3423434",
        name: "Panadol",
        prefferedName: "PAN",
        count: 30,
      },
      {
        id: "3423435",
        prefferedName: "Snooze Phill",
        name: "Zitrocin",
        count: 12,
      },
    ];
    const {
      complains,
      toastMessage,
      refreshing,
      loaderComplain,
      getComplains,
      allComplainsCount,
      setState,
      isFetchingMoreComplains,
      complainFilterString,
      complainFilters,
    } = this.props;

    console.log(
      "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
      this.props.medicines
    );

    return (
      <View style={styles.containerStyle}>
        <View style={styles.wrapper}>
          <FlatList
            contentContainerStyle={{ paddingBottom: 12 }}
            data={this.props.medicines}
            extraData={this.state}
            keyExtractor={(item) => item.complainsId}
            renderItem={({ item }) => (
              <MedicineListItem
                data={item}
                toastMessage={toastMessage}
                onPress={() => this.onItemClick(item)}
                name={"name"}
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
        <Fab onPress={this.addMedicine} />
      </View>
    );
  }

  addMedicine = () => {
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
    complainFilterString: state.app.complainFilterString,
    toastMessage: state.app.toastMessage,
    selectedTabIndex: state.app.selectedTabIndex,
    refreshing: state.app.refreshing,
    loaderComplain: state.app.loaderComplain,
    allComplainsCount: state.app.allComplainsCount,
    pendingComplainsCount: state.app.pendingComplainsCount,
    currentComplainsCount: state.app.currentComplainsCount,
    completedComplainsCount: state.app.completedComplainsCount,
    isFetchingMoreComplains: state.app.isFetchingMoreComplains,
    medicines: state.medicine.list,
  };
};
export const MedicineListContainer = connect(mapStateToProps, {
  setState,
  getMedicineList,
})(MedicineList);

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
