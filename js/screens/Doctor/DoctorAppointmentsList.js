import React from "react";
import {
  View,
  StyleSheet,
  Platform,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import { setState } from "actions";
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
import { DoctorAppointmentsListItem } from "screens/components/DoctorAppointmentsListItem";
import _ from "lodash";

export default class DoctorAppointmentsList extends React.Component {
  static get options() {
    return {
      topBar: {
        rightButtons: [
          {
            id: "filterBtn",
            icon: require("images/filter-icon.png"),
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
    complains: [],
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.toastMessage !== this.props.toastMessage) {
      this.dropdown.alertWithType(
        nextProps.toastMessage.status,
        nextProps.toastMessage.header,
        nextProps.toastMessage.details
      );
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

  render() {
    let data = [
      {
        id: "3423434",
        date: "2020-01-20",
        medicines: [
          { name: "Panadol", count: 2 },
          { name: "Vitamin C", count: 1 },
        ],
      },
      {
        id: "3423435",
        date: "2020-01-21",
        medicines: [
          { name: "Zitrazine", count: 1 },
          { name: "Vitamin C", count: 1 },
        ],
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

    return (
      <View style={styles.containerStyle}>
        <View style={styles.wrapper}>
          <FlatList
            contentContainerStyle={{ paddingBottom: 12 }}
            data={data}
            extraData={this.state}
            keyExtractor={(item) => item.complainsId}
            renderItem={({ item }) => (
              <DoctorAppointmentsListItem
                data={item}
                toastMessage={toastMessage}
                onPress={() => this.onItemClick(item)}
                name={name}
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
    Navigation.push(this.props.componentId, {
      component: {
        name: "MakeDoctorAppointment",
        options: {
          topBar: {
            visible: true,
            height: moderateScale(60),
            topMargin: 15,
            borderHeight: 0,
            elevation: 0,
            title: {
              alignment: "center",
              text: "Make Doctor Appointment",
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

  // handleRefresh = (props) => {
  //   const {
  //     setState,
  //     getComplains,
  //     name,
  //     complainFilterString,
  //     complainFilters,
  //   } = this.props;
  //   setState({ refreshing: true });
  //   getComplains(complainFilterString, name, this.options, complainFilters);
  // };

  // handleLoadMore = () => {
  //   const {
  //     data,
  //     getComplains,
  //     isFetchingMoreComplains,
  //     setState,
  //     complainFilterString,
  //     name,
  //     complainFilters,
  //   } = this.props;
  //   if (data.length >= DEFAULT_NUMBER_OF_ROWS && !isFetchingMoreComplains) {
  //     setState({
  //       isFetchingMoreComplains: true,
  //     });
  //     const options = {
  //       page: this.options.page + 1,
  //       rows: DEFAULT_NUMBER_OF_ROWS,
  //     };
  //     getComplains(complainFilterString, name, options, complainFilters);
  //     this.options = options;
  //   }
  // };
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
    complainFilters: state.complainFilters,
  };
};
export const DoctorAppointmentsListContainer = connect(mapStateToProps, {
  setState,
})(DoctorAppointmentsList);

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
