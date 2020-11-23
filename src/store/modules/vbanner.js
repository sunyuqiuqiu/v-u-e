import vue from "vue"
import vuex from "vuex"
import {reqBanList} from "../../utils/http"
vue.use(vuex)

const state = {
    Barr:[]
}
const mutations = {
    m(state,val){
        state.Barr = val
    }
}
const actions = {
    a(contxt){
        reqBanList().then(res=>{
            console.log(res.data.list);
            contxt.commit("m",res.data.list)
        })
    }
}
const getters = {
    g(state){
        return state.Barr
    }
}

export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}