h = require("hubiquitus-core");
codes = require("./codes").hResultStatus;
tv4 = require('tv4').tv4;
schemas = require('./schemas');
_ = require("lodash");

function subscribe(hChannel, quickFilter, cb) {
  if (_.isFunction(quickFilter)) cb = quickFilter;

  var subscribeAid = hChannel + "#subscribe";
  var content = quickFilter ? {quickFilter:quickFilter} : null;
  h.send(this.id, subscribeAid, content, 20000, function (err) {
    if (err)
      cb && cb(codes.TECH_ERROR, err);
    else
      cb && cb(codes.OK);
  });
}

function unsubscribe(hChannel, quickFilter, cb) {
  if (_.isFunction(quickFilter)) cb = quickFilter;

  var unsubscribeAid = hChannel + "#unsubscribe";
  var content = quickFilter ? {quickFilter:quickFilter} : null;
  h.send(this.id, unsubscribeAid, content, 20000, function (err) {
    if (err)
      cb && cb(codes.TECH_ERROR, err);
    else
      cb && cb(codes.OK);
  });
}

function buildMessage (actor, type, payload, options) {
  options = options || {};
  var hMessage = {};
  hMessage.publisher = this.id;
  hMessage.msgid = h.utils.uuid();
  hMessage.published = hMessage.published || new Date().getTime();
  hMessage.actor = actor;
  if (options.ref) hMessage.ref = options.ref;
  if (options.convid) hMessage.convid = options.convid;
  if (type) hMessage.type = type;
  if (options.priority) hMessage.priority = options.priority;
  if (options.persistent !== null || options.persistent !== undefined) hMessage.persistent = options.persistent;
  if (hMessage.persistent === null || hMessage.persistent === undefined) hMessage.persistent = false;
  if (options.location) hMessage.location = options.location;
  if (options.author) hMessage.author = options.author;
  if (options.published) hMessage.published = options.published;
  if (options.headers) hMessage.headers = options.headers;
  if (payload) hMessage.payload = payload;
  if (options.timeout) hMessage.timeout = options.timeout;
  hMessage.sent = new Date().getTime();
  return hMessage;
}

function buildCommand(actor, cmd, params, options) {
  params = params || {};
  options = options || {};
  var hCommand = {cmd: cmd, params: params};

  return this.buildMessage(actor, "hCommand", hCommand, options);
}

function buildResult(actor, ref, status, result, options) {
  options = options || {};
  var hResult = {status: status, result: result};

  options.ref = ref;
  return this.buildMessage(actor, "hResult", hResult, options);
}

function sendWrapper(actorInstance, message, cb) {
  var response = null;
  message.publisher = actorInstance.id;
  if (cb) {
    h.send(actorInstance.id, message.actor, message, message.timeout, function (err, res) {
      if (err) {
        response = actorInstance.buildResult(res.to, message.msgid, codes.TECH_ERROR, err);
        response.publisher = res.from;
        response.date = res.date;
        return cb(response);
      } else {
        response = reqToMsg(res);
        response.ref = message.msgid;
        return cb(response);
      }
    });
  } else {
    h.send(actorInstance.id, message.actor, message);
  }
}

function reqToMsg(req) {
  var isHMessage = tv4.validateResult(req.content, schemas.basichMessage);
  var msg = null;
  if(isHMessage) {
    msg = req.content
  } else {
    msg = {};
    msg.msgid = h.utils.uuid();
    msg.type = req.content.type || "legacy";
    msg.payload = req.content;
  }

  msg.type = msg.type || "empty";
  msg.publisher = req.from;
  msg.actor = req.to;
  msg.sent = req.date;

  return msg;
}

/*function msgToReq(message) {
  var msgid = h.utils.uuid();

  message.msgid = msgid;
  message.publisher = this.id;
  message.sent = new Date().getTime();
  return message;
}*/

function ActorWrapper(id, legacyActor, logger) {
  legacyActor.actor = id;
  legacyActor.id = id;

  legacyActor.buildMessage = buildMessage;
  legacyActor.buildCommand = buildCommand;
  legacyActor.buildResult = buildResult;

  legacyActor.log = function (level) { logger[level].apply(logger, Array.prototype.slice.call(arguments, 1))};

  legacyActor.subscribe = subscribe;
  legacyActor.unsubscribe = unsubscribe;

  legacyActor.send = function(message, cb) {
    sendWrapper(legacyActor, message, cb);
  };

  this.onMessage = function (req) {
    var msg = reqToMsg(req);

    legacyActor.onMessage(msg, function (response) {
      req.reply(null, response);
    });
  }
}

module.exports = function (id, legacyActor, logger) {
  return new ActorWrapper(id, legacyActor, logger);
};
