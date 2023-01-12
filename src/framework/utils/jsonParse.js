export default function (jsonStr, defaultRes = {}) {
  let res = null;
  try {
    res = JSON.parse(jsonStr);
  } catch (err) {
    res = defaultRes;
  }
  return res;
}