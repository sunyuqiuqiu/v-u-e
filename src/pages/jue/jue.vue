<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="jueAdd">添 加</el-button>
    <!-- ones组件 -->
    <v-ones @memeda= "reqs" :jiajia ="arr" :sbjia="info" @bianji = "bianji"></v-ones>
    <!-- twos组件 -->
    <v-twos :isShow="info" @updateLe = "reqs" ref="tobianji"></v-twos>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import vOnes from "../jue/components/ones";
import vTwos from "../jue/components/twos";
import { reqJueList } from "../../utils/http";
export default {
  components: {
    vOnes,
    vTwos,
  },
  data() {
    return {
      info: {
        isShow: false,
        name:"角色名称:"
      },
      arr:[]
    };
  },
  methods: {
    bianji(scope){
      // 是子组件实例
      // this.$refs.tobianji
      this.$refs.tobianji.myReq(scope)
    },
    // 显示隐藏
    jueAdd() {
      this.info = {
        isShow: true,
        name:"添加"
      };
    },
    reqs() {
      reqJueList().then((res) => {
      // 所有需要的数据在列表请求都有
       this.arr = res.data.list;
    
      });
    },
    ...mapActions({}),
  },
  mounted() {
    this.reqs()
  },
  computed: {
    ...mapGetters({}),
  },
};
</script>
<style scoped>
</style>