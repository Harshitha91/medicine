// import React from "react";
// import {
//   View,
//   FlatList,
//   StyleSheet,
//   ScrollView,
//   RefreshControl,
//   Image,
// } from "react-native";
// import { connect } from "react-redux";
// import { setState } from "actions";
// import { UserManagementListItem } from "../components/UserManagementListItem";
// import { Navigation } from "react-native-navigation";
// import DropdownAlert from "react-native-dropdownalert";
// import { moderateScale, verticalScale } from "util/sizes";
// import Text from "components/ui/Text";
// import withPreventDoubleClick from "screens/components/PreventDoubleClick";

// const UserManagementListItems = withPreventDoubleClick(UserManagementListItem);

// export default class UserManagement extends React.Component {
//   static defaultProps = {
//     refreshing: false,
//     sessionObject: {},
//     properties: [],
//   };

//   constructor(props) {
//     super(props);
//     Navigation.events().bindComponent(this);
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.toastMessage !== this.props.toastMessage) {
//       this.dropdown.alertWithType(
//         nextProps.toastMessage.status,
//         nextProps.toastMessage.header,
//         nextProps.toastMessage.details
//       );
//     }
//   }

//   render() {
//     const { refreshing, properties, toastMessage } = this.props;

//     return (
//       <View style={styles.containerStyle}>
//         <View style={{ height: "100%" }}>
//           {properties.length !== 0 ? (
//             <FlatList
//               contentContainerStyle={{ paddingBottom: 5, paddingTop: 20 }}
//               data={properties}
//               keyExtractor={(item) => item.propertyId}
//               refreshing={refreshing}
//               onRefresh={() => this.handleRefresh(this.props)}
//               renderItem={({ item }) => (
//                 <UserManagementListItems
//                   data={item}
//                   onPress={() => this.onItemClick(item)}
//                 />
//               )}
//             />
//           ) : (
//             <View style={{ flex: 1 }}>
//               <ScrollView
//                 contentContainerStyle={styles.contentContainer}
//                 refreshControl={
//                   <RefreshControl
//                     refreshing={refreshing}
//                     onRefresh={() => this.handleRefresh(this.props)}
//                   />
//                 }
//               >
//                 <View
//                   style={{
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Image
//                     source={require("images/empty-users.png")}
//                     style={styles.userImg}
//                   />
//                 </View>
//                 {/* <Text type='bold' style={styles.baseText}>No users at the moment</Text> */}
//                 <Text style={styles.titleText}>
//                   You don’t have any items yet.
//                 </Text>
//               </ScrollView>
//             </View>
//           )}
//         </View>
//         <DropdownAlert ref={(ref) => (this.dropdown = ref)} showCancel={true} />
//       </View>
//     );
//   }
// }

// const mapStateToProps = (state, ownProps) => {
//   return {
//     sessionObject: state.app.sessionObject,
//     toastMessage: state.app.toastMessage,
//   };
// };
// export const UserManagementContainer = connect(mapStateToProps, {
//   setState,
// })(UserManagement);

// const styles = StyleSheet.create({
//   containerStyle: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//   },
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   baseText: {
//     fontSize: 20,
//     marginBottom: verticalScale(10),
//     marginTop: verticalScale(5),
//     color: "black",
//     textAlign: "center",
//   },
//   titleText: {
//     fontSize: 15,
//     color: "black",
//     textAlign: "center",
//   },
//   userImg: {
//     marginTop: verticalScale(100),
//     width: moderateScale(260),
//     height: verticalScale(150),
//     marginBottom: verticalScale(50),
//     flex: 1,
//   },
// });
