<template>
    <section class="app-packname-rpc">
        <el-form-item label="Proto 文件" >
            <el-select v-model="packname" placeholder="please select your packname" @change="getPackData(packname)">
                <el-option
                        v-for="item in ProtoList"
                        :key="item"
                        :label="item"
                        :value="item">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="Proto 说明">
            <span class="content " style="" v-for="item in packdata.proto.comments">{{item}}</span>
            <span class="content " style="" v-html="packdata.proto.inlineComment"></span>
        </el-form-item>
        <div>
        <router-view></router-view>
        </div>
    </section>
</template>

<script>
    import {Component, Watch} from 'vue-property-decorator'
    import BaseComponent from '@/BaseComponent';

    @Component(
        {
            props: {
                package: 0
            }
        }
    )
    export default class protodoc extends BaseComponent {
        package  = "";
        packdata  = {};

        created(){
            this.ProtoData = this.$store.state.protodoc.data;
            this.ProtoList = this.$store.state.protodoc.list;
            this.packname = this.ProtoList[0];
            this.packdata = this.ProtoData[this.package]
            console.log("packname next:",this.package)

        }

        @Watch('package')
        watchCount(newVal, oldVal) {
            console.log("packname next:",this.package)
        }

        getPackData (packname) {
            //this.packdata = this.ProtoData[packname]
        }

    }


</script>

<style scoped>

</style>
