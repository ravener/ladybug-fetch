
/**
 * Utilities used by the library
 * @static
 */
class Utils {

  /**
   * Merges an object's properties to the other
   * @param {Object} base - The base object
   * @param {...Object} merge - The objects to merge with base
   * @returns {Object}
   * @example
   * const obj = { key: "value" };
   * const two = { foo: "bar" };
   * const merged = mergeObject(obj, two); // merge two's properties to obj
   * console.log(merged.foo); // => bar
   * console.log(merged.key); // => value
   * console.log(obj.foo); // => undefined, uses a clone without touching the object
   */
  static mergeObjects(base = {}, ...merge) {
    const clone = Object.assign(Object.create(base), base);
    for(const obj of merge) {
      for(const [key, value] of Object.entries(obj)) {
        if(typeof clone[key] === "object" && typeof value === "object") {
          clone[key] = Utils.mergeObjects(clone[key], value);
        } else {
          clone[key] = value;
        }
      }
    }
    return clone;
  }

  static isPromise(p) {
    if(!p) return false;
    return p instanceof Promise || typeof p.then === "function" && typeof p.catch === "function";
  }

  static clone(obj) {
    return Object.assign(Object.create(obj), obj);
  }
  
  static isAbsoluteURL(str) {
    return /^[a-z][a-z0-9+.-]*:/.test(str);
  }

  static URLJoin(...args) {
    return args
      .join("/")
      .replace(/[\/]+/g, "/") // eslint-disable-line no-useless-escape
      .replace(/^(.+):\//, "$1://")
      .replace(/^file:/, "file:/")
      .replace(/\/(\?|&|#[^!])/g, "$1")
      .replace(/\?/g, "&")
      .replace("&", "?");
  }
  
  static isRedirect(code) {
    return ~[301, 302, 303, 305, 307, 308].indexOf(code);
  }
}

module.exports = Utils;
