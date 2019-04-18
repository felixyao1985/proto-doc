package main

import (
	"flag"
	"fmt"
	fileUnit "github.com/file-unit"
	"github.com/yoheimuta/go-protoparser"
	"github.com/yoheimuta/go-protoparser/interpret/unordered"
	"github.com/yoheimuta/go-protoparser/parser"
	"path"
	"regexp"
	"strconv"
	"strings"
)

var (
	copypath   = flag.String("copypath", "dolphin-proto/", "path to the input proto file")
	outpath    = flag.String("outpath", "dolphin-base/servers", "path to the out pb file")
	outsqlpath = flag.String("outsqlpath", "dolphin-proto/sqlcode", "path to the out sql file")
)

type SQLField struct {
	name         string
	fieldtype    string
	enums        string
	len          int
	key          string
	defaultValue string
	comment      string
}

func genGoServerFile(proto *parser.Proto, name string) {
	v, _ := protoparser.UnorderedInterpret(proto)
	newName := strings.Replace(path.Base(name), path.Ext(name), "", -1)

	fmt.Println("genGoServerFile:", newName)
	content := `
package servers
	
import (
	bp "dolphin-proto/gen"
	"golang.org/x/net/context"
)

`
	for _, s := range v.ProtoBody.Services {
		serverName := "Server" + s.ServiceName
		content += `type ` + serverName + ` struct{}`
		ServiceBody := s.ServiceBody
		for _, rpcs := range ServiceBody.RPCs {

			content += `

func (s *` + serverName + `) ` + rpcs.RPCName + `(ctx context.Context, in *bp.` + rpcs.RPCRequest.MessageType + `) (*bp.` + rpcs.RPCResponse.MessageType + `, error) {

	return &bp.` + rpcs.RPCResponse.MessageType + `{}, nil
}

`
		}
	}

	fileUnit.WriteWithIoutil(*outpath+"/"+newName+".go", content)
}

func genSQLFile(proto *parser.Proto, name string) {
	v, _ := protoparser.UnorderedInterpret(proto)
	newName := strings.Replace(path.Base(name), path.Ext(name), "", -1)

	fmt.Println("genSQLFile:", newName)
	var content string
	writeFlag := false
	for _, s := range v.ProtoBody.Messages {
		tableName := ""
		comments := s.Comments
		genSQLFlag := false
		for _, comment := range comments {
			Raw := comment.Raw
			fmt.Println(strings.Index(Raw, "gen sql tablename"))
			if strings.Index(Raw, "gen sql tablename") > 0 {
				genSQLFlag = true
				writeFlag = true

				//reg := regexp.MustCompile(`tablename = (?:(\w+))`)
				//match := reg.FindAllStringSubmatch(Raw, -1)
				match := regexpCompile(Raw, `tablename = (?:(\w+))`)
				tableName = match[0][1]
				break
			}
		}

		if genSQLFlag {
			fmt.Println("tableName : ", tableName)
			Fields := s.MessageBody.Fields
			Enums := s.MessageBody.Enums
			for _, Enum := range Enums {
				v.ProtoBody.Enums = append(v.ProtoBody.Enums, Enum)
			}
			PRIMARYKEY := "id"
			content += `

CREATE TABLE ` + "`" + tableName + "`" + `(
`
			for _, Field := range Fields {
				content += parseFieldSql(Field, v.ProtoBody.Enums) + `
`
			}

			content += `
  PRIMARY KEY (` + "`" + PRIMARYKEY + "`" + `)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1;
`
		}
	}
	if writeFlag {
		fileUnit.WriteWithIoutil(*outsqlpath+"/"+newName+".sql", content)
	}
}

