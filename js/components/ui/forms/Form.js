import React from "react";

export default props => {
  return React.Children.map(props.children, (child, index) => {
    return React.cloneElement(child, {
      form: props.form,
      updateForm: props.updateForm
    });
  });
};
