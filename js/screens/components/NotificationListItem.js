import React from "react";
import { View, Image, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { AirbnbRating } from 'react-native-ratings';
import Style from "styles";
import Text from "components/ui/Text";
import { moderateScale, normalize } from "util/sizes";
import moment from "moment";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Badge from "components/ui/Badge";
import { CachedImage } from 'react-native-cached-image';
import { localTime } from '../../helpers/datetimeHelper';
const theme = Style.get();

export const NotificationListItem = (props) => {
  const { data, onPress, name } = props;
  return (
    <TouchableOpacity key={data.notificationId} style={data.isRead ? styles.listItem : styles.listItemUnread} onPress={() => onPress(data)}>
      <View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ alignItems: "center", flex: 20, marginTop: moderateScale(10), marginBottom: moderateScale(5) }} >
            <View>
              {(data && data.userData.imageUrl && data.userData.imageUrl !== null) ?
                <CachedImage
                  style={{ width: Platform.OS === 'android' ? moderateScale(50) : moderateScale(45), height: Platform.OS === 'android' ? moderateScale(50) : moderateScale(45), right: moderateScale(0), borderRadius: Platform.OS === 'android' ? 50 : moderateScale(45/2) }}
                  source={{ uri: data.userData.imageUrl }}
                /> : 
                <CachedImage
                  style={{ width: Platform.OS === 'android' ? moderateScale(50) : moderateScale(45), height: Platform.OS === 'android' ? moderateScale(50) : moderateScale(45), right: moderateScale(0), borderRadius: Platform.OS === 'android' ? 50 : moderateScale(45/2) }}
                  source={require('images/userPlaceholder.png')}
                />
              }
            </View>
          </View>
          <View style={{ flex: 80 }}>
            <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'stretch',
              marginLeft: moderateScale(5)
            }}>
              <View style={{ top: moderateScale(0) }}>
                {/* <Text type='bold' style={{ color: 'rgb(67,67,67)', fontSize: moderateScale(20) }}>
                  {data.notificationType}
                </Text> */}
                <Text style={{ marginTop: moderateScale(0), color: '#bcbcbc' }}>
                  <Text type='medium' style={{ color: '#000' }}>{data.notificationContent}</Text>
                </Text>
                {data.notificationType == 'complain_update' || data.notificationType == 'complainComment_create' || data.notificationType == 'feedback' || data.notificationType == 'complain_create' ?
                  <Text style={{ marginTop: moderateScale(3), color: '#ff2020' }}>{'ID: '}
                    <Text style={{ color: '#ff2020' }}>{generateCid(data.notificationSubjectId).toUpperCase()}</Text>
                  </Text> : null
                }
                <Text style={{ marginTop: moderateScale(5) }}>
                  <Text>{localTime(data.createdAt, 'MM/DD/YYYY hh:mm A')}</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

generateCid = (cid) => {
  var hash = 0;
  var i = 0;

  if (cid.length == 0) {
    return hash;
  }
  for (i; i < cid.length; i++) {
    char = cid.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return (Math.abs(hash).toString(16));
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: theme.componentBackground.listItem,
    paddingTop: moderateScale(5),
    paddingBottom: moderateScale(10),
    paddingRight: moderateScale(10),
    borderRadius: moderateScale(5),
    marginBottom: 10,
    width: '91%',
    left: '4%',
    top: '6%',
    right: '2%',
    zIndex: 2,
  },
  listItemUnread: {
    backgroundColor: '#ccc',
    paddingTop: moderateScale(5),
    paddingBottom: moderateScale(10),
    paddingRight: moderateScale(10),
    borderRadius: moderateScale(5),
    marginBottom: 10,
    width: '91%',
    left: '4%',
    top: '6%',
    right: '2%',
    zIndex: 2,
  },
  listItemPending: {
    backgroundColor: 'white',
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(20),
    paddingRight: moderateScale(10),
    borderRadius: moderateScale(5),
    marginBottom: 20,
    width: '96%',
    left: '2%',
    right: '2%',
    zIndex: 0,
    top: '20%'
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