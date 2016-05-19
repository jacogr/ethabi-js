export function isArray (test) {
  return Object.prototype.toString.call(test) === '[object Array]';
}
