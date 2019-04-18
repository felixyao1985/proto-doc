
<template>
    <section class="app-packname-rpc" >
        <el-form   label-width="220px">
            <el-form-item label="message">
                <span class="content " style="" >{{messagename}}</span>
            </el-form-item>
            <el-form-item label="message comments">
                <span class="content " style="" v-for="item in messageinfo[messagename].comments">{{item}}</span>
                <span class="content " style="" v-html="messageinfo[messagename].inlineComment"></span>
            </el-form-item>
            <el-form-item  label="message field">
                <el-table
                        :data="messageinfo[messagename].field"
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
                enuminfo: "",
                package:"",
                packdata:"",
                onMessageClick:null,
                messagename:""
            }
        }
    )
    export default class ProtoDocMessage extends BaseComponent {


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
