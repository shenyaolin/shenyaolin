import React from 'react';
import ImageItem from './ImageItem';
import UploadItem from './UploadItem';
import imageCompress from 'framework/utils/imageCompress';
import imageFormPost from 'framework/utils/imageFormPost';
import ImageCoverView from 'framework/components/ImageCoverView';
import uuid from 'framework/utils/uuid';
import classNames from 'classnames';
import './index.less';
//
export default class extends React.Component {
  state = {
    uploading: false,
    id: `image-upload-${uuid()}`
  };

  getImages = () => {
    const { value } = this.props;
    if (Array.isArray(value)) {
      return value;
    } else if (typeof value === 'string') {
      return value ? [value] : [];
    }
    return [];
  };

  get addEnable() {
    const { maxLength = 1, readonly, disabled } = this.props;
    if (readonly || disabled) {
      return false;
    }
    const images = this.getImages();
    return images.length < maxLength;
  }

  handleFileChoose = async (file) => {
    this.setState({ uploading: true });
    const { onChange, value, maxLength } = this.props;
    const imgData = await imageCompress(file, { width: 1500, height: 1500 });
    const imgId = await imageFormPost(imgData);
    const images = this.getImages();
    if (typeof value === 'string') {
      onChange(imgId);
    } else if (Array.isArray(value)) {
      if (images.length < maxLength) { onChange([...images, imgId]) }
    } else {
      onChange('');
    }
    this.setState({ uploading: false });
  };



  triggerFileChoose = () => {
    const { id } = this.state;
    const fileInput = document.querySelector(`#${id} .cjm-mobile-upload-item-cover input`);
    fileInput && fileInput.click();
  };

  handleImageRemove = (index) => {
    return () => {
      const { onChange } = this.props;
      const images = this.getImages();
      const value = images.filter((img, imgIndex) => imgIndex !== index);
      onChange(value);
    };
  };
  handleImageClick = (index) => {
    return () => {
      const images = this.getImages();
      this.refs.view.show({ images, index });
    };
  };

  render() {
    const images = this.getImages();
    const { readonly, disabled } = this.props;
    const { uploading, id } = this.state;
    return (
      <React.Fragment>
        <div id={id} className={classNames('cjm-mobile-image-upload', readonly && 'readonly')}>
          <div className="cjm-mobile-image-upload-item-group">
            {images.map((item, index) => {
              const props = {
                key: `${index}-${index}`, src: item, readonly, disabled,
                onClick: this.handleImageClick(index),
                onRemove: this.handleImageRemove(index),
              };
              return <ImageItem {...props} />
            })}
            {this.addEnable && <UploadItem uploading={uploading} onFileChoose={this.handleFileChoose} />}
          </div>
        </div>
        <ImageCoverView ref="view" />
      </React.Fragment>
    )
  }
}
