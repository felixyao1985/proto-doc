<template>
    <section class="app-package">
        <el-form   label-width="220px">
            <el-form-item label="Proto package name" >
                {{packname}}
            </el-form-item>
            <el-form-item label="Proto 说明">
                <span class="content " style="" v-for="item in packdata.proto.comments">{{item}}</span>
                <span class="content " style="" v-html="packdata.proto.inlineComment"></span>
            </el-form-item>
            <div>
                <router-view :packdata="packdata"></router-view>
            </div>
        </el-form>
    </section>
</template>

<script>
    import {Component, Watch} from 'vue-property-decorator'
    import BaseComponent from '@/BaseComponent';

    @Component(
        {
            props: {
                packname: ""
            }
        }
    )
    export default class protodocpackage extends BaseComponent {
        packdata  = {};

        created(){
            this.ProtoData = this.$store.state.protodoc.data;
            this.packdata = this.ProtoData[this.packname]
            console.log("packname next:",this.packname)

        }

        @Watch('packname')
        watchCount(newVal, oldVal) {
            this.packdata = this.ProtoData[this.packname]
        }

        getPackData (packname) {
            //this.packdata = this.ProtoData[packname]
        }

    }


</script>

<style scoped>

</style>
