import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
export const routes =
  [
    {
      path: "menu",
      name: "菜单管理",
      component: () => import("../pages/menu/menu")
    },
    {
      path: "jue",
      name: "角色管理",
      component: () => import("../pages/jue/jue")
    },{
      path:"manage",
      name:"管理员管理",
      component:()=>import("../pages/manage/manage")
    },{
      path:"shopFenlei",
      name:"商品分类",
      component:()=>import("../pages/shopFenlei/shopFenlei")
    },{
      path:"shopGuige",
      name:"商品规格",
      component:()=>import("../pages/shopGuige/shopGuige")
    },{
      path:"shopGuanli",
      name:"商品管理",
      component:()=>import("../pages/shopGuanli/shopGuanli")
    },{
      path:"vip",
      name:"会员管理",
      component:()=>import("../pages/vip/vip")
    },{
      path:"vbanner",
      name:"轮播图管理",
      component:()=>import("../pages/vbanner/vbanner")
    },{
      path:"s",
      name:"秒杀活动",
      component:()=>import("../pages/s/s")
    }
  ]



export default new Router({
  routes: [
    {
      path: "/login",
      component: () => import("../pages/login/login")
    }, {
      path: "/index",
      component: () => import("../pages/index"),
      children: [
        {
          path: "home",
          component: () => import("../pages/home/home")
        },
        {
          path: "",
          redirect: "home"
        },
        ...routes,
      ]
    },
    {
      path: "*",
      redirect: "/login"
    }
  ]
})
