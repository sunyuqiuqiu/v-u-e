<template>
  <div>
    <el-button type="danger" @click="del">删除</el-button>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import {errorAlert} from "../../utils/alert"
export default {
  methods: {
    del() {
      this.$confirm("你确定要删除吗？", "删除提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          this.$emit("del")
      }).catch(err=>{
         errorAlert("您已取消")
      })
    },
  },

};
</script>
<style scoped>
</style>