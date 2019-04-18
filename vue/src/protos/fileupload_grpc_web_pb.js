/**
 * @fileoverview gRPC-Web generated client stub for nostream
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.nostream = require('./fileupload_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.nostream.gRPCUploadServiceClient =
    function(hostname, credentials, options) {
        if (!options) options = {};
        options['format'] = 'text';

        /**
         * @private @const {!grpc.web.GrpcWebClientBase} The client
         */
        this.client_ = new grpc.web.GrpcWebClientBase(options);

        /**
         * @private @const {string} The hostname
         */
        this.hostname_ = hostname;

        /**
         * @private @const {?Object} The credentials to be used to connect
         *    to the server
         */
        this.credentials_ = credentials;

        /**
         * @private @const {?Object} Options for the client
         */
        this.options_ = options;
    };


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.nostream.gRPCUploadServicePromiseClient =
    function(hostname, credentials, options) {
        if (!options) options = {};
        options['format'] = 'text';

        /**
         * @private @const {!proto.nostream.gRPCUploadServiceClient} The delegate callback based client
         */
        this.delegateClient_ = new proto.nostream.gRPCUploadServiceClient(
            hostname, credentials, options);

    };


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.nostream.RepFileChunk,
 *   !proto.nostream.ResFileUploadAck>}
 */
const methodInfo_gRPCUploadService_SendFile = new grpc.web.AbstractClientBase.MethodInfo(
    proto.nostream.ResFileUploadAck,
    /** @param {!proto.nostream.RepFileChunk} request */
    function(request) {
        return request.serializeBinary();
    },
    proto.nostream.ResFileUploadAck.deserializeBinary
);


/**
 * @param {!proto.nostream.RepFileChunk} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.nostream.ResFileUploadAck)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.nostream.ResFileUploadAck>|undefined}
 *     The XHR Node Readable Stream
 */
proto.nostream.gRPCUploadServiceClient.prototype.sendFile =
    function(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
            '/nostream.gRPCUploadService/SendFile',
            request,
            metadata,
            methodInfo_gRPCUploadService_SendFile,
            callback);
    };


/**
 * @param {!proto.nostream.RepFileChunk} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.nostream.ResFileUploadAck>}
 *     The XHR Node Readable Stream
 */
proto.nostream.gRPCUploadServicePromiseClient.prototype.sendFile =
    function(request, metadata) {
        return new Promise((resolve, reject) => {
            this.delegateClient_.sendFile(
                request, metadata, (error, response) => {
                    error ? reject(error) : resolve(response);
                });
        });
    };


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.nostream.RepNOSTREAMTEST,
 *   !proto.nostream.RepNOSTREAMTEST>}
 */
const methodInfo_gRPCUploadService_Test = new grpc.web.AbstractClientBase.MethodInfo(
    proto.nostream.RepNOSTREAMTEST,
    /** @param {!proto.nostream.RepNOSTREAMTEST} request */
    function(request) {
        return request.serializeBinary();
    },
    proto.nostream.RepNOSTREAMTEST.deserializeBinary
);


/**
 * @param {!proto.nostream.RepNOSTREAMTEST} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.nostream.RepNOSTREAMTEST)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.nostream.RepNOSTREAMTEST>|undefined}
 *     The XHR Node Readable Stream
 */
proto.nostream.gRPCUploadServiceClient.prototype.test =
    function(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
            '/nostream.gRPCUploadService/Test',
            request,
            metadata,
            methodInfo_gRPCUploadService_Test,
            callback);
    };


/**
 * @param {!proto.nostream.RepNOSTREAMTEST} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.nostream.RepNOSTREAMTEST>}
 *     The XHR Node Readable Stream
 */
proto.nostream.gRPCUploadServicePromiseClient.prototype.test =
    function(request, metadata) {
        return new Promise((resolve, reject) => {
            this.delegateClient_.test(
                request, metadata, (error, response) => {
                    error ? reject(error) : resolve(response);
                });
        });
    };


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.nostream.RepNOSTREAMTEST,
 *   !proto.nostream.ResJson>}
 */
const methodInfo_gRPCUploadService_GetFileAll = new grpc.web.AbstractClientBase.MethodInfo(
    proto.nostream.ResJson,
    /** @param {!proto.nostream.RepNOSTREAMTEST} request */
    function(request) {
        return request.serializeBinary();
    },
    proto.nostream.ResJson.deserializeBinary
);


/**
 * @param {!proto.nostream.RepNOSTREAMTEST} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.nostream.ResJson)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.nostream.ResJson>|undefined}
 *     The XHR Node Readable Stream
 */
proto.nostream.gRPCUploadServiceClient.prototype.getFileAll =
    function(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
            '/nostream.gRPCUploadService/GetFileAll',
            request,
            metadata,
            methodInfo_gRPCUploadService_GetFileAll,
            callback);
    };


/**
 * @param {!proto.nostream.RepNOSTREAMTEST} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.nostream.ResJson>}
 *     The XHR Node Readable Stream
 */
proto.nostream.gRPCUploadServicePromiseClient.prototype.getFileAll =
    function(request, metadata) {
        return new Promise((resolve, reject) => {
            this.delegateClient_.getFileAll(
                request, metadata, (error, response) => {
                    error ? reject(error) : resolve(response);
                });
        });
    };


module.exports = proto.nostream;

