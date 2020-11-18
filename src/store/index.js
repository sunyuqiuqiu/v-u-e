import vue from "vue"
import vuex from "vuex"
vue.use(vuex)
import shopfenlei from "./modules/shopfenlei"
import shopguige from "./modules/shopguige"
import shopguanli from "./modules/shopguanli"

const state = {}
const mutations = {}
const actions = {}
const getters = {}

export default new vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        shopfenlei,
        shopguige,
        shopguanli
    }
})