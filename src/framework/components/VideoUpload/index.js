import React from "react";
import ImageItem from "./ImageItem";
import UploadItem from "./UploadItem";
import imageCompress, { getImgByteSize } from "framework/utils/imageCompress";
import videoFormPost from "framework/utils/videoFormPost";
import ImageCoverView from "./ImageCoverView";
import uuid from "framework/utils/uuid";
import classNames from "classnames";
import "./index.less";
//
export default class extends React.Component {
  state = {
    uploading: false,
    id: `image-upload-${uuid()}`,
  };
  view = React.createRef();

  getImages = () => {
    const { value } = this.props;
    if (Array.isArray(value)) {
      return value;
    } else if (typeof value === "string") {
      // return value;
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
    const { onChange, value } = this.props;
    console.log(value);

    const imgData = await imageCompress(file);
    const imgSize = await getImgByteSize(imgData);
    const imgId = await videoFormPost(imgData);
    const images = this.getImages();
    if (typeof value === "string") {
      onChange(imgId, imgSize);
    } else if (Array.isArray(value)) {
      onChange([...images, imgId]);
    } else {
      onChange("");
    }
  };

  triggerFileChoose = () => {
    const { id } = this.state;
    const fileInput = document.querySelector(
      `#${id} .cjm-mobile-upload-item-cover input`
    );
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
      this.view.current.show({ images, index, noCompress: true });
    };
  };

  render() {
    const images = this.getImages();
    const { readonly, disabled, className } = this.props;
    const { uploading, id } = this.state;
    return (
      <React.Fragment>
        <div
          id={id}
          className={classNames(
            "cjm-mobile-image-upload",
            readonly && "readonly",
            className
          )}
        >
          <div className="cjm-mobile-image-upload-item-group">
            {images.map((item, index) => {
              const props = {
                key: `${index}-${index}`,
                src: item,
                readonly,
                disabled,
                onClick: this.handleImageClick(index),
                onRemove: this.handleImageRemove(index),
              };
              return <ImageItem {...props} />;
            })}
            {this.addEnable && (
              <UploadItem
                uploading={uploading}
                onFileChoose={this.handleFileChoose}
              />
            )}
          </div>
        </div>
        <ImageCoverView ref={this.view} />

      </React.Fragment>
    );
  }
}
