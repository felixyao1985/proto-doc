<template>
    <section class="app-main">
        <div class="input-box">
            <input ref="upload" type="file" @change="upload" accept="" capture="camera" multiple="false">
        </div>
    </section>
</template>
<script>
    import {Component, Watch} from 'vue-property-decorator';
    import BaseComponent from '@/BaseComponent';
    const {gRPCUploadServicePromiseClient} = require('../../protos/fileupload_grpc_web_pb.js');
    const {RepNOSTREAMTEST,RepFileChunk} = require('../../protos/fileupload_pb.js');
    const grpc = {};
    grpc.web = require('grpc-web');

    @Component
    export default class ProtoUpload extends BaseComponent {

        created(){
            var filestream_Service =new gRPCUploadServicePromiseClient('http://106.14.125.33:12000', null, null);
            var fileupload_rep = new RepNOSTREAMTEST()
            fileupload_rep.setName("Felix")

            var headers={
                "custom-header-1": "value1",
            }

            filestream_Service.test(fileupload_rep, headers).then(function(res){
                console.log(res);
            },function(err){
                console.log(err)
            })
        }

        getBlob(buffer, format) {
            try {
                return new Blob(buffer, {type: format});
            } catch (e) {
                var bb = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
                buffer.forEach(function(buf) {
                    bb.append(buf);
                });
                return bb.getBlob(format);
            }
        }

        rpcRuest(files) {
            var reader = new window.FileReader();

            reader.readAsDataURL(files);
            //console.log(files);
            let me = this;
            reader.onload = function(e) {
                var result = this.result;
                //console.log(result)
                me.rpcSend(files.name,result, "application/octet-stream");
            }
        }

        rpcSend(filename,basestr, type) {
            var filestream_Service =new gRPCUploadServicePromiseClient('http://106.14.125.33:12000', null, null);

            var fileupload_rep = new RepFileChunk()
            var text = window.atob(basestr.split(",")[1]);
            var buffer = new Uint8Array(text.length);
            for (var i = 0; i < text.length; i++) {
                buffer[i] = text.charCodeAt(i);
            }
            var blob = this.getBlob([buffer], type);
            fileupload_rep.setContent(buffer);
            fileupload_rep.setFilename(filename);

            var self = this;
            var headers={
                "custom-header-1": "value1"
            }
            console.log(blob)
            console.log(buffer)
            console.log(fileupload_rep)
            console.log(filestream_Service)

            filestream_Service.sendFile(fileupload_rep, headers).then(function(res){
                console.log(res);
            },function(res){
                this.$message({
                    message: res.message,
                    type: 'warning'
                })
                console.log(res)
            })


        }

        upload() {
            let {files} = this.$refs.upload;
            if (typeof files == 'undefined') {
                return;
            }

            let file = files[0];//获取信息
            let filename = file.name
            let type = file.type;//获取类型，判断使用
            var index = filename.lastIndexOf(".");
            var suffix = filename.substr(index+1);

            if (suffix != 'proto' ) {
                this.$message({
                    message: '非Proto类型，无法上传！!',
                    type: 'warning'
                })
                return false;
            }

            this.rpcRuest(file)

        }




    }


</script>
