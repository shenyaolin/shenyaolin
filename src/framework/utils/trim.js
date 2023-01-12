export default function (str) {
  if (typeof str === 'string') {
    return str.replace(/^\s*|\s*$/g, '');
  }
  return str;
}