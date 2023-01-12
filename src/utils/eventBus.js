/**
 * import eventBus from
 * //绑定事件
 * const callback=()=>{
 *  console.log('event-trigger');
 * }
 * eventBus.on('eventName',callback);
 * //触发事件
 * eventBus.emit('eventName');
 * //解除所有eventName事件
 * eventBus.off('eventName');
 * //解除指定回调的eventName事件
 * eventBus.off('eventName',callback);
 * */
const defaultCallback = () => {};
export class EventBus {
  constructor() {
    this.eventList = [];
  }

  on(eventName, callback) {
    this.eventList.push({ eventName, callback });
  }

  emit(eventName, params) {
    const matchEvents = this.eventList.filter(eventItem => eventItem.eventName === eventName);
    matchEvents.forEach(eventItem => {
      const { callback = defaultCallback } = eventItem;
      callback(params);
    });
  }

  off(eventName, callback) {
    this.eventList = this.eventList.filter(eventItem => {
      if (eventItem.eventName === eventName) {
        if (typeof callback !== 'function') {
          return false;
        }
        if (typeof callback === 'function' && eventItem.callback === callback) {
          return false;
        }
      }
      return true;
    });
  }

  destroy() {
    this.eventList = [];
  }
}
export default new EventBus();
