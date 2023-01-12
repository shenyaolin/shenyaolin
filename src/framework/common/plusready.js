export default (plusreadyCallback, noPlusCallback) => {
  let ready = false;
  if (window.plus) {
    ready = true;
    plusreadyCallback();
  } else {
    document.addEventListener('plusready', () => {
      ready = true;
      plusreadyCallback();
    }, false);
  }
  setTimeout(() => {
    if (!ready) {
      noPlusCallback && noPlusCallback();
    }
  }, 2500)
}