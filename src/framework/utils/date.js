import message from 'framework/utils/message';
/* eslint-disable */
export const formatDateStr = (str) => { //根据字符串得到年月日时分秒
  const [ymd = '', hms = ''] = str.split(' ');
  let [year, month, day] = ymd.split('-');
  let [hour, minutes, seconds] = hms.split(':');
  year = parseInt(year) || 0;
  month = (parseInt(month) || 1) - 1;
  day = parseInt(day) || 0;
  hour = parseInt(hour) || 0;
  minutes = parseInt(minutes) || 0;
  seconds = parseInt(seconds) || 0;
  return { year, month, day, hour, minutes, seconds };
};

export const numFormat = (num) => { //小于10的数字前面加0
  return num < 10 ? `0${num}` : `${num}`;
};

export const date2String = (date) => {
  const year = date.getFullYear();
  const month = numFormat(date.getMonth() + 1);
  const day = numFormat(date.getDate());
  const hour = numFormat(date.getHours());
  const minutes = numFormat(date.getMinutes());
  const seconds = numFormat(date.getSeconds());
  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
};

export const date3String = (date) => {
  const year = date.getFullYear();
  const month = numFormat(date.getMonth() + 1);
  const day = numFormat(date.getDate());

  return `${year}-${month}-${day}`;
};

export const date4String = (date) => {
  if (date) {
    const year = date.getFullYear();
    const month = numFormat(date.getMonth() + 1);
    return `${year}-${month}`;
  }
};

export const string2Date = (str) => {
  const { year, month, day, hour, minutes, seconds } = formatDateStr(str);
  const dt = new Date();
  dt.setFullYear(year);
  dt.setMonth(month);
  dt.setDate(day);
  dt.setHours(hour);
  dt.setMinutes(minutes);
  dt.setSeconds(seconds);
  dt.setMilliseconds(0);
  return dt;
};

// 获取间隔天数
export const diffDate = (start, end) => {
  let startTime = new Date(start); // 开始时间
  let endTime = new Date(end); // 结束时间
  if (endTime.getTime() - startTime.getTime() >= 0) {
    // console.log(endTime - startTime); // 毫秒数
    // console.log(Math.floor((endTime - startTime) / 1000)); // 秒数
    // console.log(Math.floor((endTime - startTime) / 1000 / 60)); // 分钟
    // console.log(Math.floor((endTime - startTime) / 1000 / 60 / 60)); // 小时
    // console.log(Math.floor((endTime - startTime) / 1000 / 60 / 60 / 24)); // 天数
    return Math.floor((endTime - startTime) / 1000 / 60 / 60 / 24) + 1;
  } else {
    message.toast('结束时间应大于开始时间');
  }
}