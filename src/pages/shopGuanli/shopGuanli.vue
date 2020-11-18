<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- list组件 -->
    <v-list></v-list>
    <!-- form组件 -->
    <v-form :info= "info"></v-form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import vList from "./components/list";
import vForm from "./components/form";

export default {
  data() {
    return {
      info: {
        isshow: false,
        title: "",
      },
    };
  },
  components: {
    vList,
    vForm,
  },
  methods: {
    willAdd() {
       this.info = {
          isshow:true,
          title:"添加商品"
       }
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