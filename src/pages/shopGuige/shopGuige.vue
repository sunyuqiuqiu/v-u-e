<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="zAdd">添加</el-button>
    <!-- list组件 -->
    <v-list :info= "info"></v-list>
    <!-- popup组件 -->
    <v-popup :info= "info"></v-popup>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import vList from "./components/list";
import vPopup from "./components/popup";

export default {
  components: {
    vList,
    vPopup,
  },
  data() {
    return {
      info: {
        isshow: false,
        title: "",
      },
    };
  },
  methods: {
    zAdd() {
      this.info = {
        isshow: true,
        title: "添加规格",
      };
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