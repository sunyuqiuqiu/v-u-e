<template>
  <div>
    <!-- 23.list展示在页面 -->
    <el-table
      :data="cateList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="分类编号" sortable></el-table-column>
      <el-table-column prop="catename" label="分类名称" sortable></el-table-column>
      <el-table-column label="图片" sortable>
        <template slot-scope="scope">
          <img :src="$host +scope.row.img" alt />
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="ed(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { reqMOne, reqfenleiMove } from "../../../utils/http";
import {successAlert,errorAlert} from "../../../utils/alert"
export default {
  props: ["text"],
  data() {
    return {};
  },
  methods: {
    //  删除按钮提交数据
    ed(id) {
      this.$confirm("你确定要删除吗？", "删除提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        reqfenleiMove(id).then((res) => {
          this.a();
          successAlert("成功");
        });
      }).catch(err=>{
           errorAlert("您已取消")
      })
    },
    // 编辑按钮在弹框组件请求一条
    edit(id) {
      this.text.isShow = true;
      this.text.title = "编辑";
      this.$emit("one", id);
    },
    ...mapActions({
      a: "shopfenlei/a",
    }),
  },
  mounted() {
    // this.a()
  },
  computed: {
    ...mapGetters({
      cateList: "shopfenlei/g",
    }),
  },
};
</script>
<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>