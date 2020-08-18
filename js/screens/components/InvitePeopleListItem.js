import React from "react";
import { View, Image, TouchableOpacity, StyleSheet, Platform } from "react-native";
import Style from "styles";
import Buttons from "components/ui/Button";
import Text from "components/ui/Text";
import { moderateScale, normalize } from "util/sizes";
import withPreventDoubleClick from '../components/PreventDoubleClick';

const theme = Style.get();
const Button = withPreventDoubleClick(Buttons);

export const InvitePeopleListItem = (props) => {
  const { data, onPress, onInvite } = props;
  return (
    <TouchableOpacity key={data.id} style={styles.listItem} onPress={() => onPress(data)}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ alignItems: "flex-end", flex: 20, height: moderateScale(50) }} >
          <View style={{ height: moderateScale(50) }}>
            {data && data.imageUrl == null ?
              <Image
                style={Platform.OS === 'android' ? { width: moderateScale(50), height: moderateScale(50), right: moderateScale(0), borderRadius: 50, top: moderateScale(10) } : 
                                                  { width: moderateScale(45), height: moderateScale(45), right: moderateScale(0), borderRadius: moderateScale(45/2), top: moderateScale(10) }}
                source={require('images/userPlaceholder.png')}
              /> :
              <Image
                style={Platform.OS === 'android' ? { width: moderateScale(50), height: moderateScale(50), right: moderateScale(0), borderRadius: 50, top: moderateScale(10) } :
                                                  { width: moderateScale(45), height: moderateScale(45), right: moderateScale(0), borderRadius: moderateScale(45/2), top: moderateScale(10) }}
                source={{ uri: data.imageUrl }}
              />
            }
          </View>
        </View>
        <View style={{ flex: 80, height: moderateScale(50) }}>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch',
            paddingLeft: moderateScale(10),
            paddingTop: moderateScale(15),
            marginRight: moderateScale(5),
            height: moderateScale(35)
          }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>

              <View style={{ alignItems: 'flex-start', flexDirection: 'column', width: '65%' }}>
                {Platform.OS === 'android' && <Text type='bold' style={{ fontSize: 18 }}>{data.fullName}</Text>}
                {Platform.OS === 'ios' && <Text numberOfLines={2} type='bold' style={{ fontSize: 18 }}>{data.fullName}</Text>}
                {/* <Text>{data.email}</Text> */}
              </View>

              <View style={{ position: 'absolute', right: 0 }}>
                {data && data.invited ?
                  <View style={styles.successLabel}>
                    <Text style={{ color: '#469d4b' }} type='medium'>
                      {'Invited'}
                    </Text>
                  </View>
                  :
                  <Button
                    transparent style={styles.btn}
                    customBtn = {Platform.OS === 'android'}
                    onPress={() => onInvite(data)}
                  >
                    <Text type='medium'>
                      {'Invite'}
                    </Text>
                  </Button>}
              </View>
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
    paddingBottom: moderateScale(30),
    paddingRight: moderateScale(10),
    borderRadius: moderateScale(5),
    marginBottom: 15,
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
  },
  btn: Platform.OS === 'android' ? {
    marginTop: moderateScale(10),
    borderColor: '#EDEDED',
    backgroundColor: '#EDEDED',
    width: moderateScale(72),
  } : {
    marginTop: moderateScale(10),
    borderColor: '#EDEDED',
    backgroundColor: '#EDEDED',
    width: moderateScale(72),
    paddingTop: 5,
    paddingBottom: 5
  },
  btnLabel: {
    fontSize: moderateScale(12),
    color: '#000',
    flexDirection: 'row'
  },
  successLabel: {
    fontSize: moderateScale(12),
    flexDirection: 'row',
    marginTop: moderateScale(16),
    marginRight: moderateScale(15)
  },
})
