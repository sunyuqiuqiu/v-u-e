<template>
  <div>
    <!-- 添加 -->
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- list -->
    <v-list :list="list" @qiusb = "init" @w = "gogo"></v-list>
    <!-- form -->
    <v-form :info="info" :list="list" @meijia = "init" ref="sun"></v-form>
  </div>
</template>
<script>
// 引入list和form
import vList from "./components/list";
import vForm from "./components/form";

import { mapActions, mapGetters } from "vuex";
import {reqMenuList} from "../../utils/http"
export default {
  // 注册
  components: {
    vList,
    vForm,
  },
  // 因为点击弹表框的isShow值，数据在父组件容易操控
  data() {
    return {
      info: {
        title: "添加菜单",
        isShow: false,
      },
      list:[]
    };
  },
  methods: {
    ...mapActions({}),
    willAdd(){
        this.info =  {
        title: "添加菜单",
        isShow: true,
      }
    },
    init(){
        reqMenuList().then(res=>{
            console.log(res.data.list);
            this.list = res.data.list
        })
    },
    // jia(){
    //   this.init()
    // }
    gogo(scope){
      this.info =  {
        title: "编辑菜单",
        isShow: true,
      }
     this.$refs.sun.getOne(scope)
    }
  },
  mounted() {
      this.init()
  },
  computed: {
    ...mapGetters({}),
  },
};
</script>
<style scoped>
</style>