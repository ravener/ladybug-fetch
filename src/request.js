const unzip = require("./unzip.js");
const finalizeOptions = require("./options.js");
const http = require("http");
const https = require("https");
const Response = require("./LadybugResponse.js");

const isStream = s => typeof s === "object" && typeof s.pipe === "function";

function getBody(res, promise = Promise) {
  if(unzip.types.includes(res.headers["content-type"])) return unzip(res, promise);
  return new promise((resolve, reject) => {
    const buffer = [];
    res
      .on("data", (chunk) => buffer.push(chunk))
      .on("end", () => resolve(Buffer.concat(buffer)))
      .on("error", (err) => reject(err));
  });
}

module.exports = (request) => {
  Array.from(request.plugins).map((plugin) => plugin(request));
  return new request.promiseLibrary((resolve, reject) => {
    const options = finalizeOptions(request);
    const lib = { "https:": https, "http:": http }[options.protocol];
    const req = lib.request(options);

    req.on("response", async(res) => {
      const body = await getBody(res, request.promiseLibrary);
      const response = new Response(res, body);
      const status = request.validateStatus(res.statusCode);
      if(status) return resolve(response);
      const err = new Error(`${res.statusCode}: ${http.STATUS_CODES[res.statusCode]}`);
      err.response = response;
      err.status = res.statusCode;
      return reject(err);
    });
    req.once("error", (err) => reject(err));
    req.once("abort", () => reject(new Error("Request Aborted")));
    if(isStream(request.data)) request.data.pipe(req);
    else req.end(request.data);
  });
};
