/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.nostream.FileUploadStatusCode', null, global);
goog.exportSymbol('proto.nostream.RepFileChunk', null, global);
goog.exportSymbol('proto.nostream.RepNOSTREAMTEST', null, global);
goog.exportSymbol('proto.nostream.ResFileUploadAck', null, global);
goog.exportSymbol('proto.nostream.ResJson', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.nostream.RepFileChunk = function(opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.nostream.RepFileChunk, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.nostream.RepFileChunk.displayName = 'proto.nostream.RepFileChunk';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.nostream.RepFileChunk.prototype.toObject = function(opt_includeInstance) {
        return proto.nostream.RepFileChunk.toObject(opt_includeInstance, this);
    };


    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.nostream.RepFileChunk} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.nostream.RepFileChunk.toObject = function(includeInstance, msg) {
        var f, obj = {
            content: msg.getContent_asB64(),
            filename: jspb.Message.getFieldWithDefault(msg, 2, "")
        };

        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.nostream.RepFileChunk}
 */
proto.nostream.RepFileChunk.deserializeBinary = function(bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.nostream.RepFileChunk;
    return proto.nostream.RepFileChunk.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.nostream.RepFileChunk} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.nostream.RepFileChunk}
 */
proto.nostream.RepFileChunk.deserializeBinaryFromReader = function(msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {!Uint8Array} */ (reader.readBytes());
                msg.setContent(value);
                break;
            case 2:
                var value = /** @type {string} */ (reader.readString());
                msg.setFilename(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.nostream.RepFileChunk.prototype.serializeBinary = function() {
    var writer = new jspb.BinaryWriter();
    proto.nostream.RepFileChunk.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.nostream.RepFileChunk} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.nostream.RepFileChunk.serializeBinaryToWriter = function(message, writer) {
    var f = undefined;
    f = message.getContent_asU8();
    if (f.length > 0) {
        writer.writeBytes(
            1,
            f
        );
    }
    f = message.getFilename();
    if (f.length > 0) {
        writer.writeString(
            2,
            f
        );
    }
};


/**
 * optional bytes Content = 1;
 * @return {string}
 */
proto.nostream.RepFileChunk.prototype.getContent = function() {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes Content = 1;
 * This is a type-conversion wrapper around `getContent()`
 * @return {string}
 */
proto.nostream.RepFileChunk.prototype.getContent_asB64 = function() {
    return /** @type {string} */ (jspb.Message.bytesAsB64(
        this.getContent()));
};


/**
 * optional bytes Content = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getContent()`
 * @return {!Uint8Array}
 */
proto.nostream.RepFileChunk.prototype.getContent_asU8 = function() {
    return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
        this.getContent()));
};


/** @param {!(string|Uint8Array)} value */
proto.nostream.RepFileChunk.prototype.setContent = function(value) {
    jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional string filename = 2;
 * @return {string}
 */
proto.nostream.RepFileChunk.prototype.getFilename = function() {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.nostream.RepFileChunk.prototype.setFilename = function(value) {
    jspb.Message.setProto3StringField(this, 2, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.nostream.ResFileUploadAck = function(opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.nostream.ResFileUploadAck, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.nostream.ResFileUploadAck.displayName = 'proto.nostream.ResFileUploadAck';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.nostream.ResFileUploadAck.prototype.toObject = function(opt_includeInstance) {
        return proto.nostream.ResFileUploadAck.toObject(opt_includeInstance, this);
    };


    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.nostream.ResFileUploadAck} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.nostream.ResFileUploadAck.toObject = function(includeInstance, msg) {
        var f, obj = {
            message: jspb.Message.getFieldWithDefault(msg, 1, ""),
            code: jspb.Message.getFieldWithDefault(msg, 2, 0)
        };

        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.nostream.ResFileUploadAck}
 */
proto.nostream.ResFileUploadAck.deserializeBinary = function(bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.nostream.ResFileUploadAck;
    return proto.nostream.ResFileUploadAck.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.nostream.ResFileUploadAck} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.nostream.ResFileUploadAck}
 */
proto.nostream.ResFileUploadAck.deserializeBinaryFromReader = function(msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {string} */ (reader.readString());
                msg.setMessage(value);
                break;
            case 2:
                var value = /** @type {!proto.nostream.FileUploadStatusCode} */ (reader.readEnum());
                msg.setCode(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.nostream.ResFileUploadAck.prototype.serializeBinary = function() {
    var writer = new jspb.BinaryWriter();
    proto.nostream.ResFileUploadAck.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.nostream.ResFileUploadAck} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.nostream.ResFileUploadAck.serializeBinaryToWriter = function(message, writer) {
    var f = undefined;
    f = message.getMessage();
    if (f.length > 0) {
        writer.writeString(
            1,
            f
        );
    }
    f = message.getCode();
    if (f !== 0.0) {
        writer.writeEnum(
            2,
            f
        );
    }
};


/**
 * optional string Message = 1;
 * @return {string}
 */
proto.nostream.ResFileUploadAck.prototype.getMessage = function() {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.nostream.ResFileUploadAck.prototype.setMessage = function(value) {
    jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional FileUploadStatusCode Code = 2;
 * @return {!proto.nostream.FileUploadStatusCode}
 */
proto.nostream.ResFileUploadAck.prototype.getCode = function() {
    return /** @type {!proto.nostream.FileUploadStatusCode} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {!proto.nostream.FileUploadStatusCode} value */
proto.nostream.ResFileUploadAck.prototype.setCode = function(value) {
    jspb.Message.setProto3EnumField(this, 2, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.nostream.RepNOSTREAMTEST = function(opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.nostream.RepNOSTREAMTEST, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.nostream.RepNOSTREAMTEST.displayName = 'proto.nostream.RepNOSTREAMTEST';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.nostream.RepNOSTREAMTEST.prototype.toObject = function(opt_includeInstance) {
        return proto.nostream.RepNOSTREAMTEST.toObject(opt_includeInstance, this);
    };


    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.nostream.RepNOSTREAMTEST} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.nostream.RepNOSTREAMTEST.toObject = function(includeInstance, msg) {
        var f, obj = {
            name: jspb.Message.getFieldWithDefault(msg, 1, "")
        };

        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.nostream.RepNOSTREAMTEST}
 */
proto.nostream.RepNOSTREAMTEST.deserializeBinary = function(bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.nostream.RepNOSTREAMTEST;
    return proto.nostream.RepNOSTREAMTEST.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.nostream.RepNOSTREAMTEST} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.nostream.RepNOSTREAMTEST}
 */
proto.nostream.RepNOSTREAMTEST.deserializeBinaryFromReader = function(msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {string} */ (reader.readString());
                msg.setName(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.nostream.RepNOSTREAMTEST.prototype.serializeBinary = function() {
    var writer = new jspb.BinaryWriter();
    proto.nostream.RepNOSTREAMTEST.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.nostream.RepNOSTREAMTEST} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.nostream.RepNOSTREAMTEST.serializeBinaryToWriter = function(message, writer) {
    var f = undefined;
    f = message.getName();
    if (f.length > 0) {
        writer.writeString(
            1,
            f
        );
    }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.nostream.RepNOSTREAMTEST.prototype.getName = function() {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.nostream.RepNOSTREAMTEST.prototype.setName = function(value) {
    jspb.Message.setProto3StringField(this, 1, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.nostream.ResJson = function(opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, proto.nostream.ResJson.repeatedFields_, null);
};
goog.inherits(proto.nostream.ResJson, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.nostream.ResJson.displayName = 'proto.nostream.ResJson';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.nostream.ResJson.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.nostream.ResJson.prototype.toObject = function(opt_includeInstance) {
        return proto.nostream.ResJson.toObject(opt_includeInstance, this);
    };


    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.nostream.ResJson} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.nostream.ResJson.toObject = function(includeInstance, msg) {
        var f, obj = {
            jsonstrList: jspb.Message.getRepeatedField(msg, 1)
        };

        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.nostream.ResJson}
 */
proto.nostream.ResJson.deserializeBinary = function(bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.nostream.ResJson;
    return proto.nostream.ResJson.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.nostream.ResJson} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.nostream.ResJson}
 */
proto.nostream.ResJson.deserializeBinaryFromReader = function(msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {string} */ (reader.readString());
                msg.addJsonstr(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.nostream.ResJson.prototype.serializeBinary = function() {
    var writer = new jspb.BinaryWriter();
    proto.nostream.ResJson.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.nostream.ResJson} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.nostream.ResJson.serializeBinaryToWriter = function(message, writer) {
    var f = undefined;
    f = message.getJsonstrList();
    if (f.length > 0) {
        writer.writeRepeatedString(
            1,
            f
        );
    }
};


/**
 * repeated string JsonStr = 1;
 * @return {!Array.<string>}
 */
proto.nostream.ResJson.prototype.getJsonstrList = function() {
    return /** @type {!Array.<string>} */ (jspb.Message.getRepeatedField(this, 1));
};


/** @param {!Array.<string>} value */
proto.nostream.ResJson.prototype.setJsonstrList = function(value) {
    jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {!string} value
 * @param {number=} opt_index
 */
proto.nostream.ResJson.prototype.addJsonstr = function(value, opt_index) {
    jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


proto.nostream.ResJson.prototype.clearJsonstrList = function() {
    this.setJsonstrList([]);
};


/**
 * @enum {number}
 */
proto.nostream.FileUploadStatusCode = {
    UNKNOWN: 0,
    OK: 1,
    FAILED: 2
};

goog.object.extend(exports, proto.nostream);
