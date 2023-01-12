import React, { memo } from 'react';
import styles from '../index.less';

document.title = "积分规则"
export default memo(() => {
    return (
        <div className={styles.ruleContainer}>
            <div className={styles.title}>一、什么是积分？</div>
            <div className={styles.content}>积分是郝享未来平台推出的村民增值服务，登录账户认证身份后可加入积分体系，您在对应的应用获取指定积分并累加积分，积分不可兑换现金，不可转让。</div>
            <div className={styles.title}>二、如何获取积分？</div>
            <div className={styles.content}>1、积分可通过日常签到获取，每签到一次获取1个积分。</div>
            <div className={styles.content}>2、积分可通过完成日常任务，获取指定积分，日常任务每天只能完成一次。</div>
            <div className={styles.content}>3、发布随手拍，发布成功后获取2个积分。发布乡邻圈动态获取2个积分。浏览任意应用获取1个积分。</div>
            <div className={styles.content}>4、发布信息上报需意见被采纳才可以获取积分，未采纳则不能获取积分，采纳后可获得2个积分。</div>
            <div className={styles.title}>三、如何使用积分兑换商品？</div>
            <div className={styles.content}>1、在花积分模块展示可兑换的商品。</div>
            <div className={styles.content}>2、每个商品会显示需要多少积分可兑换，用户根据自己的积分情况选择适合的商品进行兑换。</div>
            <div className={styles.title}>四、兑换记录如何查询？</div>
            <div className={styles.content}>1、通过积分兑换商品，兑换成功后，会生成兑换凭证，用户可通过兑换凭证前往指定商家进行兑换。</div>
            <div className={styles.content}>2、用户通过“我的积分”——“兑换记录”查看兑换的商品记录。</div>
            <div className={styles.title}>五、积分有效期</div>
            <div className={styles.content}>1、用户获得的积分有效期为自获得当月的12个自然月，有效期内未使用的积分到期将自动作废。</div>
            <div className={styles.content}>2、例：您在2021年5月5日获取10个积分，该笔积分有效期至2022年5月31日23:59:59。</div>
        </div >
    )
})