const Ladybug = require("./Ladybug.js");
const Utils = require("./utils/utils.js");

// Setup the global instance
const ladybug = Ladybug.create();

// Export the main request classes
ladybug.Ladybug = Ladybug;
ladybug.Request = require("./LadybugRequest.js");
ladybug.Response = require("./LadybugResponse.js");

// Export create to allow custom instances
ladybug.create = Ladybug.create;

// Export Utils
ladybug.utils = Utils;
ladybug.Utils = Utils;

ladybug.mime = require("./mime.js");

// Assign helper functions
Object.assign(ladybug, require("./utils/helpers.js"));

module.exports = ladybug;
module.exports.default = ladybug; // For TypeScript


