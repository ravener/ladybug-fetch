const { parse } = require("url");
const querystring = require("querystring");

// TODO Cleanup this mess
// if base url had a path it may not work as it only takes host from baseURL
// find a workaround for that
module.exports = (req) => {
  const options = {};
  let url;
  if(req.baseURL && !parse(req.url).protocol) {
    url = parse(req.baseURL);
    url.path = req.url;
  } else {
    url = parse(req.url);
  }
  options.host = url.host;
  if(url.port) options.port = url.port;
  options.headers = req.headers;
  options.method = req.method;
  if(url.path) options.path = url.path;
  if(Object.keys(req._query).length) {
    options.path = options.path + "?" + querystring.stringify(req._query);
  }
  options.protocol = url.protocol;
  return options;
};
