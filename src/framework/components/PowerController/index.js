import React from 'react';
import storage from 'framework/utils/storage';

/**
 *
 * 用法：
 * import React from 'react';
 * import Button from 'framework/components/Button';
 * import Link from 'framework/components/Link';
 * import PowerController from 'framework/components/PowerController';
 *
 * export default class extends React.Component {
 *   render(){
 *     return (
 *        <div>
 *          <PowerController powerCode="链接的权限码">
 *            <Link href="/a/b/c">链接</powerLink>
 *          </PowerController>
 *
 *          <PowerController powerCode="添加按钮的权限码">
 *            <Button>添加按钮</powerButton>
 *          </PowerController>
 *        </div>
 *     );
 *   }
 * }
 *
 * */

//
export default class extends React.Component {

  getAllPowers = () => {
    const powers = storage.get('powers');
    return Array.isArray(powers) ? powers : [];
  };

  render() {
    const {powerCode, children} = this.props;
    const allPowers = this.getAllPowers();
    const hasPower = powerCode ? allPowers.includes(powerCode) : true;
    return hasPower ? (
      <React.Fragment>{children}</React.Fragment>
    ) : null;
  }
}
