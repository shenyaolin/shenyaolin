import Enums from 'framework/Enums';

const enums = [
    new Enums('事件纠纷').set('矛盾纠纷事件', '1').set('安全隐患事件', '2').set('环境卫生事件', '3').set('道路安全事件', '4').set('疫情防控事件', '5').set('消防安全事件', '6').set('食品安全事件', '7'),
    new Enums('问题类型').set('意见建议', '1').set('办事服务', '2').set('环境卫生', '3').set('信访举报', '4').set('其他', '5'),
    new Enums('巡检任务').set('重点户帮扶', '1').set('重点户看望', '2').set('重点户巡检', '3'),

];

export default enumsName => {
    return enums.find(item => item.is(enumsName));
};
