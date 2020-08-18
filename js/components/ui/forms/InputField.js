// @flow
import React, { Component } from "react";
import { View } from "react-native";
import { isUndefined } from "util/core";

import OptionInput from "components/ui/forms/OptionInput";
import TextField from "components/ui/forms/TextField";
import DatePicker from "components/ui/forms/DatePicker";
import Autocomplete from "components/ui/forms/Autocomplete";
import SwitchInput from "components/ui/forms/SwitchInput";
import CheckBoxList from "components/ui/forms/CheckBoxList";
import PasswordTextInput from "components/ui/PasswordTextInput";
import SearchablePicker from "components/ui/forms/SearchablePicker";
import MultiSelectDropDown from "components/ui/forms/MultiSelectDropDown";
import ButtonGroup from "components/ui/forms/ButtonGroup";
import DateRangePicker from "components/ui/forms/DateRangePicker";
import Rating from "components/ui/forms/Rating";

import styles from "styles/ui/form/field";

const elementTypeMap = {
  OptionInput,
  TextField
};

export default class InputField extends Component {
  static defaultProps = {
    elementType: "empty",
    schema: {},
    language: "",
    form: { name: "", data: {} },
    updateForm: {},
    error: {},
    onChange: () => { },
    label: ""
  };

  render() {
    return <View style={styles.componentArea}>{this.renderElement()}</View>;
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
            label={schema.label}
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
            onChange={this.onChangeField.bind(this, schema)}
          />
        );
      case "timestamp":
        return (
          <DatePicker
            {...restProps}
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
            onChange={this.onChangeField.bind(this, schema)}
            keyboardType={"email-address"}
            value={this.getInputValue(schema)}
          />
        );
      case "checkbox":
        return (
          <SwitchInput
            {...restProps}
            label={schema.label}
            name={schema.name}
            error={error[schema.name]}
            required={schema.required}
            defaultValue={schema.default}
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
      case "searchablePicker":
        const dropdownValues = data || schema.enum.values || [];
        return (
          <SearchablePicker
            {...restProps}
            enabled={editable}
            data={dropdownValues}
            name={schema.name}
            label={schema.label}
            error={error[schema.name]}
            required={schema.required}
            onChange={this.onChangeField.bind(this, schema)}
            value={this.getInputValue(schema)}
            dataSource={dataSource !== undefined ? dataSource : null}
          />
        );
      case "button_group":
        return (
          <ButtonGroup
            {...restProps}
            name={schema.name}
            label={schema.label}
            buttons={schema.values}
            data={form.data[schema.name]}
            onChange={this.onChangeField.bind(this, schema)}
          />
        );
      case "multiselect_dropdown":
        if(schema.name === 'types') {
          if(form.data.propertyId && form.data.propertyId !== '0'){
            return (
              <MultiSelectDropDown
                {...restProps}
                name={schema.name}
                label={schema.label}
                data={form.data[schema.name]}
                onChange={this.onChangeField.bind(this, schema)}
              />
            );
          } else {
            return <View />;
          }
        } else {
          return (
            <MultiSelectDropDown
              {...restProps}
              name={schema.name}
              label={schema.label}
              data={form.data[schema.name]}
              onChange={this.onChangeField.bind(this, schema)}
            />
          );
        }
      case "date_range":
        return (
          <DateRangePicker
            {...restProps}
            name={schema.name}
            label={schema.label}
            data={isUndefined(form.data[schema.name]) ? {
              from: '',
              to: ''
            } : form.data[schema.name]}
            onChange={this.onChangeField.bind(this, schema)}
          />
        );
      case "rating":
        return (
          <Rating
            {...restProps}
            name={schema.name}
            label={schema.label}
            data={form.data[schema.name]}
            onChange={this.onChangeField.bind(this, schema)}
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
    const filteredDataSet = data.filter(item => {
      return item.value === value;
    });
    if (filteredDataSet.length > 0) {
      return filteredDataSet[0].label;
    }
    return "";
  };
}
