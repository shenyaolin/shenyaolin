import { EventBus } from './eventBus';
const storageKey = 'superCodeStorage';
function getData() {
  let data = [];
  try {
    data = JSON.parse(localStorage.getItem(storageKey) || '[]');
  } catch (err) {
    console.error(err);
  }
  return data;
}

function setData(data) {
  const emptyMatch = [undefined, null];
  const realData = data.filter(item => !emptyMatch.includes(item.value));
  localStorage.setItem(storageKey, JSON.stringify(realData));
}
export function set(key, value) {
  const data = getData();
  let matchItem = data.find(item => item.key === key);
  if (matchItem) {
    matchItem.value = value;
  } else {
    matchItem = { key, value };
    data.push(matchItem);
  }
  setData(data);
}
export function get(key) {
  const data = getData();
  const matchItem = data.find(item => item.key === key);
  return matchItem ? matchItem.value : null;
}
export function remove(key) {
  set(key, null);
}
export function clear() {
  setData([]);
}
//
function str2Data(str) {
  let data = {};
  try {
    const _data = JSON.parse(str);
    _data.forEach(({ key, value }) => {
      data[key] = value;
    });
  } catch (err) {
  }
  return data;
}
//监听storage的修改
export const storageEvent = (() => {
  const sEvent = new EventBus();
  let oldStr = localStorage.getItem(storageKey);
  setInterval(() => {
    const nowStr = localStorage.getItem(storageKey);
    if (oldStr !== nowStr) { //storage被修改
      const oldData = str2Data(oldStr);
      const newData = str2Data(nowStr);
      sEvent.emit('change', { oldData, newData });
      oldStr = nowStr;
    }
  }, 2000);
  return sEvent;
})();
