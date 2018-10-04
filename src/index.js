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
ladybug.mergeObjects = Utils.mergeObjects;
ladybug.isPromise = Utils.isPromise;

// Assign helper functions
Object.assign(ladybug, require("./utils/helpers.js"));

module.exports = ladybug;



