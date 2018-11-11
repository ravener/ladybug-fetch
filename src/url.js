const url = require("url");
const { mergeObjects, isAbsoluteURL, URLJoin } = require("./utils/utils.js");

// Joins two URLs Cleanly, respecting any queries that appears in both base url
// path and the request query object.
function cleanJoin(req) {
  if(!isAbsoluteURL(req.url) && req.baseURL) {
    const parsedBase = url.parse(req.baseURL, true);
    const parsed = url.parse(req.url, true);
    return {
      protocol: parsedBase.protocol,
      host: parsedBase.hostname,
      port: parsedBase.port,
      path: URLJoin(parsedBase.pathname, parsed.pathname),
      query: mergeObjects(req._query, parsedBase.query, parsed.query)
    };
  } else {
    const parsed = url.parse(req.url, true);
    return {
      protocol: parsed.protocol,
      host: parsed.hostname,
      port: parsed.port,
      path: parsed.pathname,
      query: mergeObjects(req._query, parsed.query)
    };
  }
}

module.exports = cleanJoin;
