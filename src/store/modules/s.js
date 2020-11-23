import vue from "vue"
import vuex from "vuex"
import {reqSSList} from "../../utils/http"
vue.use(vuex)

const state = {
    Qarr:[]
}
const mutations = {
    m(state,val){
        state.Qarr = val
    }
}
const actions = {
    a(contxt){
        reqSSList().then(res=>{
            contxt.commit("m",res.data.list)
        })
    }
}
const getters = {
    g(state){
        return state.Qarr
    }
}

export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}