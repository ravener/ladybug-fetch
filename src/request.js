const finalizeOptions = require("./options.js");
const http = require("http");
const https = require("https");
const zlib = require("zlib");
const Response = require("./LadybugResponse.js");

function shouldUnzip(res) {
  // No Content, no unzip
  if(res.statusCode === 204) return false;
  if(res.headers["content-length"] === "0") return false;
  return /(gzip|deflate|compress)/ig.test(res.headers["content-encoding"]);
}

const isStream = s => typeof s === "object" && typeof s.pipe === "function";

module.exports = (request) => {
  request.plugins.map((plugin) => plugin(request));
  return new request.promiseLibrary((resolve, reject) => {
    const options = finalizeOptions(request);
    const lib = { "https:": https, "http:": http }[options.protocol];
    if(!lib) return reject(`Invalid or Unsupported Protocol '${options.protocol}'`);
    const req = lib.request(options);

    req.on("response", (res) => {
      const buffer = [];
      let stream = res;
      if(shouldUnzip(res)) stream = stream.pipe(zlib.createUnzip());

      stream
        .on("data", (chunk) => buffer.push(chunk))
        .on("error", (err) => reject(err))
        .on("end", () => {
          const body = Buffer.concat(buffer);
          const response = new Response(res, body);
          const status = request.validateStatus(res.statusCode);
          if(status) return resolve(response);
          const err = new Error(`${res.statusCode} ${http.STATUS_CODES[res.statusCode]}`);
          err.response = response;
          err.status = res.statusCode;
          return reject(err);
        });
    });

    req.once("error", (err) => reject(err));
    req.once("abort", () => reject(new Error("Request Aborted")));

    if(request.data) {
      if(isStream(request.data)) request.data.pipe(req);
      else if(Array.isArray(request.data)) {
        for(const chunk of request.data) req.write(chunk);
        req.end();
      }
      else req.end(request.data);
    } else if(request.form) {
      req.end(request.form.build());
    } else req.end();
  });
};
