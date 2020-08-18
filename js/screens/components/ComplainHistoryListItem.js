import React from "react";
import { View, Image, StyleSheet, Platform } from "react-native";
import { AirbnbRating } from 'react-native-ratings';
import Style from "styles";
import Text from "components/ui/Text";
import { moderateScale, normalize } from "util/sizes";
import Badge from "components/ui/Badge";
import { BADGE_DATA } from "constant";
import { CachedImage } from 'react-native-cached-image';
import { localTime } from '../../helpers/datetimeHelper';

const theme = Style.get();

export const ComplainHistoryListItem = (props) => {
  const { data } = props;
  let textContent = null;

  switch (data.type) {
    case 'complain_status_change':
      let textContentArr = data.content.split('~');
      let badgeArr = textContentArr[1].match(/'(.*?)'/g);
      let badge1 = BADGE_DATA[badgeArr[0].replace(/'/g, "")];
      let badge2 = BADGE_DATA[badgeArr[1].replace(/'/g, "")];

      textContent =
        <View>
          <Text type='medium' style={{ color: '#000' }}>
            {textContentArr && textContentArr[0]}
          </Text>
          {badge1 && badge2 ? <View style={{ flexDirection: 'row', marginTop: moderateScale(4) }}>
            <Badge
              badgeStyle={ Platform.OS === 'android' ? {
                backgroundColor: badge1.badgeColor,
                paddingLeft: moderateScale(5),
                paddingRight: moderateScale(5),
                paddingBottom: moderateScale(10),
                paddingTop: moderateScale(10),
                borderRadius: moderateScale(25)
              } : {
                backgroundColor: badge1.badgeColor,
                paddingLeft: moderateScale(5),
                paddingRight: moderateScale(5),
                // paddingBottom: moderateScale(10),
                paddingTop: moderateScale(1),
                borderRadius: moderateScale(25)
              }}
              status={badge1.badgeType}
              containerStyle={{ top: moderateScale(0), right: moderateScale(0), marginRight: moderateScale(2) }}
              value={badge1.badgeText}
            /><Text type='medium' style={{ color: '#000' }}> to </Text>
            <Badge
              badgeStyle={ Platform.OS === 'android' ? {
                backgroundColor: badge2.badgeColor,
                paddingLeft: moderateScale(5),
                paddingRight: moderateScale(5),
                paddingBottom: moderateScale(10),
                paddingTop: moderateScale(10),
                borderRadius: moderateScale(25)
              } : {
                backgroundColor: badge2.badgeColor,
                paddingLeft: moderateScale(5),
                paddingRight: moderateScale(5),
                // paddingBottom: moderateScale(10),
                paddingTop: moderateScale(1),
                borderRadius: moderateScale(25)
              }}
              status={badge2.badgeType}
              containerStyle={{ top: moderateScale(0), right: moderateScale(0), marginRight: moderateScale(2) }}
              value={badge2.badgeText}
            />
          </View> : null}
        </View>
      break;
    default:
      textContent = <Text type='medium' style={{ color: '#000' }}>{data.content}</Text>
      break;
  }

  return (
    <View key={data.complainHistoryId} style={data.type == 'complain_status_change' ? styles.listItemData : styles.listItem}>
      <View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ alignItems: "center", flex: 20, marginTop: moderateScale(0), marginBottom: moderateScale(8) }} >
            <View>
              {data && data.imgUrl == null ?
                <CachedImage
                  style={{ width: moderateScale(50), height: moderateScale(50), right: moderateScale(0), borderRadius: Platform.OS === 'android' ? 50 : moderateScale(50/2), top: moderateScale(5) }}
                  source={require('images/userPlaceholder.png')}
                /> :
                <CachedImage
                  style={{ width: moderateScale(50), height: moderateScale(50), right: moderateScale(0), borderRadius: Platform.OS === 'android' ? 50 : moderateScale(50/2), top: moderateScale(5) }}
                  source={{ uri: data.imgUrl }}
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
              marginLeft: moderateScale(5),
            }}>
              <View style={{ top: moderateScale(0) }}>
                {textContent}
                <Text style={{ marginTop: moderateScale(5) }}>
                  <Text>{localTime(data.createdAt, 'MM/DD/YYYY hh:mm A')}</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: theme.componentBackground.listItem,
    paddingTop: moderateScale(0),
    paddingBottom: moderateScale(10),
    paddingRight: moderateScale(10),
    borderRadius: moderateScale(5),
    marginBottom: 5,
    width: '91%',
    left: '4%',
    top: '5%',
    right: '2%',
    zIndex: 2,
  },
  listItemData: {
    backgroundColor: theme.componentBackground.listItem,
    paddingTop: moderateScale(15),
    paddingBottom: moderateScale(8),
    paddingRight: moderateScale(10),
    borderRadius: moderateScale(5),
    marginBottom: 5,
    width: '91%',
    left: '4%',
    top: '5%',
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