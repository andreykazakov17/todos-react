import React, { Component } from 'react';

import './Input.scss';

const variant = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
};

const mapVariantToClass = {
  [variant.PRIMARY]: 'primary',
  [variant.SECONDARY]: 'secondary',
};

class ListItemInput extends Component {
  constructor(props) {
    super(props);
    this.elemRef = React.createRef();
  }

  componentDidMount() {
    const { isFocus } = this.props;

    if (isFocus) {
      this.elemRef.current.focus();
    }
  }

  render() {
    const { id, placeholder, value, defaultValue, variant, onChange, onBlur } = this.props;

    return (
      <input
        ref={this.elemRef}
        type="text"
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        className={`todo-input ${variant ? mapVariantToClass[variant] : ''}`}
        onBlur={() => {
          if (variant === 'secondary') {
            onBlur();
          }
        }}
        onChange={(e) => {
          if (variant === 'secondary') {
            onChange(id, e.target.value);
          }
          onChange(e);
        }}
      />
    );
  }
}

export default ListItemInput;
