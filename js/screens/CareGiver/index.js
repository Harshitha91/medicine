import React from "react";
import {
  View,
  StyleSheet,
  Platform,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import { setState, getCareGivers, clearCareGiverList } from "actions";
import { SearchBar } from "react-native-elements";
import { Navigation } from "react-native-navigation";
import { DEFAULT_NUMBER_OF_ROWS } from "constant";
import Tabs from "components/ui/Tabs";
import { moderateScale, verticalScale } from "util/sizes";
import DropdownAlert from "react-native-dropdownalert";
import debounce from "lodash/debounce";
import PlusButton from "components/ui/Fab";
import withPreventDoubleClick from "../components/PreventDoubleClick";
const Fab = withPreventDoubleClick(PlusButton);
import { CareGiverListItem } from "screens/components/CareGiverListItem";
import CareGiverList from "./CareGiverList";
import _ from "lodash";

export default class CareGiver extends React.Component {
  static defaultProps = {
    isFetching: false,
    selectedTabIndex: 0,
    sessionObject: {},
    refreshing: true,
    loaderCareGiverList: true,
    careGiverList: [],
  };

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    // this.dbounceItemClick = debounce(this.handleItemClick, 200);
  }

  static get options() {
    return {
      topBar: {
        rightButtons: [
          {
            id: "addCareGiver",
            icon: require("images/orderMedicine.png"),
            color: "black",
          },
        ],
      },
    };
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === "addCareGiver") {
      Navigation.push("CenterStack", {
        component: {
          name: "AddCareGiverInvitation",
          options: {
            topBar: {
              visible: true,
              height: moderateScale(60),
              topMargin: 15,
              borderHeight: 0.5,
              elevation: 0,
              title: {
                alignment: "center",
                text: "Add Care Giver Invitation",
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
    }
  }

  componentDidMount() {}

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

  renderHeader = () => {
    return (
      <View style={styles.complainTypeSectionHeader}>
        <Text style={styles.complainTypeViewLabels}>Upcoming</Text>
      </View>
    );
  };

  renderHistoryHeader = () => {
    return (
      <View style={styles.complainTypeSectionHeader}>
        <Text style={styles.complainTypeViewLabels}>History</Text>
      </View>
    );
  };

  onItemClick = () => {
    Navigation.push("CenterStack", {
      component: {
        name: "ChannelingDetails",
        options: {
          topBar: {
            visible: true,
            height: moderateScale(60),
            topMargin: 15,
            borderHeight: 0.5,
            elevation: 0,
            title: {
              alignment: "center",
              text: "Channeling Details",
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

  render() {
    let data = [
      {
        id: "3423435",
        name: "Alponso Perera",
        contact: "0719475973",
      },
      {
        id: "3423436",
        name: "Jagath Thrimavithana",
        contact: "0779475973",
      },
    ];
    const {
      careGiverList,
      toastMessage,
      refreshing,
      loaderCareGiverList,
      getCareGivers,
      setState,
      clearCareGiverList,
    } = this.props;

    return (
      // <View style={styles.containerStyle}>
      //   <View style={styles.wrapper}>
      //     <FlatList
      //       contentContainerStyle={{ paddingBottom: 12 }}
      //       data={data}
      //       extraData={this.state}
      //       keyExtractor={(item) => item.id}
      //       renderItem={({ item }) => (
      //         <CareGiverListItem
      //           data={item}
      //           toastMessage={toastMessage}
      //           onPress={() => this.onItemClick(item)}
      //           name={name}
      //         />
      //       )}
      //       refreshing={false}
      //       // onRefresh={this.handleRefresh}
      //       // onEndReached={this.handleLoadMore}
      //       // onEndReachedThreshold={0.5}
      //       ListFooterComponent={this.renderFooter}
      //     />
      //   </View>
      //   <DropdownAlert ref={(ref) => (this.dropdown = ref)} showCancel={true} />
      //   <Fab onPress={this.inviteCareGiver} />
      // </View>
      <View style={styles.containerStyle}>
        <Tabs
          onPressTabItem={this.onPressTabItem}
          selectedTabIndex={this.state.selectedTabIndex}
          careGiverList={careGiverList}
          style={{ marginTop: 56 }}
        >
          <CareGiverList
            name={"All"}
            data={careGiverList}
            toastMessage={toastMessage}
            refreshing={refreshing}
            loaderCareGiverList={loaderCareGiverList}
            getCareGivers={getCareGivers}
            clearCareGiverList={clearCareGiverList}
            setState={setState}
          />
          <CareGiverList
            name={"Pending"}
            data={careGiverList}
            toastMessage={toastMessage}
            refreshing={refreshing}
            loaderCareGiverList={loaderCareGiverList}
            getCareGivers={getCareGivers}
            clearCareGiverList={clearCareGiverList}
            setState={setState}
          />
          <CareGiverList
            name={"Current"}
            data={careGiverList}
            toastMessage={toastMessage}
            refreshing={refreshing}
            loaderCareGiverList={loaderCareGiverList}
            getCareGivers={getCareGivers}
            clearCareGiverList={clearCareGiverList}
            setState={setState}
          />
        </Tabs>
        <DropdownAlert ref={(ref) => (this.dropdown = ref)} showCancel={true} />
      </View>
    );
  }

  onPressTabItem = (index) => {
    this.props.setState({ selectedTabIndex: index });
  };

  inviteCareGiver = () => {
    Navigation.push("CenterStack", {
      component: {
        name: "AddCareGiverInvitation",
        options: {
          topBar: {
            visible: true,
            height: moderateScale(60),
            topMargin: 15,
            borderHeight: 0.5,
            elevation: 0,
            title: {
              alignment: "center",
              text: "Add Care Giver Invitation",
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
    selectedTabIndex: state.app.selectedTabIndex,
    refreshing: state.app.refreshing,
    loaderCareGiverList: state.careGiver.loaderCareGiverList,
    careGiverList: state.careGiver.list,
  };
};
export const CareGiverContainer = connect(mapStateToProps, {
  setState,
  getCareGivers,
  clearCareGiverList,
})(CareGiver);

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
    complainTypeSectionHeader: {
      flex: 0,
      marginBottom: moderateScale(15),
      flexDirection: "row",
      marginLeft: moderateScale(5),
    },
    complainTypeViewLabels: {
      flex: 1,
      fontSize: 17,
      height: 30,
      color: "#032DFF",
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
