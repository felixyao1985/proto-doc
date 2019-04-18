/**
 * Created by felix on 2019/3/21.
 */

export default function analysisProtoJson() {
    //proto info data templet
    // const _protoinfo = {
    //     name:"",
    //     comments:[],
    //     inlineComment:[]
    // }
    //
    // const _rpcinfo = {
    //     name:"",
    //     request:{
    //         messagetype:""
    //     },
    //     response:{
    //         messagetype:""
    //     },
    //     comments:[],
    //     inlineComment:[]
    // }
    //
    // const _messageinfo = {
    //     name:"",
    //     field:[
    //         {
    //             name:"",
    //             type:"",
    //             IsRepeated:"",
    //             comments:[],
    //             inlineComment:[]
    //         }
    //     ],
    //     comments:[],
    //     inlineComment:[]
    // }
    //
    // const _serviceinfo = {
    //     name:"",
    //     rpc:{},
    //     message:{},
    //     comments:[],
    //     inlineComment:[]
    // }

    var _ProtoList = [];  //proto files list
    var _ProtoData = {
        // "packname":{
        //     "proto":_protoinfo,
        //     "service":{
        //         "servicename":{_serviceinfo}
        //     },
        //     "message":{
        //         "messagename":{_messageinfo}
        //     },
        //     "enum":{
        //         "enumname":{}
        //     }
        // }
    }

    function parseComment (data) {
        if (data == undefined ) return null
        let ret = []
        if(data != null) {
            data.forEach(function (item, index, array) {
                if(item.Raw != undefined) {
                    ret.push(item.Raw)
                }
            });
        }
        return ret
    }

    function parseProtoInfo (data) {
        if (data == undefined ) return null
        let protoinfo = {};
        protoinfo.name = data.Name;
        protoinfo.comments = parseComment (data.Comments);
        protoinfo.inlineComment = parseComment (data.InlineComment);

        return protoinfo
    }

    function parseMessageInfo (data) {
        if (data == undefined ) return null
        let messageinfo = {};
        let MessageBody = data.MessageBody;
        let field = [];
        let ret = {};

        messageinfo.name = data.MessageName;
        messageinfo.comments =  parseComment (data.Comments);
        messageinfo.inlineComment = parseComment (data.InlineComment);
        MessageBody.forEach(function (item, index, array) {

            if(item.MessageName != undefined) {
                ret = Object.assign(ret,parseMessageInfo(item));
            }
            if(item.EnumName != undefined) {
				ret = Object.assign(ret,parseEnumInfo(item));
            }
            if(item.FieldName != undefined) {
                field.push({
                    name:item.FieldName,
                    type:item.Type,
                    IsRepeated:item.IsRepeated,
                    IsEnum:0,
                    comments:parseComment (data.Comments),
                    inlineComment:parseComment (data.InlineComment)
                })
            }

        });
        messageinfo.field = field;
        let _temp = {};
        _temp[data.MessageName] = messageinfo
        ret = Object.assign(ret,_temp);
        return ret
    }

    function parseEnumInfo (data) {
        if (data == undefined ) return null
        let mnuminfo = {};
        let EnumBody = data.EnumBody;
        let field = [];
        let ret = {};

        mnuminfo.name = data.EnumName;
        mnuminfo.comments =  parseComment (data.Comments);
        mnuminfo.inlineComment = parseComment (data.InlineComment);

        EnumBody.forEach(function (item, index, array) {
            if(item.Ident != undefined) {
                field.push({
                    name:item.Ident,
                    type:"Enum",
                    EnumValueOptions:item.EnumValueOptions,
                    IsEnum:1,
                    comments:parseComment (data.Comments),
                    inlineComment:parseComment (data.InlineComment)
                })
            }

        });
        mnuminfo.field = field;
        let _temp = {};
        _temp[data.EnumName] = mnuminfo
        ret = Object.assign(ret,_temp);
        return ret
    }


    function parseServiceInfo (data) {
        if (data == undefined ) return null
        let serviceinfo = {};
        let ServiceBody = data.ServiceBody;
        let rpc = [];
        let ret = {};

        serviceinfo.name = data.ServiceName;
        serviceinfo.comments =  parseComment (data.Comments);
        serviceinfo.inlineComment = parseComment (data.InlineComment);
        ServiceBody.forEach(function (item, index, array) {

            if(item.RPCName != undefined) {
                rpc.push({
                    name:item.RPCName,
                    request:{
                        messagetype:item.RPCRequest.MessageType,
                        IsStream:item.RPCRequest.IsStream
                    },
                    response:{
                        messagetype:item.RPCResponse.MessageType,
                        IsStream:item.RPCResponse.IsStream
                    },
                    comments:parseComment (data.Comments),
                    inlineComment:parseComment (data.InlineComment)
                })
            }

        });
        serviceinfo.rpc = rpc;
        let _temp = {};
        _temp[data.ServiceName] = serviceinfo
        ret = Object.assign(ret,_temp);
        return ret
    }

    function parseBody(data){
        let protoinfo = {};
        let services = {};
        let messages = {};
        let enums = {};
        let packname = "";
        let ret = {};

        data.forEach(function (item, index, array) {
            if(item.Name != undefined) {
                packname = item.Name;

                if(_ProtoData[packname] != undefined) {
                    protoinfo = _ProtoData[packname].proto
                    services  = Object.assign(services,_ProtoData[packname].service);
                    messages  = Object.assign(messages,_ProtoData[packname].message);
                    enums     = Object.assign(enums,_ProtoData[packname].enum);
                }else{
                    protoinfo = parseProtoInfo(item)
                    _ProtoList.push(packname);
                }


            }

            if(item.MessageName != undefined) {
                let _temp = {};
                messages = Object.assign(messages,parseMessageInfo(item));
            }

            if(item.ServiceName != undefined) {
                let _temp = {};
                services = Object.assign(services,parseServiceInfo(item));
            }

            if(item.EnumName != undefined) {
                let _temp = {};
                messages = Object.assign(messages,parseEnumInfo(item));
            }
        });

        ret[packname] = {
            "proto": protoinfo,
            "service": services,
            "message": messages,
            "enum": enums
        }
        return ret
    }

    function Load(json) {
        if(json.ProtoBody == undefined)return "is not proto json with github.com/yoheimuta/go-protoparser"
        let ProtoBody = json.ProtoBody;

        _ProtoData = Object.assign(_ProtoData,parseBody(ProtoBody));
        return
    }

    function GetProtoData(){
        return _ProtoData
    }

    function GetProtoList(){
        return _ProtoList
    }

    return {
        Load,
        GetProtoData,
        GetProtoList,
    }
}
