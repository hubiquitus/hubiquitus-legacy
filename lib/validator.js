tv4 = require('tv4').tv4;
schemas = require("./schemas");

/**
 * Checks if an hMessage is correctly formatted and has all the correct attributes
 * @param hMessage - hMessage to validate
 * result is an object
 */
exports.validateHMessage = function(hMessage, callback) {
  var result = tv4.validateResult(hMessage, schemas.hMessage);
  if(typeof(callback) === 'function') {
    if(result.valid) {
      callback(null, hMessage);
    } else {
      callback(result.error, null);
    }
  }

  return result;
};

/**
 * Checks if a topology is correctly formatted and has all the correct attributes
 * @param topology - topology to validate
 * @param cb - Function (err, result) where err is from hResult.status or nothing and
 * result is a string or nothing
 */
exports.validateTopology = function(topology) {
  return tv4.validateResult(topology, schemas.topology);
};

/**
 * Returns true or false if it is a valid URN following hubiquitus standards
 * @param urn - the urn string to validate
 */
exports.validateURN = function(urn) {
  return /(^urn:[a-zA-Z0-9]{1}[a-zA-Z0-9\-.]+:[a-zA-Z0-9_,=@;!'%/#\(\)\+\-\.\$\*\?]+(\/.+)?$)/.test(urn);
};

/**
 * Returns true or false if it is a valid URN with resource following hubiquitus standards
 * @param urn - the urn string to validate
 */
exports.validateFullURN = function(urn) {
  return /(^urn:[a-zA-Z0-9]{1}[a-zA-Z0-9\-.]+:[a-zA-Z0-9_,=@;!'%/#\(\)\+\-\.\$\*\?]+\/.+$)/.test(urn);
};

/**
 * Splits a VALID URN in three parts: (user)(domain)(resource), the third part can be empty
 * @param urn - URN to split
 */
exports.splitURN = function(urn) {
  if(typeof(urn) === "string") {
    var splitted = urn.split(":");
  }
  if(splitted) {
    if(exports.validateFullURN(urn)) {
      splitted[3] = splitted[2].replace(/(^[^\/]*\/)/, "");
      splitted[2] = splitted[2].replace(/\/.*$/g, "");
    }
    return splitted.splice(1, 3);
  } else {
    return [undefined, undefined, undefined];
  }
}

/**
 * Return the bare urn of an actor
 * @param urn - full URN
 */
exports.getBareURN = function(urn) {
  var urnParts = exports.splitURN(urn);
  return "urn:" + urnParts[0] + ":" + urnParts[1];
}

/**
 * Return the resource of an actor
 * @param urn - full URN
 */
exports.getResource = function(urn) {
  if(exports.validateFullURN(urn)) {
    var urnParts = exports.splitURN(urn)
    return urnParts[2]
  } else {
    return "undefined"
  }
}


/**
 * Compares two URNs. Can use modifiers to ignore certain parts
 * @param urn1 - First URN to compare
 * @param urn2 - Second URN
 * @param mod - String with modifiers. Accepted:
 * r: considers resource
 * @return {Boolean} true if equal.
 */
exports.compareURNs = function(urn1, urn2, mod) {
  if (!exports.validateURN(urn1) || !exports.validateURN(urn2)) {
    return false;
  }

  var j1 = exports.splitURN(urn1);
  var j2 = exports.splitURN(urn2);

  if(!j1 || !j2) {
    return false;
  }

  if(/r/.test(mod)) {
    return j1[0] === j2[0] && j1[1] === j2[1] && j1[2] === j2[2];
  } else {
    return j1[0] === j2[0] && j1[1] === j2[1];
  }
}


/**
 * Returns the domain from a well formed URN, or null if domain not found.
 * @param urn - The bare/full URN to parse
 * @return a domain in the form of a string
 */
exports.getDomainURN = function(urn) {
  return exports.splitURN(urn)[0];
}
