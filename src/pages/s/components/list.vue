<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="title" label="活动名称" sortable width="180"></el-table-column>
      <el-table-column prop="name" label="状态" sortable width="180">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @del="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import {reqSSDel,reqSSOne} from "../../../utils/http"
export default {
    props:["info"],
    data(){
        return{
            
        }
    },
  methods: {
    // 删除
    del(id){
      reqSSDel(id).then(res=>{
         this.a()
      })
    },
    // 编辑
    edit(id){
        this.info.isshow = true;
        this.info.title = "编辑限时秒杀"
      this.$emit("ref",id)
    },
    ...mapActions({
        a:"s/a"
    }),
  },
  mounted() {
    this.a()
  },
  computed: {
    ...mapGetters({
      list:'s/g'
    }),
  },
};
</script>
<style scoped>
.el-table{
    margin-top: 20px;
}
.el-table td div{
  display: inline-block;
}
</style>