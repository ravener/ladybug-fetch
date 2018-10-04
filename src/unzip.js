const zlib = require("zlib");

/**
 * Function that is used to unzip the response body
 * this is used by the library to unzip compressed responses
 * it is not recommended to use this directly, the library handles it all
 * @param {http.IncomingMessage} res - The response to decompress
 * @param {any} [promise=Promise] - The promise library to use, allows for custom promise implementations
 * @returns {Promise<Buffer>}
 */
module.exports = (res, promise = Promise) => {
  return new promise((resolve, reject) => {
    const unzip = zlib.createUnzip();
    res.pipe(unzip);
    const buffer = [];
    return unzip
      .on("data", (chunk) => buffer.push(chunk))
      .on("error", (err) => reject(err))
      .on("end", () => resolve(Buffer.concat(buffer)));
  });
};

/**
 * The types that can be currently unzipped by the Unzip function
 * This is used by library if response `content-encoding` header has one of this types in order to uncompress
 * @type {Array<String>}
 */
module.exports.types = ["gzip", "compress", "deflate"];
