// @flow
import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import { moderateScale } from "util/sizes";

import Text from "./Text";
import Icon from "components/ui/Icon";

import style from "styles/ui/tabs";
import Style from "styles";
const theme = Style.get();

class TabPane extends Component {
  render() {
    const { index, label, icon, selectedTabIndex, count } = this.props;
    return (
      <TouchableOpacity
        style={[
          style.tabpaneContainerItem,
          index === selectedTabIndex && style.tabpaneContainerSelected
        ]}
        onPress={this.onPressTab}
        activeOpacity={0.7}
      >
        <View style={style.tabContentContainer}>
          {icon && (
            <Icon
              style={style.iconStyle}
              name={icon}
              size={moderateScale(10)}
              color={theme.brandColor}
            />
          )}
          <Text
            style={index === selectedTabIndex ? style.tabTextStyle : style.tabDisabledTextStyle}
          >
            {label} {count > 0 ? `(${count})` : ''} 
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  onPressTab = () => {
    const { index, label, onPressTab } = this.props;
    onPressTab(index, label);
  };
}

export default TabPane;
