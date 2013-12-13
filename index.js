require("coffee-script");
h = require("hubiquitus");
exports.validator = require("./lib/validator");
exports.UUID = {generate: h.utils.uuid};
exports.codes = require("./lib/codes");
Wrapper = require("./lib/actorWrapper");

exports.addActor = function (id, actor) {
  var fullid = id;
  if (h.utils.aid.isBare(id)) fullid = id + "/" + h.utils.uuid();
  var wrapper = Wrapper(fullid, actor);

  if (actor.initialize) {
    actor.initialize(function () {
      h.addActor(fullid, wrapper.onMessage, wrapper);
    });
  } else {
    h.addActor(fullid, wrapper.onMessage, wrapper);
  }
}
