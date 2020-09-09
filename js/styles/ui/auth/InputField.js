// @flow
import React, { Component } from "react";
import { View } from "react-native";
import { isUndefined } from "util/core";

import OptionInput from "components/ui/forms/OptionInput";
import TextField from "./TextField";
import DatePicker from "components/ui/forms/DatePicker";
import Autocomplete from "components/ui/forms/Autocomplete";
import SwitchInput from "components/ui/forms/SwitchInput";
import CheckBoxList from "components/ui/forms/CheckBoxList";
import PasswordTextInput from "./PasswordTextInput";
import PhoneInput from "./PhoneInput2";

import styles from "styles/ui/form/field";

const elementTypeMap: { [string]: Object } = {
  OptionInput,
  TextField,
};

export default class InputField extends Component {
  static defaultProps = {
    elementType: "empty",
    schema: {},
    language: "",
    form: { name: "", data: {} },
    updateForm: {},
    error: {},
    onChange: () => {},
    placeholder: "",
    label: "",
  };

  render() {
    return <View>{this.renderElement()}</View>;
  }

  renderElement() {
    const {
      schema,
      elementType,
      error,
      form,
      language,
      data,
      onChangeText,
      renderItem,
      minDate,
      maxDate,
      value,
      dataSource,
      required,
      placeholder,
      label,
      editable,
      ...restProps
    } = this.props;

    const getErrorMessageKey = (meta) => {
      if (schema.multi_lang) {
        return `${meta}_${language}`;
      }
      return meta;
    };

    if (elementType !== "empty") {
      const ElementTag = elementTypeMap[elementType];
      if (elementType === "AutocompleteInput") {
        return (
          <Autocomplete
            {...restProps}
            label={schema.label}
            name={schema.name}
            error={error[schema.name]}
            required={schema.required}
            onChangeText={onChangeText}
            renderItem={renderItem}
            data={data}
            value={this.getInputValue(schema)}
          />
        );
      }
      return (
        <ElementTag
          {...restProps}
          error={error[schema.name]}
          name={schema.name}
          required={schema.required}
          label={schema.label}
        />
      );
    }

    switch (schema.type) {
      case "enum":
        const optionData = data || schema.enum.values || [];
        return (
          <OptionInput
            {...restProps}
            enabled={editable}
            data={optionData}
            name={schema.name}
            label={schema.label}
            error={error[schema.name]}
            required={schema.required}
            onChange={this.onChangeField.bind(this, schema)}
            value={this.getInputValue(schema)}
            dataSource={dataSource !== undefined ? dataSource : null}
          />
        );
      case "string":
        return (
          <TextField
            {...restProps}
            name={schema.name}
            editable={editable}
            label={schema.label}
            error={error[schema.name]}
            placeholder={placeholder}
            required={schema.required || required}
            onChange={this.onChangeField.bind(this, schema)}
            value={this.getInputValue(schema)}
          />
        );
      case "number":
        return (
          <TextField
            {...restProps}
            name={schema.name}
            error={error[schema.name]}
            required={schema.required}
            keyboardType={"numeric"}
            onChange={this.onChangeField.bind(this, schema)}
            value={this.getInputValue(schema)}
          />
        );
      case "password":
        return (
          <PasswordTextInput
            {...restProps}
            label={schema.label}
            name={schema.name}
            value={this.getInputValue(schema)}
            error={error}
            required={schema.required}
            locale={language}
            placeholder={placeholder}
            onChange={this.onChangeField.bind(this, schema)}
          />
        );
      case "timestamp":
        console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP", schema.label);
        return (
          <DatePicker
            {...restProps}
            label={schema.label}
            name={schema.name}
            error={error[schema.name]}
            required={schema.required}
            minDate={minDate}
            maxDate={maxDate}
            onChange={this.onChangeField.bind(this, schema)}
            value={value ? value : this.getInputValue(schema)}
          />
        );
      case "boolean":
        return (
          <OptionInput
            {...restProps}
            name={schema.name}
            error={error[schema.name]}
            required={schema.required}
            onChange={this.onChangeField.bind(this, schema)}
            data={this.props.data}
            value={this.getInputValue(schema)}
            dataSource={null}
          />
        );
      case "email":
        return (
          <TextField
            {...restProps}
            name={schema.name}
            label={schema.label}
            error={error[schema.name]}
            required={schema.required}
            placeholder={placeholder}
            onChange={this.onChangeField.bind(this, schema)}
            keyboardType={"email-address"}
            value={this.getInputValue(schema)}
          />
        );
      case "checkbox":
        return (
          <SwitchInput
            {...restProps}
            name={schema.name}
            error={error[schema.name]}
            required={schema.required}
            onChange={this.onChangeField.bind(this, schema)}
            value={this.getInputValue(schema)}
          />
        );
      case "array":
        return (
          <CheckBoxList
            {...restProps}
            data={data}
            name={schema.name}
            onChange={this.onChangeField.bind(this, schema)}
            value={this.getInputValue(schema)}
            required={schema.required}
            error={error[schema.name]}
            form={form}
          />
        );
      case "phoneNumber":
        return (
          <PhoneInput
            {...restProps}
            name={schema.name}
            editable={editable}
            label={schema.label}
            keyboardType={"numeric"}
            error={error[schema.name]}
            placeholder={placeholder}
            required={schema.required || required}
            onChange={this.onChangeField.bind(this, schema)}
            value={this.getInputValue(schema)}
            formData={form.data}
          />
        );
      default:
        return <View />;
    }
  }

  getInputValue(schema) {
    const { form, updateForm } = this.props;
    if (isUndefined(form.data[schema.name])) {
      return updateForm[schema.name];
    }
    return form.data[schema.name];
  }

  onChangeField(schema, name, value) {
    const { language } = this.props;
    const fieldName = schema.multi_lang ? `${name}_${language}` : name;
    this.props.onChange(fieldName, value);
  }

  getLabelByValue = (data, value) => {
    const filteredDataSet = data.filter((item) => {
      return item.value === value;
    });
    if (filteredDataSet.length > 0) {
      return filteredDataSet[0].label;
    }
    return "";
  };
}
