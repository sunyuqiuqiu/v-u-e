<template>
  <div>
    <!-- 23.list展示在页面 -->
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="商品编号" sortable></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" sortable></el-table-column>
      <el-table-column label="图片" sortable>
        <template slot-scope="scope">
          <img :src="$host+scope.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column label="是否新品">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew===1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot===1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
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
          <!-- 32.绑定confirm事件 -->
          <del-btn @del="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import {reqgoodsDel} from "../../../utils/http"
import {successAlert,errorAlert} from "../../../utils/alert"

export default {
  props:["info"],
  data() {
    return {};
  },
  methods: {
    // 编辑
    edit(id) {
        this.info.isshow = false
        this.info.title ="修改商品"
        this.$emit("comeGo",id)
    },
    // 删除
    del(id) {
        console.log(999);
        reqgoodsDel(id).then(res=>{
          // 删除后调用更新
            this.a()
            this.all()
        })
        
    },
    ...mapActions({
      // list列表
      a: "shopguanli/a",
      all:"shopguanli/all",
      ye:"shopguanli/ye"
    }),
    // 分页
    changePage(n){
      this.ye(n)
    }
  },
  mounted() {
    this.a();
    this.all()
  },
  computed: {
    ...mapGetters({
      list: "shopguanli/g",
      total:"shopguanli/all",
      size:"shopguanli/s"
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