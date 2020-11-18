import vue from "vue"
import vuex from "vuex"
import {reqgoodsList,reqgoodsCount} from "../../utils/http"
vue.use(vuex)

const state = {
    Sarr:[],
    // 一页显示几个
    size:2,
    // 页数
    page:1,
    // 总数
    count:10
}
const mutations = {
    m(state,val){
        state.Sarr = val
    },
    // 总数和页数是要活的，定义在mutations里修改
    all(state,num){
        state.count = num
    },
    ye(state,num){
        state.page = num
    }
}
const actions = {
    // 每次删除，添加都触发请求更新list
    a(contxt){
        reqgoodsList({size:contxt.state.size,page:contxt.state.page}).then(res=>{
    // 如果没数据请求回是null，null没length，所以判断一下 如果返回的数据有值那就是数据本身，如果没值那就赋空数组
           let list = res.data.list?res.data.list:[]
    // 每次删除，添加都触发请求更新list，所以判断只要页数大于1，当前按参数请求的数据长度是0，那改变页数减少1，并且更新list视图
           if(contxt.state.page>1 && list.length == 0){
               contxt.commit("ye",contxt.state.page - 1)
               contxt.dispatch("a")
           }
          
           contxt.commit("m",list)
        })
    },
    // count总数如何修改，发请求然后通知mutations去修改，总数变活的了
    all(contxt){
        reqgoodsCount().then(res=>{
            contxt.commit("all",res.data.list[0].total)
        })
    },
    // 要活的，page页数是如何修改的，视图的change事件默认传参为点击第几页参数就是几，接过来驱动mutations修改
    ye(contxt,n){
        contxt.commit("ye",n)
    // 修改后更新页面
        contxt.dispatch("a")
    }
}
const getters = {
    g(state){
        return state.Sarr
    },
    ye(state){
        return state.page
    },
    // 分页视图需要总数和一页多少个size，导出使用
    all(state){
        return state.count
    },
    s(state){
        return state.size
    }
}

export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}