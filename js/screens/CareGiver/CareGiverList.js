import React from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import styles from "styles/ui/active";
import Text from "components/ui/Text";
import debounce from "lodash/debounce";
import { Navigation } from "react-native-navigation";
import { moderateScale, verticalScale } from "util/sizes";
import { DEFAULT_NUMBER_OF_ROWS } from "constant";
import { CareGiverListItem } from "screens/components/CareGiverListItem";

export default class CareGiverList extends React.Component {
  static defaultProps = {
    isFetching: false,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getCareGivers, name } = this.props;
    getCareGivers(name);
  }

  componentWillUnmount() {
    this.props.clearCareGiverList();
  }

  render() {
    const {
      data,
      toastMessage,
      name,
      refreshing,
      loaderCareGiverList,
    } = this.props;
    return (
      <View style={[styles.wrapper, styles.tabContent]}>
        <View style={styles.wrapper}>
          {loaderCareGiverList ? (
            <ActivityIndicator
              animating={true}
              style={true && { height: 80 }}
              size="large"
              color="#00adf5"
            />
          ) : data.length !== 0 ? (
            <FlatList
              contentContainerStyle={{ paddingBottom: 12 }}
              data={data}
              extraData={this.state}
              keyExtractor={(item) => item.complainsId}
              renderItem={({ item }) => (
                <CareGiverListItem
                  data={item}
                  toastMessage={toastMessage}
                  name={name}
                />
              )}
            />
          ) : (
            <View style={{ flex: 1 }}>
              <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text type="bold" style={imageStyles.baseText}>
                  No care givers at the moment
                </Text>
              </ScrollView>
            </View>
          )}
        </View>
      </View>
    );
  }

  handleRefresh = (props) => {
    const {
      setState,
      getComplains,
      name,
      complainFilterString,
      complainFilters,
    } = this.props;
    setState({ refreshing: true });
    getComplains(complainFilterString, name, this.options, complainFilters);
  };

  handleLoadMore = () => {
    const {
      data,
      getComplains,
      isFetchingMoreComplains,
      setState,
      complainFilterString,
      name,
      complainFilters,
    } = this.props;
    if (data.length >= DEFAULT_NUMBER_OF_ROWS && !isFetchingMoreComplains) {
      setState({
        isFetchingMoreComplains: true,
      });
      const options = {
        page: this.options.page + 1,
        rows: DEFAULT_NUMBER_OF_ROWS,
      };
      getComplains(complainFilterString, name, options, complainFilters);
      this.options = options;
    }
  };
}

const imageStyles = StyleSheet.create({
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
