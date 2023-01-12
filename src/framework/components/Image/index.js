import React from 'react';
import frameworkConfig from 'framework/config';
import imageSrc from 'src/framework/utils/imageSrc';

export default class extends React.Component {

  getSrc = () => {
    const {
      src, imgId, config,
      fileDomain = frameworkConfig.fileDomain
    } = this.props;
    if (src) {
      return src;
    } else if (imgId) {
      return imageSrc(imgId, fileDomain, config);
    }
  };


  objDel = (obj, field) => {
    const newObj = {};
    Object.keys(obj).forEach(key => {
      key !== field && (newObj[key] = obj[key]);
    });
    return newObj;
  };
  getProps = () => {
    const finalProps = this.objDel(this.props, 'imgId');
    finalProps.src = this.getSrc();
    return finalProps;
  };

  render() {
    const props = this.getProps();
    return (
      <img {...props} />
    );
  }
}
