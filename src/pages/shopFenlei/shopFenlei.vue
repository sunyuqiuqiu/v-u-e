<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="yeas">添加</el-button>
    <!-- list组件 -->
    <v-list @one= "edit" :text= "info"></v-list>
    <!-- popup组件 -->
    <v-popup :info="info" ref="name"></v-popup>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import vList from "./components/list";
import vPopup from "./components/popup";
export default {
  data() {
    return {
      info: {
        title: "",
        isShow: false,
      },
    };
  },
  components: {
    vList,
    vPopup,
  },
  methods: {
     edit(id){
        this.$refs.name.one(id)
     },
    yeas() {
      this.info = {
        title: "添加",
        isShow: true,
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