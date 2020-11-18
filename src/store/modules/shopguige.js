import vue from "vue"
import vuex from "vuex"
import { reqspecsList } from "../../utils/http"
vue.use(vuex)

const state = {
    Arr: []
}
const mutations = {
    m(state, val) {
        state.Arr = val
    }
}
const actions = {
    a(context, con) {
        reqspecsList(con).then(res => {
            let list = res.data.list ? res.data.list : []
            //     list.forEach(element => {
            //         element.attrs = JSON.parse(element.attrs)
            //     });
            context.commit("m", list)
        })
    }
}
const getters = {
    g(state) {
        return state.Arr
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}