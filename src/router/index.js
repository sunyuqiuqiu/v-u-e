import Vue from 'vue'
import Router from 'vue-router'
import store from "../store"


Vue.use(Router)
export const routes =
  [
    {
      path: "menu",
      name: "菜单管理",
      component: () => import("../pages/menu/menu"),
      beforeEnter(to,from,next){
        no("/menu",next)
      }
    },
    {
      path: "jue",
      name: "角色管理",
      component: () => import("../pages/jue/jue"),
      beforeEnter(to,from,next){
        no("/jue",next)
      }
    },{
      path:"manage",
      name:"管理员管理",
      component:()=>import("../pages/manage/manage"),
      beforeEnter(to,from,next){
        no("/manage",next)
      }
    },{
      path:"shopFenlei",
      name:"商品分类",
      component:()=>import("../pages/shopFenlei/shopFenlei"),
      beforeEnter(to,from,next){
        no("/shopFenlei",next)
      }
    },{
      path:"shopGuige",
      name:"商品规格",
      component:()=>import("../pages/shopGuige/shopGuige"),
      beforeEnter(to,from,next){
        no("/shopGuige",next)
      }
    },{
      path:"shopGuanli",
      name:"商品管理",
      component:()=>import("../pages/shopGuanli/shopGuanli"),
      beforeEnter(to,from,next){
        no("/shopGuanli",next)
      }
    },{
      path:"vip",
      name:"会员管理",
      component:()=>import("../pages/vip/vip"),
      beforeEnter(to,from,next){
        no("/vip",next)
      }
    },{
      path:"vbanner",
      name:"轮播图管理",
      component:()=>import("../pages/vbanner/vbanner"),
      beforeEnter(to,from,next){
        no("/vbanner",next)
      }
    },{
      path:"s",
      name:"秒杀活动",
      component:()=>import("../pages/s/s"),
      beforeEnter(to,from,next){
        no("/s",next)
      }
    }
  ]

  


let router = new Router({
  routes: [
    {
      path: "/login",
      component: () => import("../pages/login/login"),
    }, {
      path: "/",
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
    // {
    //   path: "*",
    //   redirect: "/login"
    // }
  ]
})

// 封装路由守卫
function no(path,next){
    if(store.state.qiuObj.menus_url.includes(path)){
      next()
      return
    }else{
      next("/home")
    }
}

router.beforeEach((to,from,next)=>{
  if(to.fullPath == "/login"){
    next();
    return
  }
  if(store.state.qiuObj.token){
    next()
    return
  }
  next("/login")
})
export default router