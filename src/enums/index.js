import Enums from 'framework/Enums';

const enums = [

  new Enums('茶叶种类').set('干茶', '1').set('茶青', '0'),
  new Enums('标签类型').set('250g', '250').set('100g', '100').set('50g', '50'),
  new Enums('单价类型').set('固定价格', '0').set('区间价格', '1').set('面议', '2'),
  new Enums('单价单位').set('天', '天').set('小时', '小时'),
  new Enums('提货方式').set('自提', '0').set('服务方配送', '1'),
  new Enums('产品名称').set('大佛龙井', '大佛龙井').set('天姥红茶', '天姥红茶').set('天姥云雾', '天姥云雾'),
  new Enums('客户类型').set('长久客户', '1').set('新进客户', '2'),
  new Enums('订单状态').set('意向客户', '0').set('已付款', '1').set('已发货', '2').set('已完结', '3'),
  new Enums('支付方式').set('线上支付', 0).set('欠款', 1).set('线下支付', 2).set('已完结', '3'),
  new Enums('身份选择').set('村委', 1).set('村民', 2),
  new Enums('发送方式').set('匿名', 1).set('实名', 2),
  new Enums('问题类型').set('意见建议', 1).set('办事服务', 2).set('环境卫生', 3).set('信访举报', 4).set('其他', 5),
];
export default enumsName => {
  return enums.find(item => item.is(enumsName));
};

export const getEnumsOption = (enumsName) => {
  const data = enums.find(item => item.is(enumsName)).data;
  const option = [];
  Object.keys(data).forEach(key => {
    option.push({ label: key, value: data[key] });
  })
  return option;
};