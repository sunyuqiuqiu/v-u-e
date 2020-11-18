<template>
  <div>
    <el-table :data="daSb" style="width: 100%">
      <el-table-column prop="id" label="角色编号"></el-table-column>
      <el-table-column prop="username" label="角色名称"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template>
          <el-button type="primary">启用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <div>
              <!-- 编辑axios请求数据在弹出框组件，按钮编辑事件在list列表组件 -->
            <el-button type="primary" @click="ready(scope.row)">编辑</el-button>
            <el-button type="danger" @click="move(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import {reqMMove} from "../../../utils/http"
export default {
    props:["daSb"],
    data(){
        return{
            jiajia:[]
        }
    },
  methods: {
      move(scope){
          reqMMove(scope.uid).then(res=>{
              this.$emit("xiexie")
          })
      },
    ...mapActions({}),
  },
  mounted() {},
  computed: {
    ...mapGetters({}),
  },
};
</script>
<style scoped>
</style>