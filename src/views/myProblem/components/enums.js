import Enums from 'framework/Enums';

const enums = [
    new Enums('进度状态').set('已提交', '1').set('已受理', '2').set('已办结', '3'),

];

export default enumsName => {
    return enums.find(item => item.is(enumsName));
};
