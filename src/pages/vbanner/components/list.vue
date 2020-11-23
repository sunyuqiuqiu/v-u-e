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
      <el-table-column prop="id" label="编号" sortable width="180"></el-table-column>
      <el-table-column prop="title" label="轮播图标题" sortable width="180"></el-table-column>
      <el-table-column prop="img" label="图片">
        <template slot-scope="scope">
          <img :src="$host + scope.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column prop="states" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启动</el-button>
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
import { mapActions, mapGetters,reqBanOne } from "vuex";
import {reqBanDel} from "../../../utils/http"
import {successAlert,errorAlert} from "../../../utils/alert"

export default {
  props:["info"],
  data(){
      return{
          
      }
  },
  methods: {
    // 获取一条
    edit(id){
      this.info.isshow = true
      this.info.title = "编辑轮播图"
      this.$emit("re",id)
    },
    // 删除
    del(id){
        reqBanDel(id).then((res) => {
          this.a();
          successAlert("成功");
        
      })
    },
    ...mapActions({
        a:"vbanner/a"
    }),
  },
  mounted() {
      this.a()
  },
  computed: {
    ...mapGetters({
        list:"vbanner/g"
    }),
  },
};
</script>
<style scoped>
.el-table{
    margin-top: 20px;
}
img {
  width: 80px;
  height: 80px;
}
</style>