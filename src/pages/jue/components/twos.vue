<template>
  <div>
    <el-dialog :title="isShow.name" :visible.sync="isShow.isShow">
      <el-form :model="form">
        <el-form-item label="*角色名称:">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <!-- 树型结构 -->
      <el-tree
        :data="list"
        show-checkbox
        node-key="id"
        ref="tree"
        :props='{children: "children",label: "title",}'
      ></el-tree>
      <!-- 状态 -->
      <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>

      <div slot="footer" class="dialog-footer">
        <el-button @click="Else">取 消</el-button>
        <el-button type="primary" v-if="isShow.name == '修改'" @click="changeReq">修 改</el-button>
        <el-button type="primary" v-else @click="yes">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import {reqMenuList,reqJueAdd,reqJueOne,reqJueChange} from "../../../utils/http"
export default {
  props: ["isShow"],
  data() {
    return {
      list: [],
      form:{
          rolename:"",
          menus:[],
          status:""
      }
    };
  },
  methods: {
    // 先写个方法axios获取编辑数据，等one编辑按钮触发（编辑按钮触发父级自定义，父级自定义通过ref触发two的方法）
    myReq(scope){
        console.log(666666);
       
        reqJueOne(scope).then(res=>{
            this.form = res.data.list
            this.form.id = scope;
            this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus))  
        })
    },
      rest(){
          this.form = {
          rolename:"",
          menus:[],
          status:""
      }
      },
    Else() {
      this.isShow.isShow = false;
      this.rest()
    },
    yes() {
       this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())
      this.isShow.isShow = false;
      reqJueAdd(this.form).then(res=>{
          this.rest()
          this.Else()
        // 数据添加成功后告诉父级执行列表数据获取刷新
        this.$emit("updateLe")
      })
    },
    changeReq(){
        console.log(this.form);
        reqJueChange(this.form).then(res=>{
            this.$emit("updateLe")
            this.Else()
        })
    },
    ...mapActions({}),
  },
  mounted() {
      reqMenuList().then(res=>{
          this.list = res.data.list
      })
  },
  computed: {
    ...mapGetters({}),
  },
};
</script>
<style scoped>
</style>