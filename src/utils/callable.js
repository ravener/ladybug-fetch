
/**
 * A simple function that does some prototype magic extend this in your classes
 * to make your class instance callable and pointing to a method in it
 * the library uses this to make the instance callable defaulting to a method
 * choosen in options so you don't need to specify the method name
 * but you may use it in your apps too if you wish.
 * @param {String} prop - The property name for the function
 * @example
 * class MyClass exrends Callable {
 *   constructor() {
 *     super("method");
 *   }
 *
 *   method() {
 *     return "method!";
 *   }
 *
 *   another() {
 *     return "another!";
 *   }
 * }
 *
 * const inst = new MyClass();
 * // Calls inst.method()
 * console.log(inst()); // => method!
 * console.log(inst.another()); // => another!
 * console.log(inst.method()); // => method!
 */
function Callable(prop) {
  const fn = this.constructor.prototype[prop];
  const apply = function() {
    return fn.apply(apply, arguments);
  };
  Object.setPrototypeOf(apply, this.constructor.prototype);
  Object.getOwnPropertyNames(fn).forEach((prop) => {
    Object.defineProperty(apply, prop, Object.getOwnPropertyDescriptors(fn, prop));
  });
  return apply;
}

Callable.prototype = Object.create(Function.prototype);

module.exports = Callable;
