import React from 'react';

const InputField = ({
  name,
  label,
  value,
  type = 'text',
  onChange,
  ...rest
}) => (
  <div className="text-field">
    <label htmlFor={name}>{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      {...rest}
    />
  </div>
);

export default InputField;
