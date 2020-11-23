<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <!-- 导航 -->
        <!-- 地址输入 刷新第二次才有颜色-->
        <el-menu
          :default-active="flag"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
      <div v-for="item of g.menus" :key="item.id">
          <el-submenu :index= "item.id" v-if="item.children">
            <template slot="title">
              <i :class= "item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index= "val.url" v-for="val of item.children" :key="val.id">{{val.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
           <el-menu-item v-else :index= "item.url" :key="item.id">{{item.title}}</el-menu-item>
      </div>
          
        </el-menu>
      </el-aside>
      <!-- 右中 -->
      <el-container>
        <el-header>
          <div class="u">
            <span>{{g.username}}</span>
            <el-button type="danger" @click="goto">退出</el-button>
          </div>
        </el-header>
        <!-- 面包屑 -->
        <el-breadcrumb separator="/" v-if="$route.name">
          <el-breadcrumb-item :to="{ path: '/index/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="/">{{$route.name}}</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
        <el-main>
          <!-- 右中出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
 
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    goto(){
      // 退出时触发状态层，此时传个空对象
      this.a({})
      this.$router.push("/login")
    },
    ...mapActions({
      a:"Aobj"
    }),
  },
  mounted() {
    
  },
  computed: {
    ...mapGetters({
      g:"Gobj"
    }),
  },
  data() {
    return {
      flag: this.$route.fullPath,
    };
  },
  watch: {
    flag() {
      console.log(this.flag);
    },
  },
};
</script>
<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  min-height: 550px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 100%;
}
.u{
  float: right;
}
</style>