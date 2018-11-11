const mime = require("./mime.js");
const { extname } = require("path");

/**
 * Represents a multipart/form-data
 */
class FormData {
  constructor() {

    /**
     * The boundary for this form
     * @readonly
     * @type {String}
     */
    this.boundary = `----------------Ladybug${Math.random().toString().slice(2, 5)}`;

    /**
     * Current buffers list
     * @readonly
     * @type {Array<Buffer>}
     */
    this.buffers = [];
  }

  /**
   * Gets the content type for this form data.
   * @type {String}
   */
  get contentType() {
    return `multipart/form-data; boundary=${this.boundary}`;
  }

  /**
   * Appends a form data field
   * @param {String} name - The field name.
   * @param {String|Buffer|Object} value - The data for this field.
   * @param {String} [filename] - Filename if sending a file, the extension will also be used to detect the mime type.
   * @returns {this}
   */
  append(name, value, filename) {
    if(typeof value === "undefined") return;
    let str = `\r\n--${this.boundary}\r\nContent-Disposition: form-data; name="${name}"`;
    let mimeType = null;
    if(filename) str += `; filename="${filename}"`;
    if(filename && extname(filename)) mimeType = mime.lookup(extname(filename));

    if(Buffer.isBuffer(value)) {
      if(!mimeType) mimeType = "application/octet-stream";
    } else if(typeof value === "object") {
      if(!mimeType) mimeType = "application/json";
      value = Buffer.from(JSON.stringify(value));
    } else if(typeof value === "string") {
      if(!mimeType) mimeType = "text/plain";
      value = Buffer.from(value);
    }
    if(mimeType) str += `\r\nContent-Type: ${mimeType}`;
    this.buffers.push(Buffer.from(`${str}\r\n\r\n`), value);
    return this;
  }

  /**
   * Builds the final form buffer ready to be sent in a request.
   * @returns {Buffer}
   */
  build() {
    return Buffer.concat([...this.buffers, Buffer.from(`\r\n--${this.boundary}--`)]);
  }
}

module.exports = FormData;
