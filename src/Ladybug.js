const Callable = require("./utils/callable.js");
const pkg = require("../package.json");
const Request = require("./LadybugRequest.js");
const { mergeObjects, clone } = require("./utils/utils.js");
const { validateMethod } = require("./utils/validators.js");
const RequestBase = require("./RequestBase.js");

/**
 * The base instance class
 * a global instance of this is also exported with default options.
 * you may use {@link create} to create an instance of this with more options
 * @constructor
 * @extends {Callable}
 */
class Ladybug extends Callable {
  constructor(options = {}) {
    if(!validateMethod(options.method || "get")) throw new Error("Invalid Request Method. Expected one of (`get`, `put`, `post`, `patch`, `delete`)");
    super((options.method || "get").toLowerCase());
    this._query = {};
    this.data = null;
    this.headers = options.headers || {};
    this.plugins = Array.isArray(options.plugins) ? options.plugins : [];
    this.baseURL = options.baseURL;
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.delete = this.delete.bind(this);
    this.patch = this.patch.bind(this);
    this.put = this.put.bind(this);
    this.request = this.request.bind(this);
  }

  request(method, url, options = {}) {
    if(!validateMethod(method)) throw new Error("Invalid Request Method expected one of (`get`, `put`, `post`, `patch`, `delete`)");
    if(typeof url === "object") options = url;
    else options.url = url;
    options.method = method.toUpperCase();
    return new Request(mergeObjects({
      // We clone a few stuff here because passing the reference into the class
      // will cause the instance defaults to be touched.
      headers: clone(this.headers),
      query: clone(this._query),
      plugins: clone(this.plugins),
      baseURL: this.baseURL,
      status: this.validateStatus,
      promise: this.promiseLibrary
    }, options));
  }

  get(...args) {
    return this.request("GET", ...args);
  }

  post(...args) {
    return this.request("POST", ...args);
  }

  put(...args) {
    return this.request("PUT", ...args);
  }

  patch(...args) {
    return this.request("PATCH", ...args);
  }

  delete(...args) {
    return this.request("DELETE", ...args);
  }

  del(...args) {
    return this.request("DELETE", ...args);
  }

  static create(options = {}) {
    return new Ladybug(mergeObjects({
      headers: { "User-Agent": `ladybug-fetch/${pkg.version}` }
    }, options));
  }
}

// A workaround for extending two classes.
RequestBase.applyTo(Ladybug);


module.exports = Ladybug;
