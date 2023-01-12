export const body = document.body;

export function classList(dom) {
  return dom.className
    .split(' ')
    .map(className => className.trim())
    .filter(className => className.length > 0);
}

export function addClass(dom, className) {
  if (!hasClass(dom, className)) {
    dom.className = classList(dom)
      .concat([className])
      .join(' ');
  }
  return dom;
}

export function removeClass(dom, className) {
  if (hasClass(dom, className)) {
    dom.className = classList(dom)
      .filter(_className => _className !== className)
      .join(' ');
  }
  return dom;
}

export function hasClass(dom, className) {
  return classList(dom).includes(className);
}

export function filterDomsByClassName(dom, className) {
  const result = [];
  const filterDoms = dom.querySelectorAll(`.${className}`);
  for (let i = 0, len = filterDoms.length; i < len; i++) {
    result.push(filterDoms[i]);
  }
  return result;
}
