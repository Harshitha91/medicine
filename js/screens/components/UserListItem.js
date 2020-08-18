import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Platform } from "react-native";
import Style from "styles";
import Buttons from "components/ui/Button";
import Text from "components/ui/Text";
import { moderateScale, normalize } from "util/sizes";
import withPreventDoubleClick from './PreventDoubleClick';

const theme = Style.get();
const Button = withPreventDoubleClick(Buttons);

export const UserListItem = (props) => {
  const { data, onPress, handleSubscriber } = props;

  return (
    <TouchableOpacity key={data.id} style={styles.listItem} onPress={() => onPress(data)}>
      <View style={{ backgroundColor: theme.componentBackground.listItem }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ height: moderateScale(50), top: moderateScale(10), paddingLeft: moderateScale(10), }}>
            {data && data.imageUrl == null ?
              <Image
                style={{ width: moderateScale(50), height: moderateScale(50), right: moderateScale(0), borderRadius: Platform.OS === 'android' ? 50 : moderateScale(50/2) }}
                source={require('images/userPlaceholder.png')}
              /> :
              <Image
                style={{ width: moderateScale(50), height: moderateScale(50), right: moderateScale(0), borderRadius: Platform.OS === 'android' ? 50 : moderateScale(50/2) }}
                source={{ uri: data.imageUrl }}
              />
            }
          </View>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ paddingLeft: moderateScale(10) }}>
              <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: Platform.OS === 'android' ? 20 : normalize(19), color: '#000' }}>{data.fullName || ''}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', paddingLeft: moderateScale(10) }}>
              {data && data.propertySubscriptionStatus === 'Approved' &&
                <Button
                  transparent = {Platform.OS === 'android'}
                  style={styles.btn}
                  customBtn = {Platform.OS === 'android'}
                  onPress={() => handleSubscriber(data, "Ignored")}
                >
                  <Text>
                    {'Delete'}
                  </Text>
                </Button>
              }
              {data.propertySubscriptionStatus && data.propertySubscriptionStatus === 'Pending' &&
                <Button
                  transparent = {Platform.OS === 'android'}
                  style={styles.btn}
                  customBtn = {Platform.OS === 'android'}
                  onPress={() => handleSubscriber(data, "Approved")}
                >
                  <Text>
                    {'Approve'}
                  </Text>
                </Button>
              }
              {data && (data.propertySubscriptionStatus === 'Pending' || data.propertySubscriptionStatus === 'Approved') &&
                <Button
                  transparent = {Platform.OS === 'android'}
                  style={styles.btn}
                  customBtn = {Platform.OS === 'android'}
                  onPress={() => handleSubscriber(data, "Blocked")}
                >
                  <Text>
                    {'Block'}
                  </Text>
                </Button>
              }
              {data.propertySubscriptionStatus && data.propertySubscriptionStatus === 'Blocked' &&
                <Button
                  transparent = {Platform.OS === 'android'}
                  style={styles.btn}
                  customBtn = {Platform.OS === 'android'}
                  onPress={() => handleSubscriber(data, "Ignored")}
                >
                  <Text>
                    {'UnBlock'}
                  </Text>
                </Button>
              }
              {data && data.propertySubscriptionStatus === 'Pending' &&
                <Button
                  transparent = {Platform.OS === 'android'}
                  style={styles.btn}
                  customBtn = {Platform.OS === 'android'}
                  onPress={() => handleSubscriber(data, "Ignored")}
                >
                  <Text>
                    {'Ignore'}
                  </Text>
                </Button>
              }
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: theme.componentBackground.listItem,
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(10),
    paddingRight: moderateScale(10),
    borderRadius: moderateScale(5),
    marginBottom: 20,
    width: '90%',
    left: '5%',
    right: '2%',
    zIndex: 0,
    top: '10%'
  },
  btn: Platform.OS === 'android' ? {
    marginTop: moderateScale(10),
    borderColor: '#EDEDED',
    backgroundColor: '#EDEDED',
    marginRight: moderateScale(10)
  } : {
    marginTop: moderateScale(10),
    borderColor: '#EDEDED',
    backgroundColor: '#EDEDED',
    marginRight: moderateScale(10),
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(15),
  },
  clearBtn: {
    marginTop: moderateScale(10),
    borderColor: '#000'
  },
  clearBtnLabel: {
    fontSize: moderateScale(12),
    color: '#9e9e9e',
    fontWeight: 'bold',
    marginBottom: moderateScale(5)
  },
})