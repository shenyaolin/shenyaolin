const data = [];
export default {
  get(key){
    const matchItem = data.find(item => item.key === key);
    if (matchItem) {
      return matchItem.value;
    }
  },
  set(key, value){
    const matchItem = data.find(item => item.key === key);
    if (matchItem) {
      matchItem.value = value;
    } else {
      data.push({key, value});
    }
  }
}