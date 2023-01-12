import React from "react";
import config from "config";
import "./ImageItem.less";
//

const video1Domain = config.video1Domain;
export default class extends React.Component {
  handleRemoveIconClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { onRemove } = this.props;
    onRemove && onRemove();
  };

  getVideoUrl = (fileId) => {
    // const valueObj = this.getValueObj();
    // const { fileId } = valueObj;
    return fileId ? `${video1Domain}/${fileId}` : "";
  };

  render() {
    const { src, onClick, readonly, disabled } = this.props;
    return (
      <div className="cjm-mobile-up-image-item" onClick={onClick}>
        {/* <img src={`${fileDomain}/${src}`} alt=''/> */}
        <video poster={`${video1Domain}/${src}?vframe/jpg/offset/1`} src={this.getVideoUrl(src)}></video>
        {!(readonly || disabled) && (
          <i className="remove-icon" onClick={this.handleRemoveIconClick}></i>
        )}
        {
          <i className="open-icon"></i>
        }
      </div>
    );
  }
}
