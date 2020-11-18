<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="zhuAdd">添 加</el-button>
    <!-- zhu组件 -->
    <v-zhu :daSb= "myArr" @xiexie= "Req"></v-zhu>
    <!-- fu组件 -->
    <v-fu :info="info" @xiexie= "Req"></v-fu>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import vZhu from "./components/zhu";
import vFu from "./components/fu";
import { reqMList, reqMNum } from "../../utils/http";
export default {
  data() {
    return {
      info: {
        isShow: false,
      },
      page: 1,
      size: 7,
      myArr:[]
    };
  },
  components: {
    vZhu,
    vFu,
  },
  methods: {
    zhuAdd() {
      this.info = {
        isShow: true,
      };
    },
    // 获取列表数据（放在函数方法里，用时调用起到刷新的效果）
    Req() {
      reqMList({page:this.page,size:this.size}).then((res) => {
         this.myArr = res.data.list
         console.log(this.myArr);
      });
    },
    ...mapActions({}),
  },
  mounted() {
    this.Req();
    //  页数请求
    reqMNum().then((res) => {});
  },
  computed: {
    ...mapGetters({}),
  },
};
</script>
<style scoped>
</style>