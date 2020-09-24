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
        color="#00adf5"
      />
    ) : null;
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
        {/* <SearchBar
          platform={Platform.OS}
          placeholder="Search Complaint"
          containerStyle={styles.search}
          inputStyle={ Platform.OS === 'android' ? { marginTop: -2, height: 45 } : { fontSize: 15 }}
          inputContainerStyle={ Platform.OS === 'android' ? { marginTop: -8 } : styles.searchInput}
          onChangeText={this.handleSearchInputChange}
          value={complainFilterString}
          searchIcon={{ color: 'red' }}
          clearIcon={ Platform.OS === 'android' ? { name: 'close', color: 'red' } : {} }
          backIcon={{ name: 'home' }}
          leftIconContainerStyle={{ backgroundColor: '#F5F5F5', width: 30, borderRadius: 50, height: 30 }}
          rightIconContainerStyle={{ width: 30, height: 30 }}
          showLoading = {loaderComplain}
        /> */}
        {/* <View style={styles.search} /> */}
        <Tabs
          onPressTabItem={this.onPressTabItem}
          selectedTabIndex={this.props.selectedTabIndex}
          careGiverList={careGiverList}
          style={{ marginTop: 5 }}
        >
          <CareGiverList
            name={"Approved"}
            data={careGiverList}
            toastMessage={toastMessage}
            refreshing={refreshing}
            loaderCareGiverList={loaderCareGiverList}
            getCareGivers={getCareGivers}
            clearCareGiverList={clearCareGiverList}
            setState={setState}
          />
          <CareGiverList
            name={"Sent"}
            data={careGiverList}
            toastMessage={toastMessage}
            refreshing={refreshing}
            loaderCareGiverList={loaderCareGiverList}
            getCareGivers={getCareGivers}
            clearCareGiverList={clearCareGiverList}
            setState={setState}
          />
          <CareGiverList
            name={"Received"}
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

let styles = StyleSheet.create({
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
    elevation: 2,
  },
});
