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
          <el-menu-item index="/index/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/menu">菜单管理</el-menu-item>
              <el-menu-item index="/index/jue">角色管理</el-menu-item>
              <el-menu-item index="/index/manage">管理员管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/shopFenlei">商品分类</el-menu-item>
              <el-menu-item index="/index/shopGuige">商品规格</el-menu-item>
              <el-menu-item index="/index/shopGuanli">商品管理</el-menu-item>
              <el-menu-item index="/index/vip">会员管理</el-menu-item>
              <el-menu-item index="/index/vbanner">轮播图管理</el-menu-item>
              <el-menu-item index="/index/s">秒杀活动</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右中 -->
      <el-container>
        <el-header>Header</el-header>
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
    ...mapActions({}),
  },
  mounted() {},
  computed: {
    ...mapGetters({}),
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
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
  min-height: 550px;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
  height: 100%;
}
</style>