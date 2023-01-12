export default function (jsonObj, defaultRes = '{}') {
  let res = null;
  try {
    res = JSON.stringify(jsonObj);
  } catch (err) {
    res = defaultRes;
  }
  return res;
}