import React from 'react';
import imageSrc from 'framework/utils/imageSrc';
import './ImageItem.less';
import removeIcon from 'assets/images/remove-icon.png';
//
export default class extends React.Component {
  handleRemoveIconClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { onRemove } = this.props;
    onRemove && onRemove();
  };

  render() {
    const { src, onClick, readonly, disabled } = this.props;
    return (
      <div className="cjm-mobile-up-image-item" onClick={onClick}>
        <img src={imageSrc(src)} />
        {/* {!(readonly || disabled) && <i className="remove-icon" onClick={this.handleRemoveIconClick}></i>} */}
        {!(readonly || disabled) && <img src={removeIcon} className="remove-icon" onClick={this.handleRemoveIconClick} />}
      </div>
    )
  }
}
