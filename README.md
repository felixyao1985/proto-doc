#将Proto 在线查阅

借助 github.com/yoheimuta/go-protoparser 

通过proto生成JSON文件，再通过前端进行文档展示

目前完成了基本功能，性能、速度都有很大的改善空间。


#### server 
	
	服务端、负责处理文件上传与文件获取

	运行参数

	- copypath 指定上传文件的存放位置

#### build
	
	proto文件与docker部署配置文件

#### vue 
	
	前端代码

#### gen
	
	基于proto生成 go语言的server 代码。与SQL（需要额外的注解）




###JSON文件

统一的数据结构。

- Meta
    - Pos
        - Filename
        - Offset
        - Line
        - Column
    - LastPos
         - Filename
         - Offset
         - Line
         - Column
- Comments      //备注说明(写在目标之上) 是个数组依据行数显示.如果是/**/型注解会被合并成一行
    - Raw       //内容
    - Meta{}
- InlineComment //备注说明(与目标同行)
    - Raw
    - Meta{}
- Option 可存在于任何位置，(仅指在proto 内通过option标签 定义的内容，和下文内的Options没关联 )结构如下
    - OptionName
    - Constant
    - Comments
    - InlineComment
    - Meta {}
    
message 可内嵌 message 或 Enum Option

---

Syntax
- ProtobufVersion
- Comments
- InlineComment
- Meta {}
            
ProtoBody []
- array Modifier info
    - Modifier
    - Location
    - Comments
    - InlineComment
    - Meta {}
- Array  proto info 
    - Name
    - Comments
    - InlineComment
    - Meta {}
- Array Enum info
    - EnumName
    - EnumBody []
        - Ident
        - Number
        - EnumValueOptions []
            - OptionName
            - Constant
        - Comments
        - InlineComment
        - Meta {}
        
- Array  Service info [] 多个Service  
    - ServiceName
    - ServiceBody [] 多个RPC方法  
        - RPCName
        - RPCRequest
            - IsStream
            - MessageType
            - Meta {}           
        - RPCResponse
            - IsStream
            - MessageType
            - Meta {}   
         - Options
         - Comments
         - InlineComment
         - Meta {}
     - Comments
     - InlineComment
     - InlineCommentBehindLeftCurly
     - Meta {}         
- Array Message info
    - MessageName
    - MessageBody [] 
        - IsRepeated 是否为多笔
        - Type  字段类型
        - FieldName 字段名称
        - FieldNumber 字段序号
        - FieldOptions 
        - Comments
        - InlineComment
        - Meta
     - Comments
     - InlineComment
     - InlineCommentBehindLeftCurly
     - Meta {}   
- Array map info
    - KeyType
    - Type
    - MapName

Meta
- Filename