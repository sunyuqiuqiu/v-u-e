<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="规格名称" label-width="120px">
          <el-input v-model="user.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格属性" label-width="120px" v-for="(item,index) in attrArr" :key="index">
          <div class="line">
            <el-input v-model="item.value" autocomplete="off"></el-input>
            <el-button type="primary" v-if="index===0" @click="addAttr">添加规格属性</el-button>
            <el-button type="danger" v-else @click="delAttr(index)">删除</el-button>
          </div>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="reset">取 消</el-button>
        <el-button type="primary" v-if="info.title=='添加规格'" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import {reqspecsAdd,reqspecsList,reqspecsDel,reqspecsDetail,reqspecsUpdate} from "../../../utils/http"
export default {
  props:["info"],
  data(){
      return{
          user:{
              specsname:"",
              status:""
          },
          attrArr: [{ value: "" }]
      }
  },
  methods: {
    closed(){
        
    },
    addAttr(){
    // 添加规格属性 用 遍历渲染 数据多一条视图就多一条
      this.attrArr.push({
        value:""
      })
    },
    delAttr(){

    },
    // 添加请求
    add(){
      // 拿到数组每一项的值返回数组形式给后台要的参数
      this.user.attrs = JSON.stringify(this.attrArr.map(item=>item.value))
        reqspecsAdd(this.user).then(res=>{
           this.info.isshow = false
           this.a()
        })
    },
    update(){

    },
    // 取消
    reset(){
        this.info.isshow = false
    },


    ...mapActions({
      a:"shopguige/a"
    }),
  },
  mounted() {},
  computed: {
    ...mapGetters({}),
  },
};
</script>
<style scoped>
.el-input{
  width: 65%;
}
</style>