function trim(str) {
  return str.replace(/^\s*|\s*$/g, '');
}

export default () => {
  const ck = {};
  document.cookie.split(';').forEach(item => {
    const [key, value] = trim(item).split('=');
    ck[key] = value;
  });
  return ck;
}