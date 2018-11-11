const parse = require("./parse.js");
const { STATUS_CODES } = require("http");

/**
 * Represents a request response
 */
class LadybugResponse {
  constructor(response, data) {

    /**
     * Response headers for this request
     * @readonly
     * @type {Object<String, any>}
     */
    this.headers = response.headers;

    /**
     * Parsed body of the request
     * The value of this varies depending om the content-type header
     * @type {any}
     * @readonly
     */
    this.body = parse(data, response.headers["content-type"] || "");

    /**
     * Wether this request was success
     * status code greater than or equal to 200 and less than 400
     * @type {Boolean}
     * @readonly
     */
    this.ok = response.statusCode >= 200 && response.statusCode < 400;

    /**
     * The raw http response object
     * @readonly
     * @type {http.IncomingMessage}
     */
    this.res = response;

    /**
     * The status code for the response
     * @type {Number}
     * @readonly
     */
    this.status = response.statusCode || NaN;

    /**
     * Human readable string of the response status code
     * @type {String}
     * @readonly
     */
    this.statusText = STATUS_CODES[this.status] || "";

    /**
     * The text representation of the body non parsed
     * most of times you would use body instead
     * it is equal to rawBuffer.toString(); where rawBuffer is the non parsed buffer
     * @type {String}
     */
    this.text = data.toString() || "";
  }

  /**
   * A getter alias to {@link LadybugResponse#res}
   */
  get response() {
    return this.res;
  }

  /**
   * Gets a response header case insensitive
   * @param {String} field - The header field name
   * @returns {any}
   */
  get(field) {
    return this.headers[field.toLowerCase()];
  }
}

module.exports = LadybugResponse;
