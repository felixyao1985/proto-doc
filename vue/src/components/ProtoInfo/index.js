/**
 * Created by felix on 2019/3/25.
 */

import store from "@/store";
import analysisProtoJson from '@/utils/analysisProtoJson.js';


const {gRPCUploadServicePromiseClient} = require('../../protos/fileupload_grpc_web_pb.js');
const {RepNOSTREAMTEST,ResJson} = require('../../protos/fileupload_pb.js');

export default function ProtoInfo() {
    var me = this
    var obj = new analysisProtoJson()
    var ProtoData = null;
    var ProtoList = null;

    async function Load() {
        return new Promise((resolve, reject) => {
            var filestream_Service = new gRPCUploadServicePromiseClient('http://106.14.125.33:12000', null, null);
            var fileupload_rep = new RepNOSTREAMTEST()
            fileupload_rep.setName("Felix")

            var headers = {
                "custom-header-1": "value1",
            }

            filestream_Service.getFileAll(fileupload_rep, headers).then(function (res) {
                let JsonstrList = res.getJsonstrList()
                let a = JSON.parse(JsonstrList[1]);//将json字符串转换成json对象

                JsonstrList.forEach(function (item, index, array) {
                    try {
                        let a = JSON.parse(item);//将json字符串转换成json对象
                        obj.Load(a)
                    }
                    catch(err){
                        console.log(err)
                    }
                })

                me.ProtoData = obj.GetProtoData();
                me.ProtoList = obj.GetProtoList();

                store.commit('SET_PROTODOC_DATA', me.ProtoData);
                store.commit('SET_PROTODOC_LIST', me.ProtoList);

                resolve();
            }, function (err) {
                console.log(err)
                reject();
            })
        })

    }

    function getRouterPath(){
        var PackAgePath = [];
        console.log("getRouterPath ProtoData",ProtoData)
        for (var key in ProtoData){
            let item = ProtoData[key]
            var servicePath = [];

            if(item.service !=undefined) {
                for (var service_key in item.service){
                    let service = item.service[service_key];

                    servicePath.push({
                        path: service_key,
                        name: 'protodoc-package'+key+service_key,
                        component: () => import('@/views/protodoc/service'),
                        props: { service: service_key },
                        meta: { title: 'protodoc-'+key+service_key, icon: 'icon-shoujitianchong' }
                    })
                }
            }

            PackAgePath.push({
                path: key,
                name: 'protodoc-package'+key,
                component: () => import('@/views/protodoc/package'),
                props: { packname: key },
                meta: { title: 'protodoc-'+key, icon: 'icon-shoujitianchong' },
                children: servicePath
            })
        }

        return PackAgePath
    }

    function getTree() {
        let ProtoData = me.ProtoData;

        var tree = [];
        for (var key in ProtoData){
            let item = ProtoData[key]
            var servicePath = [];

            if(item.service !=undefined) {
                for (var service_key in item.service){
                    let service = item.service[service_key];

                    var rpcPath = [];

                    if(service.rpc !=undefined) {
                        for (var rpc_key in service.rpc){
                            let rpc = service.rpc[rpc_key];
                            rpcPath.push({
                                id: rpc.name,
                                package: key,
                                service: service_key,
                                rpc: rpc.name,
                                rpc_key: rpc_key,
                                label: key+"-"+service_key+"-"+rpc.name
                            })
                        }
                    }

                    servicePath.push({
                        id: service_key,
                        label: key+"-"+service_key,
                        disabled: true,
                        children: rpcPath
                    })
                }
            }

            tree.push({
                id: key,
                label: key,
                disabled: true,
                children: servicePath
            })
        }

        return tree
    }

    return {
        ProtoData,
        ProtoList,
        getRouterPath,
        getTree,
        Load
    }
}