func parseFieldSql(Field *parser.Field, Enums []*unordered.Enum) string {
	var (
		sql string
	)

	retField := &SQLField{}

	retField.parseFieldInlineComment(Field.InlineComment)
	//fmt.Println(retField.name, retField.fieldtype)
	if retField.fieldtype == "" {
		retField.fieldtype = Field.Type
	}

	if OK, ret := inEnum(Field.Type, Enums); OK {
		retField.fieldtype = "enum"
		retField.enums = ret
	} else if retField.fieldtype == "" {
		retField.fieldtype = Field.Type
	}

	if retField.name == "" {
		retField.name = Field.FieldName
	}
	fmt.Println(retField)

	switch retField.fieldtype {
	case "int64", "int32", "int":
		sql = "`" + retField.name + "` int(" + strconv.FormatInt(int64(retField.len), 10) + ")"
		if retField.key == "PRIMARY" {
			sql += " NOT NULL AUTO_INCREMENT,"
		} else {
			sql += " DEFAULT NULL,"
		}
		break
	case "double":
		sql = "`" + retField.name + "` double(10,2) DEFAULT NULL,"
		break
	case "float":
		sql = "`" + retField.name + "` float DEFAULT NULL,"
		break
	case "string", "varchar":
		sql = "`" + retField.name + "` varchar(" + strconv.FormatInt(int64(retField.len), 10) + ") DEFAULT NULL,"
		break
	case "text":
		sql = "`" + retField.name + "` text,"
		break
	case "datetime", "date":
		sql = "`" + retField.name + "` datetime DEFAULT NULL,"
		break
	case "enum":
		sql = "`" + retField.name + "` enum(" + retField.enums + ") DEFAULT NULL,"
		break
	default:

	}

	//fmt.Println(sql)
	return sql
}

func (s *SQLField) parseFieldInlineComment(InlineComment *parser.Comment) {

	if InlineComment == nil {
		return
	}
	Raw := InlineComment.Raw
	name := regexpCompile(Raw, `sql:"(?:(\w+))"`)
	if len(name) > 0 && len(name[0]) > 1 {
		s.name = name[0][1]
	}

	fieldtype := regexpCompile(Raw, `type:"(?:(\w+))"`)
	if len(fieldtype) > 0 && len(fieldtype[0]) > 1 {
		s.fieldtype = strings.ToLower(fieldtype[0][1])
	}

	_len := regexpCompile(Raw, `len:"(?:(\w+))"`)
	if len(_len) > 0 && len(_len[0]) > 1 {
		s.len, _ = strconv.Atoi(_len[0][1])
	} else {
		if s.fieldtype == "int" {
			s.len = 10
		} else if s.fieldtype == "varchar" {
			s.len = 255
		}
	}

	key := regexpCompile(Raw, `key:"(?:(.+))"`)
	if len(key) > 0 && len(key[0]) > 1 {
		s.key = key[0][1]
	}

}

func inEnum(s string, Enums []*unordered.Enum) (bool, string) {
	for _, Enum := range Enums {
		if s == Enum.EnumName {
			EnumFields := Enum.EnumBody.EnumFields
			var enums string
			flag := false
			enums += "'"
			for _, EnumField := range EnumFields {
				if flag {
					enums += ",'" + EnumField.Ident
				} else {
					flag = true
					enums += EnumField.Ident
				}
				enums += "'"
			}
			return flag, enums
		}
	}
	return false, ""
}

func regexpCompile(str string, rege string) [][]string {
	reg := regexp.MustCompile(rege)
	result := reg.FindAllStringSubmatch(str, -1)
	return result
}

func main() {

	flag.Parse()
	fmt.Println(*copypath)
	fileList, err := fileUnit.GetFileList(*copypath, ".proto")
	if err == nil {
		for _, name := range fileList {
			proto, err := fileUnit.ParseProto(*copypath + name)
			//fmt.Println(fileUnit.ProtoTranslateJson(*copypath + name))
			if err == nil {
				genGoServerFile(proto, name)
				genSQLFile(proto, name)
			}

		}
	} else {
		fmt.Errorf(err.Error())
	}

}
