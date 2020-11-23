<template>
  <div>
    <el-button type="primary" @click="addWill">添加</el-button>
    <!-- list -->
    <v-list :info= "info" @ref= "ref"></v-list>
    <!-- form -->
    <v-form :info= "info" ref= 'one'></v-form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import vList from "./components/list"
import vForm from "./components/from"

export default {
   components:{
      vList,
      vForm
   },
   data(){
      return{
         info:{
            isshow:false,
            title:""
         }
      }
   },
  methods: {
   ref(id){
      this.$refs.one.one(id)
     },
    addWill(){
       this.info = {
          isshow:true,
          title:"添加限时秒杀"
       }
    },
    ...mapActions({
       a:"s/a"
    }),
  },
  mounted() {
     
  },
  computed: {
    ...mapGetters({
       list:'s/g'
    }),
  },
};
</script>
<style scoped>
</style>