<template>
  <div>
    <el-table :data="jiajia" style="width: 100%">
      <el-table-column prop="id" label="角色编号"></el-table-column>
      <el-table-column prop="rolename" label="角色名称"></el-table-column>
      <el-table-column prop="address" label="状态">
        <template>
          <el-button type="primary">启用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click="ready(scope.row.id)">编辑</el-button>
            <el-button type="danger" @click="move(scope.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { reqJueList, reqJueMove } from "../../../utils/http";
import {successAlert,errorAlert} from "../../../utils/alert"
export default {
  props: ["jiajia", "sbjia"],
  data() {
    return {};
  },
  methods: {
    move(id) {
      this.$confirm("你确定要删除吗？", "删除提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        reqJueMove(id).then((res) => {
          this.$emit("memeda");
           successAlert("成功");
        });
      }).catch(err=>{
            errorAlert("您已取消")
        });
    },
    ready(scope) {
      this.sbjia.isShow = true;
      this.sbjia.name = "修改";
      this.$emit("bianji", scope);
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