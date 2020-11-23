<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="form">
        <el-form-item label="活动名称" label-width="80px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="80px">
          <el-date-picker
            v-model="time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeTime"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类" label-width="80px">
          <el-select v-model="form.first_cateid" placeholder="请选择分类" @change="changeFirst">
            <el-option
              v-for="item in fenlist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="80px">
          <el-select v-model="form.second_cateid" placeholder="请选择分类" @change="changeSecond">
            <el-option
              v-for="(item,ind) of secondList"
              :key="ind"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="80px">
          <el-select v-model="form.goodsid" placeholder="请选择商品">
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title==='添加限时秒杀'">添加</el-button>
        <el-button type="primary" @click="updated" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import {
  reqSSAdd,
  reqSList,
  reqgoodsList,
  reqSSOne,
  reqSSX
} from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      secondList: [],
      goodsList: [],
      time: [],
      form: {
        title: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: "",
        begintime: "",
        endtime: "",
      },
    };
  },
  methods: {
    // 清空
    clears(){
      this.form = {
        title: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: "",
        begintime: "",
        endtime: "",
      },
      this.time = []
    },
    // 请求one
    one(id) {
      reqSSOne(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id
        this.time=[new Date(Number(res.data.list.begintime)),
        new Date(Number(res.data.list.endtime))]
        // this.form.begintime = new Date(Number(res.data.list.begintime));
        // this.form.endtime = new Date(Number(res.data.list.endtime));
      });
      this.oneList();
      this.twoList();
    },
    closed() {
       this.clears()
    },
    // 一级分类改变事件
    oneList() {
      reqSList({ pid: this.form.first_cateid }).then((res) => {
        this.secondList = res.data.list;
      });
    },
    changeFirst() {
      this.form.second_cateid = "";
      this.oneList();
    },
    // 二级改变事件
    twoList() {
      reqgoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        this.goodsList = res.data.list;
      });
    },
    changeSecond() {
      this.form.goodsid = "";
      this.twoList();
    },
    // 取消
    cancel() {
      this.info.isshow = false;
    },
    // 添加请求
    add() {
      this.form.begintime = Date.parse(this.time[0]);
      this.form.endtime = Date.parse(this.time[1]);
      console.log(this.form);
      reqSSAdd(this.form).then((res) => {
        this.info.isshow = false;
        this.a();
      });
    },
    // 修改
    updated() {
      reqSSX(this.form).then(res=>{
        this.a()
        this.info.isshow = false
      })
    },
    changeTime() {},
    ...mapActions({
      fenlei: "shopfenlei/a",
      a: "s/a",
    }),
  },
  mounted() {
    this.fenlei();
  },
  computed: {
    ...mapGetters({
      fenlist: "shopfenlei/g",
    }),
  },
};
</script>
<style scoped>
</style>