
/**
 * Group of validators used to validate arguments all around in the library
 * @private
 */
module.exports = {

  /**
   * Validates if a request method is valid, the check is case insensitive
   * @param {String} m - The method to validate
   * @returns {Boolean}
   */
  validateMethod: (m) => m && typeof m === "string" && ["get", "put", "post", "patch", "delete"].includes(m.toLowerCase())
};
