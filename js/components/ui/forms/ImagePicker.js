import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, Platform } from "react-native";

import styles from "styles/ui/form/field";
import ImagePicker from "react-native-image-picker";

class ImagePickerField extends Component {
  state = {
    avatarSource: null
  };

  checkRequired() {
    return <Text style={styles.labelRequired}>*</Text>;
  }

  selectPhotoTapped(name, onChange) {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source;

        // You can display the image using either:
        //source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        //Or:
        if (Platform.OS === "android") {
          source = { uri: response.uri, isStatic: true };
        } else {
          source = { uri: response.uri.replace("file://", ""), isStatic: true };
        }

        this.setState({
          avatarSource: source
        });
        onChange(name, this.state.avatarSource);
      }
    });
  }

  render() {
    const { label, required, placeholder, name, onChange } = this.props;

    return (
      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          {label}
          {required && this.checkRequired()}
        </Text>
        <View style={styles.imagePickerContainer}>
          <View
            style={[
              styles.avatar,
              styles.avatarContainer,
              { marginBottom: 20 }
            ]}
          >
            {this.state.avatarSource === null ? (
              <Text>{placeholder}</Text>
            ) : (
              <Image style={styles.avatar} source={this.state.avatarSource} />
            )}
          </View>
          <TouchableOpacity
            style={styles.pickerLink}
            onPress={this.selectPhotoTapped.bind(this, name, onChange)}
          >
            <Text style={[styles.pickerLinkText]}>Click here to Upload</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ImagePickerField;
