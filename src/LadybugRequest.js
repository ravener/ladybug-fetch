const request = require("./request.js");
const RequestBase = require("./RequestBase.js");

class LadybugRequest extends RequestBase {
  constructor(options = {}) {
    super(options);
    this.agent = options.agent || null; // TODO http/https custom agent support
    this.method = options.method || "GET";
    this.url = options.url;
  }

  then(resolve, reject) {
    return request(this).then(resolve, reject);
  }
  
  catch(callback) {
    return this.then(undefined, callback);
  }
}

module.exports = LadybugRequest;
