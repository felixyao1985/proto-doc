
<template>
    <section class="app-main">
        <el-container class="app-main" style="min-height: 1024px; border: 1px solid #eee;">
            <el-aside width="350px" style="background-color: rgb(238, 241, 246)">
                <el-input
                        placeholder="输入关键字进行过滤"
                        v-model="filterText">
                </el-input>
                <el-tree :data="treeData" :props="defaultTreeProps" @node-click="handleNodeClick"
                         default-expand-all
                         :filter-node-method="filterNode"
                         ref="tree2"
                         v-loading="loading"
                         element-loading-text="拼命加载中"
                         element-loading-spinner="el-icon-loading"
                         element-loading-background="rgba(0, 0, 0, 0.8)"
                >

                </el-tree>
            </el-aside>

            <el-container>
                <el-header style="text-align: left; font-size: 12px">
                    <span>{{package}} {{messagename}}</span>
                </el-header>

                <el-main :is="currentView"
                         :serviceinfo="serviceinfo"
                         :rpcinfo="rpcinfo"
                         :messageinfo="messageinfo"
                         :enuminfo="enuminfo"
                         :package="package"
                         :packdata="packdata"
                         :messagename="messagename"
                         :onMessageClick="onMessageClick"
                    >
                </el-main>
            </el-container>
        </el-container>


    </section>
</template>

<script>
import {Component, Watch} from 'vue-property-decorator'
import BaseComponent from '@/BaseComponent';
import ProtoInfo from '@/components/ProtoInfo/index.js';
import rpcComponent from './rpc';
import msgComponent from './message';

@Component
export default class ProtoDoc extends BaseComponent {
    packdata  = {};
    treeData = [];
    package = "";
    ProtoList  = [];
    ProtoData = {};
    defaultTreeProps =  {
        children: 'children',
        label: 'label'
    }
    serviceinfo = {};
    rpcinfo = {};
    messageinfo = [];
    enuminfo = [];
    currentView = rpcComponent;
    messagename = "";
    filterText = "";
    loading = true;

    created(){
        this.initTree()
    }

    async initTree() {
        var objProtoInfo = new ProtoInfo()
        await objProtoInfo.Load()
        this.treeData = objProtoInfo.getTree();
        this.ProtoData = this.$store.state.protodoc.data;
        this.ProtoList = this.$store.state.protodoc.list;
        this.loading = false;
    }

    @Watch("filterText")
    watchFilterText(newVal, oldVal) {
        this.$refs.tree2.filter(newVal);
    }

    handleNodeClick(data) {
        if(!data.disabled){
            window.scrollTo(0,0);

            this.package  = data.package;
            this.service  = data.service;
            this.rpc  = data.rpc;
            this.packdata = this.ProtoData[data.package]

            this.serviceinfo = this.packdata.service[this.service];
            this.rpcinfo = this.serviceinfo.rpc[data.rpc_key];
            this.messageinfo = this.packdata.message;
            this.enuminfo = this.packdata.enuminfo;
            this.messagename = "";
            this.currentView = rpcComponent
        }
    }

    onMessageClick(messagename) {
        window.scrollTo(0,0);
        this.messagename = messagename;
        this.currentView = msgComponent
        console.log(messagename)
    }

    filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
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
