require("coffee-script");
var h = require("hubiquitus-core");
var Wrapper = require("./lib/actorWrapper");

var logger = null;

exports = module.exports = function (namespace) {
  logger = h.logger(namespace ? namespace : 'legacy');
  return module.exports;
};

exports.validator = require("./lib/validator");
exports.UUID = {generate: h.utils.uuid};
exports.codes = require("./lib/codes");

exports.addActor = function (id, actor, done) {
  var fullid = id;
  if (h.utils.aid.isBare(id)) fullid = id + "/" + h.utils.uuid();
  var wrapper = Wrapper(fullid, actor, logger);

  if (actor.initialize) {
    actor.initialize(function () {
      h.addActor(fullid, wrapper.onMessage, wrapper);
      done && done();
    });
  } else {
    h.addActor(fullid, wrapper.onMessage, wrapper);
    done && done();
  }
}
