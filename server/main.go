package main

import (
	"flag"
	"fmt"
	"golang.org/x/net/context"
	"log"
	"net"
	"time"
	// "github.com/pkg/errors"
	fileUnit "github.com/file-unit"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
	pb "proto-doc/build/proto/nostream"
)

const (
	port = ":8003"
	i    = "0.0.0.0"
)

type server2 struct{}

var (
	copypath = flag.String("copypath", "./", "path to the out json file")
)

func (s *server2) SendFile(ctx context.Context, in *pb.RepFileChunk) (*pb.ResFileUploadAck, error) {
	fmt.Println(*copypath)
	log.Printf("File receive start at: %v", time.Now())

	filename := in.Filename
	writeStr := in.Content

	fileUnit.WriteWithIoutil(*copypath+filename, string(writeStr))
	jsonStr, err := fileUnit.ProtoTranslateJson(*copypath + filename)
	fileUnit.WriteWithIoutil(*copypath+filename+".json", jsonStr)

	return &pb.ResFileUploadAck{Code: 200, Message: "Msg Felix"}, err
}

func (s *server2) Test(ctx context.Context, in *pb.RepNOSTREAMTEST) (*pb.RepNOSTREAMTEST, error) {
	Name := in.Name
	return &pb.RepNOSTREAMTEST{Name: Name}, nil
}

func getFileData(file string) string {

	filedata, _ := fileUnit.ReadAll(file)
	return string(filedata)
}

func (s *server2) GetFileAll(ctx context.Context, in *pb.RepNOSTREAMTEST) (*pb.ResJson, error) {
	fileList, err := fileUnit.GetFileList(*copypath, ".json")
	var jsonarr []string
	if err == nil {
		for _, name := range fileList {
			println(name)
			jsonarr = append(jsonarr, getFileData(*copypath+name))

		}
	}

	return &pb.ResJson{JsonStr: jsonarr}, nil
}

func main() {
	flag.Parse()

	fmt.Println(*copypath)
	log.Printf("Server started. Listening on port %s", i+port)
	listener, err := net.Listen("tcp", i+port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
		// errors.Wrapf(err, "failed to listen")
	}
	s := grpc.NewServer()

	pb.RegisterGRPCUploadServiceServer(s, &server2{})

	reflection.Register(s)

	err = s.Serve(listener)
	if err != nil {
		log.Fatalf("failed to serve: %v", err)
		// errors.Wrapf(err, "failed to serve")
	}
	return
}
