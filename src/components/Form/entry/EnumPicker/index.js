import React from 'react';
import Picker from '../Picker';
//
export default class extends React.Component {
  render() {
    const { value, placeholder = '请选择', enums, onChange, readonly, optionsVal,disabled } = this.props;
    const options = optionsVal ? optionsVal : Object.keys(enums.getData()).map(key => ({ label: key, value: enums.get(key) }));
    const finalProps = { options, value, onChange, placeholder, readonly,disabled };
    return <Picker {...finalProps} />
  }
}
