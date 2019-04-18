
<template>
    <section class="app-packname-rpc" v-if="package!=''">
      <el-form   label-width="220px">
        <el-form-item label="Proto comments">
          <span class="content " style="" v-for="item in packdata.proto.comments">{{item}}</span>
          <span class="content " style="" v-html="packdata.proto.inlineComment"></span>
        </el-form-item>
        <el-form-item label="service name" >
          {{serviceinfo.name}}
        </el-form-item>
        <el-form-item label="service comments">
          <span class="content " style="" v-for="item in serviceinfo.comments">{{item}}</span>
          <span class="content " style="" v-html="serviceinfo.inlineComment"></span>
        </el-form-item>
        <el-form-item label="rpc name" >
          {{rpcinfo.name}}
                      </el-form-item>
        <el-form-item label="rpc comments">
          <span class="content " style="" v-for="item in rpcinfo.comments">{{item}}</span>
          <span class="content " style="" v-html="rpcinfo.inlineComment"></span>
        </el-form-item>
        <el-form-item label="rpc request message">
          <span class="content " style="" >{{rpcinfo.request.messagetype}}</span>
        </el-form-item>
        <el-form-item label="rpc request comments">
          <span class="content " style="" v-for="item in messageinfo[rpcinfo.request.messagetype].comments">{{item}}</span>
          <span class="content " style="" v-html="messageinfo[rpcinfo.request.messagetype].inlineComment"></span>
        </el-form-item>
        <el-form-item  label="request message field">
          <el-table
                  :data="messageinfo[rpcinfo.request.messagetype].field"
                  style="width: 100%">
            <el-table-column
                    prop="name"
                    label="name"
                    width="180">
              <template slot-scope="scope" >
                <span @click="handleNodeClick(scope.row.type)" style="color:blue;cursor: pointer; " v-if="messageinfo[scope.row.type] != undefined&& messageinfo[scope.row.type]!=''">{{scope.row.name}}</span>
                <span v-else>{{scope.row.name}}</span>
              </template>

            </el-table-column>
            <el-table-column
                    prop="type"
                    label="type"
                    width="220">
            </el-table-column>
            <el-table-column
                    prop="IsRepeated"
                    label="IsRepeated"
                    width="220">
            </el-table-column>
            <el-table-column label="说明">
              <template slot-scope="scope">
                <span class="content " style="" v-for="item in scope.row.comments">{{item}}</span>
                <span class="content " style="" v-html="scope.row.inlineComment"></span>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <el-form-item label="rpc response">
          <span class="content " style="" >{{rpcinfo.response.messagetype}}</span>
        </el-form-item>
        <el-form-item label="rpc response comments">
          <span class="content " style="" v-for="item in messageinfo[rpcinfo.response.messagetype].comments">{{item}}</span>
          <span class="content " style="" v-html="messageinfo[rpcinfo.response.messagetype].inlineComment"></span>
        </el-form-item>
        <el-form-item  label="response message field">
          <el-table
                  :data="messageinfo[rpcinfo.response.messagetype].field"
                  style="width: 100%">
            <el-table-column
                    prop="name"
                    label="name"
                    width="180">
              <template slot-scope="scope">
                <span @click="handleNodeClick(scope.row.type)" style="color:blue;cursor: pointer; " v-if="messageinfo[scope.row.type] != undefined&& messageinfo[scope.row.type]!=''">{{scope.row.name}}</span>
                <span v-else>{{scope.row.name}}</span>
              </template>

            </el-table-column>
            <el-table-column
                    prop="type"
                    label="type"
                    width="220">
            </el-table-column>
            <el-table-column
                    prop="IsRepeated"
                    label="IsRepeated"
                    width="220">
            </el-table-column>
            <el-table-column label="说明">
              <template slot-scope="scope">
                <span class="content " style="" v-for="item in scope.row.comments">{{item}}</span>
                <span class="content " style="" v-html="scope.row.inlineComment"></span>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
    </section>

</template>

<script>
import {Component, Watch} from 'vue-property-decorator'
import BaseComponent from '@/BaseComponent';

@Component(
    {
        props: {
            serviceinfo: "",
            rpcinfo: "",
            messageinfo: "",
            package:"",
            packdata:"",
            onMessageClick:null
        }
    }
)
export default class ProtoDocRPC extends BaseComponent {


    created(){

      console.log(this.$props)
    }

    handleNodeClick(data) {
        this.onMessageClick(data)
    }



}


</script>


<style scoped>
  .el-header {
    background-color: #00387B;
    color: #ffffff;
    line-height: 60px;
  }

  .el-aside {
    color: #ffffff;
  }
</style>
