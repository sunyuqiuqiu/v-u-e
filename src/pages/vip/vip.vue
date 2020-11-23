<template>
  <div>
    <!-- list组件 -->
    <v-list :info= "info" @r="r"></v-list>
    <!-- form组件 -->
    <v-form :info= "info" ref= "re"></v-form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import vList from "./components/list";
import vForm from "./components/form";

export default {
  components: {
    vList,
    vForm,
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
   r(uid){
      this.$refs.re.req(uid)
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