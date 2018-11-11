const querystring = require("querystring");
const cleanJoin = require("./url.js");

// Finalize request options and stuff before sending the request.
module.exports = (req) => {
  const url = cleanJoin(req);
  if(Object.keys(url.query).length) {
    url.path = url.path + `?${querystring.stringify(url.query)}`;
  }
  url.method = req.method;
  url.headers = req.headers;
  delete url.query;
  if(req.form) req.set("Content-Type", req.form.contentType);
  return url;
};
