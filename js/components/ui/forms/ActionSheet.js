// @flow
import React, { PureComponent } from "react";
import { Icon } from 'react-native-elements';
import { View, Text, Picker, Platform, ActionSheetIOS, TouchableOpacity } from "react-native";
import styles from "styles/ui/form/field";
import { isUndefined } from "util/core";

export default class ActionSheet extends PureComponent{
  state = { selected: "" };

  static defaultProps = {
    data: [],
    value: "0",
    labelStyles: {}
  };

  changeHandler = (itemValue) => {
    const { onChange, value, name } = this.props;
    if (itemValue !== value) {
      onChange(name, itemValue);
    }
  };
  checkRequired() {
    return <Text style={styles.labelRequired}></Text>;
  }

  render() {
    const {
      customStyle,
      nolabel,
      label,
      required,
      containerStyle,
      small,
      data,
      mode,
      enabled,
      placeholder,
      value,
      error,
      labelStyles,
      componentSpecificStyles
    } = this.props;

    const inputGroup = (customStyle) || [
      styles.inputGroup,
      small && styles.smallInputGroup
    ];

    const inputStyle = componentSpecificStyles ? componentSpecificStyles : [
      styles.container,
      small && styles.smallContainer,
      containerStyle,
      error && styles.errorContainer,
    ];

    const labelStyle = [styles.label, labelStyles];

    let dataByValue = {};
    if(data && data.length > 0) {
      dataByValue = this.generateDataByValue(data);
    }

    let selectedLabel = null;
    if (value && value !== '0' && dataByValue[value]) {
      selectedLabel = dataByValue[value].label;
    }

    return (
      <View style={inputGroup}>
        {!nolabel && (
          <Text style={labelStyle}>
            {label}
            {required && this.checkRequired()}
          </Text>
        )}
        <View style={styles.inputElementWrapper}>
          <View style={styles.inputSubWrapper}>
            <View style={inputStyle}>
              {(selectedLabel) ? 
                <TouchableOpacity style={{flex: 1, flexDirection: "row", alignItems:'center',}} onPress={this.showActionSheet}>
                  <Text style={styles.input}>
                      {selectedLabel}
                  </Text>
                  <Icon
                    containerStyle={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems:'flex-end',
                      justifyContent: "flex-end"}}
                    name='expand-more' />
                </TouchableOpacity>
               : 
               <TouchableOpacity style={{flex: 1, flexDirection: "row", alignItems:'center',}} onPress={this.showActionSheet}>
                  <Text style={styles.input}>
                      Select an Item
                  </Text>
                  <Icon
                    containerStyle={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems:'flex-end',
                      justifyContent: "flex-end"}}
                    name='expand-more' />
                </TouchableOpacity>  
              }
            </View>
            {error && this.renderErrorMsg(error)}
          </View>
        </View>
      </View>
    );
  }

  renderEmptyPickerItem(placeholder = "Select an Item") {
    return <Picker.Item key={0} label={placeholder} value="0" />;
  }

  renderErrorMsg(error) {
    return <Text style={styles.errorMsg}>{error}</Text>;
  }

  generateDataByValue = (data) => {
    return {
      ...data.reduce((obj, item) => {
        obj[item.value] = item;
        return obj;
      }, {})
    };
  };

  generateDataByLabel = (data) => {
    return {
      ...data.reduce((obj, item) => {
        obj[item.label] = item;
        return obj;
      }, {})
    };
  };

  showActionSheet = () => {
    const { data } = this.props;

    if(data && data.length > 0) {
      let labels = data.map((object) => {
        return object.label;
      });
      let dataByLabel = this.generateDataByLabel(data);
    
      labels.push('Cancel');
      ActionSheetIOS.showActionSheetWithOptions({
        options: labels,
        cancelButtonIndex: labels.length - 1
      },
      (buttonIndex) => {
        if (buttonIndex !== (labels.length - 1)) {
          let label = labels[buttonIndex];
          let item = dataByLabel[label];
          this.changeHandler(item.value);
        }
      });
    }
  };
}
