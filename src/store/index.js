import vue from "vue"
import vuex from "vuex"
vue.use(vuex)
import shopfenlei from "./modules/shopfenlei"
import shopguige from "./modules/shopguige"
import shopguanli from "./modules/shopguanli"
import vbanner from "./modules/vbanner"
import vip from "./modules/vip"
import s from "./modules/s"

const state = {
    // 刷新一下状态层数据就会没在了，本地存储一份赋给它，保证登录后一直有数据里的token，退出时清除token（免得刷新token清除退到登录页）
    qiuObj: sessionStorage.getItem("qiuObj")?JSON.parse(sessionStorage.getItem("qiuObj")):{}
}
const mutations = {
    Mobj(state, val) {
        this.state.qiuObj = val
        if(val.token){
            sessionStorage.setItem("qiuObj",JSON.stringify(val))
        }else{
            sessionStorage.removeItem("qiuObj")
        }
          
    }
}
const actions = {
    Aobj(contxt,myobj) {
        contxt.commit("Mobj",myobj)
       
    }
}
const getters = {
    Gobj(state) {
        return state.qiuObj
    }
}

export default new vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {
        shopfenlei,
        shopguige,
        shopguanli,
        vbanner,
        vip,
        s
    }
})