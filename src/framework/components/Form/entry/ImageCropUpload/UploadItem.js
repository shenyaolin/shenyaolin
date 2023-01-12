import React from 'react';
import { Icon } from 'antd-mobile'
import './UploadItem.less';
import uuid from 'framework/utils/uuid';
//
export default class extends React.Component {
  state = {
    id: `file-${uuid()}`,
  };

  handleChange = () => {
    const file = this.refs.fileInput.files[0];
    const { onFileChoose } = this.props;
    file && onFileChoose(file);
    this.setState({ id: `file-${uuid()}` });
  };

  render() {
    const { id } = this.state;
    const { uploading } = this.props;
    return (
      <div className="cjm-mobile-upload-item">
        {uploading ? (
          <Icon type="loading" />
        ) : (
          <React.Fragment>
            <i className="cjm-mobile-upload-item-width-line"></i>
            <i className="cjm-mobile-upload-item-height-line"></i>
          </React.Fragment>
        )}

        <div key={id} className="cjm-mobile-upload-item-cover">
          <input ref="fileInput" type="file" accept="image/*" id={id} onChange={this.handleChange} />
          <label htmlFor={id}></label>
        </div>
      </div>
    )
  }
}
