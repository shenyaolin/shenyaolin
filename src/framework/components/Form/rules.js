import _ from 'lodash';
import trim from 'framework/utils/trim';
//
export const rules = {
  required: {
    validator: (rule, value, callback) => {
      const err = new Error('该项为必填项');
      if (typeof value === 'string' && trim(value) === '') {
        return callback(err);
      }
      if (value === '' || value === null || value === undefined) {
        return callback(err);
      }
      if (Array.isArray(value) && value.length === 0) {
        return callback(err);
      }
      return callback();
    }
  },
  requiredMessage(name) {
    return {
      validator: (rule, value, callback) => {
        const err = new Error(`${name}为必填项`);
        if (typeof value === 'string' && trim(value) === '') {
          return callback(err);
        }
        if (value === '' || value === null || value === undefined) {
          return callback(err);
        }
        if (Array.isArray(value) && value.length === 0) {
          return callback(err);
        }
        return callback();
      }
    }
  },
  // 最小长度
  minLength(length) {
    return {
      validator: (rule, value, callback) => {
        if (_.get(value, 'length') < length) {
          return callback(new Error(`最少输入${length}个字符`));
        }
        return callback();
      }
    };
  },
  maxLength(length) {
    return {
      validator: (rule, value, callback) => {
        if (_.get(value, 'length') > length) {
          return callback(new Error(`最多输入${length}个字符`));
        }
        return callback();
      }
    };
  },
  maxLengthMessage(length, name){
    return {
      validator: (rule, value, callback) => {
        console.log(_.get(value, 'length'))
        if (_.get(value, 'length') > length) {
          return callback(new Error(`${name}最多输入${length}个字符`));
        }
        return callback();
      }
    };
  },
  // 整数
  int: {
    validator: (rule, value, callback) => {
      if (value === '' || value === null || value === undefined) {
        return callback();
      }
      const reg = /^\-?\d+?$/;
      if (!reg.test(value)) {
        return callback(new Error('请输入整数'));
      }
      if (value > Math.pow(2, 31) || value < -Math.pow(2, 31)) {
        return callback(new Error('您输入的数字太大啦'));
      }
      return callback();
    },
    trigger: 'blur'
  },
  // 整数
  intMessage(name){
    return {
      validator: (rule, value, callback) => {
        if (value === '' || value === null || value === undefined) {
          return callback();
        }
        const reg = /^\-?\d+?$/;
        if (!reg.test(value)) {
          return callback(new Error(`${name}应为整数`));
        }
        if (value > Math.pow(2, 31) || value < -Math.pow(2, 31)) {
          return callback(new Error('您输入的数字太大啦'));
        }
        return callback();
      },
      trigger: 'blur'
    }
  },
  number: {
    validator: (rule, value, callback) => {
      if (typeof value === 'string' || typeof value === 'number') {
        if (value !== '' && isNaN(value)) {
          return callback(new Error('请输入数字'));
        }
      }
      return callback();
    },
    trigger: 'blur'
  },
  // 正整数
  intPositive: {
    validator: (rule, value, callback) => {
      if (value === "" || value === null || value === undefined) {
        return callback();
      }
      const reg = /^\+?[1-9]\d*$/;
      if (!reg.test(value)) {
        return callback(new Error("请输入正整数"));
      }
      
      return callback();
    },
    trigger: "blur"
  },
  // 范围内的数字
  numberRange(min, max) {
    return {
      validator: (rule, value, callback) => {
        if (value === '' || value === null || value === undefined) {
          return callback();
        }
        const reg = /^\-?\d+(\.\d+)?$/;
        if (!reg.test(value)) {
          return callback(new Error('请输入数字'));
        }
        if (min !== undefined && min !== null && value < min) {
          return callback(new Error(`请输入大于${min}的数字`));
        }
        if (max !== undefined && max !== null && value > max) {
          return callback(new Error(`请输入小于${max}的数字`));
        }
        if (value > Math.pow(2, 31) || value < -Math.pow(2, 31)) {
          return callback(new Error('您输入的数字太大啦'));
        }
        return callback();
      },
      trigger: 'blur'
    };
  },
  // 范围内的小数支持后俩位
  numberTwo(min, max) {
    return {
      validator: (rule, value, callback) => {
        if (value === '' || value === null || value === undefined) {
          return callback();
        }
        const reg = /^\-?\d+(\.\d+)?$/;
        const text = /^(\d+|\d+\.\d{1,2})$/;
        if (min !== undefined && min !== null && value < min) {
          return callback(new Error(`请输入大于等于${min}的数字`));
        }
        if (!text.test(value)) {
          return callback(new Error('最多保留小数点后2位'));
        }
        if (!reg.test(value)) {
          return callback(new Error('请输入数字'));
        }
        if (max !== undefined && max !== null && value > max) {
          return callback(new Error(`请输入小于${max}的数字`));
        }
        if (value > Math.pow(2, 31) || value < -Math.pow(2, 31)) {
          return callback(new Error('您输入的数字太大啦'));
        }
        return callback();
      },
      trigger: 'blur',
    };
  },
  // 范围内的小数支持后俩位
  numberTwoMessage(name, min, max) {
    return {
      validator: (rule, value, callback) => {
        if (value === '' || value === null || value === undefined) {
          return callback();
        }
        const reg = /^\-?\d+(\.\d+)?$/;
        const text = /^(\d+|\d+\.\d{1,2})$/;
        if (min !== undefined && min !== null && value < min) {
          return callback(new Error(`${name}应为大于${min}的数字`));
        }
        if (!text.test(value)) {
          return callback(new Error(`${name}最多保留小数点后2位`));
        }
        if (!reg.test(value)) {
          return callback(new Error(`${name}应为数字`));
        }
        if (max !== undefined && max !== null && value > max) {
          return callback(new Error(`${name}应为小于${max}的数字`));
        }
        if (value > Math.pow(2, 31) || value < -Math.pow(2, 31)) {
          return callback(new Error('您输入的数字太大啦'));
        }
        return callback();
      },
      trigger: 'blur',
    };
  },
  phone: {
    validator: (rule, value, callback) => {
      if (value === '' || value === null || value === undefined) {
        return callback();
      }
      const reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
      if (!reg.test(value)) {
        return callback(new Error('请输入正确的手机号'));
      }
      return callback();
    },
    trigger: 'blur'
  },
  // 手机号或者固定电话
  phoneOrMobile: {
    // validator: (rule, value, callback) => {
    //   if (value === '' || value === null || value === undefined) {
    //     return callback();
    //   }
    //   const reg1 = /(^(0\d{2})-(\d{8})$)|(^(0\d{3})-(\d{7})$)|(^(0\d{3})-(\d{8})$)|(^(0\d{2})-(\d{8})-(\d+)$)|(^(0\d{3})-(\d{7})-(\d+)$)|(^(\d{7})$)|(^(\d{8})$)/;
    //   const reg2 = /^1[3|4|5|6|7|8|9]\d{9}$/;
    //   if (!reg1.test(value) && !reg2.test(value)) {
    //     return callback(new Error('请输入正确的手机号或电话号码'));
    //   }
    //   return callback();
    // },
    // trigger: 'blur'
    validator: (rule, value, callback) => {
      if (value === "" || value === null || value === undefined) {
        return callback();
      }
      const reg0 = /^0\d{2,3}\d{7,8}$/;
      const reg1 = /^0\d{2,3}-\d{7,8}$/;
      const reg2 = /^1[3|4|5|6|7|8|9]\d{9}$/;
      if (!reg0.test(value) && !reg1.test(value) && !reg2.test(value)) {
        return callback(new Error("请输入正确的手机号或电话号码"));
      }
      return callback();
    },
    trigger: "blur"
  },
  // 统一信用代码（18位数字与大写字母组合）
  socUnifiedCreditCode: {
    validator: async (rule, value, callback) => {
      if (value === "" || value === null || value === undefined) {
        return callback();
      }
      const reg = /[0-9A-Z]{18}/;
      if (!reg.test(value) || value.length > 18) {
        return callback(
          new Error("请输入正确的统一信用代码（18位数字与大写字母组合）")
        );
      }
      return callback();
    },
    trigger: "blur"
  },
  // 身份证号
  idCardNumber: {
    validator: (rule, value, callback) => {
      if (value === "" || value === null || value === undefined) {
        return callback();
      }
      const reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if (!reg.test(value)) {
        return callback(new Error("请输入正确的身份证号码"));
      }
      return callback();
    },
    trigger: "blur"
  },
};
export default rules;
