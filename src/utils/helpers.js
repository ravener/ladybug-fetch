
/**
 * Some Helpful functions
 * The library does not depend on this functions this are just here to help you
 * if you need them
 */
module.exports = {

  /**
   * Returns a bearer header object this could be used for .set in a request
   * @param {String} key - The key for this header
   * @returns {Object}
   * @example
   * req.set(ladybug.bearer("My Bearer Key"));
   */
  bearer: (key) => ({ Authorization: `Bearer ${key}` }),

  /**
   * Returns a Basic Authentication header object
   * which is in format Authorization: Basic Base64Encode(username:password)
   * @param {String} username - Username for authorization
   * @param {String} password - Password for authorization
   * @returns {Object}
   * @example
   * req.set(ladybug.basic("user123", "youshallnotpass"));
   */
  basic: (username, password) => ({ Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}` })
};
