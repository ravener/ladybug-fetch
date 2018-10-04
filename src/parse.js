const querystring = require("querystring");

module.exports = (body, contentType) => {
  contentType = contentType.split(";")[0]; // We don't need the charset and stuff
  switch(contentType) {
    case "application/json":
      return JSON.parse(body.toString());
    case "application/x-www-form-urlencoded":
      return querystring.parse(body.toString());
    // For anything else return the raw buffer
    default: // TODO any other mime types that needs special parsing?
      return body;
  }
};
