import sleep from './sleep';
function getMessageStr(msg) {
  if (typeof msg === 'object' && msg.message) {
    return msg.message;
  }
  return msg;
}
function clearToast() {
  const toasts = document.querySelectorAll('.cjm-mobile-toast');
  for (let i = 0, len = toasts.length; i < len; i++) {
    document.body.removeChild(toasts[i]);
  }
}

export default {
  toast: (() => {
    return async (message, time = 3000) => {
      clearToast();
      const toastDiv = document.createElement('div');
      toastDiv.setAttribute('class', 'cjm-mobile-toast');
      toastDiv.innerHTML = getMessageStr(message);
      toastDiv.style.zIndex = 2000;
      document.body.appendChild(toastDiv);
      await sleep(time);
      toastDiv.setAttribute('class', 'cjm-mobile-toast cjm-mobile-toast-hide-animate');
      await sleep(200);
      toastDiv.setAttribute('class', 'cjm-mobile-toast cjm-mobile-toast-hide');
    }
  })()
};