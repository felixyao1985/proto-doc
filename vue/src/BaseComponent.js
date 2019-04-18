import { Vue, Component} from 'vue-property-decorator'
import store from 'store';

@Component
export default class BaseComponent extends Vue {
    modPath = "";
    Log(str) {
        console.log(str);
    }

    getmodPath() {
        let path = this.$route.path;
        if(path !=''&& path!=undefined){
            let paths = path.split("/");
            if(paths[1]!='' && paths[1]!=undefined) {
                this.modPath = paths[1];
            }else{
                this.modPath = 'home';
            }
        }else{
            this.modPath = 'home';

        }
        store.set('modPath',this.modPath);
    }

    removePageCache(page) {
        store.remove(page);
    }

    setPageCache(page,val) {
        store.set(page,val);
    }

    getPageCache(page) {
        return store.get(page);
    }

    beforeCreate() {
        //console.log('------beforeCreate创建前状态------');
    }
    created() {
        //console.log('------created创建完毕状态------');
        this.getmodPath();
    }

    beforeMount() {
        //console.log('------beforeMount挂载前状态------');
        //this.getmodPath();
    }
    mounted() {
        //console.log('------mounted 挂载结束状态------');
        //console.log(this.$route.path);
    }

    beforeUpdate () {
        //console.log('beforeUpdate 更新前状态===============》');
        //console.log(this.$route.path);
        this.getmodPath();
    }

    updated() {
        //console.log('updated 更新完成状态===============》');
        //console.log(this.$route.path);
    }

    beforeDestroy() {
        //console.log('beforeDestroy 销毁前状态===============》');
        //console.log(this.$route.path);
    }

    destroyed() {

        if(store.get('modPath') != this.modPath){
            store.remove(store.get('modPath'));
            //console.log('modPath',this.modPath);
            //console.log('store modPath',store.get('modPath'));
            //console.log('destroyed 销毁完成状态===============》');
        }
        //console.log(this.$route.path);
    }
    beforeRouteLeave () {
        console.log('beforeRouteLeave')
    }
    beforeRouteEnter(){
        console.log('beforeRouteEnter')
    }
}
