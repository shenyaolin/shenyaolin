import React from "react";
import { Icon } from "antd-mobile";
import "./UploadItem.less";
import uuid from "framework/utils/uuid";
import videoUploadImg from "../../assets/images/video_upload.png";
import message from "framework/utils/message";
//
export default class extends React.Component {
  state = {
    id: `file-${uuid()}`,
    MAX_SIZE: 100,
    exts: ["mp4", "mov","avi"],
  };
  fileInput = React.createRef()
  typeMatch = (name = "") => {
    const { exts } = this.state;
    const ext = name.split(".").pop().toLocaleLowerCase();
    return exts.includes(ext);
  };

  handleChange = () => {
    const { MAX_SIZE } = this.state;
    const file = this.fileInput.current.files[0];
    console.log("file----", file);
    const { onFileChoose } = this.props;
    const { size, name } = file;
    if (size > MAX_SIZE * 1024 * 1024) {
      message.toast(`上传视频不能超过${MAX_SIZE}M`);
    } else if (!this.typeMatch(name)) {
      message.toast(`只能上传${this.state.exts.join(",")}文件`);
    } else {
      file && onFileChoose(file);
      this.setState({ id: `file-${uuid()}` });
    }
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
            {/* <i className="cjm-mobile-upload-item-width-line"></i>
            <i className="cjm-mobile-upload-item-height-line"></i> */}
            <img
              className="cjm-mobile-upload-icon-img"
              src={videoUploadImg}
              alt=""
            />
            <p className="cjm-mobile-upload-msg">添加视频</p>
          </React.Fragment>
        )}

        <div key={id} className="cjm-mobile-upload-item-cover">
          <input
            ref={this.fileInput}
            type="file"
            accept="video/*"
            id={id}
            onChange={this.handleChange}
          />
          <label htmlFor={id}></label>
        </div>
      </div>
    );
  }
}
