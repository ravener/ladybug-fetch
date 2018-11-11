const request = require("./request.js");
const RequestBase = require("./RequestBase.js");
const url = require("url");
const cleanJoin = require("./url.js");
const { mergeObjects, isRedirect } = require("./utils/utils.js");

class LadybugRequest extends RequestBase {
  constructor(options = {}) {
    super(options);
    this.agent = options.agent || null; // TODO http/https custom agent support
    this.method = options.method || "GET";
    this.url = options.url;
  }

  then(resolve, reject) {
    return request(this)
      .then((res) => {
        // Redirects
        // TODO maybe we need a bit extra handling for each redirect code?
        // TODO redirect limits
        // TODO option to turn on/off follow redirects
        if(isRedirect(res.status) && res.headers.location) {
          const options = cleanJoin(this);

          // url.format doesn't recognize path and port :(
          options.pathname = options.path;
          if(options.port) options.host = `${options.host}:${options.port}`;
          const newURL = url.resolve(url.format(options), res.headers.location);
          return new LadybugRequest(mergeObjects(request, { url: newURL }));
        } else return res;
      })
      .then(resolve, reject);
  }
  
  catch(callback) {
    return this.then(undefined, callback);
  }
}

module.exports = LadybugRequest;
