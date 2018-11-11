const mimes = require("./mimes.json");

/**
 * Looks up a mime type by extension
 * returns `application/octet-stream` if ext wasn't found.
 * @param {String} ext - The file extension to lookup
 * @returns {String}
 */
function lookup(ext) {
  return mimes[ext.replace(/^\./, "")] || "application/octet-stream";
}

module.exports = { lookup };
