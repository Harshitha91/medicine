import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { CachedImage } from 'react-native-cached-image';
import { ListItem as NativeListItem, Avatar } from 'react-native-elements'
import Style from "styles";
import Text from "components/ui/Text";
import { moderateScale, normalize } from "util/sizes";

const theme = Style.get();

export const UserManagementListItem = (props) => {
  const { data, onPress } = props;
  let pending = [];
  let approved = [];
  let blocked = [];
  let invited = [];
  data && data.users && data.users.forEach(user => {
    if (user && user.propertySubscriptionStatus == 'Pending') {
      pending.push(user);
    }
    if (user && user.propertySubscriptionStatus == 'Approved') {
      approved.push(user);
    }
    if (user && user.propertySubscriptionStatus == 'Blocked') {
      blocked.push(user);
    }
    if (user && user.propertySubscriptionStatus == 'Invited') {
      invited.push(user);
    }
  });
  return (
    <TouchableOpacity key={data.propertyId} style={styles.listItem} onPress={() => onPress(data)}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ width: '80%' }}>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch',
            paddingLeft: 20,
            paddingTop: 10,
            paddingBottom: 10
          }}>
            <View style={{ width: '90%' }}>
              <Text type='bold' style={{ fontSize: 20 }}>{data.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {invited && invited.length ?
                <View style={{ flexDirection: 'row', marginRight: moderateScale(4) }}>
                  <Text style={{ marginTop: 5 }}>Invited Users</Text>
                  <Text style={{ padding: 6 }}>{invited.length}</Text>
                </View> : null
              }
              {pending && pending.length ?
                <View style={{ flexDirection: 'row', marginRight: moderateScale(4) }}>
                  <Text style={{ marginTop: 5 }}>Request pending</Text>
                  <Text style={{ padding: 6 }}>{pending.length}</Text>
                </View> : null
              }
              {approved && approved.length ?
                <View style={{ flexDirection: 'row', marginRight: moderateScale(4) }}>
                  <Text style={{ marginTop: 5 }}>Approved Users</Text>
                  <Text style={{ padding: 6 }}>{approved.length}</Text>
                </View> : null
              }
              {blocked && blocked.length ?
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ marginTop: 5 }}>Blocked Users</Text>
                  <Text style={{ padding: 6 }}>{blocked.length}</Text>
                </View> : null
              }
            </View>
          </View>
        </View>
        <View style={{ width: '15%' }} >
          <View style={{ height: moderateScale(70) }}>
            {data && data.imageUrl == null ?
              <Image
                style={{ width: moderateScale(60), height: moderateScale(60), padding: 20, borderRadius: 15, top: moderateScale(7) }}
                source={require('images/placeholder-rcs.png')}
              />
              :
              <Image
                style={{ width: moderateScale(60), height: moderateScale(60), padding: 20, borderRadius: 15, top: moderateScale(7) }}
                source={{ uri: data.imageUrl }}
              />
            }
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: theme.componentBackground.listItem,
    paddingTop: moderateScale(5),
    paddingBottom: moderateScale(10),
    paddingRight: moderateScale(10),
    borderRadius: moderateScale(5),
    marginBottom: 10,
    width: '90%',
    left: '5%',
    right: '2%',
    zIndex: 0,
    top: '2%'
  },
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    flexGrow: moderateScale(0.02),
    alignItems: "center",
    justifyContent: "center"
  },
  linkIcon: {
    justifyContent: "center",
    padding: moderateScale(3)
  },
  listItemText: {
    fontSize: normalize(theme.text.titleSize),
    color: theme.text.textColor
  }
})
