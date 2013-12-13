exports.hMessage = {
  "title": "hMessage",
  "description": "Messages form the relevant piece of information into a conversation.",
  "type": "object",
  "properties": {
    "msgid" : {
      "type" : "string",
      "description": "Provides a permanent, universally unique identifier for the message in the form of an absolute IRI."
    },
    "actor" : {
      "type" : "string",
      "description": "The URN through which the message is published ('urn:domain:actor')."
    },
    "convid" : {
      "type" : ["string","null", "undefined"],
      "description": "The ID of the conversation to which the message belongs."
    },
    "ref" : {
      "type" : ["string","null", "undefined"],
      "description": "Refers to another hMessage msgid. Provide a mechanism to do correlation between messages."
    },
    "type" : {
      "type" : ["string","null", "undefined"],
      "description": "The type of the message payload."
    },
    "priority" : {
      "type" : ["integer","null", "undefined"],
      "description": "The priority the hMessage."
    },
    "relevance" : {
      "type" : ["integer","null", "undefined"],
      "description": "Defines the date (timestamp in milliseconds) until which the message is considered as relevant."
    },
    "persistent" : {
      "type" : ["boolean","null", "undefined"],
      "description": "Indicates if the message MUST/MUST NOT be persisted by the middleware."
    },
    "location" : {
      "type" : ["object","null", "undefined"],
      "description": "The geographical location to which the message refer."
    },
    "author" : {
      "type" : ["string","null", "undefined"],
      "description": "The URN of the author (the object or device at the origin of the message)."
    },
    "publisher" : {
      "type" : "string",
      "description": "The URN of the client that effectively published the message (it can be different than the author)."
    },
    "published" : {
      "type" : ["integer","null", "undefined"],
      "description": "The date (timestamp in milliseconds) at which the message has been published."
    },
    "headers" : {
      "type" : ["object","null", "undefined"],
      "description": "A Headers object attached to this hMessage. It is a key-value pair map."
    },
    "payload" : {
      "type" : ["object","string","boolean","number","array","null", "undefined"],
      "description": "The content of the message. It can be plain text or more structured data (HTML, XML, JSON, etc.)."
    },
    "timeout" : {
      "type" : ["integer","null", "undefined"],
      "description": "Define the timeout (ms) to get an answer to the hMessage."
    },
    "sent" : {
      "type" : "integer",
      "description": "This attribute contains the creation date (timestamp in milliseconds) of the hMessage."
    }
  },
  "required" : ["msgid", "actor", "type", "publisher", "sent"],
  "additionalProperties" : false
};

exports.basichMessage = {
  "title": "hMessage",
  "description": "Messages form the relevant piece of information into a conversation.",
  "type": "object",
  "properties": {
    "msgid" : {
      "type" : "string",
      "description": "Provides a permanent, universally unique identifier for the message in the form of an absolute IRI."
    },
    "actor" : {
      "type" : "string",
      "description": "The URN through which the message is published ('urn:domain:actor')."
    },
    "convid" : {
      "type" : ["string","null", "undefined"],
      "description": "The ID of the conversation to which the message belongs."
    },
    "ref" : {
      "type" : ["string","null", "undefined"],
      "description": "Refers to another hMessage msgid. Provide a mechanism to do correlation between messages."
    },
    "type" : {
      "type" : ["string","null", "undefined"],
      "description": "The type of the message payload."
    },
    "priority" : {
      "type" : ["integer","null", "undefined"],
      "description": "The priority the hMessage."
    },
    "relevance" : {
      "type" : ["integer","null", "undefined"],
      "description": "Defines the date (timestamp in milliseconds) until which the message is considered as relevant."
    },
    "persistent" : {
      "type" : ["boolean","null", "undefined"],
      "description": "Indicates if the message MUST/MUST NOT be persisted by the middleware."
    },
    "location" : {
      "type" : ["object","null", "undefined"],
      "description": "The geographical location to which the message refer."
    },
    "author" : {
      "type" : ["string","null", "undefined"],
      "description": "The URN of the author (the object or device at the origin of the message)."
    },
    "publisher" : {
      "type" : "string",
      "description": "The URN of the client that effectively published the message (it can be different than the author)."
    },
    "published" : {
      "type" : ["integer","null", "undefined"],
      "description": "The date (timestamp in milliseconds) at which the message has been published."
    },
    "headers" : {
      "type" : ["object","null", "undefined"],
      "description": "A Headers object attached to this hMessage. It is a key-value pair map."
    },
    "payload" : {
      "type" : ["object","string","boolean","number","array","null", "undefined"],
      "description": "The content of the message. It can be plain text or more structured data (HTML, XML, JSON, etc.)."
    },
    "timeout" : {
      "type" : ["integer","null", "undefined"],
      "description": "Define the timeout (ms) to get an answer to the hMessage."
    },
    "sent" : {
      "type" : "integer",
      "description": "This attribute contains the creation date (timestamp in milliseconds) of the hMessage."
    }
  },
  "additionalProperties" : false
};

exports.hCommand = {
  "title": "hCommand",
  "description": "The purpose of a hCommand payload is to execute an operation on a specific actor, a channel, a session.",
  "type": "object",
  "properties": {
    "cmd" : {
      "type" : "string",
      "description": "The name of the command to execute."
    },
    "params" : {
      "type" : "object",
      "description": "The parameters to pass to the command (as a JSON Object)."
    },
    "filter" : {
      "type" : "object",
      "description" : "the filter for the hCommand"
    }
  },
  "required" : ["cmd"],
  "additionalProperties" : false
};

exports.hResult = {
  "title": "hResult",
  "description": "The purpose of a hResult payload is to respond to another hMessage.",
  "type": "object",
  "properties": {
    "status" : {
      "type" : "integer",
      "description": "The status of the operation."
    },
    "result" : {
      "type" : "object",
      "description": "The result of a command operation (can be undefined)."
    }
  },
  "required" : ["status"],
  "additionalProperties" : false
};
