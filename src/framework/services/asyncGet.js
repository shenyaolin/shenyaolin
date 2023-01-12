import { setQuery } from 'framework/utils/url';
import { prefix } from 'framework/config';

export default function (url, data) {
  console.log(window)
  let results = null;
  let xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else{
    xmlhttp = new window.ActiveXObject('Microsoft.XMLHTTP');
  }
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      results = xmlhttp.responseText;
      try {
        results = JSON.parse(results);
      } catch (err) {

      }
    }
  };
  const sendUrl = setQuery(`${prefix}${url}`, data);
  xmlhttp.open('GET', sendUrl, false);
  xmlhttp.send();
  return results;
}