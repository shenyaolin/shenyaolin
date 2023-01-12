import {log} from 'framework/AppLayout/components/LogView'

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

const storage = {
  get(key) {
    const data = getData();
    const matchItem = data.find(item => item.key === key);
    return matchItem ? matchItem.value : null;
  },
  set(key, value) {
    const data = getData();
    let matchItem = data.find(item => item.key === key);
    if (matchItem) {
      matchItem.value = value;
    } else {
      matchItem = {key, value};
      data.push(matchItem);
    }
    setData(data);
  },
  remove(key) {
    storage.set(key, null);
  },
  preventClear(key) {
    const preventClearKeys = storage.get('preventClearKeys') || [];
    if (!preventClearKeys.includes(key)) {
      preventClearKeys.push(key);
    }
    storage.set('preventClearKeys', preventClearKeys);
    return storage;
  },
  clear() {
    const preventClearKeys = storage.get('preventClearKeys') || [];
    const data = [{key: 'preventClearKeys', value: preventClearKeys}];
    preventClearKeys.forEach(key => {
      const value = storage.get(key);
      data.push({key, value});
    });
    setData(data);
  },
  watch: (() => {
    return (key, time, callback) => {
      let lastValue = null;
      const index = setInterval(() => {
        const nowValue = storage.get(key);
        if (nowValue !== lastValue) {
          lastValue = nowValue;
          callback();
        }
      }, time);
      return index;
    };
  })(),
  stopWatch(watchIndex) {
    clearInterval(watchIndex);
  }
};

export default storage;
