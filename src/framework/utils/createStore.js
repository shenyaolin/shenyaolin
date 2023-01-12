import EventBus from 'framework/utils/EventBus';

const allStores = [];
export default (storeName) => {
  let data = {};
  if (storeName) {
    const matchItem = allStores.find(item => item.storeName === storeName);
    if (matchItem) {
      return matchItem.store;
    }
  }
  const store = {
    clear: () => {
      data = {};
      store.eventBus.off('setData');
      store.eventBus.destroy();
      store.eventBus = new EventBus();
    },
    setData: (key, value) => {
      data[key] = value;
      store.eventBus.emit('setData');
    },
    getData: (key) => {
      return data[key];
    },
    eventBus: new EventBus()
  };
  if (storeName) {
    allStores.push({storeName, store});
  }
  return store;
}
